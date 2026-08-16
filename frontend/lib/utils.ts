import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { genderOptions, goalOptions, programs, siteConfig } from '@/lib/data';
import type { ConsultationFormData } from '@/types';

/* Re-exported so form schemas can be imported from either lib/utils or lib/validations. */
export {
  consultationSchema,
  contactSchema,
  toFieldErrors,
  type ConsultationInput,
  type ContactInput,
} from '@/lib/validations';

/* Re-exported asset fallbacks for missing images, videos and downloadable files. */
export {
  FALLBACK_PORTRAIT_IMAGE,
  FALLBACK_RESOURCE_IMAGE,
  FALLBACK_TESTIMONIAL_IMAGE,
  resolveFileUrl,
  resolveImageUrl,
  resolveVideoUrl,
} from '@/lib/placeholders';

/** Merge conditional class names while resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Absolute URL builder used by metadata, sitemap and canonical tags. */
export function absoluteUrl(path = '/'): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}

/** Formats a date deterministically so server and client markup always match. */
export function formatDate(value: Date | string): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** Normalises a phone number to digits with a single optional leading plus. */
export function normalisePhone(value: string): string {
  const trimmed = value.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

/** True when the given nav href is the active route. */
export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Human-readable label for a stored primary goal value. */
export function goalLabel(goal: string): string {
  return goalOptions.find((option) => option.value === goal)?.label ?? goal;
}

/** Human-readable label for a stored gender value. */
export function genderLabel(gender: string): string {
  return genderOptions.find((option) => option.value === gender)?.label ?? gender;
}

/** Human-readable label for a program slug. */
export function programLabel(slug: string | null | undefined): string {
  if (!slug) {
    return 'Not sure yet';
  }
  return programs.find((program) => program.slug === slug)?.name ?? slug;
}

/**
 * Builds the WhatsApp handoff message for a consultation request.
 * Kept separate from the URL builder so it can be reused by email templates.
 */
export function buildWhatsAppMessage(formData: ConsultationFormData): string {
  const lines = [
    `Hi Coach Samrat, I would like to book a free consultation with ${siteConfig.name}.`,
    '',
    `Name: ${formData.fullName}`,
    `Phone: ${normalisePhone(formData.phone)}`,
    `Age: ${formData.age}`,
    `Gender: ${genderLabel(formData.gender)}`,
    `Primary goal: ${goalLabel(formData.goal)}`,
    `Health issue: ${formData.healthIssue}`,
    `Profession: ${formData.profession}`,
  ];

  if (formData.programSlug) {
    lines.push(`Program of interest: ${programLabel(formData.programSlug)}`);
  }

  if (formData.email) {
    lines.push(`Email: ${formData.email}`);
  }

  return lines.join('\n');
}

/**
 * Formats consultation form input into a clean `wa.me` URI that opens directly in a
 * WhatsApp chat with the message pre-filled.
 *
 * When no business number is configured (NEXT_PUBLIC_WHATSAPP_NUMBER), a number-less
 * `wa.me` link is returned so the visitor can still pick the chat themselves rather than
 * hitting a dead link.
 */
export function generateWhatsAppLink(formData: ConsultationFormData): string {
  const message = encodeURIComponent(buildWhatsAppMessage(formData));
  const digits = siteConfig.whatsappNumber.replace(/\D/g, '');

  return digits.length > 0 ? `https://wa.me/${digits}?text=${message}` : `https://wa.me/?text=${message}`;
}
