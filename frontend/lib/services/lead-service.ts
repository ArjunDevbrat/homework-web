import { createContactSubmission, createLead } from '@/lib/repositories/lead-repository';
import { sendConfirmationEmail, sendNotificationEmail } from '@/lib/services/email-service';
import { genderLabel, generateWhatsAppLink, goalLabel, programLabel } from '@/lib/utils';
import type { ConsultationInput, ContactInput } from '@/lib/validations';
import type { ConsultationFormData } from '@/types';

export type SubmissionResult = {
  readonly id: string;
  readonly emailDelivered: boolean;
  readonly whatsappUrl?: string;
};

/**
 * Persists a consultation lead, builds the WhatsApp handoff link and attempts an
 * optional coach notification email. Orchestration only — no Prisma, no UI.
 */
export async function submitConsultation(
  input: ConsultationInput,
  source: string,
): Promise<SubmissionResult> {
  const lead = await createLead(input, source);

  const delivery = await sendNotificationEmail({
    subject: `New consultation request — ${lead.fullName}`,
    heading: 'New consultation request',
    rows: [
      { label: 'Name', value: lead.fullName },
      { label: 'Phone', value: lead.phone },
      { label: 'Email', value: lead.email ?? '—' },
      { label: 'Age', value: String(lead.age) },
      { label: 'Gender', value: genderLabel(lead.gender) },
      { label: 'Primary goal', value: goalLabel(lead.goal) },
      { label: 'Health issue', value: lead.healthIssue },
      { label: 'Profession', value: lead.profession },
      { label: 'Program interest', value: programLabel(lead.programSlug) },
      { label: 'Source', value: lead.source },
    ],
  });

  // Best-effort user confirmation email (env-gated; no-ops without Resend credentials).
  if (lead.email) {
    await sendConfirmationEmail({ to: lead.email, name: lead.fullName });
  }

  return {
    id: lead.id,
    emailDelivered: delivery.delivered,
    whatsappUrl: generateWhatsAppLink(input as ConsultationFormData),
  };
}

/** Persists a general contact message, then attempts an optional coach notification. */
export async function submitContactMessage(input: ContactInput): Promise<SubmissionResult> {
  const submission = await createContactSubmission(input);

  const delivery = await sendNotificationEmail({
    subject: `Website enquiry — ${submission.subject}`,
    heading: 'New website enquiry',
    rows: [
      { label: 'Name', value: submission.fullName },
      { label: 'Email', value: submission.email },
      { label: 'Subject', value: submission.subject },
      { label: 'Message', value: submission.message },
    ],
  });

  return { id: submission.id, emailDelivered: delivery.delivered };
}
