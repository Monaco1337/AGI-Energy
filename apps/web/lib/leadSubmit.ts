import type { LeadPayload } from '@/types/lead';

const REFERRAL_COOKIE_NAME = 'agi_ref';

function readCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return undefined;
  try {
    return decodeURIComponent(match[1]!);
  } catch {
    return undefined;
  }
}

function readReferralCookie(): string | undefined {
  const raw = readCookie(REFERRAL_COOKIE_NAME);
  if (!raw) return undefined;
  if (!/^[A-Z0-9]{4,16}$/i.test(raw)) return undefined;
  return raw.toUpperCase();
}

function readUtmCookies(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  referrer?: string;
} {
  return {
    utmSource: readCookie('agi_utm_source'),
    utmMedium: readCookie('agi_utm_medium'),
    utmCampaign: readCookie('agi_utm_campaign'),
    referrer: readCookie('agi_referrer'),
  };
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
  const utm = readUtmCookies();
  const fullPayload: LeadPayload = {
    ...payload,
    ...(referredByCode ? { referredByCode } : {}),
    ...(utm.utmSource ? { utmSource: utm.utmSource } : {}),
    ...(utm.utmMedium ? { utmMedium: utm.utmMedium } : {}),
    ...(utm.utmCampaign ? { utmCampaign: utm.utmCampaign } : {}),
    ...(utm.referrer ? { referrer: utm.referrer } : {}),
  };

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
