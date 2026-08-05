import { goalOptions, programs } from '@/lib/data';
import { createContactMessage, createLead } from '@/lib/repositories/lead-repository';
import { sendNotificationEmail } from '@/lib/services/email-service';
import type { ContactInput, LeadInput } from '@/lib/validations';

function goalLabel(goal: LeadInput['goal']): string {
  return goalOptions.find((option) => option.value === goal)?.label ?? goal;
}

function programLabel(slug: string | undefined): string {
  if (!slug) {
    return 'Not specified';
  }
  return programs.find((program) => program.slug === slug)?.name ?? slug;
}

export type SubmissionResult = {
  readonly id: string;
  readonly emailDelivered: boolean;
};

/** Persists a consultation lead, then attempts an (optional) coach notification. */
export async function submitLead(input: LeadInput, source: string): Promise<SubmissionResult> {
  const lead = await createLead(input, source);

  const delivery = await sendNotificationEmail({
    subject: `New consultation request — ${lead.fullName}`,
    heading: 'New consultation request',
    rows: [
      { label: 'Name', value: lead.fullName },
      { label: 'Email', value: lead.email },
      { label: 'Phone', value: lead.phone },
      { label: 'Primary goal', value: goalLabel(input.goal) },
      { label: 'Program interest', value: programLabel(input.programSlug || undefined) },
      { label: 'Notes', value: input.notes ? input.notes : '—' },
      { label: 'Source', value: source },
    ],
  });

  return { id: lead.id, emailDelivered: delivery.delivered };
}

/** Persists a general contact message, then attempts an (optional) coach notification. */
export async function submitContactMessage(input: ContactInput): Promise<SubmissionResult> {
  const message = await createContactMessage(input);

  const delivery = await sendNotificationEmail({
    subject: `Website enquiry — ${message.subject}`,
    heading: 'New website enquiry',
    rows: [
      { label: 'Name', value: message.fullName },
      { label: 'Email', value: message.email },
      { label: 'Subject', value: message.subject },
      { label: 'Message', value: message.message },
    ],
  });

  return { id: message.id, emailDelivered: delivery.delivered };
}
