import { TopicLeadShell } from '@/components/landing/TopicLeadShell';

export const metadata = {
  title: 'Gewerbe-Energie-Check',
  description:
    'Energie-Check für Unternehmen: Strom, Gas und PV-Potenziale für Ihren Standort verständlich geprüft.',
};

export default function GewerbePage() {
  return (
    <TopicLeadShell
      eyebrow="Gewerbe"
      h1="Gewerbe-Energie-Check"
      heroIntro="Für Unternehmen mit hohen Energiekosten: wir prüfen Strom, Gas und PV-Potenziale für Ihren Standort – mit Blick auf Lastprofil und Beschaffung."
      category="gewerbe"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
        <h2 className="font-display text-xl font-bold text-navy">So arbeiten wir</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
            <h3 className="text-[18px] font-semibold text-navy">Was wir bewerten</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-slate">
              <li>• Verbrauchsstruktur und Lastprofil</li>
              <li>• Beschaffungsoptionen für Strom und Gas</li>
              <li>• Photovoltaik auf Gewerbeobjekten</li>
              <li>• Wirtschaftlichkeit für Ihr Geschäftsmodell</li>
            </ul>
          </div>
          <div className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
            <h3 className="text-[18px] font-semibold text-navy">Branchen mit hohem Potenzial</h3>
            <p className="mt-3 text-[15px] text-slate leading-relaxed">
              Bäckereien, Gastronomie, Hotels, Pflegeheime, Fitnessstudios, Autohäuser, Werkstätten, Produktion, Lager,
              Supermärkte, Friseure, Hausverwaltungen, Landwirtschaft.
            </p>
          </div>
        </div>
      </div>
    </TopicLeadShell>
  );
}
