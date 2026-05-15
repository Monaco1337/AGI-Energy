import type { LeadFunnelInput, LeadColor } from '@elo/core';

interface BuildArgs {
  input: LeadFunnelInput;
  color: LeadColor;
  reasons: string[];
}

const labels: Record<string, string> = {
  home_owner: 'Eigentümer',
  business: 'Gewerbekunde',
  landlord: 'Vermieter',
  private: 'Privatkunde',
  unknown: 'Kunde',
};

export function buildRecommendedAction({ input, color, reasons }: BuildArgs): string {
  if (color === 'black') {
    return 'Nicht kontaktieren. Rechtsgrundlage fehlt oder Eingabe wirkt unzulässig.';
  }

  const who = labels[input.customerType] ?? 'Kunde';
  const interestParts: string[] = [];
  if (input.interests.includes('photovoltaik')) interestParts.push('Photovoltaik');
  if (input.interests.includes('strom_gas')) interestParts.push('Strom und Gas');
  else {
    if (input.interests.includes('strom')) interestParts.push('Strom');
    if (input.interests.includes('gas')) interestParts.push('Gas');
  }
  const interests = interestParts.length > 0 ? interestParts.join(' und ') : 'Energie allgemein';

  if (color === 'red') {
    return `Innerhalb von 15 Minuten anrufen. ${who} mit Interesse an ${interests}, ${reasonsHint(reasons)}.`;
  }
  if (color === 'orange') {
    return `Heute kontaktieren. ${who} mit Interesse an ${interests}, ${reasonsHint(reasons)}.`;
  }
  if (color === 'yellow') {
    return `Beratung vorbereiten. ${who} mit Interesse an ${interests}.`;
  }
  if (color === 'blue') {
    return `Erst per E-Mail informieren. ${who} befindet sich noch in der Informationsphase.`;
  }
  return `Nicht priorisieren. Es fehlen wichtige Angaben (z.B. Telefon, Dringlichkeit oder Verbrauch).`;
}

function reasonsHint(reasons: string[]): string {
  if (reasons.length === 0) return 'mehrere positive Signale';
  return reasons.slice(0, 3).join(', ');
}
