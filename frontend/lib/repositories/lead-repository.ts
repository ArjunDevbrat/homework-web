import type { ContactMessage, Lead } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { normalisePhone } from '@/lib/utils';
import type { ContactInput, LeadInput } from '@/lib/validations';

/**
 * Data-access layer for lead capture. UI components never talk to Prisma directly,
 * which keeps persistence concerns swappable (local Postgres today, Neon on Vercel).
 */
export async function createLead(input: LeadInput, source = 'website'): Promise<Lead> {
  return prisma.lead.create({
    data: {
      fullName: input.fullName,
      email: input.email.toLowerCase(),
      phone: normalisePhone(input.phone),
      goal: input.goal,
      programSlug: input.programSlug ? input.programSlug : null,
      notes: input.notes ? input.notes : null,
      source,
    },
  });
}

export async function createContactMessage(input: ContactInput): Promise<ContactMessage> {
  return prisma.contactMessage.create({
    data: {
      fullName: input.fullName,
      email: input.email.toLowerCase(),
      subject: input.subject,
      message: input.message,
    },
  });
}

export async function countLeads(): Promise<number> {
  return prisma.lead.count();
}
