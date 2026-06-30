import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { COMPANY_INFO } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Cookie-Richtlinie | AGI Energy',
  description:
    'Cookie-Richtlinie von AGI Energy – Informationen zu technisch notwendigen und funktionalen First-Party-Cookies.',
  alternates: { canonical: 'https://www.agienergy.de/cookie-richtlinie' },
  robots: { index: true, follow: true },
};

const cookies = [
  {
    name: 'elo_consent',
    purpose: 'Speichert die Auswahl im Cookie-Hinweis.',
    duration: '12 Monate',
    category: 'Essenziell',
  },
  {
    name: 'elo_session',
    purpose: 'Session-Cookie für den geschützten Admin-Bereich.',
    duration: 'Session',
    category: 'Essenziell',
  },
  {
    name: 'agi_ref',
    purpose: 'Speichert einen Empfehlungscode nach Aufruf eines Empfehlungslinks.',
    duration: '30 Tage',
    category: 'Funktional',
  },
  {
    name: 'agi_utm_source',
    purpose: 'Speichert die erste bekannte Akquise-Quelle eines Seitenbesuchs.',
    duration: '30 Tage',
    category: 'Funktional',
  },
  {
    name: 'agi_utm_medium',
    purpose: 'Speichert das erste bekannte Akquise-Medium eines Seitenbesuchs.',
    duration: '30 Tage',
    category: 'Funktional',
  },
  {
    name: 'agi_utm_campaign',
    purpose: 'Speichert die erste bekannte Kampagnenbezeichnung eines Seitenbesuchs.',
    duration: '30 Tage',
    category: 'Funktional',
  },
  {
    name: 'agi_utm_term',
    purpose: 'Speichert optional den ersten bekannten Such- oder Kampagnenbegriff.',
    duration: '30 Tage',
    category: 'Funktional',
  },
  {
    name: 'agi_utm_content',
    purpose: 'Speichert optional die erste bekannte Anzeigen- oder Linkvariante.',
    duration: '30 Tage',
    category: 'Funktional',
  },
  {
    name: 'agi_referrer',
    purpose: 'Speichert den Referrer als Fallback, wenn keine UTM-Parameter vorhanden sind.',
    duration: '30 Tage',
    category: 'Funktional',
  },
] as const;

export default function CookieRichtliniePage() {
  const c = COMPANY_INFO;

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-softWhite text-navy">
        <section className="mx-auto max-w-4xl px-5 pb-20 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+56px)] sm:px-8 sm:pb-24 sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+76px)]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-slate/75">
            <Link href="/" className="underline-offset-4 hover:text-premiumBlue hover:underline">
              Startseite
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span>Cookie-Richtlinie</span>
          </nav>

          <header className="mt-8 border-b border-borderLight pb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-energyGreen/90">
              Datenschutz & Cookies
            </p>
            <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.08] tracking-tight text-navy sm:text-[42px]">
              Cookie-Richtlinie
            </h1>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-slate">
              Diese Seite erklärt, welche Cookies AGI Energy auf
              https://www.agienergy.de verwendet und zu welchem Zweck.
            </p>
            <p className="mt-3 text-[13px] text-slate/70">Stand: {c.lastUpdated}</p>
          </header>

          <article className="mt-10 space-y-10 text-[15.5px] leading-[1.78] text-slate">
            <section aria-labelledby="cookie-grundsatz">
              <h2
                id="cookie-grundsatz"
                className="font-display text-[20px] font-semibold tracking-tight text-navy sm:text-[22px]"
              >
                Grundsatz
              </h2>
              <div className="mt-4 space-y-3">
                <p>
                  AGI Energy verwendet technisch notwendige Cookies und funktionale
                  First-Party-Cookies. Nach aktuellem Projektstand werden keine
                  externen Marketing-Tracker wie Google Analytics oder Meta Pixel
                  eingesetzt.
                </p>
                <p>
                  Funktionale Cookies helfen dabei, eine Empfehlung oder die erste
                  Akquise-Quelle einer Anfrage nachvollziehbar zuzuordnen. Es findet
                  kein seitenübergreifendes Tracking durch externe Werbenetzwerke
                  statt.
                </p>
              </div>
            </section>

            <section aria-labelledby="cookie-tabelle">
              <h2
                id="cookie-tabelle"
                className="font-display text-[20px] font-semibold tracking-tight text-navy sm:text-[22px]"
              >
                Eingesetzte Cookies
              </h2>
              <div className="mt-5 overflow-x-auto rounded-elo border border-borderLight bg-white">
                <table className="w-full min-w-[680px] text-left text-[14px]">
                  <thead className="bg-paper2 text-[12px] uppercase tracking-[0.14em] text-slate/75">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Cookie
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Zweck
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Laufzeit
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Kategorie
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderLight">
                    {cookies.map((cookie) => (
                      <tr key={cookie.name}>
                        <th scope="row" className="px-4 py-3 align-top font-mono text-[13px] font-medium text-navy">
                          {cookie.name}
                        </th>
                        <td className="px-4 py-3 align-top">{cookie.purpose}</td>
                        <td className="px-4 py-3 align-top whitespace-nowrap">{cookie.duration}</td>
                        <td className="px-4 py-3 align-top whitespace-nowrap">{cookie.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section aria-labelledby="cookie-einstellungen">
              <h2
                id="cookie-einstellungen"
                className="font-display text-[20px] font-semibold tracking-tight text-navy sm:text-[22px]"
              >
                Cookie-Einstellungen ändern
              </h2>
              <div className="mt-4 space-y-3">
                <p>
                  Sie können Ihre Auswahl jederzeit über den Link
                  „Cookie-Einstellungen“ im Footer dieser Website erneut öffnen.
                </p>
                <p>
                  Weitere Informationen zur Verarbeitung personenbezogener Daten
                  finden Sie in der{' '}
                  <Link
                    href="/datenschutz"
                    className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </div>
            </section>

            <section aria-labelledby="cookie-kontakt">
              <h2
                id="cookie-kontakt"
                className="font-display text-[20px] font-semibold tracking-tight text-navy sm:text-[22px]"
              >
                Kontakt
              </h2>
              <div className="mt-4 space-y-3">
                <p>
                  Verantwortlich für dieses Internetangebot ist {c.responsiblePerson}.
                  Die vollständigen Anbieterinformationen finden Sie im{' '}
                  <Link
                    href="/impressum"
                    className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                  >
                    Impressum
                  </Link>
                  .
                </p>
                <p>
                  E-Mail:{' '}
                  <a
                    href={`mailto:${c.contactEmail}`}
                    className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                  >
                    {c.contactEmail}
                  </a>
                </p>
              </div>
            </section>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
