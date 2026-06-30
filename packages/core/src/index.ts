export * from './types';
export * as schemas from './schemas';
export { newId, nowIso, newReferralCode, newUrlToken } from './util/id';
export { sha256, hashIp } from './util/hash';

export const CONSENT_TEXT_VERSION = 'agi-energy-consent-v1';
export const PRIVACY_POLICY_VERSION = 'agi-energy-privacy-v1';
export const CONSENT_TEXT = {
  privacy:
    'Ich habe die Datenschutzerklärung gelesen und bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage zur persönlichen Energieprüfung verarbeitet werden. Mir ist bekannt, dass ich zur Bearbeitung meiner Anfrage per Telefon oder E-Mail kontaktiert werden kann.',
  whatsapp:
    'Ich bin damit einverstanden, dass AGI Energy mich zur Bearbeitung meiner Anfrage auch per WhatsApp kontaktieren darf. Mir ist bekannt, dass hierbei meine Telefonnummer, Nachrichteninhalte und Kommunikationsdaten verarbeitet werden können und dass ich diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen kann.',
  partnerForwarding:
    'Ich bin damit einverstanden, dass meine Anfrage und die von mir angegebenen Kontaktdaten zur Bearbeitung meiner Energieprüfung an berechtigte Ansprechpartner oder Partner im Bereich Strom, Gas, Photovoltaik oder Gewerbeenergie weitergeleitet werden dürfen. Die Weitergabe erfolgt ausschließlich zur Bearbeitung meiner Anfrage.',
  newsletter:
    'Ich moechte den AGI-Energy-Newsletter mit Tipps zu Strom, Gas und Photovoltaik erhalten und stimme zu, dass meine Anmeldung in einer Bestaetigungsmail bestaetigt wird (Double-Opt-In). Eine Abmeldung ist jederzeit moeglich.',
} as const;
