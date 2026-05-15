import { Section } from './Section';

interface Pair {
  not: string;
  yes: string;
}

const PAIRS: Pair[] = [
  {
    not: '„Sie sparen garantiert 2.000 € im Jahr."',
    yes: 'Wir prüfen, ob für Ihre Situation Einsparpotenzial besteht.',
  },
  {
    not: 'Tarif-Ranking nach Werbe-Bonus.',
    yes: 'Bewertung des ehrlichen Tarifs nach Bonus-Ablauf.',
  },
  {
    not: 'Standard-Vergleich aus dem Tarifrechner.',
    yes: 'Persönliche Auswertung für Ihren Haushalt oder Standort.',
  },
  {
    not: 'Kalt-Akquise nach Lead-Verkauf.',
    yes: 'Wir melden uns nur, wenn eine sinnvolle Auswertung möglich ist.',
  },
];

export function WhyNotComparison() {
  return (
    <Section
      eyebrow="Unterschied"
      title="Warum wir keine klassische Vergleichsseite sind."
      intro="Die meisten Tarif-Portale leben von Werbe-Boni und Provisionen. Wir prüfen Ihre Situation persönlich und sagen ehrlich, ob sich ein Wechsel oder eine Investition lohnt."
    >
      <div className="bg-card border border-line rounded-eloLg overflow-hidden divide-y divide-line">
        {/* Kopfzeile */}
        <div className="hidden md:grid grid-cols-[1fr_1fr] text-[11.5px] uppercase tracking-[0.14em]">
          <div className="px-6 py-3 text-muted bg-paper2/40 border-r border-line">
            So funktionieren viele Vergleichsportale
          </div>
          <div className="px-6 py-3 text-sage bg-sage/[0.04]">So arbeiten wir</div>
        </div>

        {PAIRS.map((p, i) => (
          <div key={i} className="grid md:grid-cols-[1fr_1fr]">
            <div className="px-6 py-5 text-[15px] text-ink2 md:border-r border-line bg-paper2/30 flex items-start gap-3">
              <span aria-hidden className="mt-1 text-muted shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="leading-relaxed">{p.not}</span>
            </div>
            <div className="px-6 py-5 text-[15px] text-ink bg-card flex items-start gap-3">
              <span aria-hidden className="mt-1 text-sage shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8.5l3 3 7-7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="leading-relaxed font-medium">{p.yes}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
