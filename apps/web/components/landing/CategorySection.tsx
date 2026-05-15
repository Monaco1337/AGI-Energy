'use client';

import { energyLandingContent } from '@/data/energyLandingContent';
import { scrollToEnergyForm } from '@/lib/scrollToEnergyForm';
import type { LeadCategory } from '@/types/lead';

export function CategorySection() {
  const { eyebrow, title, cards, cta } = energyLandingContent.categories;

  function go(cat: LeadCategory) {
    scrollToEnergyForm();
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('agi-preset-category', { detail: cat }));
    }, 500);
  }

  return (
    <section className="py-20 sm:py-24 bg-softWhite">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.2em] text-cyanDeep uppercase">{eyebrow}</p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-navy tracking-tight leading-[1.15]">
            {title}
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((card) => (
            <article
              key={card.id}
              className="group relative flex flex-col rounded-2xl border border-borderLight bg-card p-7 transition-all hover:border-cyan/30 hover:shadow-glass"
            >
              <span className="text-[26px]" aria-hidden>
                {card.icon}
              </span>
              <h3 className="mt-4 text-[19px] sm:text-[20px] font-semibold text-navy tracking-tight">
                {card.title}
              </h3>
              <p className="mt-2.5 flex-1 text-[14.5px] text-slate leading-[1.7]">{card.text}</p>
              <button
                type="button"
                onClick={() => go(card.id)}
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-cyanDeep hover:text-cyan transition-colors self-start"
              >
                <span className="border-b border-cyanDeep/40 group-hover:border-cyan pb-0.5">
                  {cta}
                </span>
                <span aria-hidden>→</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
