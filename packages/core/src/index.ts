export * from './types';
export * as schemas from './schemas';
export { newId, nowIso, newReferralCode, newUrlToken } from './util/id';
export { sha256, hashIp } from './util/hash';

export const CONSENT_TEXT_VERSION = '2025-01-01';
export const CONSENT_TEXT = {
  contact:
    'Ich bin einverstanden, zur Auswertung meines Energie-Checks kontaktiert zu werden.',
  privacy: 'Ich habe die Datenschutzhinweise gelesen.',
  newsletter:
    'Ich moechte den AGI-Energy-Newsletter mit Tipps zu Strom, Gas und Photovoltaik erhalten und stimme zu, dass meine Anmeldung in einer Bestaetigungsmail bestaetigt wird (Double-Opt-In). Eine Abmeldung ist jederzeit moeglich.',
} as const;
