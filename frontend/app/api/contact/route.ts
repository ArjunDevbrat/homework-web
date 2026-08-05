import { NextResponse } from 'next/server';

import { submitContactMessage } from '@/lib/services/lead-service';
import { contactSchema, toFieldErrors } from '@/lib/validations';

export const dynamic = 'force-dynamic';

/** Public Route Handler for general contact enquiries. */
export async function POST(request: Request) {
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
