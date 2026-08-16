import type { ContactSubmission, Lead, Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { normalisePhone } from '@/lib/utils';
import type { ConsultationInput, ContactInput } from '@/lib/validations';

/**
 * Data-access layer. Prisma is only ever touched here, which keeps persistence
 * swappable (local PostgreSQL today, Neon on Vercel) and keeps services testable.
 */

export async function createLead(input: ConsultationInput, source = 'website'): Promise<Lead> {
  const data: Prisma.LeadCreateInput = {
    fullName: input.fullName,
    phone: normalisePhone(input.phone),
    email: input.email ? input.email.toLowerCase() : null,
    age: input.age,
    gender: input.gender,
    goal: input.goal,
    healthIssue: input.healthIssue,
    profession: input.profession,
    programSlug: input.programSlug ? input.programSlug : null,
    source,
  };

  return prisma.lead.create({ data });
}

export async function markLeadWhatsAppSent(id: string): Promise<Lead> {
  return prisma.lead.update({ where: { id }, data: { whatsappSent: true } });
}

export async function createContactSubmission(input: ContactInput): Promise<ContactSubmission> {
  return prisma.contactSubmission.create({
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

export async function listRecentLeads(take = 20): Promise<Lead[]> {
  return prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take });
}
