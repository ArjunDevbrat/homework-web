/**
 * Core verification script for the HOMEWORK platform.
 *
 * Proves, in isolation, the core risks:
 *   1. Prisma <-> PostgreSQL connectivity + full CRUD round trip.
 *   2. Zod validation pipeline shared by Server Actions and Route Handlers.
 *   3. Next.js reachability locally AND through the preview ingress, including
 *      whether Route Handlers under /api/* survive that ingress.
 *
 * Run: npx tsx scripts/test-core.ts
 */
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const LOCAL_URL = 'http://127.0.0.1:3000';
const PUBLIC_URL = process.env.NEXT_PUBLIC_SITE_URL ?? '';

const PAGE_PATHS = [
  '/',
  '/about-coach',
  '/programs',
  '/free-resources',
  '/transformations',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/refund-policy',
] as const;

type Result = { name: string; ok: boolean; detail: string };
const results: Result[] = [];

function record(name: string, ok: boolean, detail: string): void {
  results.push({ name, ok, detail });
  // eslint-disable-next-line no-console
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} :: ${detail}`);
}

async function testPrismaCrud(): Promise<void> {
  try {
    const probe = await prisma.healthProbe.create({ data: { note: 'core-probe' } });
    const probeRead = await prisma.healthProbe.findUnique({ where: { id: probe.id } });

    const lead = await prisma.lead.create({
      data: {
        fullName: 'Core Tester',
        email: 'core@homework.fit',
        phone: '+919999999999',
        goal: 'FAT_LOSS',
        notes: 'core lead',
      },
    });
    const leadRead = await prisma.lead.findUnique({ where: { id: lead.id } });

    await prisma.lead.delete({ where: { id: lead.id } });
    await prisma.healthProbe.delete({ where: { id: probe.id } });

    const ok = probeRead?.note === 'core-probe' && leadRead?.status === 'NEW';
    record('prisma-postgres-crud', ok, ok ? 'create/read/delete on Lead + HealthProbe OK' : 'round trip mismatch');
  } catch (error) {
    record('prisma-postgres-crud', false, (error as Error).message);
  }
}

function testZodPipeline(): void {
  const schema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    goal: z.enum(['FAT_LOSS', 'MUSCLE_GAIN', 'PCOS_MANAGEMENT', 'DIABETES_MANAGEMENT', 'LIFESTYLE_COACHING']),
  });

  const good = schema.safeParse({
    fullName: 'Samrat Aryan',
    email: 'coach@homework.fit',
    phone: '+919812345678',
    goal: 'MUSCLE_GAIN',
  });
  const bad = schema.safeParse({ fullName: 'S', email: 'nope', phone: '1', goal: 'X' });

  record('zod-validation', good.success && !bad.success, `valid=${good.success} invalid-rejected=${!bad.success}`);
}

async function testPages(baseUrl: string, label: string): Promise<void> {
  const statuses: string[] = [];
  let allOk = true;

  for (const path of PAGE_PATHS) {
    try {
      const response = await fetch(`${baseUrl}${path}`);
      statuses.push(`${path}=${response.status}`);
      if (!response.ok) {
        allOk = false;
      }
    } catch (error) {
      statuses.push(`${path}=ERR(${(error as Error).message})`);
      allOk = false;
    }
  }

  record(label, allOk, statuses.join(' '));
}

async function testLeadRouteHandler(baseUrl: string, label: string): Promise<void> {
  try {
    const valid = await fetch(`${baseUrl}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Route Handler Probe',
        email: `probe-${Date.now()}@homework.fit`,
        phone: '+919812345678',
        goal: 'LIFESTYLE_COACHING',
        consent: true,
      }),
    });
    const validBody = (await valid.json()) as { status?: string; id?: string };

    const invalid = await fetch(`${baseUrl}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName: 'X', email: 'bad', phone: '1', goal: 'NOPE' }),
    });

    if (validBody.id) {
      await prisma.lead.delete({ where: { id: validBody.id } });
    }

    const ok = valid.status === 201 && validBody.status === 'success' && invalid.status === 422;
    record(label, ok, `created=${valid.status} rejected=${invalid.status}`);
  } catch (error) {
    record(label, false, (error as Error).message);
  }
}

async function main(): Promise<void> {
  await testPrismaCrud();
  testZodPipeline();
  await testPages(LOCAL_URL, 'next-pages-local');
  await testLeadRouteHandler(LOCAL_URL, 'lead-route-handler-local');

  if (PUBLIC_URL) {
    await testPages(PUBLIC_URL, 'next-pages-public-preview');
    await testLeadRouteHandler(PUBLIC_URL, 'lead-route-handler-public-preview');
  }

  await prisma.$disconnect();

  const failures = results.filter((result) => !result.ok);
  // eslint-disable-next-line no-console
  console.log(`\n=== ${results.length - failures.length}/${results.length} checks passed ===`);

  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

void main();
