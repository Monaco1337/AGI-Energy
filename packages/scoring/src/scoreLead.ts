import type { LeadFunnelInput, ScoreReason, ScoreResult } from '@elo/core';
import { colorForScore, BLOCKED_MAPPING } from './color';
import { buildRecommendedAction } from './recommendedAction';

export interface ScoreContext {
  // Hinweis auf vermutete Spam-/Bot-Indikatoren (z.B. Honeypot ausgefüllt, zu schnelles Submit)
  spamSignal?: boolean;
  // Wegwerf-Mail-Domain o.ä.
  invalidContact?: boolean;
}

interface Rule {
  code: string;
  label: string;
  delta: number;
  applies: (i: LeadFunnelInput) => boolean;
}

const RULES: Rule[] = [
  {
    code: 'pv_interest',
    label: 'Photovoltaik-Interesse erkannt',
    delta: 25,
    applies: (i) => i.interests.includes('photovoltaik'),
  },
  {
    code: 'home_owner',
    label: 'Hauseigentümer mit potenzieller Dachfläche',
    delta: 30,
    applies: (i) => i.customerType === 'home_owner' || i.ownsProperty === 'yes',
  },
  {
    code: 'business',
    label: 'Gewerbekunde',
    delta: 35,
    applies: (i) => i.customerType === 'business',
  },
  {
    code: 'landlord',
    label: 'Vermieter oder Immobilienbesitzer',
    delta: 25,
    applies: (i) => i.customerType === 'landlord' || i.ownsProperty === 'rental_property',
  },
  {
    code: 'strom_gas_combo',
    label: 'Strom und Gas kombiniert',
    delta: 20,
    applies: (i) => i.interests.includes('strom_gas'),
  },
  {
    code: 'invoice_upload',
    label: 'Rechnung wird hochgeladen',
    delta: 35,
    applies: (i) => i.hasInvoice === 'upload_now',
  },
  {
    code: 'invoice_later',
    label: 'Rechnung wird nachgereicht',
    delta: 15,
    applies: (i) => i.hasInvoice === 'later',
  },
  {
    code: 'urgency_immediate',
    label: 'Schnelle Wechselabsicht',
    delta: 30,
    applies: (i) => i.urgency === 'immediate',
  },
  {
    code: 'urgency_weeks',
    label: 'Entscheidung in den nächsten Wochen',
    delta: 20,
    applies: (i) => i.urgency === 'weeks',
  },
  {
    code: 'urgency_information',
    label: 'Nur Informationsphase',
    delta: -15,
    applies: (i) => i.urgency === 'information',
  },
  {
    code: 'cost_over_400',
    label: 'Sehr hohe monatliche Energiekosten',
    delta: 35,
    applies: (i) => i.monthlyEnergyCosts === 'over_400',
  },
  {
    code: 'cost_200_400',
    label: 'Hohe monatliche Energiekosten',
    delta: 25,
    applies: (i) => i.monthlyEnergyCosts === '200_400',
  },
  {
    code: 'cost_100_200',
    label: 'Mittlere monatliche Energiekosten',
    delta: 10,
    applies: (i) => i.monthlyEnergyCosts === '100_200',
  },
  {
    code: 'phone_present',
    label: 'Telefonnummer vorhanden',
    delta: 20,
    applies: (i) => Boolean(i.phone),
  },
  {
    code: 'prefers_phone',
    label: 'Telefonische Kontaktaufnahme bevorzugt',
    delta: 20,
    applies: (i) =>
      i.contactPreference === 'phone' || i.contactPreference === 'whatsapp',
  },
  {
    code: 'email_only',
    label: 'Nur E-Mail-Kontakt',
    delta: -5,
    applies: (i) => i.contactPreference === 'email' && !i.phone,
  },
  {
    code: 'postal_code',
    label: 'Postleitzahl vorhanden',
    delta: 10,
    applies: (i) => /^\d{5}$/.test(i.postalCode ?? ''),
  },
];

function isIncomplete(input: LeadFunnelInput): boolean {
  const missing = [
    !input.firstName,
    !input.lastName,
    !input.postalCode,
    !input.phone && !input.email,
    input.urgency === 'unknown',
    input.monthlyEnergyCosts === 'unknown',
  ].filter(Boolean).length;
  return missing >= 2;
}

export function scoreLead(input: LeadFunnelInput, ctx: ScoreContext = {}): ScoreResult {
  // Hard-Overrides
  if (input.legalBasis === 'unknown_blocked') {
    return {
      score: 0,
      ...BLOCKED_MAPPING,
      reasons: [{ code: 'legal_blocked', label: 'Rechtsgrundlage unklar – gesperrt', delta: 0 }],
    };
  }
  if (ctx.spamSignal || ctx.invalidContact) {
    return {
      score: 0,
      ...BLOCKED_MAPPING,
      reasons: [
        ctx.spamSignal
          ? { code: 'spam_signal', label: 'Spam-Indikator (Honeypot/Submit-Zeit)', delta: 0 }
          : { code: 'invalid_contact', label: 'Ungültige Kontaktdaten', delta: 0 },
      ],
    };
  }

  const reasons: ScoreReason[] = [];
  let score = 0;
  for (const rule of RULES) {
    if (rule.applies(input)) {
      score += rule.delta;
      reasons.push({ code: rule.code, label: rule.label, delta: rule.delta });
    }
  }

  if (isIncomplete(input)) {
    score -= 20;
    reasons.push({ code: 'incomplete', label: 'Wichtige Angaben fehlen', delta: -20 });
  }

  // Clamp 0..120
  score = Math.max(0, Math.min(120, score));

  const mapping = colorForScore(score);
  const recommendedAction = buildRecommendedAction({
    input,
    color: mapping.color,
    reasons: reasons.filter((r) => r.delta > 0).map((r) => r.label.toLowerCase()),
  });

  return {
    score,
    color: mapping.color,
    label: mapping.label,
    reasons,
    recommendedAction,
  };
}
