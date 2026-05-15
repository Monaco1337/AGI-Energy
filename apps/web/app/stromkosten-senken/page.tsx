import { TopicLeadShell } from '@/components/landing/TopicLeadShell';

export const metadata = {
  title: 'Stromkosten senken – persönlich geprüft',
  description:
    'Wir prüfen, ob bei Ihren Stromkosten Einsparpotenzial besteht. Verständlich, unverbindlich, ohne Verkaufsdruck.',
};

export default function StromPage() {
  return (
    <TopicLeadShell
      eyebrow="Strom"
      h1="Stromkosten senken – ehrlich geprüft."
      heroIntro="Wir vergleichen nicht blind Tarife. Wir schauen uns Ihre Situation an und prüfen, ob ein Wechsel oder eine Anpassung wirtschaftlich sinnvoll ist."
      category="strom"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
        <h2 className="font-display text-xl font-bold text-navy">So arbeiten wir</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
            <h3 className="text-[18px] font-semibold text-navy">Wie wir prüfen</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-slate">
              <li>• Verbrauch und Lastprofil</li>
              <li>• Tarifbestandteile und Laufzeit</li>
              <li>• Vertragslaufzeiten und Bindung</li>
              <li>• Individuelle Einschätzung – ohne pauschales Sparversprechen</li>
            </ul>
          </div>
          <div className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
            <h3 className="text-[18px] font-semibold text-navy">Was wir nicht tun</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-slate">
              <li>• Garantierte Ersparnis ohne Prüfung</li>
              <li>• Werbeanrufe ohne Ihre Einwilligung</li>
              <li>• Versteckte Kosten</li>
            </ul>
          </div>
        </div>
      </div>
    </TopicLeadShell>
  );
}
