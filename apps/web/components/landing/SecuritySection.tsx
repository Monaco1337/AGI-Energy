import { energyLandingContent } from '@/data/energyLandingContent';

function CheckLine() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="text-cyan shrink-0">
      <path
        d="M2.5 7.4L5.6 10.4L11.5 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SecuritySection() {
  const { eyebrow, title, intro, points } = energyLandingContent.security;
  return (
    <section className="py-20 sm:py-24 bg-premium-dark relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium tracking-[0.22em] text-warmAmber/85 uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-softWhite tracking-tight leading-[1.15]">
            {title}
          </h2>
          <p className="mt-5 text-[16px] sm:text-[17px] text-softWhite/70 leading-[1.7]">
            {intro}
          </p>
        </div>

        <ul className="mt-12 grid sm:grid-cols-2 gap-3 max-w-4xl">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-[14px] text-softWhite/90 backdrop-blur-sm"
            >
              <CheckLine />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
