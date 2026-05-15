import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';

export const metadata = { title: 'Datenschutz-Anfrage' };

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-[50vh] bg-softWhite mx-auto max-w-2xl px-5 py-16 sm:py-20">
        <h1 className="font-display text-[30px] sm:text-[34px] font-bold tracking-tight text-navy">
          Datenschutz-Anfrage
        </h1>
        <p className="mt-4 text-[16px] text-slate leading-relaxed">
          Sie können Auskunft über Ihre Daten verlangen, eine Berichtigung oder Löschung beantragen, der Verarbeitung
          widersprechen oder Ihre Einwilligung widerrufen.
        </p>
        <div className="mt-6 rounded-eloLg border border-borderLight bg-card p-6 shadow-glass">
          <p className="text-[15px] text-slate">
            Bitte schreiben Sie uns formlos an die im Impressum hinterlegte Kontaktadresse. Wir bestätigen den Eingang
            innerhalb weniger Werktage.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
