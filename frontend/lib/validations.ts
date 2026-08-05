import { z } from 'zod';

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Please enter at least 2 characters')
  .max(80, 'Please keep this under 80 characters');

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(160, 'Please keep this under 160 characters');

const phoneSchema = z
  .string()
  .trim()
  .min(8, 'Please enter a valid phone number')
  .max(20, 'Please enter a valid phone number')
  .regex(/^\+?[0-9\s-]{8,20}$/, 'Use digits only, with an optional leading +');

export const leadGoalSchema = z.enum([
  'FAT_LOSS',
  'MUSCLE_GAIN',
  'PCOS_MANAGEMENT',
  'DIABETES_MANAGEMENT',
  'LIFESTYLE_COACHING',
]);

export const leadSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  goal: leadGoalSchema,
  programSlug: z.string().trim().max(60).optional().or(z.literal('')),
  notes: z.string().trim().max(1000, 'Please keep this under 1000 characters').optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the privacy policy to continue' }),
  }),
});

export const contactSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  subject: z.string().trim().min(3, 'Please enter a subject').max(120, 'Please keep this under 120 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more (10 characters minimum)')
    .max(2000, 'Please keep this under 2000 characters'),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type LeadGoalValue = z.infer<typeof leadGoalSchema>;

/** Flattens a ZodError into a `{ field: firstMessage }` map for form rendering. */
export function toFieldErrors<TShape extends Record<string, unknown>>(
  error: z.ZodError<TShape>,
): Record<string, string> {
  const flattened = error.flatten().fieldErrors as Record<string, string[] | undefined>;
  return Object.entries(flattened).reduce<Record<string, string>>((accumulator, [key, messages]) => {
    if (messages && messages.length > 0) {
      accumulator[key] = messages[0];
    }
    return accumulator;
  }, {});
}
