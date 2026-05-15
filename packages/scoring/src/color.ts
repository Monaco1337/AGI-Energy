import type { LeadColor } from '@elo/core';

export interface ColorMapping {
  color: LeadColor;
  label: string;
  recommendedAction: string;
}

export function colorForScore(score: number): ColorMapping {
  if (score >= 90) {
    return {
      color: 'red',
      label: 'Sofort-Abschluss möglich',
      recommendedAction: 'Innerhalb von 15 Minuten anrufen',
    };
  }
  if (score >= 70) {
    return {
      color: 'orange',
      label: 'Sehr heißer Lead',
      recommendedAction: 'Heute kontaktieren',
    };
  }
  if (score >= 50) {
    return {
      color: 'yellow',
      label: 'Warmer Lead',
      recommendedAction: 'Beratung vorbereiten',
    };
  }
  if (score >= 25) {
    return {
      color: 'blue',
      label: 'Informationsphase',
      recommendedAction: 'Automatisches Nachfassen oder E-Mail',
    };
  }
  return {
    color: 'gray',
    label: 'Niedrige Priorität',
    recommendedAction: 'Nicht priorisieren',
  };
}

export const BLOCKED_MAPPING: ColorMapping = {
  color: 'black',
  label: 'Ausschließen',
  recommendedAction: 'Nicht kontaktieren',
};
