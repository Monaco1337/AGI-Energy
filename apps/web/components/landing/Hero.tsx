import Link from 'next/link';
import { Button } from '@elo/ui';
import type { PersonalizationResult } from '@/lib/personalize';
import { HeroInstantPanel } from './HeroInstantPanel';

interface HeroProps {
  p: PersonalizationResult;
  /** z. B. ?trick=1 oder ?fromInvoice=1 – scrollt zum Sofort-Panel */
  initialTrickOpen?: boolean;
}

export function Hero({ p, initialTrickOpen }: HeroProps) {
  return (
    <section className="hero-grain relative">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 pt-14 lg:pt-20 pb-20 lg:pb-28 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7 lg:pt-4">
          <p className="inline-flex items-center gap-2 text-[12.5px] uppercase tracking-[0.18em] text-sage font-medium mb-6">
            <span className="size-1.5 rounded-full bg-sage" aria-hidden />
            AGI Energy · persönliche Energieprüfung
          </p>
          <h1 className="font-display text-[34px] sm:text-[46px] lg:text-[60px] leading-[1.02] tracking-[-0.015em] text-ink">
            {p.heroHeadline}
          </h1>
          <p className="mt-6 text-[17px] sm:text-[19px] text-ink2 max-w-2xl leading-relaxed">
            {p.heroSubline}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row sm:items-stretch gap-3 sm:gap-4">
            <Link href="/energiecheck" className="sm:flex-none sm:min-w-[220px]">
              <Button variant="primary" size="xl" fullWidth>
                {p.primaryCta}
              </Button>
            </Link>
            <a
              href="#hero-energietrick"
              className="group inline-flex flex-col justify-center rounded-elo border border-line bg-card/60 hover:bg-card hover:border-lineStrong px-4 py-3 sm:py-3.5 transition-colors shadow-sm"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-sage font-medium">Energietrick</span>
              <span className="mt-1 text-[15px] font-semibold text-ink leading-snug group-hover:text-sage2 transition-colors">
                {p.secondaryCta}
              </span>
              <span className="mt-0.5 text-[12.5px] text-muted">
                Rechnung oder Dachfotos → sofortige Ersteinschätzung
              </span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> Dateien bleiben lokal bis zum Check
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> Keine Anmeldung für die Vorschau
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon /> Persönlich geprüft im nächsten Schritt
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-eloLg bg-paper2/70 border border-line"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 -translate-x-2 translate-y-1.5 rounded-eloLg bg-card/60 border border-line"
          />

          <HeroInstantPanel initialTrickOpen={initialTrickOpen} />

          <p className="mt-4 text-[12.5px] text-muted leading-relaxed">
            Die Sofort-Einordnung ersetzt keine Vertragsanalyse. Verbindliche Bewertung folgt im kostenlosen
            Energie-Check.
          </p>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="text-sage shrink-0"
    >
      <path
        d="M2.5 7.5L5.5 10.5L11.5 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
