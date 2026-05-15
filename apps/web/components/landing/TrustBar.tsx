import { energyLandingContent } from '@/data/energyLandingContent';

function CheckMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      fill="none"
      className="text-cyan shrink-0"
      aria-hidden
    >
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

export function TrustBar() {
  const { items } = energyLandingContent.trustBar;
  return (
    <section className="bg-softWhite border-b border-borderLight/70">
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-7 sm:py-9">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-10 gap-y-4">
          {items.map((label, i) => (
            <li
              key={label}
              className="flex items-center gap-2.5 text-[13.5px] text-graphite/85 font-medium leading-snug"
            >
              <CheckMark />
              <span>{label}</span>
              {/* dezenter Vertikal-Divider zwischen Items (Desktop) */}
              {i < items.length - 1 && (
                <span
                  aria-hidden
                  className="hidden lg:block absolute h-5 w-px bg-borderLight/0"
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
