import { NextResponse } from 'next/server';

import { checkRateLimit } from '@/lib/rate-limit';
import { submitConsultation } from '@/lib/services/lead-service';
import { consultationSchema, toFieldErrors } from '@/lib/validations';

export const dynamic = 'force-dynamic';

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0]?.trim() || 'unknown' : 'unknown';
}

/** Public Route Handler for consultation leads (used by external integrations and forms). */
export async function POST(request: Request) {
  const rate = checkRateLimit(`lead-api:${clientIp(request)}`);
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

  const parsed = consultationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { status: 'error', message: 'Validation failed', fieldErrors: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  try {
    const result = await submitConsultation(parsed.data, 'api');

    return NextResponse.json(
      {
        status: 'success',
        id: result.id,
        emailDelivered: result.emailDelivered,
        whatsappUrl: result.whatsappUrl,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ status: 'error', message: 'Could not store lead' }, { status: 500 });
  }
}
