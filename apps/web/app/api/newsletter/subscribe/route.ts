import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  CONSENT_TEXT_VERSION,
  hashIp,
  newId,
  newUrlToken,
  nowIso,
  type Subscriber,
} from '@elo/core';
import { getStorage } from '@elo/storage';
import { getMailer, newsletterConfirm } from '@elo/mail';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';
import { env } from '@/lib/env';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const schema = z.object({
  email: z.string().trim().toLowerCase().email().max(160),
  firstName: z.string().trim().max(80).optional(),
  postalCode: z.string().trim().max(10).optional(),
  source: z.string().max(60).optional(),
  consent: z.boolean().refine((v) => v === true, { message: 'Einwilligung erforderlich.' }),
  /** Honeypot */
  company: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  const ip = getClientKeyFromHeaders(req.headers);
  const rl = rateLimit(ip, 'newsletter');
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Zu viele Anfragen. Bitte spaeter erneut.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Ungueltige Anfrage.' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Validierung fehlgeschlagen.',
        fields: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot ausgefuellt → still erfolgreich quittieren.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const d = parsed.data;
  const storage = getStorage();
  const now = nowIso();

  // Mehrfachanmeldung: existierenden, noch nicht bestaetigten Eintrag wiederverwenden
  // (neuer Token, neue Mail). Bereits Bestaetigte erhalten KEINE neue Mail.
  const existing = await storage.findSubscriberByEmail(d.email);
  if (existing) {
    if (existing.status === 'confirmed') {
      return NextResponse.json({
        ok: true,
        alreadyConfirmed: true,
        message: 'Sie sind bereits angemeldet.',
      });
    }
    const refreshed: Subscriber = {
      ...existing,
      firstName: d.firstName ?? existing.firstName,
      postalCode: d.postalCode ?? existing.postalCode,
      status: 'pending',
      confirmToken: newUrlToken(),
      unsubscribeToken: existing.unsubscribeToken || newUrlToken(),
    };
    await storage.updateSubscriber(existing.id, refreshed);
    try {
      await getMailer().send(newsletterConfirm(refreshed, env.NEXT_PUBLIC_SITE_URL));
    } catch {
      // ConsoleMailer-Fallback ist eingebaut; bei Resend-Fehler nicht den Flow brechen.
    }
    return NextResponse.json({ ok: true, resent: true });
  }

  const subscriber: Subscriber = {
    id: newId('sub'),
    email: d.email,
    firstName: d.firstName,
    postalCode: d.postalCode,
    status: 'pending',
    createdAt: now,
    confirmToken: newUrlToken(),
    unsubscribeToken: newUrlToken(),
    source: d.source ?? 'newsletter-page',
    ipHash: hashIp(ip, env.NEXTAUTH_SECRET),
    consentTextVersion: CONSENT_TEXT_VERSION,
  };

  try {
    await storage.createSubscriber(subscriber);
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Speichern fehlgeschlagen. Bitte spaeter erneut.' },
      { status: 500 },
    );
  }

  try {
    await getMailer().send(newsletterConfirm(subscriber, env.NEXT_PUBLIC_SITE_URL));
  } catch {
    /* Versand nicht blockierend */
  }

  return NextResponse.json({ ok: true });
}
