/**
 * POC core verification script.
 *
 * Proves, in isolation, the three core risks for the HOMEWORK platform:
 *   1. Prisma <-> local PostgreSQL connectivity + full CRUD round trip.
 *   2. Zod validation pipeline used by lead/contact server actions.
 *   3. Next.js dev server reachability (local + public preview URL) and whether
 *      Next Route Handlers under /api/* survive the preview ingress.
 *
 * Run: npx tsx scripts/test-core.ts
 */
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const LOCAL_URL = 'http://127.0.0.1:3000';
const PUBLIC_URL = process.env.NEXT_PUBLIC_SITE_URL ?? '';

type Result = { name: string; ok: boolean; detail: string };
const results: Result[] = [];

function record(name: string, ok: boolean, detail: string): void {
  results.push({ name, ok, detail });
  // eslint-disable-next-line no-console
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} :: ${detail}`);
}

async function testPrismaCrud(): Promise<void> {
  try {
    const created = await prisma.healthProbe.create({ data: { note: 'poc-probe' } });
    const read = await prisma.healthProbe.findUnique({ where: { id: created.id } });
    const lead = await prisma.lead.create({
      data: {
        fullName: 'POC Tester',
        email: 'poc@homework.fit',
        phone: '+919999999999',
        goal: 'FAT_LOSS',
        notes: 'poc lead',
      },
    });
    const leadRead = await prisma.lead.findUnique({ where: { id: lead.id } });
    await prisma.lead.delete({ where: { id: lead.id } });
    await prisma.healthProbe.delete({ where: { id: created.id } });

    const ok = read?.note === 'poc-probe' && leadRead?.status === 'NEW';
    record('prisma-postgres-crud', ok, ok ? 'create/read/delete on Lead + HealthProbe OK' : 'round trip mismatch');
  } catch (error) {
    record('prisma-postgres-crud', false, (error as Error).message);
  }
}

async function testZodPipeline(): Promise<void> {
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

async function probe(url: string, label: string): Promise<void> {
  try {
    const response = await fetch(url, { headers: { accept: 'application/json,text/html' } });
    const text = await response.text();
    const isJson = text.trim().startsWith('{');
    record(label, response.ok, `status=${response.status} json=${isJson} body=${text.slice(0, 140)}`);
  } catch (error) {
    record(label, false, (error as Error).message);
  }
}

async function main(): Promise<void> {
  await testPrismaCrud();
  await testZodPipeline();
  await probe(`${LOCAL_URL}/`, 'next-dev-local-page');
  await probe(`${LOCAL_URL}/api/health`, 'next-route-handler-local');
  if (PUBLIC_URL) {
    await probe(`${PUBLIC_URL}/`, 'next-page-public-preview');
    await probe(`${PUBLIC_URL}/api/health`, 'next-route-handler-public-preview');
  }

  await prisma.$disconnect();

  const failures = results.filter((r) => !r.ok);
  // eslint-disable-next-line no-console
  console.log(`\n=== ${results.length - failures.length}/${results.length} checks passed ===`);
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

void main();
