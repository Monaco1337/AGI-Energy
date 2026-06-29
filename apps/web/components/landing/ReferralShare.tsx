'use client';

import { useState } from 'react';

interface Props {
  /** 8-stelliger Empfehlungscode des Leads. */
  code: string;
  /** Site-URL als absolute Basis fuer Sharing-Links (ohne trailing slash). */
  siteUrl: string;
  /** Vorname zur Personalisierung. Optional. */
  firstName?: string;
}

/**
 * Zeigt den persoenlichen Empfehlungscode + Share-Buttons (WhatsApp, E-Mail, Copy).
 * Eingebettet auf der Danke-Seite, um das Empfehlungssystem ab Lead 1 zu aktivieren.
 */
export default function ReferralShare({ code, siteUrl, firstName }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `${siteUrl}/empfehlung/${code}`;
  const personal = firstName ? ` von ${firstName}` : '';
  const shareTitle = 'AGI Energy: persönlicher Energie-Check';
  const shareText = `Ich habe gerade meinen Energie-Check bei AGI Energy gemacht. Wenn du auch wissen willst, ob bei Strom, Gas oder PV etwas zu holen ist - mit dieser Empfehlung${personal} bekommst du auch eine persönliche Prüfung: ${url}`;

  async function copy() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      /* Browser-Berechtigung verweigert - egal */
    }
  }

  async function nativeShare() {
    if (typeof navigator === 'undefined' || !('share' in navigator)) return false;
    try {
      await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({
        title: shareTitle,
        text: shareText,
        url,
      });
      return true;
    } catch {
      return false;
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText)}`;

  return (
    <div className="rounded-xl3 border border-white/15 bg-white/[0.06] backdrop-blur-md p-6 sm:p-7 text-left">
      <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-warmAmber/90 font-semibold mb-3">
        <span className="size-1.5 rounded-full bg-warmAmber" aria-hidden />
        Empfehlung weitergeben
      </p>
      <h2 className="font-display text-[20px] sm:text-[22px] font-semibold text-softWhite tracking-tight leading-snug">
        Ihr persönlicher Empfehlungscode
      </h2>
      <p className="mt-3 text-[14px] text-softWhite/70 leading-relaxed">
        Wer einen Energie-Check über Ihren Link startet, erhält die gleiche persönliche Prüfung wie Sie.
        Keine automatischen Verträge, keine Werbeanrufe.
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="rounded-elo border border-white/20 bg-white/[0.08] px-4 py-3 font-mono text-[16px] tracking-[0.18em] text-softWhite">
          {code}
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded-elo border border-white/25 bg-white/[0.1] px-4 py-3 text-[13.5px] font-semibold text-softWhite hover:bg-white/[0.15] transition"
          aria-live="polite"
        >
          {copied ? 'Kopiert ✓' : 'Link kopieren'}
        </button>
      </div>

      <p className="mt-4 text-[12.5px] text-softWhite/60 break-all">{url}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-elo bg-[#25D366] px-4 py-2.5 text-[13.5px] font-semibold text-white hover:brightness-110 transition"
        >
          <WhatsAppIcon /> WhatsApp
        </a>
        <a
          href={mailHref}
          className="inline-flex items-center gap-2 rounded-elo border border-white/25 bg-white/[0.08] px-4 py-2.5 text-[13.5px] font-semibold text-softWhite hover:bg-white/[0.12] transition"
        >
          <MailIcon /> E-Mail
        </a>
        <button
          type="button"
          onClick={async () => {
            const ok = await nativeShare();
            if (!ok) copy();
          }}
          className="inline-flex items-center gap-2 rounded-elo border border-white/25 bg-white/[0.08] px-4 py-2.5 text-[13.5px] font-semibold text-softWhite hover:bg-white/[0.12] transition"
        >
          <ShareIcon /> Mehr Optionen
        </button>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.84.508 3.56 1.39 5.04L2 22l5.18-1.36A9.97 9.97 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm5.07 14.13c-.21.59-1.23 1.15-1.71 1.21-.46.06-1.03.08-1.65-.1-.38-.12-.86-.28-1.49-.55-2.62-1.13-4.33-3.77-4.46-3.95-.13-.18-1.06-1.41-1.06-2.69 0-1.28.67-1.91.91-2.17.24-.26.52-.32.7-.32.18 0 .35 0 .51.01.16.01.38-.06.6.46.21.51.73 1.76.79 1.89.06.13.1.28.02.46-.08.18-.12.29-.23.45-.11.16-.24.36-.35.49-.12.13-.24.27-.1.53.13.26.59.97 1.26 1.57.86.77 1.59.99 1.85 1.11.26.12.41.1.56-.06.15-.16.65-.76.83-1.02.18-.26.36-.21.6-.13.24.08 1.49.7 1.74.83.25.13.42.19.48.3.06.11.06.65-.15 1.24z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <path d="M16 6l-4-4-4 4" />
      <path d="M12 2v14" />
    </svg>
  );
}
