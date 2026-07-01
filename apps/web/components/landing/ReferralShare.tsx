'use client';

import { useState } from 'react';

interface Props {
  /** Empfehlungscode des Leads (ohne Leerzeichen, serverseitig erzeugt). */
  code: string;
  /** Site-URL als absolute Basis für den Empfehlungslink (ohne trailing slash). */
  siteUrl: string;
}

type Copied = 'idle' | 'url' | 'code';

/**
 * Seriöse Empfehlungskarte auf der Danke-Seite.
 * Teilt ausschließlich den Empfehlungscode und den Empfehlungslink –
 * niemals personenbezogene Lead-Daten. Kein WhatsApp-Sharing.
 */
export default function ReferralShare({ code, siteUrl }: Props) {
  const [copied, setCopied] = useState<Copied>('idle');
  const [status, setStatus] = useState('');

  const url = `${siteUrl.replace(/\/$/, '')}/empfehlung/${code}`;
  const grouped = code.replace(/(.{4})(?=.)/g, '$1\u2009').trim();

  const announce = (msg: string, which: Copied) => {
    setCopied(which);
    setStatus(msg);
    window.setTimeout(() => {
      setCopied('idle');
      setStatus('');
    }, 2500);
  };

  async function copy(value: string, msg: string, which: Copied) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        announce(msg, which);
      }
    } catch {
      /* Clipboard-Berechtigung verweigert – kein Blocker. */
    }
  }

  const mailSubject = 'Persönliche Empfehlung für AGI Energy';
  const mailBody = `Ich möchte dir AGI Energy empfehlen. Über diesen Link kannst du eine persönliche Energieprüfung starten:\n\n${url}\n\nMein Empfehlungscode: ${code}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  async function moreOptions() {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({
          title: 'AGI Energy Empfehlung',
          text: 'Persönliche Energieprüfung bei AGI Energy starten.',
          url,
        });
        return;
      } catch {
        /* abgebrochen oder nicht unterstützt → Fallback */
      }
    }
    await copy(url, 'Link kopiert', 'url');
  }

  return (
    <div className="rounded-xl3 border border-white/15 bg-white/[0.06] backdrop-blur-md p-6 sm:p-8 text-left">
      <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-warmAmber/90 font-semibold mb-3">
        <span className="size-1.5 rounded-full bg-warmAmber" aria-hidden />
        Empfehlungscode
      </p>
      <h2 className="font-display text-[20px] sm:text-[22px] font-semibold text-softWhite tracking-tight leading-snug">
        Ihr persönlicher Empfehlungscode
      </h2>
      <p className="mt-3 text-[14px] text-softWhite/70 leading-relaxed">
        Wenn Sie AGI Energy weiterempfehlen möchten, können Sie Ihren persönlichen Empfehlungscode oder
        den Empfehlungslink weitergeben. Jede Person, die über Ihren Link einen Energie-Check startet,
        erhält ebenfalls eine persönliche Prüfung.
      </p>
      <p className="mt-2 text-[13px] text-softWhite/55 leading-relaxed">
        Eine Kontaktaufnahme erfolgt nur auf Grundlage der übermittelten Anfrage und der erteilten
        Einwilligungen.
      </p>

      {/* Code-Feld – Anzeige gruppiert, Copy nutzt den echten Code ohne Leerzeichen */}
      <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto] sm:items-stretch">
        <button
          type="button"
          onClick={() => copy(code, 'Code kopiert', 'code')}
          title="Empfehlungscode kopieren"
          className="rounded-elo border border-white/20 bg-white/[0.08] px-4 py-3 text-left font-mono text-[17px] tracking-[0.12em] text-softWhite hover:bg-white/[0.12] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {grouped}
          <span className="ml-2 align-middle text-[11px] font-sans tracking-normal text-softWhite/50">
            {copied === 'code' ? 'kopiert ✓' : 'kopieren'}
          </span>
        </button>
        <button
          type="button"
          onClick={() => copy(url, 'Link kopiert', 'url')}
          className="rounded-elo border border-white/25 bg-white/[0.1] px-4 py-3 text-[13.5px] font-semibold text-softWhite hover:bg-white/[0.16] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {copied === 'url' ? 'Kopiert ✓' : 'Link kopieren'}
        </button>
      </div>

      <p className="mt-3 text-[12.5px] text-softWhite/55 break-all">{url}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={mailHref}
          className="inline-flex items-center gap-2 rounded-elo border border-white/25 bg-white/[0.08] px-4 py-2.5 text-[13.5px] font-semibold text-softWhite hover:bg-white/[0.12] transition"
        >
          <MailIcon /> Per E-Mail teilen
        </a>
        <button
          type="button"
          onClick={moreOptions}
          className="inline-flex items-center gap-2 rounded-elo border border-white/25 bg-white/[0.08] px-4 py-2.5 text-[13.5px] font-semibold text-softWhite hover:bg-white/[0.12] transition"
        >
          <ShareIcon /> Weitere Optionen
        </button>
      </div>

      {/* Barrierefreie Rückmeldung ohne störendes Popup */}
      <p aria-live="polite" className="sr-only" role="status">
        {status}
      </p>
    </div>
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
