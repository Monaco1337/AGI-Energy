import { energyLandingContent } from '@/data/energyLandingContent';

function NoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="text-cyanDeep shrink-0"
    >
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 5.5l9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function AntiScamSection() {
  const { eyebrow, title, intro, badges } = energyLandingContent.antiScam;
  return (
    <section className="py-20 sm:py-24 bg-softWhite border-y border-borderLight/70">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.2em] text-cyanDeep uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-navy tracking-tight leading-[1.15]">
            {title}
          </h2>
          <p className="mt-5 text-[16px] sm:text-[17px] text-slate leading-[1.7]">{intro}</p>
        </div>

        <ul className="mt-12 flex flex-wrap gap-2.5">
          {badges.map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-2 rounded-full border border-borderLight bg-card px-4 py-2.5 text-[13.5px] text-navy/90 font-medium shadow-[0_1px_2px_rgba(7,17,31,0.04)]"
            >
              <NoIcon />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
