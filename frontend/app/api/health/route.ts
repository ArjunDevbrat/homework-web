import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const probeCount = await prisma.healthProbe.count();

    return NextResponse.json({
      status: 'ok',
      runtime: 'next-route-handler',
      database: 'connected',
      probeCount,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { status: 'degraded', runtime: 'next-route-handler', database: 'unreachable' },
      { status: 503 },
    );
  }
}
