'use client';

import { useEffect } from 'react';

const COOKIE_NAME = 'agi_ref';
const COOKIE_MAX_AGE_DAYS = 30;

/**
 * Setzt einen Cookie mit dem Empfehlungscode, sobald die Komponente gemounted ist.
 * Der Code wird beim naechsten Form-Submit aus dem Cookie gelesen und an den
 * Server geschickt, sodass der Lead korrekt als Empfehlung kategorisiert wird.
 */
export function ReferralCookieSetter({ code }: { code: string }) {
  useEffect(() => {
    const expires = new Date(Date.now() + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
    document.cookie =
      `${COOKIE_NAME}=${encodeURIComponent(code)};` +
      ` expires=${expires.toUTCString()};` +
      ` path=/;` +
      ` SameSite=Lax`;
  }, [code]);

  return null;
}

export const REFERRAL_COOKIE_NAME = COOKIE_NAME;
