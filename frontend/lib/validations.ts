import { z } from 'zod';

/* ------------------------------------------------------------------ */
/* Reusable field schemas                                              */
/* ------------------------------------------------------------------ */

const nameSchema = z
  .string()
  .trim()
  .min(2, 'Please enter at least 2 characters')
  .max(80, 'Please keep this under 80 characters');

const emailSchema = z
  .string()
  .trim()
  .email('Please enter a valid email address')
  .max(160, 'Please keep this under 160 characters');

const phoneSchema = z
  .string()
  .trim()
  .min(10, 'Please enter a valid phone number')
  .max(20, 'Please enter a valid phone number')
  .regex(/^\+?[0-9][0-9\s-]{8,19}$/, 'Use digits only, with an optional leading +');

export const genderSchema = z.enum(['FEMALE', 'MALE', 'OTHER', 'PREFER_NOT_TO_SAY'], {
  errorMap: () => ({ message: 'Please select an option' }),
});

export const primaryGoalSchema = z.enum(
  [
    'FAT_LOSS',
    'MUSCLE_BUILDING',
    'WEIGHT_GAIN',
    'DIABETES_MANAGEMENT',
    'PCOS_MANAGEMENT',
    'THYROID_MANAGEMENT',
    'LIFESTYLE_MODIFICATION',
    'HEALTHY_AGING',
    'POSTPARTUM_FITNESS',
  ],
  { errorMap: () => ({ message: 'Please select your primary goal' }) },
);

/* ------------------------------------------------------------------ */
/* Consultation form                                                   */
/* ------------------------------------------------------------------ */

/**
 * Consultation form schema: Name, Phone, Age, Gender, Goal, Health Issue, Profession.
 * Email and program interest are optional conveniences.
 */
export const consultationSchema = z.object({
  fullName: nameSchema,
  phone: phoneSchema,
  age: z.coerce
    .number({ invalid_type_error: 'Please enter your age in years' })
    .int('Please enter a whole number')
    .min(14, 'Coaching is available from age 14 upwards')
    .max(95, 'Please enter an age below 95'),
  gender: genderSchema,
  goal: primaryGoalSchema,
  healthIssue: z
    .string()
    .trim()
    .min(3, 'Tell us your condition, or write "None"')
    .max(300, 'Please keep this under 300 characters'),
  profession: z
    .string()
    .trim()
    .min(2, 'Please enter your profession')
    .max(120, 'Please keep this under 120 characters'),
  email: emailSchema.optional().or(z.literal('')),
  programSlug: z.string().trim().max(60).optional().or(z.literal('')),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the privacy policy to continue' }),
  }),
});

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */

export const contactSchema = z.object({
  fullName: nameSchema,
  email: emailSchema,
  subject: z
    .string()
    .trim()
    .min(3, 'Please enter a subject')
    .max(120, 'Please keep this under 120 characters'),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more (10 characters minimum)')
    .max(2000, 'Please keep this under 2000 characters'),
});

export type ConsultationInput = z.infer<typeof consultationSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type GenderValue = z.infer<typeof genderSchema>;
export type PrimaryGoalValue = z.infer<typeof primaryGoalSchema>;

/** Flattens a ZodError into a `{ field: firstMessage }` map for form rendering. */
export function toFieldErrors(error: z.ZodError<Record<string, unknown>>): Record<string, string> {
  const flattened = error.flatten().fieldErrors as Record<string, string[] | undefined>;

  return Object.entries(flattened).reduce<Record<string, string>>((accumulator, [key, messages]) => {
    if (messages && messages.length > 0) {
      accumulator[key] = messages[0];
    }
    return accumulator;
  }, {});
}
