import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';

export const metadata = { title: 'Datenschutzhinweise' };

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-softWhite mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <h1 className="font-display text-[30px] sm:text-[34px] font-bold tracking-tight text-navy">
          Datenschutzhinweise
        </h1>
        <p className="mt-3 text-[14px] text-slate">Stand: 2025-01-01 (Demo-Text)</p>
        <div className="mt-8 max-w-none text-[16px] leading-relaxed">
          <h2 className="font-display text-xl mt-10 font-bold text-navy">Verantwortlich</h2>
          <p className="text-slate">Demo-Plattform. Bitte ergänzen Sie Ihre Verantwortlichen-Daten.</p>

          <h2 className="font-display text-xl mt-10 font-bold text-navy">Zweck der Verarbeitung</h2>
          <p className="text-slate">
            Die im Energie-Check erhobenen Daten werden ausschließlich zur Auswertung Ihres Anliegens und zur
            Kontaktaufnahme verwendet, sofern Sie hierzu eingewilligt haben.
          </p>

          <h2 className="font-display text-xl mt-10 font-bold text-navy">Rechtsgrundlage</h2>
          <p className="text-slate">
            Art. 6 Abs. 1 lit. a (Einwilligung) sowie ggf. Art. 6 Abs. 1 lit. b (Vertragsanbahnung) DSGVO.
          </p>

          <h2 className="font-display text-xl mt-10 font-bold text-navy">Datenminimierung</h2>
          <p className="text-slate">
            Wir erheben nur die für die Auswertung notwendigen Daten. Optionale Felder sind klar gekennzeichnet. Wir
            verwenden keine externen Marketing-Tracker.
          </p>

          <h2 className="font-display text-xl mt-10 font-bold text-navy">Ihre Rechte</h2>
          <p className="text-slate">
            Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Widerruf der
            Einwilligung. Bitte nutzen Sie unser{' '}
            <a href="/datenschutz/anfrage" className="text-premiumBlue font-medium underline underline-offset-4">
              Anfrage-Formular
            </a>
            .
          </p>

          <h2 className="font-display text-xl mt-10 font-bold text-navy">Speicherdauer</h2>
          <p className="text-slate">
            Wir speichern Ihre Daten nur so lange, wie es für den Zweck erforderlich ist oder gesetzliche
            Aufbewahrungspflichten bestehen.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
