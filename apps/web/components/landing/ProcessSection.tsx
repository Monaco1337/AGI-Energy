import { energyLandingContent } from '@/data/energyLandingContent';

export function ProcessSection() {
  const { eyebrow, title, steps } = energyLandingContent.process;
  return (
    <section
      id="ablauf"
      aria-labelledby="ablauf-title"
      className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-24 bg-bgSoft/40 border-y border-borderLight/70"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.2em] text-cyanDeep uppercase">{eyebrow}</p>
          <h2
            id="ablauf-title"
            className="mt-3 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-navy tracking-tight leading-[1.15]"
          >
            {title}
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 sm:gap-10 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-display text-[14px] font-medium text-cyanDeep tabular-nums tracking-wider">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-cyan/40 to-transparent" aria-hidden />
              </div>
              <h3 className="font-display text-[20px] sm:text-[22px] font-semibold text-navy tracking-tight">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] text-slate leading-[1.7] max-w-sm">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
