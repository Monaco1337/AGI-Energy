export * from './types';
export * as schemas from './schemas';
export { newId, nowIso, newReferralCode } from './util/id';
export { sha256, hashIp } from './util/hash';

export const CONSENT_TEXT_VERSION = '2025-01-01';
export const CONSENT_TEXT = {
  contact:
    'Ich bin einverstanden, zur Auswertung meines Energie-Checks kontaktiert zu werden.',
  privacy: 'Ich habe die Datenschutzhinweise gelesen.',
} as const;
