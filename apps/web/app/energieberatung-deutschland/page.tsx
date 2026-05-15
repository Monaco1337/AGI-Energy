import { TopicLeadShell } from '@/components/landing/TopicLeadShell';

export const metadata = {
  title: 'Energieberatung Deutschland',
  description: 'Persönliche Energieberatung für Strom, Gas und Photovoltaik in Deutschland.',
};

export default function Page() {
  return (
    <TopicLeadShell
      eyebrow="Energieberatung"
      h1="Energieberatung in Deutschland – persönlich, ehrlich, ruhig."
      heroIntro="Wir helfen Privatkunden, Eigentümern, Vermietern und Unternehmen, ihre Energiesituation realistisch einzuschätzen."
      category="strom"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
        <h2 className="font-display text-xl font-bold text-navy">Leistungsüberblick</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
            <h3 className="text-[18px] font-semibold text-navy">Für wen</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-slate">
              <li>• Privathaushalte mit hohem Strom- oder Gasverbrauch</li>
              <li>• Eigentümer mit PV-Potenzial</li>
              <li>• Vermieter und Hausverwaltungen</li>
              <li>• Unternehmen mit hohen Energiekosten</li>
            </ul>
          </div>
          <div className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
            <h3 className="text-[18px] font-semibold text-navy">Was Sie erhalten</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-slate">
              <li>• Eine strukturierte Einschätzung statt Tarif-Chaos</li>
              <li>• Verständliche Sprache ohne unnötiges Fachjargon</li>
              <li>• Klare nächste Schritte – ohne Druck</li>
            </ul>
          </div>
        </div>
      </div>
    </TopicLeadShell>
  );
}
