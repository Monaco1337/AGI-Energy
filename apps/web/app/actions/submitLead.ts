'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import {
  CONSENT_TEXT,
  CONSENT_TEXT_VERSION,
  hashIp,
  newId,
  nowIso,
  schemas,
  type Lead,
  type LeadFunnelInput,
  type LeadId,
} from '@elo/core';
import { scoreLead } from '@elo/scoring';
import { getStorage } from '@elo/storage';
import { logAudit } from '@elo/audit';
import { getMailer, leadConfirmation, salesNotification } from '@elo/mail';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';
import { isLikelyDisposableEmail, looksLikeBotSubmit } from '@/lib/security';
import { env } from '@/lib/env';

const payloadSchema = z.object({
  state: z.record(z.unknown()),
  consentTextVersion: z.string().min(1),
  submittedAtMs: z.number().int().nonnegative(),
});

export interface SubmitResult {
  ok: boolean;
  error?: string;
  leadId?: string;
}

function asInterest(v: unknown): LeadFunnelInput['interests'] {
  const arr = Array.isArray(v) ? v : v ? [v] : [];
  const allowed = new Set(['strom', 'gas', 'photovoltaik', 'strom_gas', 'unknown']);
  const filtered = arr.filter((x): x is LeadFunnelInput['interests'][number] => typeof x === 'string' && allowed.has(x));
  return (filtered.length > 0 ? filtered : ['unknown']) as LeadFunnelInput['interests'];
}

function asEnum<T extends string>(v: unknown, fallback: T, allowed: readonly T[]): T {
  return typeof v === 'string' && (allowed as readonly string[]).includes(v) ? (v as T) : fallback;
}

export async function submitLead(formData: FormData): Promise<SubmitResult> {
  const h = await headers();
  const clientKey = getClientKeyFromHeaders(h);
  const rl = rateLimit(clientKey, 'funnel');
  if (!rl.allowed) return { ok: false, error: 'Zu viele Anfragen. Bitte warten Sie kurz.' };

  const raw = formData.get('payload');
  if (typeof raw !== 'string') return { ok: false, error: 'Ungültige Anfrage.' };

  let payload: z.infer<typeof payloadSchema>;
  try {
    payload = payloadSchema.parse(JSON.parse(raw));
  } catch {
    return { ok: false, error: 'Eingabe konnte nicht geprüft werden.' };
  }

  const s = payload.state as Record<string, unknown>;

  // Aus AnswerState in LeadFunnelInput überführen
  const input: LeadFunnelInput = {
    source: 'website',
    customerType: asEnum(s.customerType, 'unknown', ['private', 'home_owner', 'business', 'landlord', 'unknown']),
    interests: asInterest(s.interests),
    urgency: asEnum(s.urgency, 'unknown', ['immediate', 'weeks', 'information', 'unknown']),
    hasInvoice: asEnum(s.hasInvoice, 'unknown', ['upload_now', 'later', 'no', 'unknown']),
    monthlyEnergyCosts: asEnum(s.monthlyEnergyCosts, 'unknown', ['under_100', '100_200', '200_400', 'over_400', 'unknown']),
    ownsProperty: asEnum(s.ownsProperty, 'unknown', ['yes', 'no', 'business_property', 'rental_property', 'unknown']),
    contactPreference: typeof s.contactPreference === 'string'
      ? (asEnum(s.contactPreference, 'phone', ['phone', 'whatsapp', 'email']) as 'phone' | 'whatsapp' | 'email')
      : undefined,
    firstName: String(s.firstName ?? '').trim(),
    lastName: String(s.lastName ?? '').trim(),
    phone: typeof s.phone === 'string' && s.phone.trim() ? s.phone.trim() : undefined,
    email: typeof s.email === 'string' && s.email.trim() ? s.email.trim() : undefined,
    postalCode: String(s.postalCode ?? '').trim(),
    city: typeof s.city === 'string' ? s.city.trim() : undefined,
    legalBasis: 'consent',
    consent: {
      contactConsent: Boolean(s.contactConsent),
      privacyAccepted: Boolean(s.privacyAccepted),
      consentTextVersion: payload.consentTextVersion,
      consentTimestamp: nowIso(),
      source: 'website_funnel',
    },
  };

  // Server-seitige Pflichtfeld-Validierung
  const validation = schemas.leadFunnelInputSchema.safeParse({
    ...input,
    consent: input.consent,
  });
  if (!validation.success) {
    const first = validation.error.issues[0];
    return { ok: false, error: first?.message ?? 'Bitte prüfen Sie Ihre Eingaben.' };
  }
  if (!input.consent?.contactConsent || !input.consent.privacyAccepted) {
    return { ok: false, error: 'Bitte beiden Einwilligungen zustimmen.' };
  }

  // Anti-Bot
  const botSignal = looksLikeBotSubmit({
    submittedAtMs: payload.submittedAtMs,
    minMs: 1500,
  });

  // Score
  const result = scoreLead(input, {
    spamSignal: botSignal,
    invalidContact: isLikelyDisposableEmail(input.email),
  });

  // Dublettenprüfung
  const storage = getStorage();
  const dup = await storage.findDuplicate({
    email: input.email,
    phone: input.phone,
    name: `${input.firstName} ${input.lastName}`,
    postalCode: input.postalCode,
  });

  const id = newId('lead') as LeadId;
  const now = nowIso();
  const lead: Lead = {
    id,
    createdAt: now,
    updatedAt: now,
    source: input.source,
    customerType: input.customerType,
    interests: input.interests,
    urgency: input.urgency,
    hasInvoice: input.hasInvoice,
    monthlyEnergyCosts: input.monthlyEnergyCosts,
    ownsProperty: input.ownsProperty,
    contactPreference: input.contactPreference,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    email: input.email,
    postalCode: input.postalCode,
    city: input.city,
    legalBasis: input.legalBasis,
    consent: input.consent,
    leadScore: result.score,
    leadColor: result.color,
    leadLabel: result.label,
    scoreReasons: result.reasons,
    recommendedAction: result.recommendedAction,
    status: result.color === 'black' ? 'Gesperrt' : 'Neu',
    notes: dup ? [{ id: newId('note'), createdAt: now, author: 'system', text: `Mögliche Dublette zu Lead ${dup.id}.` }] : [],
    contactHistory: [],
    files: [],
    isDemo: false,
  };

  await storage.createLead(lead);
  await logAudit({
    ctx: {
      actorId: 'anonymous',
      actorRole: 'anonymous',
      ipHash: hashIp(clientKey, env.NEXTAUTH_SECRET),
    },
    action: 'lead.created',
    entity: 'lead',
    entityId: id,
  });

  // Mails: nur wenn nicht gesperrt
  if (lead.leadColor !== 'black') {
    const mailer = getMailer();
    if (lead.email) {
      try {
        await mailer.send(leadConfirmation(lead));
      } catch {
        /* nicht blockieren */
      }
    }
    if (env.SALES_INBOX_EMAIL) {
      try {
        await mailer.send(salesNotification(lead, env.SALES_INBOX_EMAIL));
      } catch {
        /* nicht blockieren */
      }
    }
  }

  return { ok: true, leadId: id };
}

// Re-export für sicheres Imports
export { CONSENT_TEXT, CONSENT_TEXT_VERSION };
