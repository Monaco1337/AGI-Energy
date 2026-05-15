import { energyLandingContent } from '@/data/energyLandingContent';

function PersonIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 20c1-4 4.5-6 8-6s7 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function CheckCircle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function NoteIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 3h9l4 4v14H6z M15 3v5h4 M9 13h7M9 17h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS = [PersonIcon, CheckCircle, ShieldIcon, NoteIcon];

export function ProblemSection() {
  const { eyebrow, title, intro, cards } = energyLandingContent.problem;
  return (
    <section className="py-20 sm:py-24 bg-softWhite">
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

        <div className="mt-14 grid sm:grid-cols-2 gap-5 lg:gap-6">
          {cards.map((c, i) => {
            const Icon = ICONS[i] ?? PersonIcon;
            return (
              <article
                key={c.title}
                className="rounded-2xl border border-borderLight bg-card p-7 transition-all hover:border-cyan/30 hover:shadow-glass"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-cyan/10 text-cyanDeep">
                  <Icon />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-navy tracking-tight">{c.title}</h3>
                <p className="mt-2 text-[14.5px] text-slate leading-relaxed">{c.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
