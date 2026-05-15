import { TopicLeadShell } from '@/components/landing/TopicLeadShell';

export const metadata = {
  title: 'Photovoltaik-Beratung – wirtschaftlich geprüft',
  description:
    'Wir prüfen, ob Photovoltaik für Ihr Gebäude wirtschaftlich sinnvoll sein kann – ehrlich, ohne Werbeversprechen.',
};

export default function PVPage() {
  return (
    <TopicLeadShell
      eyebrow="Photovoltaik"
      h1="Photovoltaik-Beratung – wirtschaftlich geprüft."
      heroIntro="Wir prüfen, ob Photovoltaik für Ihr Gebäude wirtschaftlich sinnvoll sein kann. Mit klaren Annahmen statt aggressiven Werbeversprechen."
      category="solar"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
        <h2 className="font-display text-xl font-bold text-navy">Schwerpunkte</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-5">
          {[
            { t: 'Dachfläche & Ausrichtung', d: 'Wir bewerten Fläche, Ausrichtung und Verschattung.' },
            { t: 'Eigenverbrauch & Speicher', d: 'Eigenverbrauch ist wichtiger als die reine Anlagengröße.' },
            { t: 'Wirtschaftlichkeit', d: 'Wir rechnen mit realistischen Annahmen, nicht mit Idealfällen.' },
          ].map((c) => (
            <div key={c.t} className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
              <h3 className="text-[17px] font-semibold text-navy">{c.t}</h3>
              <p className="mt-2 text-[15px] text-slate leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </TopicLeadShell>
  );
}
