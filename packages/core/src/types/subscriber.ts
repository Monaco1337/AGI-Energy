/**
 * Newsletter-Abonnent mit Double-Opt-In nach DSGVO/UWG.
 * Status-Lifecycle:
 *   pending     - DOI-Mail wurde versandt, noch nicht bestaetigt
 *   confirmed   - DOI bestaetigt, darf angeschrieben werden
 *   unsubscribed - hat sich abgemeldet
 *   bounced     - Mail wurde nicht zugestellt
 */
export type SubscriberStatus = 'pending' | 'confirmed' | 'unsubscribed' | 'bounced';

export interface Subscriber {
  id: string;
  email: string;
  /** Optional, vom Eingabeformular. */
  firstName?: string;
  postalCode?: string;
  status: SubscriberStatus;
  createdAt: string;
  /** Zeitpunkt der DOI-Bestaetigung. */
  confirmedAt?: string;
  /** Zeitpunkt der Abmeldung. */
  unsubscribedAt?: string;
  /** Pseudonymer Bestaetigungstoken (URL-sicher). */
  confirmToken: string;
  /** Pseudonymer Abmeldetoken (URL-sicher). Auch in der Versandmail. */
  unsubscribeToken: string;
  /** Quelle, woher die Anmeldung kam. */
  source?: string;
  /** Gehashte IP zur Beweis-Sicherung (DSGVO Art. 7). */
  ipHash?: string;
  /** Welche Variante des Einwilligungstexts (Versionierung). */
  consentTextVersion?: string;
}
