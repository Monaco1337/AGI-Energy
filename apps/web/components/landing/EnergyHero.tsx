'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@elo/ui';
import { energyLandingContent } from '@/data/energyLandingContent';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';
import type { LeadCategory } from '@/types/lead';
import { EnergyLeadForm } from './EnergyLeadForm';

interface EnergyHeroProps {
  headline: string;
  subline: string;
  defaultCategory?: LeadCategory | null;
  emphasizeForm?: boolean;
}

/** Trust-Line: setzt die · Separatoren in Warm-Amber für ruhige Rhythmik. */
function renderTrustLine(line: string): React.ReactNode {
  const parts = line.split(/\s*·\s*/);
  return parts.map((p, i) => (
    <React.Fragment key={p}>
      {p}
      {i < parts.length - 1 && (
        <span className="mx-2.5 text-warmAmber/80" aria-hidden>
          ·
        </span>
      )}
    </React.Fragment>
  ));
}

export function EnergyHero({ headline, subline, defaultCategory, emphasizeForm }: EnergyHeroProps) {
  const h = energyLandingContent.hero;

  React.useEffect(() => {
    if (!emphasizeForm) return;
    const t = window.setTimeout(() => {
      scrollToEnergyForm();
    }, 400);
    return () => window.clearTimeout(t);
  }, [emphasizeForm]);

  return (
    <section className="relative isolate overflow-hidden bg-black min-h-[720px] lg:min-h-[820px]">
      {/* Premium Hintergrundbild – 0 % Bildbearbeitung, native Schärfe */}
      <Image
        src="/hero/premium-night.png"
        alt=""
        fill
        priority
        quality={100}
        unoptimized
        sizes="100vw"
        className="object-cover object-center -z-20 select-none pointer-events-none [image-rendering:high-quality]"
      />

      {/* Minimal: zarter Übergang zur Glas-Navbar oben und zur Trust-Bar unten */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 -z-10 hero-fade-top" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 -z-10 hero-fade-bottom" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8 pt-28 sm:pt-32 pb-24 lg:pt-44 lg:pb-32">
        <div className="grid gap-14 lg:gap-20 lg:grid-cols-12 lg:items-start">
          {/* Linke Spalte – Headline & Vertrauen */}
          <div className="lg:col-span-6 lg:pt-2 space-y-7 agi-fade-up">
            <div className="space-y-2.5">
              <p className="text-[11.5px] sm:text-[12px] font-semibold tracking-[0.26em] text-warmAmber uppercase text-hero-trust">
                {h.eyebrow}
              </p>
              <p className="flex items-center gap-3 text-[11.5px] sm:text-[12px] font-semibold tracking-[0.28em] text-softWhite uppercase text-hero-trust">
                <span
                  aria-hidden
                  className="h-px w-10 bg-gradient-to-r from-warmAmber/80 to-transparent"
                />
                <span className="inline-flex items-center">
                  {h.eyebrowCategories.split(/\s*·\s*/).map((part, i, arr) => (
                    <React.Fragment key={part}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="mx-2.5 text-warmAmber" aria-hidden>
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </span>
              </p>
            </div>

            <h1 className="font-display text-[38px] sm:text-[50px] lg:text-[62px] font-semibold leading-[1.03] tracking-[-0.022em] text-softWhite text-hero-display">
              {headline}
            </h1>

            <p className="text-[16.5px] sm:text-[17.5px] lg:text-[18.5px] text-softWhite leading-[1.65] max-w-xl font-light text-hero-body">
              {subline}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-3">
              <Button
                type="button"
                variant="primary"
                size="xl"
                className="sm:w-auto"
                onClick={scrollToEnergyForm}
              >
                {h.ctaPrimary}
                <span aria-hidden className="ml-1 text-white/80">→</span>
              </Button>
              <button
                type="button"
                aria-label="Zum Abschnitt: Ablauf der persönlichen Energieprüfung"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('ablauf');
                  if (!el) return;
                  const headerOffset = window.matchMedia('(min-width: 640px)').matches ? 88 : 80;
                  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
                  window.scrollTo({ top, behavior: 'smooth' });
                  if (history.replaceState) {
                    history.replaceState(null, '', '#ablauf');
                  }
                }}
                className="group inline-flex items-center gap-2 text-[15px] sm:text-[15.5px] font-medium text-softWhite hover:text-cyan transition-colors px-2 py-3 text-hero-fine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-sm"
              >
                <span className="border-b border-softWhite/35 group-hover:border-cyan transition-colors pb-1 whitespace-nowrap">
                  {h.ctaSecondary}
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path
                    d="M2.5 5L7 9.5L11.5 5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div
              className="h-px w-full max-w-md bg-gradient-to-r from-white/30 via-white/10 to-transparent mt-1"
              aria-hidden
            />

            <p className="text-[14.5px] sm:text-[15px] font-medium text-softWhite max-w-lg leading-[1.65] text-hero-trust">
              {renderTrustLine(h.trustLine)}
            </p>
          </div>

          {/* Rechte Spalte – Upload-Card */}
          <div className="lg:col-span-6">
            <div className="relative">
              {/* Aura hinter der Card – holt sie aus dem Bild heraus, ohne das Bild zu dimmen */}
              <div
                className="pointer-events-none absolute -inset-8 rounded-[44px] bg-gradient-to-br from-warmAmber/14 via-transparent to-cyan/12 blur-2xl"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -inset-2 rounded-[36px] bg-black/25 blur-xl"
                aria-hidden
              />
              <EnergyLeadForm defaultCategory={defaultCategory ?? null} emphasize={emphasizeForm} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
