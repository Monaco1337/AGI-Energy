import { describe, it, expect } from 'vitest';
import { scoreLead } from './scoreLead';
import type { LeadFunnelInput } from '@elo/core';

const base: LeadFunnelInput = {
  source: 'website',
  customerType: 'private',
  interests: ['strom'],
  urgency: 'information',
  hasInvoice: 'no',
  monthlyEnergyCosts: 'unknown',
  ownsProperty: 'unknown',
  firstName: 'Max',
  lastName: 'Mustermann',
  postalCode: '10115',
  legalBasis: 'consent',
};

describe('scoreLead', () => {
  it('blockt bei legalBasis=unknown_blocked', () => {
    const r = scoreLead({ ...base, legalBasis: 'unknown_blocked' });
    expect(r.color).toBe('black');
    expect(r.score).toBe(0);
  });

  it('blockt bei Spam-Signal', () => {
    const r = scoreLead(base, { spamSignal: true });
    expect(r.color).toBe('black');
  });

  it('vergibt grau bei sehr wenig Information', () => {
    const r = scoreLead(base);
    expect(['gray', 'blue']).toContain(r.color);
  });

  it('rot bei Eigentümer + PV + sofort + hohe Kosten + Telefon', () => {
    const r = scoreLead({
      ...base,
      customerType: 'home_owner',
      ownsProperty: 'yes',
      interests: ['photovoltaik'],
      urgency: 'immediate',
      monthlyEnergyCosts: 'over_400',
      hasInvoice: 'upload_now',
      phone: '+49 30 1234567',
      contactPreference: 'phone',
    });
    expect(r.color).toBe('red');
    expect(r.score).toBeGreaterThanOrEqual(90);
    expect(r.reasons.some((x) => x.code === 'pv_interest')).toBe(true);
  });

  it('orange bei Gewerbe mit hohen Kosten und Wochen-Dringlichkeit', () => {
    const r = scoreLead({
      ...base,
      customerType: 'business',
      interests: ['strom_gas'],
      urgency: 'weeks',
      monthlyEnergyCosts: '200_400',
      phone: '+49 30 1234567',
    });
    expect(['orange', 'red']).toContain(r.color);
  });

  it('zieht Punkte bei reinem E-Mail-Kontakt ohne Telefon', () => {
    const r = scoreLead({
      ...base,
      contactPreference: 'email',
      email: 'a@b.de',
    });
    expect(r.reasons.some((x) => x.code === 'email_only')).toBe(true);
  });

  it('clamped Score auf maximal 120', () => {
    const r = scoreLead({
      ...base,
      customerType: 'business',
      interests: ['photovoltaik', 'strom_gas'],
      urgency: 'immediate',
      monthlyEnergyCosts: 'over_400',
      hasInvoice: 'upload_now',
      ownsProperty: 'yes',
      phone: '+49 30 1234567',
      contactPreference: 'phone',
    });
    expect(r.score).toBeLessThanOrEqual(120);
  });
});
