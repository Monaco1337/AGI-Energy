'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const COOKIE = 'elo_consent';
const VERSION = '2025-01-01';

function read(): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`));
  return m ? decodeURIComponent(m.split('=')[1] ?? '') : null;
}

function write(value: string) {
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE}=${encodeURIComponent(value)}; max-age=${oneYear}; path=/; samesite=lax`;
}

export function ConsentBanner() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin') ?? false;

  useEffect(() => {
    const v = read();
    if (!v || !v.startsWith(VERSION)) setShow(true);
  }, []);

  // Solange der Consent-Dialog offen ist, Scrollen der Seite sperren –
  // der Besucher muss zuerst bestätigen.
  useEffect(() => {
    if (show && !isAdmin) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [show, isAdmin]);

  // Admin-Bereich ist ein internes Tool – kein Besucher-Consent-Banner.
  if (isAdmin) return null;
  if (!show) return null;

  const accept = () => {
    write(`${VERSION}|essential`);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
    >
      {/* Backdrop – blockiert die Seite bis zur Bestätigung */}
      <div className="absolute inset-0 bg-navy/75 backdrop-blur-[6px]" aria-hidden />

      {/* Dialog-Karte */}
      <div
        className="relative w-full max-w-[34rem] rounded-eloLg border border-borderLight bg-card shadow-premium p-5 sm:p-7 animate-[consent-in_.28s_cubic-bezier(0.16,1,0.3,1)]"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}
      >
        <div className="flex items-start gap-4">
          <span className="hidden sm:flex shrink-0 size-12 items-center justify-center rounded-elo bg-gradient-to-br from-energyGreen/15 to-premiumBlue/15 text-premiumBlue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
              <path d="M9.2 12.2l2 2 3.6-3.8" />
            </svg>
          </span>
          <div className="min-w-0">
            <h2
              id="consent-title"
              className="font-display text-[18px] sm:text-[20px] font-semibold tracking-[-0.01em] text-navy"
            >
              Datenschutz &amp; Cookies
            </h2>
            <p
              id="consent-desc"
              className="mt-2 text-[13.5px] sm:text-[14px] text-slate leading-relaxed"
            >
              Diese Seite verwendet ausschließlich technisch notwendige Cookies – keine externen
              Marketing-Tracker und kein Tracking zu Werbezwecken. Mit „Akzeptieren" bestätigen Sie
              die Nutzung. Details finden Sie in den{' '}
              <a
                href="/datenschutz"
                className="text-premiumBlue font-medium underline underline-offset-4"
              >
                Datenschutzhinweisen
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <a
            href="/datenschutz"
            className="inline-flex h-12 sm:h-11 items-center justify-center rounded-elo border border-borderLight px-5 text-[14px] font-medium text-navy transition-colors hover:bg-paper2"
          >
            Mehr erfahren
          </a>
          <button
            type="button"
            autoFocus
            onClick={accept}
            className="inline-flex h-12 sm:h-11 items-center justify-center rounded-elo bg-gradient-to-br from-energyGreen to-premiumBlue px-7 text-[15px] font-semibold text-white shadow-lift transition hover:shadow-premium active:scale-[0.99]"
          >
            Akzeptieren
          </button>
        </div>
      </div>

      <style>{`@keyframes consent-in{from{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
