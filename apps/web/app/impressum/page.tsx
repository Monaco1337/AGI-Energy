import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { COMPANY_INFO } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Impressum | AGI Energy',
  description:
    'Impressum von AGI Energy – Angaben gemäß § 5 DDG, Anbieterinformationen, Verantwortlichkeit, Kontakt und rechtliche Hinweise.',
  alternates: { canonical: 'https://www.agienergy.de/impressum' },
  robots: { index: true, follow: true },
};

const hasVatId = COMPANY_INFO.vatId.trim().length > 0;
const phoneHref = `tel:${COMPANY_INFO.contactPhone.replace(/\s+/g, '')}`;

const legalSections = [
  { id: 'angaben', label: 'Angaben gemäß § 5 DDG' },
  { id: 'anbieterin', label: 'Anbieterin' },
  { id: 'verantwortliche', label: 'Inhaltlich Verantwortliche' },
  { id: 'leistungsbereich', label: 'Leistungsbereich' },
  { id: 'umsatzsteuer', label: 'Umsatzsteuer' },
  { id: 'technik', label: 'Technische Umsetzung' },
  { id: 'haftung-inhalte', label: 'Haftung für Inhalte' },
  { id: 'haftung-links', label: 'Haftung für externe Links' },
  { id: 'urheberrecht', label: 'Urheberrecht' },
  { id: 'streitbeilegung', label: 'Verbraucherstreitbeilegung' },
  { id: 'datenschutz', label: 'Datenschutz' },
  { id: 'rechtliche-hinweise', label: 'Rechtliche Hinweise' },
] as const;

