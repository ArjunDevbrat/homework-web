import { NextResponse } from 'next/server';

import { submitLead } from '@/lib/services/lead-service';
import { leadSchema, toFieldErrors } from '@/lib/validations';

export const dynamic = 'force-dynamic';

/** Public Route Handler for consultation leads (used by external integrations and forms). */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ status: 'error', message: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { status: 'error', message: 'Validation failed', fieldErrors: toFieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  try {
    const result = await submitLead(parsed.data, 'api');
    return NextResponse.json(
      { status: 'success', id: result.id, emailDelivered: result.emailDelivered },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ status: 'error', message: 'Could not store lead' }, { status: 500 });
  }
}
