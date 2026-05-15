import { NextResponse } from 'next/server';
import { schemas, newId, nowIso, hashIp } from '@elo/core';
import { getStorage } from '@elo/storage';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';
import { env } from '@/lib/env';

export async function POST(req: Request) {
  const h = req.headers;
  const ip = getClientKeyFromHeaders(h);
  const rl = rateLimit(ip, 'events');
  if (!rl.allowed) return NextResponse.json({ ok: false }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid json' }, { status: 400 });
  }
  const parsed = schemas.funnelEventInputSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  const data = parsed.data;
  const storage = getStorage();
  await storage.appendEvent({
    id: newId('evt'),
    createdAt: nowIso(),
    type: data.type,
    sessionId: data.sessionId,
    ...(data.stepId !== undefined ? { stepId: data.stepId } : {}),
    ...(data.fieldId !== undefined ? { fieldId: data.fieldId } : {}),
    ...(data.audience !== undefined ? { audience: data.audience } : {}),
    ...(data.variantId !== undefined ? { variantId: data.variantId } : {}),
    ...(data.experimentId !== undefined ? { experimentId: data.experimentId } : {}),
    ...(data.durationMs !== undefined ? { durationMs: data.durationMs } : {}),
    ...(data.meta !== undefined ? { meta: data.meta } : {}),
    ipHash: hashIp(ip, env.NEXTAUTH_SECRET),
  });
  return NextResponse.json({ ok: true });
}
