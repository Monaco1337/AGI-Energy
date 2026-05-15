// Sehr leichte Personalisierung. Keine externen APIs.
// Audience aus URL-Param "for", UTM-Source/-Campaign, oder Default.

import type { AudienceKey } from '@elo/core';

export interface PersonalizationInput {
  for?: string | null;
  utm_source?: string | null;
  utm_campaign?: string | null;
  postalCodePrefix?: string | null;
}

export interface PersonalizationResult {
  audience: AudienceKey;
  heroHeadline: string;
  heroSubline: string;
  primaryCta: string;
  secondaryCta: string;
}

const FALLBACK: PersonalizationResult = {
  audience: 'unknown',
  heroHeadline:
    'Prüfen Sie kostenlos, ob Sie bei Strom, Gas oder Photovoltaik sparen können.',
  heroSubline:
    'Einfacher Energie-Check für Haushalte, Eigentümer und Unternehmen in Deutschland. Verständlich, unverbindlich und persönlich geprüft.',
  primaryCta: 'Kostenlosen Energie-Check starten',
  secondaryCta: 'Kostenloser Energietrick',
};

const MAP: Record<AudienceKey, Partial<PersonalizationResult>> = {
  private: {
    heroHeadline: 'Prüfen Sie kostenlos, ob sich ein Wechsel bei Strom oder Gas für Sie lohnt.',
    heroSubline:
      'Einfacher Energie-Check für Privathaushalte. Verständlich, unverbindlich und ohne Werbedruck.',
  },
  home_owner: {
    heroHeadline: 'Energiekosten senken, Photovoltaik prüfen – als Eigentümer mit klarem Vorteil.',
    heroSubline:
      'Persönliche Einschätzung für Ihr Haus. Wir prüfen, ob Strom-, Gas- oder PV-Optimierung wirtschaftlich sinnvoll ist.',
  },
  business: {
    heroHeadline: 'Geschäftliche Energiekosten verständlich prüfen lassen.',
    heroSubline:
      'Energie-Check für Gewerbe und Mittelstand. Wir bewerten Strom, Gas und PV-Potenziale für Ihren Standort.',
    primaryCta: 'Geschäftlichen Energie-Check starten',
  },
  landlord: {
    heroHeadline: 'Strom, Gas und PV-Potenziale für Ihre Immobilien prüfen.',
    heroSubline: 'Persönliche Auswertung für Vermieter und Verwaltungen.',
  },
  unknown: {},
};

export function personalize(input: PersonalizationInput): PersonalizationResult {
  const aud = detectAudience(input);
  const partial = MAP[aud];
  return { ...FALLBACK, audience: aud, ...partial };
}

function detectAudience(i: PersonalizationInput): AudienceKey {
  const f = (i.for ?? '').toLowerCase();
  if (['privat', 'private', 'haushalt'].includes(f)) return 'private';
  if (['eigentuemer', 'eigentümer', 'home_owner', 'haus'].includes(f)) return 'home_owner';
  if (['gewerbe', 'business', 'b2b'].includes(f)) return 'business';
  if (['vermieter', 'landlord'].includes(f)) return 'landlord';

  const camp = (i.utm_campaign ?? '').toLowerCase();
  if (camp.includes('gewerbe') || camp.includes('b2b')) return 'business';
  if (camp.includes('eigentum') || camp.includes('owner')) return 'home_owner';
  if (camp.includes('vermiet') || camp.includes('landlord')) return 'landlord';
  return 'unknown';
}
