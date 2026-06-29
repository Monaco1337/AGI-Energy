'use client';

import { useEffect } from 'react';

/**
 * Liest beim ersten Seitenaufruf UTM-/Referrer-Parameter aus URL und Document-Referrer,
 * speichert sie als HTTP-Cookie (30 Tage) und entfernt die Parameter NICHT aus der URL
 * (damit Browser-Back/Reload-Verhalten konsistent bleibt).
 *
 * Cookie-Namen sind bewusst kurz und namespaced (`agi_`), damit sie nicht mit
 * anderen Tools kollidieren. SameSite=Lax + secure in Production.
 *
 * Sicherheit:
 *   - jede UTM-Eingabe wird auf 60 Zeichen begrenzt und ASCII-sanitised
 *   - Cookie ueberschreibt nur, wenn ein neuer utm_source-Wert gegeben ist
 *     (First-Touch-Strategie: erste Quelle gewinnt fuer 30 Tage)
 */
export default function UtmCookieSetter() {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    try {
      const sp = new URLSearchParams(window.location.search);
      const utmSource = sanitize(sp.get('utm_source'));
      const utmMedium = sanitize(sp.get('utm_medium'));
      const utmCampaign = sanitize(sp.get('utm_campaign'));

      if (!utmSource && !utmMedium && !utmCampaign) {
        // Kein UTM in URL - falls noch kein Cookie existiert, Referrer einmalig
        // als Fallback merken (z. B. aus Google ohne UTM-Tag).
        const hasAny =
          readCookie('agi_utm_source') ||
          readCookie('agi_utm_medium') ||
          readCookie('agi_referrer');
        if (!hasAny && document.referrer) {
          const ref = sanitize(document.referrer);
          if (ref) writeCookie('agi_referrer', ref);
        }
        return;
      }

      // First-Touch: nur setzen, wenn noch keine Quelle vorhanden ist.
      // So bleibt die erste Quelle "Schuldnerin" des Leads, auch wenn der Nutzer
      // spaeter ueber andere Wege wiederkommt.
      if (utmSource && !readCookie('agi_utm_source')) {
        writeCookie('agi_utm_source', utmSource);
      }
      if (utmMedium && !readCookie('agi_utm_medium')) {
        writeCookie('agi_utm_medium', utmMedium);
      }
      if (utmCampaign && !readCookie('agi_utm_campaign')) {
        writeCookie('agi_utm_campaign', utmCampaign);
      }
      if (!readCookie('agi_referrer') && document.referrer) {
        const ref = sanitize(document.referrer);
        if (ref) writeCookie('agi_referrer', ref);
      }
    } catch {
      // Cookies blockiert / Inkognito - egal, dann eben kein Tracking
    }
  }, []);
  return null;
}

function sanitize(raw: string | null | undefined): string | undefined {
  if (!raw) return undefined;
  const cleaned = raw
    .toString()
    .slice(0, 60)
    .replace(/[^a-zA-Z0-9._\-:/?=&%]/g, '')
    .trim();
  return cleaned || undefined;
}

function writeCookie(name: string, value: string) {
  const maxAgeSec = 60 * 60 * 24 * 30; // 30 Tage
  const secure = window.location.protocol === 'https:' ? '; secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSec}; samesite=lax${secure}`;
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  if (!match) return undefined;
  try {
    return decodeURIComponent(match[1]!);
  } catch {
    return undefined;
  }
}
