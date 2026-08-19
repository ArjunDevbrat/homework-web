import { NextResponse } from 'next/server';

import { checkRateLimit } from '@/lib/rate-limit';
import { submitContactMessage } from '@/lib/services/lead-service';
import { contactSchema, toFieldErrors } from '@/lib/validations';

export const dynamic = 'force-dynamic';

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0]?.trim() || 'unknown' : 'unknown';
}

/** Public Route Handler for general contact enquiries. */
export async function POST(request: Request) {
  const rate = checkRateLimit(`contact-api:${clientIp(request)}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { status: 'error', message: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ status: 'error', message: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { status: 'error', message: 'Validation failed', fieldErrors: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  try {
    const result = await submitContactMessage(parsed.data);
    return NextResponse.json(
      { status: 'success', id: result.id, emailDelivered: result.emailDelivered },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ status: 'error', message: 'Could not store message' }, { status: 500 });
  }
}
