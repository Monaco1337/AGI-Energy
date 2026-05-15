'use client';

import type { ReactNode } from 'react';
import type { LeadCategory } from '@/types/lead';
import { energyLandingContent } from '@/data/energyLandingContent';
import { cn } from '@elo/ui';

const ORDER: LeadCategory[] = ['strom', 'gas', 'solar', 'gewerbe'];

const ICONS: Record<LeadCategory, ReactNode> = {
  strom: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L4 13h7l-1 9 9-11h-7l1-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  gas: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3c1.5 3 5 5 5 9a5 5 0 11-10 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 0-5 1-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  solar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  gewerbe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M9 11h.01M12 11h.01M15 11h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

interface CategorySelectorProps {
  value: LeadCategory | null;
  onChange: (c: LeadCategory) => void;
  disabled?: boolean;
}

export function CategorySelector({ value, onChange, disabled }: CategorySelectorProps) {
  const copy = energyLandingContent.categorySelector;
  return (
    <div className="grid grid-cols-2 gap-2.5" role="group" aria-label="Bereich">
      {ORDER.map((id) => {
        const sel = value === id;
        const meta = copy[id];
        return (
          <button
            key={id}
            type="button"
            disabled={disabled}
            aria-pressed={sel}
            onClick={() => onChange(id)}
            className={cn(
              'group relative flex items-center gap-3 rounded-xl border px-3.5 py-3 text-left min-h-[60px] transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white/80 focus-visible:ring-cyan',
              disabled && 'opacity-50 cursor-not-allowed',
              sel
                ? 'border-cyan/70 bg-cyan/[0.06] shadow-[0_0_0_3px_rgba(79,209,197,0.08)]'
                : 'border-borderLight bg-white/55 hover:border-cyan/35 hover:bg-white/80',
            )}
          >
            <span
              className={cn(
                'flex size-9 items-center justify-center rounded-lg transition-colors',
                sel
                  ? 'bg-cyan/15 text-cyanDeep'
                  : 'bg-bgSoft text-graphite/80 group-hover:text-cyanDeep',
              )}
              aria-hidden
            >
              {ICONS[id]}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[14.5px] font-semibold text-navy">
                {meta.label}
              </span>
              <span className="text-[11.5px] text-slate">{meta.hint}</span>
            </span>
            {sel && (
              <span
                className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-cyan/90 text-white"
                aria-hidden
              >
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.8 7.2L5.6 10L11.2 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
