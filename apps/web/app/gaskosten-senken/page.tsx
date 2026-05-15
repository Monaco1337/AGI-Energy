import { TopicLeadShell } from '@/components/landing/TopicLeadShell';

export const metadata = {
  title: 'Gaskosten senken – persönlich geprüft',
  description:
    'Wir prüfen, ob bei Ihren Gaskosten Einsparpotenzial besteht. Verständlich, unverbindlich, ohne Verkaufsdruck.',
};

export default function GasPage() {
  return (
    <TopicLeadShell
      eyebrow="Gas"
      h1="Gaskosten senken – verständlich geprüft."
      heroIntro="Wir bewerten Ihren Gasvertrag und prüfen, ob ein Wechsel oder eine Anpassung tatsächlich sinnvoll ist – ohne Lockangebot-Mathematik."
      category="gas"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8 py-14">
        <h2 className="font-display text-xl font-bold text-navy">So arbeiten wir</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-5">
          <div className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
            <h3 className="text-[18px] font-semibold text-navy">Wie wir prüfen</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-slate">
              <li>• Aktueller Tarif und Bindung</li>
              <li>• Verbrauch im Vergleich zu typischen Profilen</li>
              <li>• Region und Vertragslage</li>
              <li>• Klare nächste Schritte</li>
            </ul>
          </div>
          <div className="bg-card border border-borderLight rounded-eloLg p-7 shadow-glass">
            <h3 className="text-[18px] font-semibold text-navy">Was Sie erhalten</h3>
            <ul className="mt-3 space-y-2 text-[15px] text-slate">
              <li>• Persönliche Einschätzung</li>
              <li>• Hinweis, ob Wechsel sinnvoll sein kann</li>
              <li>• Keine öffentliche Tarifliste</li>
            </ul>
          </div>
        </div>
      </div>
    </TopicLeadShell>
  );
}
