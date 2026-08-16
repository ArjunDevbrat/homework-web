'use server';

import { submitContactMessage, submitConsultation } from '@/lib/services/lead-service';
import { consultationSchema, contactSchema, toFieldErrors } from '@/lib/validations';
import type { ActionState } from '@/types';

export type ConsultationFieldKey =
  | 'fullName'
  | 'phone'
  | 'age'
  | 'gender'
  | 'goal'
  | 'healthIssue'
  | 'profession'
  | 'email'
  | 'programSlug'
  | 'consent';

export type ContactFieldKey = 'fullName' | 'email' | 'subject' | 'message';

/**
 * Server Action backing the consultation form on /contact.
 * Validation is re-run on the server so client-side Zod can never be bypassed.
 */
export async function submitConsultationAction(
  values: unknown,
): Promise<ActionState<ConsultationFieldKey>> {
  const parsed = consultationSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields and try again.',
      fieldErrors: toFieldErrors(parsed.error) as Partial<Record<ConsultationFieldKey, string>>,
    };
  }

  try {
    const result = await submitConsultation(parsed.data, 'contact-page');

    return {
      status: 'success',
      message:
        'Request received. Coach Samrat reviews every submission personally and will reach out within 48 hours.',
      whatsappUrl: result.whatsappUrl,
    };
  } catch {
    return {
      status: 'error',
      message: 'We could not save your request right now. Please email contact@homework.fit instead.',
    };
  }
}

/** Server Action backing the general enquiry form on /contact. */
export async function submitContactAction(values: unknown): Promise<ActionState<ContactFieldKey>> {
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields and try again.',
      fieldErrors: toFieldErrors(parsed.error) as Partial<Record<ContactFieldKey, string>>,
    };
  }

  try {
    await submitContactMessage(parsed.data);
    return { status: 'success', message: 'Message sent. You will hear back at the email you provided.' };
  } catch {
    return {
      status: 'error',
      message: 'We could not send your message right now. Please email contact@homework.fit instead.',
    };
  }
}
