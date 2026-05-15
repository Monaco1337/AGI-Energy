import { energyLandingContent } from '@/data/energyLandingContent';
import { GlassCard } from '@elo/ui';

export function ConciergeSection() {
  const { eyebrow, title, intro, bullets, previewStatuses } = energyLandingContent.concierge;
  return (
    <section className="py-20 sm:py-24 bg-softWhite">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] text-cyanDeep uppercase">{eyebrow}</p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-navy tracking-tight leading-[1.15]">
            {title}
          </h2>
          <p className="mt-5 text-[16px] sm:text-[17px] text-slate leading-[1.7] max-w-xl">{intro}</p>

          <ul className="mt-8 space-y-3 text-[14.5px] text-navy">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3 items-start">
                <span
                  className="mt-1.5 flex size-1.5 rounded-full bg-cyanDeep shrink-0"
                  aria-hidden
                />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <GlassCard className="p-7 sm:p-8 border-borderLight">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate font-medium">
              Anfragestatus · Vorschau
            </p>
            <span className="flex items-center gap-1.5 text-[11px] text-cyanDeep">
              <span className="size-1.5 rounded-full bg-cyan animate-pulse" aria-hidden />
              live
            </span>
          </div>
          <ul className="mt-6 space-y-3">
            {previewStatuses.map((s, i) => {
              const active = i === previewStatuses.length - 1;
              return (
                <li
                  key={s}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3.5 text-[13.5px] transition-colors ${
                    active
                      ? 'border-cyan/40 bg-cyan/[0.05]'
                      : 'border-borderLight bg-softWhite/80'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex size-2 rounded-full ${
                        active ? 'bg-cyan' : 'bg-cyanDeep/60'
                      }`}
                      aria-hidden
                    />
                    <span className="text-navy font-medium">{s}</span>
                  </span>
                  <span className="text-[11px] text-slate tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-[11px] text-slate">Beispiel-UI · keine echten Kundendaten.</p>
        </GlassCard>
      </div>
    </section>
  );
}
