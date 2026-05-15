import Link from 'next/link';
import { Section } from './Section';

const ITEMS = [
  {
    t: 'Datenminimierung',
    d: 'Wir fragen nur das ab, was für die Auswertung wirklich nötig ist. Optionale Felder sind klar gekennzeichnet.',
  },
  {
    t: 'Keine externen Tracker',
    d: 'Keine Marketing-Cookies, keine Drittanbieter-Skripte, keine versteckten Datenflüsse.',
  },
  {
    t: 'Verarbeitung in Deutschland',
    d: 'Ihre Daten werden in Deutschland verarbeitet und ausschließlich zur Auswertung verwendet.',
  },
  {
    t: 'Klare Einwilligung',
    d: 'Ihre Einwilligung wird mit Zeitpunkt und Version dokumentiert. Sie können jederzeit widerrufen.',
  },
];

export function PrivacySection() {
  return (
    <Section
      eyebrow="Datenschutz"
      title="Ihre Daten bleiben unter Kontrolle."
      intro="Wir erheben nur, was für die Auswertung Ihres Energie-Checks nötig ist."
    >
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
        {ITEMS.map((it) => (
          <div key={it.t} className="flex items-start gap-4">
            <span
              aria-hidden
              className="mt-1 size-9 shrink-0 rounded-full border border-sage/30 bg-sage/10 flex items-center justify-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-sage">
                <path
                  d="M8 2l5 2v4c0 3-2 5-5 6-3-1-5-3-5-6V4l5-2z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div>
              <div className="text-[16px] font-semibold text-ink">{it.t}</div>
              <p className="mt-1.5 text-[14.5px] text-ink2 leading-relaxed">{it.d}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-[14px] text-muted">
        <Link href="/datenschutz" className="underline underline-offset-4 hover:text-ink">
          Datenschutzhinweise
        </Link>{' '}
        ·{' '}
        <Link href="/datenschutz/anfrage" className="underline underline-offset-4 hover:text-ink">
          Auskunft, Löschung oder Widerspruch
        </Link>
      </div>
    </Section>
  );
}
