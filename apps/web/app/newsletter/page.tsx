import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import NewsletterForm from '@/components/landing/NewsletterForm';
import { breadcrumbSchema, jsonLdScriptProps } from '@/lib/seoSchemas';

const PATH = '/newsletter';

export const metadata: Metadata = {
  title: 'Energie-Newsletter abonnieren | AGI Energy',
  description:
    'Alle zwei Wochen kompakte Tipps zu Strom, Gas und Photovoltaik. Mit Doppel-Opt-In, ohne Werbeflut, jederzeit abbestellbar.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Energie-Newsletter | AGI Energy',
    description: 'Kompakte Energie-Tipps direkt in Ihr Postfach. DSGVO-konform mit Double-Opt-In.',
    url: PATH,
  },
};

const BENEFITS: Array<{ title: string; body: string }> = [
  {
    title: 'Konkrete Spar-Tipps statt Werbung',
    body: 'Alle 14 Tage eine kompakte Mail mit nachvollziehbaren Hebeln für Strom, Gas und Photovoltaik. Keine endlosen Tariflisten.',
  },
  {
    title: 'Preis- und Gesetzes-Updates',
    body: 'Wenn sich Strompreisbremse, Gasumlage, EEG-Vergütung oder Wechsel-Bedingungen ändern, erfahren Sie es zuerst.',
  },
  {
    title: 'Saisonale Checklisten',
    body: 'Wann lohnt der Wechsel, wann lieber bleiben, wann Heizungs- und PV-Pflichten beachten – kompakt zum Abhaken.',
  },
  {
    title: 'Volle Kontrolle, jederzeit',
    body: 'Doppelte Bestätigung bei der Anmeldung. Abmeldung mit einem Klick in jeder Mail. Keine Weitergabe an Dritte.',
  },
];

export default function NewsletterPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'Newsletter', path: PATH },
          ]),
        )}
      />

      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <section className="mx-auto max-w-5xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-10">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
            Newsletter
          </p>
          <h1 className="mt-3 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-semibold text-navy leading-[1.1] tracking-tight">
            Kompakte Energie-Tipps.
            <br className="hidden sm:inline" />
            Ohne Werbeflut.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] text-slate leading-[1.7]">
            Alle zwei Wochen das Wichtigste zu Strom, Gas und Photovoltaik: ehrliche
            Einschätzungen, konkrete Spar-Hebel und ein Auge auf Preise und Gesetzes-Updates.
            DSGVO-konform mit Doppel-Opt-In, jederzeit abbestellbar.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,420px)]">
            <div className="space-y-5">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="rounded-elo border border-borderLight bg-white p-5"
                >
                  <h2 className="font-display text-[18px] font-semibold text-navy">
                    {b.title}
                  </h2>
                  <p className="mt-2 text-[14.5px] text-slate leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>

            <aside className="rounded-elo border border-borderLight bg-white p-6 lg:sticky lg:top-24 self-start">
              <h2 className="font-display text-[20px] font-semibold text-navy tracking-tight">
                Jetzt anmelden
              </h2>
              <p className="mt-2 text-[13.5px] text-slate leading-relaxed">
                Sie erhalten in Kürze eine Bestätigungs­mail. Erst nach Klick auf den Bestätigungslink sind Sie eingetragen.
              </p>
              <div className="mt-5">
                <NewsletterForm source="newsletter-page" showPostalCode />
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-24">
          <div className="rounded-elo border border-borderLight bg-white p-6">
            <h2 className="font-display text-[18px] font-semibold text-navy tracking-tight">
              Sie wollen lieber direkt rechnen?
            </h2>
            <p className="mt-2 text-[14.5px] text-slate leading-relaxed">
              Der kostenlose Energie-Check ermittelt Ihr Einspar­potenzial in wenigen Minuten – ohne
              vorherige Newsletter-Anmeldung. Sie können beides parallel nutzen.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/energiecheck"
                className="inline-flex items-center justify-center bg-navy text-white px-5 py-3 rounded-elo font-medium hover:bg-navy/90 transition"
              >
                Energie-Check starten
              </Link>
              <Link
                href="/ratgeber"
                className="inline-flex items-center justify-center bg-white text-navy border border-navy px-5 py-3 rounded-elo font-medium hover:bg-softWhite transition"
              >
                Ratgeber lesen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
