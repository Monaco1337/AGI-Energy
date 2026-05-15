import * as React from 'react';
import { cn } from '@elo/ui';

interface SectionProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

export function Section({ eyebrow, title, intro, children, id, className }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 sm:py-20 bg-softWhite', className)}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-energyGreen font-semibold mb-4">
              <span className="size-1.5 rounded-full bg-energyGreen" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-[26px] sm:text-[34px] tracking-tight text-navy font-bold leading-[1.12]">
            {title}
          </h2>
          {intro && <p className="mt-4 text-[16px] sm:text-[17px] text-slate leading-relaxed">{intro}</p>}
        </div>
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
