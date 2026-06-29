import type { LeadPayload } from '@/types/lead';

const REFERRAL_COOKIE_NAME = 'agi_ref';

function readReferralCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${REFERRAL_COOKIE_NAME}=([^;]+)`),
  );
  if (!match) return undefined;
  const raw = decodeURIComponent(match[1]!);
  if (!/^[A-Z0-9]{4,16}$/i.test(raw)) return undefined;
  return raw.toUpperCase();
}

export interface LeadSubmitResult {
  /** Persoenlicher Empfehlungscode des soeben angelegten Leads. */
  referralCode?: string;
  /** ID des Leads (rein informativ; nicht sicherheitskritisch). */
  id?: string;
}

/**
 * Übermittelt einen Landing-Lead an die API. Der Lead wird serverseitig
 * validiert, bewertet (Scoring) und im Storage gespeichert, sodass er im
 * Admin-Cockpit erscheint.
 *
 * Wenn ein Empfehlungscode im Cookie liegt, wird er automatisch mitgesendet.
 * Rueckgabe enthaelt den frisch generierten eigenen Empfehlungscode des Leads,
 * sodass die UI ihn unmittelbar fuer Sharing auf der Danke-Seite anzeigen kann.
 */
export async function submitLandingLead(payload: LeadPayload): Promise<LeadSubmitResult> {
  const referredByCode = readReferralCookie();
  const fullPayload = referredByCode ? { ...payload, referredByCode } : payload;

  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fullPayload),
  });

  if (!res.ok) {
    let message = 'Übermittlung fehlgeschlagen.';
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      // Antwort ohne JSON – Standardmeldung beibehalten.
    }
    throw new Error(message);
  }

  try {
    const data = (await res.json()) as { id?: string; referralCode?: string };
    return { id: data.id, referralCode: data.referralCode };
  } catch {
    return {};
  }
}
