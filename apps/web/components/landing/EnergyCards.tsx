import Link from 'next/link';
import { Section } from './Section';

interface CardData {
  eyebrow: string;
  title: string;
  intro: string;
  bullets: string[];
  cta: { label: string; href: string };
  accent: 'sage' | 'gold' | 'blue';
}

const STROM_GAS: CardData = {
  eyebrow: 'Strom & Gas',
  title: 'Tarife ehrlich geprüft.',
  intro:
    'Wir prüfen Ihre konkrete Situation und schauen auf den ehrlichen Tarif – nicht auf den lockenden Werbepreis.',
  bullets: [
    'Persönliche Auswertung statt Standard-Vergleich',
    'Bewertung nach Bonus-Ablauf, nicht nur im ersten Jahr',
    'Wechselprozess in einfacher Sprache',
  ],
  cta: { label: 'Strom-/Gas-Check', href: '/stromkosten-senken' },
  accent: 'sage',
};

const PV: CardData = {
  eyebrow: 'Photovoltaik',
  title: 'Wirtschaftlich, nicht euphorisch.',
  intro:
    'Wir prüfen, ob Photovoltaik für Ihr Gebäude wirtschaftlich sinnvoll ist – mit klaren Annahmen statt Werbeversprechen.',
  bullets: [
    'Dachfläche, Ausrichtung und Verschattung realistisch bewertet',
    'Eigenverbrauch und Speicher korrekt eingerechnet',
    'Wirtschaftlichkeit über die volle Laufzeit',
  ],
  cta: { label: 'Photovoltaik-Beratung', href: '/photovoltaik-beratung' },
  accent: 'gold',
};

const BUSINESS: CardData = {
  eyebrow: 'Gewerbe',
  title: 'Energie als Kostenposition.',
  intro:
    'Für Unternehmen mit hohen Energiekosten: wir prüfen Strom, Gas und Photovoltaik-Potenziale für Ihren Standort.',
  bullets: [
    'Lastprofil und Verbrauchsstruktur',
    'Beschaffungsoptionen und Marktfenster',
    'PV-Eignung auf Gewerbeobjekten',
  ],
  cta: { label: 'Gewerbe-Energie-Check', href: '/gewerbe-energiecheck' },
  accent: 'blue',
};

const ACCENT_CLASSES: Record<CardData['accent'], { bar: string; eyebrow: string; cta: string }> = {
  sage: {
    bar: 'bg-sage',
    eyebrow: 'text-sage',
    cta: 'text-sage hover:text-sage2',
  },
  gold: {
    bar: 'bg-gold',
    eyebrow: 'text-gold',
    cta: 'text-gold hover:text-gold2',
  },
  blue: {
    bar: 'bg-leadBlue',
    eyebrow: 'text-leadBlue',
    cta: 'text-leadBlue hover:text-ink',
  },
};

function Card({ data }: { data: CardData }) {
  const a = ACCENT_CLASSES[data.accent];
  return (
    <article className="group relative bg-card border border-line rounded-eloLg shadow-eloSm hover:shadow-elo transition-shadow overflow-hidden flex flex-col">
      <span aria-hidden className={`absolute inset-x-0 top-0 h-[3px] ${a.bar}`} />
      <div className="p-7 flex-1 flex flex-col">
        <p className={`text-[11.5px] uppercase tracking-[0.16em] font-medium ${a.eyebrow}`}>
          {data.eyebrow}
        </p>
        <h3 className="mt-2.5 font-display text-[24px] tracking-[-0.005em] text-ink leading-tight">
          {data.title}
        </h3>
        <p className="mt-3 text-[15px] text-ink2 leading-relaxed">{data.intro}</p>
        <ul className="mt-5 space-y-2.5">
          {data.bullets.map((b) => (
            <li key={b} className="flex gap-2.5 items-start text-[14.5px] text-ink2">
              <span aria-hidden className="mt-1.5 size-1.5 rounded-full bg-sage/60 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-7 pt-5 border-t border-line flex items-center justify-between">
          <Link
            href={data.cta.href}
            className={`inline-flex items-center gap-2 text-[15px] font-medium ${a.cta} transition-colors`}
          >
            {data.cta.label}
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <span className="text-[12px] text-muted">Kostenlos</span>
        </div>
      </div>
    </article>
  );
}

export function EnergyCards() {
  return (
    <Section
      eyebrow="Bereiche"
      title="Strom, Gas und Photovoltaik – jeder Bereich einzeln geprüft."
      intro="Wir treffen keine pauschalen Sparversprechen. Wir prüfen, ob für Ihre Situation Einsparpotenzial besteht – und sagen es Ihnen ehrlich."
    >
      <div className="grid md:grid-cols-3 gap-5">
        <Card data={STROM_GAS} />
        <Card data={PV} />
        <Card data={BUSINESS} />
      </div>
    </Section>
  );
}
