'use client';

import * as React from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { ProcessSection } from '@/components/landing/ProcessSection';
import { FinalCta } from '@/components/landing/FinalCta';
import { StickyMobileCta } from '@/components/landing/StickyMobileCta';
import { EnergyLeadForm } from '@/components/landing/EnergyLeadForm';
import { Button } from '@elo/ui';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';
import type { LeadCategory } from '@/types/lead';

interface TopicLeadShellProps {
  eyebrow: string;
  h1: string;
  heroIntro: string;
  category: LeadCategory;
  children: React.ReactNode;
}

export function TopicLeadShell({ eyebrow, h1, heroIntro, category, children }: TopicLeadShellProps) {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-premium-dark pt-24 pb-16 sm:pt-28 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" aria-hidden />
          <div
            className="pointer-events-none absolute -top-32 -left-24 size-[520px] rounded-full bg-warmAmber/10 blur-[120px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/3 -right-24 size-[420px] rounded-full bg-cyan/8 blur-[120px]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
            <p className="text-[11px] font-medium tracking-[0.22em] text-warmAmber/85 uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-display text-[30px] sm:text-[42px] lg:text-[48px] font-semibold text-softWhite leading-[1.08] tracking-tight max-w-3xl">
              {h1}
            </h1>
            <p className="mt-5 text-[16px] sm:text-[17px] text-softWhite/72 leading-[1.7] max-w-2xl font-light">
              {heroIntro}
            </p>
            <Button type="button" variant="primary" size="lg" className="mt-9" onClick={scrollToEnergyForm}>
              Persönliche Prüfung anfragen
              <span aria-hidden className="ml-1 text-white/80">→</span>
            </Button>
          </div>
        </section>

        <div className="bg-softWhite border-b border-borderLight/70">{children}</div>

        <ProcessSection />

        <section className="py-16 sm:py-20 bg-bgSoft/40 border-y border-borderLight/70">
          <div className="mx-auto max-w-lg px-5 lg:px-8">
            <EnergyLeadForm defaultCategory={category} />
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
