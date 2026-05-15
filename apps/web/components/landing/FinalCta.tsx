'use client';

import { Button } from '@elo/ui';
import { energyLandingContent } from '@/data/energyLandingContent';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';

export function FinalCta() {
  const f = energyLandingContent.finalCta;
  return (
    <section className="relative overflow-hidden bg-premium-dark py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-warmAmber/8 blur-[140px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan/6 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-5 lg:px-8 text-center">
        <h2 className="font-display text-[28px] sm:text-[40px] lg:text-[44px] font-semibold text-softWhite tracking-tight leading-[1.1]">
          {f.title}
        </h2>
        <p className="mt-5 text-[16px] sm:text-[17px] text-softWhite/70 leading-[1.7]">{f.text}</p>
        <Button
          type="button"
          variant="primary"
          size="xl"
          className="mt-9 min-w-[260px]"
          onClick={scrollToEnergyForm}
        >
          {f.button}
          <span aria-hidden className="ml-1 text-white/80">→</span>
        </Button>
        <p className="mt-5 text-[13px] text-softWhite/50">{f.trust}</p>
      </div>
    </section>
  );
}