export default function ImpressumPage() {
  const c = COMPANY_INFO;

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-softWhite text-navy">
        <section className="mx-auto max-w-5xl px-5 pb-20 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+56px)] sm:px-8 sm:pb-24 sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+76px)]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-slate/75">
            <Link href="/" className="underline-offset-4 hover:text-premiumBlue hover:underline">
              Startseite
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span>Impressum</span>
          </nav>

          <header className="mt-8 border-b border-borderLight pb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-energyGreen/90">
              Rechtliche Anbieterkennzeichnung
            </p>
            <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.08] tracking-tight text-navy sm:text-[42px]">
              Impressum
            </h1>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-slate">
              Angaben gemäß § 5 Digitale-Dienste-Gesetz für das Internetangebot
              von AGI Energy.
            </p>
            <p className="mt-3 text-[13px] text-slate/70">Stand: {c.lastUpdated}</p>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <article className="space-y-10 text-[15.5px] leading-[1.78] text-slate">
              <LegalSection id="angaben" title="Angaben gemäß § 5 Digitale-Dienste-Gesetz">
                <AddressBlock>
                  <strong className="font-semibold text-navy">AGI Energy</strong>
                  <br />
                  ein Angebot von
                  <br />
                  {c.responsiblePerson}
                  <br />
                  {c.street}
                  <br />
                  {c.postalCity}
                  <br />
                  {c.country}
                </AddressBlock>

                <div className="mt-5 grid gap-3 rounded-elo border border-borderLight bg-white p-4 text-[14.5px] sm:grid-cols-2">
                  <p>
                    <span className="font-medium text-navy">E-Mail:</span>{' '}
                    <a
                      href={`mailto:${c.contactEmail}`}
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      {c.contactEmail}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-navy">Telefon:</span>{' '}
                    <a
                      href={phoneHref}
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      {c.contactPhone}
                    </a>
                  </p>
                  <p className="sm:col-span-2">
                    <span className="font-medium text-navy">Website:</span>{' '}
                    <a
                      href="https://www.agienergy.de"
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      https://www.agienergy.de
                    </a>
                  </p>
                </div>
              </LegalSection>

              <LegalSection id="anbieterin" title="Anbieterin dieses Internetangebots">
                <p>Anbieterin und Diensteanbieterin dieses Internetangebots ist:</p>
                <AddressBlock>
                  {c.responsiblePerson}
                  <br />
                  {c.street}
                  <br />
                  {c.postalCity}
                  <br />
                  {c.country}
                </AddressBlock>
              </LegalSection>

              <LegalSection
                id="verantwortliche"
                title="Inhaltlich Verantwortliche gemäß § 18 Abs. 2 MStV"
              >
                <AddressBlock>
                  {c.pressResponsible}
                  <br />
                  {c.street}
                  <br />
                  {c.postalCity}
                  <br />
                  {c.country}
                </AddressBlock>
              </LegalSection>

              <LegalSection id="leistungsbereich" title="Leistungsbereich">
                <p>
                  AGI Energy stellt Informationen und Kontaktmöglichkeiten im
                  Bereich persönlicher Energieprüfung bereit. Der Leistungsbereich
                  umfasst insbesondere Anfragen zu Strom, Gas, Photovoltaik,
                  Anbieterwechsel, Jahresabrechnungen, Verbrauchsoptimierung und
                  Gewerbeenergie.
                </p>
                <p>
                  Die Inhalte dieser Website dienen der ersten Information und
                  Kontaktaufnahme. Eine individuelle Prüfung, Empfehlung oder
                  Vermittlung erfolgt erst auf Grundlage der im Einzelfall
                  bereitgestellten Angaben.
                </p>
                <p>
                  AGI Energy ist kein Energieversorgungsunternehmen, kein
                  Netzbetreiber und kein anonymes Tarifportal. Konkrete Angebote,
                  Einsparpotenziale, Verfügbarkeiten und Konditionen hängen vom
                  jeweiligen Einzelfall, dem Standort, dem Verbrauchsprofil,
                  bestehenden Vertragsverhältnissen und den verfügbaren
                  Marktbedingungen ab.
                </p>
              </LegalSection>

              <LegalSection id="umsatzsteuer" title="Umsatzsteuer">
                {hasVatId ? (
                  <p>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27a
                    Umsatzsteuergesetz: {c.vatId}
                  </p>
                ) : (
                  <p>
                    Es besteht derzeit keine Umsatzsteuer-Identifikationsnummer
                    gemäß § 27a UStG.
                  </p>
                )}
              </LegalSection>

              <LegalSection id="technik" title="Technische Umsetzung und Verwaltung">
                <p>
                  Die technische Umsetzung, Wartung, Weiterentwicklung und
                  Verwaltung dieser Website kann durch externe technische
                  Dienstleister erfolgen, insbesondere AGI Works / Nexcel AI.
                </p>
                <p>
                  Technische Dienstleister handeln nicht als Anbieter dieses
                  Internetangebots, sondern ausschließlich im Rahmen der
                  technischen Bereitstellung, Verwaltung und Verarbeitung nach
                  Weisung der Anbieterin, soweit dies datenschutzrechtlich
                  erforderlich ist.
                </p>
              </LegalSection>

              <LegalSection id="haftung-inhalte" title="Haftung für Inhalte">
                <p>
                  Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt
                  erstellt. Dennoch übernehmen wir keine Gewähr für die Aktualität,
                  Vollständigkeit, Richtigkeit oder Verfügbarkeit der
                  bereitgestellten Informationen.
                </p>
                <p>
                  Als Diensteanbieterin ist {c.responsiblePerson} für eigene
                  Inhalte auf dieser Website nach den allgemeinen gesetzlichen
                  Vorschriften verantwortlich.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt.
                </p>
              </LegalSection>

              <LegalSection id="haftung-links" title="Haftung für externe Links">
                <p>
                  Diese Website kann Links zu externen Websites Dritter enthalten.
                  Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte der
                  verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                  verantwortlich.
                </p>
                <p>
                  Zum Zeitpunkt der Verlinkung wurden externe Inhalte auf
                  erkennbare Rechtsverstöße geprüft. Rechtswidrige Inhalte waren zu
                  diesem Zeitpunkt nicht erkennbar.
                </p>
                <p>
                  Eine permanente Kontrolle externer Links ist ohne konkrete
                  Hinweise auf Rechtsverletzungen nicht zumutbar. Bei Bekanntwerden
                  entsprechender Rechtsverletzungen werden betroffene Links
                  unverzüglich entfernt.
                </p>
              </LegalSection>

              <LegalSection id="urheberrecht" title="Urheberrecht">
                <p>
                  Die auf dieser Website veröffentlichten Inhalte, Texte,
                  Strukturen, Designs, Grafiken, Markenbestandteile, Bildwelten und
                  sonstigen Elemente unterliegen dem deutschen Urheberrecht und
                  sonstigen Schutzrechten.
                </p>
                <p>
                  Jede Nutzung, Vervielfältigung, Bearbeitung, öffentliche
                  Wiedergabe, Verbreitung oder sonstige Verwertung außerhalb der
                  gesetzlichen Grenzen bedarf der vorherigen schriftlichen
                  Zustimmung des jeweiligen Rechteinhabers.
                </p>
                <p>
                  Soweit Inhalte auf dieser Website nicht von der Anbieterin
                  erstellt wurden, werden Rechte Dritter beachtet und entsprechende
                  Inhalte gekennzeichnet. Sollten Sie dennoch auf eine mögliche
                  Rechtsverletzung aufmerksam werden, bitten wir um einen
                  entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
                  werden betroffene Inhalte unverzüglich geprüft und
                  erforderlichenfalls entfernt.
                </p>
              </LegalSection>

              <LegalSection id="streitbeilegung" title="Verbraucherstreitbeilegung">
                <p>
                  Wir sind nicht verpflichtet und nicht bereit, an
                  Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
                  teilzunehmen.
                </p>
              </LegalSection>

              <LegalSection id="datenschutz" title="Datenschutz">
                <p>
                  Informationen zur Verarbeitung personenbezogener Daten finden Sie
                  in unserer{' '}
                  <Link
                    href="/datenschutz"
                    className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
                <p>
                  Ergänzende Informationen zu Cookies finden Sie in der{' '}
                  <Link
                    href="/cookie-richtlinie"
                    className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                  >
                    Cookie-Richtlinie
                  </Link>
                  .
                </p>
              </LegalSection>

              <LegalSection id="rechtliche-hinweise" title="Kontakt bei rechtlichen Hinweisen">
                <p>
                  Bei rechtlichen Hinweisen zu dieser Website wenden Sie sich bitte
                  an:
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
              </LegalSection>
            </article>

            <aside className="lg:sticky lg:top-[calc(var(--agi-header-row)+2rem)]">
              <div className="rounded-eloLg border border-borderLight bg-white p-5 shadow-soft">
                <h2 className="font-display text-[17px] font-semibold text-navy">
                  Rechtliche Kurzangaben
                </h2>
                <dl className="mt-4 space-y-4 text-[13.5px] leading-relaxed">
                  <MetaItem label="Anbieterin">{c.responsiblePerson}</MetaItem>
                  <MetaItem label="Angebot">{c.legalName}</MetaItem>
                  <MetaItem label="Anschrift">
                    {c.street}
                    <br />
                    {c.postalCity}
                    <br />
                    {c.country}
                  </MetaItem>
                  <MetaItem label="Kontakt">
                    <a
                      href={`mailto:${c.contactEmail}`}
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      {c.contactEmail}
                    </a>
                    <br />
                    <a
                      href={phoneHref}
                      className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen"
                    >
                      {c.contactPhone}
                    </a>
                  </MetaItem>
                </dl>
              </div>

              <nav
                aria-label="Abschnitte im Impressum"
                className="mt-4 rounded-eloLg border border-borderLight bg-white p-5 shadow-soft"
              >
                <h2 className="font-display text-[17px] font-semibold text-navy">
                  Auf dieser Seite
                </h2>
                <ul className="mt-4 space-y-2.5 text-[13.5px] leading-snug">
                  {legalSections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-slate underline-offset-4 hover:text-premiumBlue hover:underline"
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AddressBlock({ children }: { children: React.ReactNode }) {
  return <address className="not-italic text-navy">{children}</address>;
}

function LegalSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <h2
        id={`${id}-title`}
        className="font-display text-[20px] font-semibold tracking-tight text-navy sm:text-[22px]"
      >
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate/65">
        {label}
      </dt>
      <dd className="mt-1 text-slate">{children}</dd>
    </div>
  );
}
