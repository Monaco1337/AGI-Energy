import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { COMPANY_INFO } from '@/data/companyInfo';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | AGI Energy',
  description:
    'Datenschutzerklärung von AGI Energy – Informationen zur Verarbeitung personenbezogener Daten bei Website-Nutzung, Energieprüfungsanfragen, Rückruf, WhatsApp-Kontakt und Leadverarbeitung.',
  alternates: { canonical: 'https://www.agienergy.de/datenschutz' },
  robots: { index: true, follow: true },
};

const sections = [
  'Datenschutz auf einen Blick',
  'Verantwortliche Stelle',
  'Grundsätze der Datenverarbeitung',
  'Art und Zweck des Angebots',
  'Hosting und technische Bereitstellung',
  'Technische Dienstleister und Systemverwaltung',
  'Entwicklungs- und Versionsverwaltung',
  'SSL-/TLS-Verschlüsselung',
  'Energieprüfungsformular und Lead-Erfassung',
  'Kontaktaufnahme per Telefon',
  'Kontaktaufnahme per WhatsApp',
  'Kontaktaufnahme per E-Mail',
  'Interessenten- und Leadverwaltung',
  'Weiterleitung von Anfragen',
  'Einwilligungen im Formular',
  'Pflichtangaben und freiwillige Angaben',
  'Keine automatisierte Entscheidungsfindung',
  'Cookies und lokale Speichertechnologien',
  'Analyse, Tracking und Marketingtechnologien',
  'Social-Media-Verlinkungen',
  'Speicherdauer',
  'Datensicherheit',
  'Auftragsverarbeitung',
  'Drittlandübermittlungen',
  'Rechte der betroffenen Personen',
  'Widerruf von Einwilligungen',
  'Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen',
  'Beschwerderecht bei einer Aufsichtsbehörde',
  'Änderungen dieser Datenschutzerklärung',
] as const;

export default function DatenschutzPage() {
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
            <span>Datenschutzerklärung</span>
          </nav>

          <header className="mt-8 border-b border-borderLight pb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-energyGreen/90">
              Datenschutz & Leadverarbeitung
            </p>
            <h1 className="mt-3 font-display text-[32px] font-semibold leading-[1.08] tracking-tight text-navy sm:text-[42px]">
              Datenschutzerklärung
        </h1>
            <p className="mt-4 max-w-3xl text-[15.5px] leading-relaxed text-slate">
              Informationen zur Verarbeitung personenbezogener Daten bei der
              Nutzung der Website, bei Energieprüfungsanfragen, Rückruf,
              E-Mail-Kontakt, WhatsApp-Kontakt und Leadverarbeitung.
            </p>
            <p className="mt-3 text-[13px] text-slate/70">Stand: {c.lastUpdated}</p>
          </header>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <article className="space-y-10 text-[15.5px] leading-[1.78] text-slate">
              <LegalSection index={1} title="Datenschutz auf einen Blick">
                <p>
                  Der Schutz Ihrer personenbezogenen Daten ist für AGI Energy
                  besonders wichtig. Wir verarbeiten personenbezogene Daten
                  ausschließlich im Einklang mit den geltenden
                  datenschutzrechtlichen Vorschriften, insbesondere der
                  Datenschutz-Grundverordnung (DSGVO), dem Bundesdatenschutzgesetz
                  (BDSG), dem Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz
                  (TDDDG) sowie weiteren anwendbaren europäischen und nationalen
                  Datenschutzbestimmungen.
                </p>
                <p>
                  Diese Datenschutzerklärung informiert Sie über Art, Umfang,
                  Zwecke und Rechtsgrundlagen der Verarbeitung personenbezogener
                  Daten im Zusammenhang mit der Nutzung unserer Website, der
                  Kontaktaufnahme, der Anfrage einer persönlichen Energieprüfung,
                  der Bearbeitung von Strom-, Gas-, Photovoltaik- und
                  Gewerbeenergie-Anfragen, der Kontaktaufnahme per Telefon, E-Mail
                  oder WhatsApp sowie der Nutzung unserer digitalen Formular- und
                  Lead-Systeme.
                </p>
              </LegalSection>

              <LegalSection index={2} title="Verantwortliche Stelle">
                <p>Verantwortliche im Sinne von Art. 4 Nr. 7 DSGVO ist:</p>
                <address className="not-italic text-navy">
                  {c.responsiblePerson}
                  <br />
                  {c.street}
                  <br />
                  {c.postalCity}
                  <br />
                  {c.country}
                </address>
                <p>
                  Telefon:{' '}
                  <a href={`tel:${c.contactPhone.replace(/\s+/g, '')}`} className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    {c.contactPhone}
                  </a>
                  <br />
                  E-Mail:{' '}
                  <a href={`mailto:${c.contactEmail}`} className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    {c.contactEmail}
                  </a>
                  <br />
                  Website:{' '}
                  <a href="https://www.agienergy.de" className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    https://www.agienergy.de
                  </a>
                </p>
              </LegalSection>

              <LegalSection index={3} title="Grundsätze der Datenverarbeitung">
                <p>
                  Wir verarbeiten personenbezogene Daten ausschließlich nach den
                  Grundsätzen des Art. 5 DSGVO.
                </p>
                <Bullets
                  items={[
                    'Rechtmäßigkeit, Verarbeitung nach Treu und Glauben und Transparenz',
                    'Zweckbindung',
                    'Datenminimierung',
                    'Richtigkeit',
                    'Speicherbegrenzung',
                    'Integrität und Vertraulichkeit',
                    'Rechenschaftspflicht',
                  ]}
                />
                <p>
                  Personenbezogene Daten werden nur verarbeitet, soweit dies zur
                  Bereitstellung der Website, zur Bearbeitung Ihrer Anfrage, zur
                  Durchführung vorvertraglicher Maßnahmen, zur Kontaktaufnahme, zur
                  technischen Sicherheit, zur Dokumentation oder aufgrund
                  gesetzlicher Verpflichtungen erforderlich ist.
                </p>
              </LegalSection>

              <LegalSection index={4} title="Art und Zweck des Angebots">
                <p>
                  AGI Energy bietet digitale Kontaktmöglichkeiten und persönliche
                  Energieprüfungen in den Bereichen Strom, Gas, Photovoltaik,
                  Anbieterwechsel, Jahresabrechnung, Verbrauchsoptimierung und
                  Gewerbeenergie an.
                </p>
                <p>
                  Über unsere Website können Interessenten eine Anfrage stellen,
                  damit ihre Angaben geprüft und sie anschließend durch die
                  verantwortliche Anbieterin oder berechtigte Ansprechpartner
                  kontaktiert werden können.
                </p>
                <Bullets
                  items={[
                    'Bereitstellung der Website',
                    'Erfassung von Energieprüfungsanfragen',
                    'Prüfung und Einordnung der Anfrage',
                    'Kontaktaufnahme per Telefon, E-Mail oder WhatsApp',
                    'Vorbereitung einer persönlichen Energieprüfung',
                    'Bearbeitung von Anfragen zu Strom, Gas, Photovoltaik oder Gewerbeenergie',
                    'Dokumentation des Anfrageverlaufs',
                    'Organisation der Lead- und Interessentenverwaltung',
                    'Qualitätssicherung und Missbrauchsprävention',
                    'technische Absicherung des Systems',
                    'Erfüllung gesetzlicher Nachweis- und Dokumentationspflichten',
                  ]}
                />
              </LegalSection>

              <LegalSection index={5} title="Hosting und technische Bereitstellung">
                <p>
                  Unsere Website wird über Vercel Inc. bereitgestellt. Beim Besuch
                  unserer Website werden automatisch technische Zugriffsdaten
                  verarbeitet. Hierzu können insbesondere gehören:
                </p>
                <Bullets
                  items={[
                    'IP-Adresse',
                    'Browsertyp und Browserversion',
                    'Betriebssystem',
                    'Referrer-URL',
                    'Datum und Uhrzeit des Zugriffs',
                    'aufgerufene Seiten und Dateien',
                    'HTTP-Statuscodes',
                    'Server-Logdaten',
                    'technische Geräteinformationen',
                    'Ladezeiten und technische Fehlerdaten',
                  ]}
                />
                <p>
                  Die Verarbeitung erfolgt zur Bereitstellung der Website, zur
                  Systemsicherheit, zur Fehleranalyse, zur Missbrauchserkennung,
                  zur Stabilität des Betriebs sowie zur Optimierung der technischen
                  Verfügbarkeit.
                </p>
                <Law>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</Law>
                <p>
                  Unser berechtigtes Interesse liegt in der sicheren, stabilen und
                  technisch fehlerfreien Bereitstellung unserer Website. Soweit
                  personenbezogene Daten außerhalb der EU oder des EWR verarbeitet
                  werden, erfolgt dies nur auf Grundlage geeigneter Garantien gemäß
                  Art. 44 ff. DSGVO.
                </p>
              </LegalSection>

              <LegalSection index={6} title="Technische Dienstleister und Systemverwaltung">
                <p>
                  Zur technischen Umsetzung, Wartung, Weiterentwicklung,
                  Formularverarbeitung, Leadverwaltung, Systemadministration und
                  technischen Absicherung der Website können externe technische
                  Dienstleister eingesetzt werden.
                </p>
                <Bullets
                  items={[
                    'Hosting-Dienstleister',
                    'Webentwicklungs- und Wartungsdienstleister',
                    'CRM- oder Datenbankanbieter',
                    'E-Mail-Dienstleister',
                    'Formular- und Automatisierungsdienste',
                    'Sicherheits- und Monitoring-Dienste',
                    'Support- und Wartungsdienstleister',
                  ]}
                />
                <p>
                  Aktuell im Projektkontext erkennbar sind insbesondere Vercel für
                  Hosting, Neon/Vercel Postgres für Datenbankfunktionen und Resend
                  für transaktionale E-Mails, soweit der E-Mail-Versand aktiviert
                  ist. Diese Dienstleister handeln nicht als Anbieter des
                  Energieprüfungsangebots, sondern ausschließlich zur technischen
                  Bereitstellung, Verwaltung, Verarbeitung und Weiterleitung
                  eingehender Anfragen.
                </p>
                <Law>
                  Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO, Art. 6 Abs. 1
                  lit. f DSGVO, Art. 28 DSGVO.
                </Law>
              </LegalSection>

              <LegalSection index={7} title="Entwicklungs- und Versionsverwaltung">
                <p>
                  Zur Entwicklung, Wartung und technischen Verwaltung der Website
                  kann eine Entwicklungs- und Versionsverwaltungsplattform wie
                  GitHub eingesetzt werden. Diese dient der technischen Verwaltung
                  von Quellcode, Deployment-Prozessen, Fehlerbehebung, Wartung und
                  Weiterentwicklung der Website.
                </p>
                <p>
                  Eine Verarbeitung personenbezogener Besucherdaten über
                  Entwicklungsplattformen erfolgt im Rahmen des normalen
                  Websitebesuchs grundsätzlich nicht. Personenbezogene Daten dürfen
                  dort nur verarbeitet werden, wenn dies für technische
                  Fehleranalyse, Support, Wartung oder Sicherheitsprüfung
                  erforderlich ist und eine entsprechende Rechtsgrundlage besteht.
                </p>
                <Law>Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</Law>
              </LegalSection>

              <LegalSection index={8} title="SSL-/TLS-Verschlüsselung">
                <p>
                  Diese Website nutzt moderne SSL-/TLS-Verschlüsselung. Die
                  verschlüsselte Übertragung schützt die Kommunikation zwischen
                  Ihrem Endgerät und unserer Website vor unbefugtem Zugriff durch
                  Dritte. Eine verschlüsselte Verbindung erkennen Sie in der Regel
                  an der Adresszeile Ihres Browsers.
                </p>
              </LegalSection>

              <LegalSection index={9} title="Energieprüfungsformular und Lead-Erfassung">
                <p>
                  Über unsere Website können Sie eine Anfrage zur persönlichen
                  Energieprüfung stellen. Dabei können insbesondere folgende
                  personenbezogene Daten verarbeitet werden:
                </p>
                <Bullets
                  items={[
                    'Vorname und Nachname',
                    'Telefonnummer',
                    'E-Mail-Adresse',
                    'Wohnort oder Postleitzahl',
                    'gewünschter Kontaktweg',
                    'Interesse an Strom, Gas, Photovoltaik oder Gewerbeenergie',
                    'Angaben zu bestehendem Anbieter oder bestehendem Vertrag',
                    'Angaben zu Abschlag, Verbrauch, Jahresabrechnung oder Energiekosten',
                    'Zeitpunkt der Anfrage',
                    'Einwilligungsstatus, Formularversion und Consent-Version',
                    'technische Metadaten zur Anfrage',
                    'freiwillig übermittelte Zusatzinformationen',
                  ]}
                />
                <p>
                  Die Verarbeitung erfolgt ausschließlich zur Bearbeitung Ihrer
                  Anfrage, zur Prüfung Ihres Energiebedarfs, zur Vorbereitung einer
                  möglichen persönlichen Energieprüfung und zur anschließenden
                  Kontaktaufnahme.
                </p>
                <Law>
                  Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Soweit Angaben
                  freiwillig erfolgen oder zusätzliche Kommunikationswege wie
                  WhatsApp ausgewählt werden, kann die Verarbeitung zusätzlich auf
                  Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO beruhen.
                </Law>
              </LegalSection>

              <LegalSection index={10} title="Kontaktaufnahme per Telefon">
                <p>
                  Wenn Sie eine Anfrage über unsere Website stellen oder einen
                  Rückruf wünschen, können wir Sie telefonisch kontaktieren.
                  Dabei können insbesondere Name, Telefonnummer, Zeitpunkt der
                  Anfrage, gewünschter Rückrufzeitpunkt, Gesprächsnotizen,
                  Bearbeitungsstatus, Ergebnis der Kontaktaufnahme, Folgeaufgaben
                  und Wiedervorlagen verarbeitet werden.
                </p>
                <Law>
                  Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO und Art. 6 Abs. 1
                  lit. f DSGVO.
                </Law>
              </LegalSection>

              <LegalSection index={11} title="Kontaktaufnahme per WhatsApp">
                <p>
                  Sofern Sie ausdrücklich einwilligen oder WhatsApp als Kontaktweg
                  auswählen, können wir Sie über WhatsApp kontaktieren. Ohne klare
                  Einwilligung oder eindeutig gewählten WhatsApp-Kontaktweg erfolgt
                  keine WhatsApp-Kommunikation.
                </p>
                <Bullets
                  items={[
                    'Name',
                    'Telefonnummer',
                    'WhatsApp-Profilinformationen, soweit sichtbar',
                    'Nachrichteninhalte',
                    'Kommunikationszeitpunkte',
                    'Anfrage- und Bearbeitungsstatus',
                    'freiwillig übermittelte Dokumente, Bilder oder Zusatzinformationen',
                  ]}
                />
                <p>
                  Die Einwilligung ist jederzeit mit Wirkung für die Zukunft
                  widerrufbar, insbesondere per E-Mail an{' '}
                  <a href={`mailto:${c.contactEmail}`} className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    {c.contactEmail}
                  </a>{' '}
                  oder direkt über WhatsApp. Wenn Sie keine Kontaktaufnahme über
                  WhatsApp wünschen, können Sie Telefon oder E-Mail nutzen.
                </p>
                <p>
                  Bitte beachten Sie, dass bei der Nutzung von WhatsApp
                  personenbezogene Daten auch durch den Anbieter des
                  Kommunikationsdienstes verarbeitet werden können. Auf diese
                  eigenständige Datenverarbeitung haben wir keinen vollständigen
                  Einfluss.
                </p>
                <Law>Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO.</Law>
              </LegalSection>

              <LegalSection index={12} title="Kontaktaufnahme per E-Mail">
                <p>
                  Wenn Sie uns per E-Mail kontaktieren oder im Formular Ihre
                  E-Mail-Adresse angeben, verarbeiten wir Ihre Angaben zur
                  Bearbeitung Ihrer Anfrage. Hierzu können insbesondere Name,
                  E-Mail-Adresse, Nachrichteninhalt, Betreff, Kommunikationshistorie,
                  technische E-Mail-Metadaten und Zeitpunkt der Kontaktaufnahme
                  gehören.
                </p>
                <Law>
                  Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO und Art. 6 Abs. 1
                  lit. f DSGVO.
                </Law>
              </LegalSection>

              <LegalSection index={13} title="Interessenten- und Leadverwaltung">
                <p>
                  Zur Bearbeitung, Organisation und Nachverfolgung eingehender
                  Anfragen können personenbezogene Daten in internen Verwaltungs-,
                  CRM- oder Lead-Systemen gespeichert werden.
                </p>
                <Bullets
                  items={[
                    'Stammdaten und Kontaktdaten',
                    'Anfragehistorie und Kommunikationsverlauf',
                    'Interessenbereich und Energieart',
                    'Bearbeitungsstatus, Kontaktversuche, Wiedervorlagen und Notizen',
                    'Einwilligungsnachweise und technische Übermittlungsdaten',
                    'Leadquelle, Landingpage, UTM-Parameter und Referrer-Informationen',
                    'Zeitstempel und Bearbeiterinformationen',
                  ]}
                />
                <p>
                  Die Speicherung erfolgt zur strukturierten Bearbeitung Ihrer
                  Anfrage, zur Kontaktaufnahme, zur Qualitätssicherung, zur
                  Nachweisbarkeit der Einwilligung, zur Missbrauchsprävention und
                  zur internen Organisation.
                </p>
                <Law>
                  Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO und Art. 6 Abs. 1
                  lit. f DSGVO.
                </Law>
              </LegalSection>

              <LegalSection index={14} title="Weiterleitung von Anfragen">
                <p>
                  Eingehende Anfragen werden grundsätzlich an die verantwortliche
                  Anbieterin {c.responsiblePerson} weitergeleitet oder durch
                  berechtigte Personen in ihrem Auftrag bearbeitet. Eine Weitergabe
                  an weitere Dritte erfolgt nur, soweit dies zur Bearbeitung Ihrer
                  Anfrage erforderlich ist, gesetzlich erlaubt ist oder Sie
                  ausdrücklich eingewilligt haben.
                </p>
                <Bullets
                  items={[
                    `${c.responsiblePerson} als verantwortliche Anbieterin`,
                    'berechtigte interne oder externe Ansprechpartner zur Anfragebearbeitung',
                    'technische Dienstleister',
                    'Hosting- und IT-Dienstleister',
                    'CRM- oder Formularsystemanbieter',
                    'E-Mail- und Kommunikationsdienstleister',
                    'Energie- oder Photovoltaik-Ansprechpartner, sofern dies für die gewünschte Anfragebearbeitung erforderlich ist oder von Ihnen gewünscht wurde',
                  ]}
                />
                <Law>
                  Rechtsgrundlagen: Art. 6 Abs. 1 lit. b DSGVO, Art. 6 Abs. 1
                  lit. a DSGVO und Art. 6 Abs. 1 lit. f DSGVO.
                </Law>
              </LegalSection>

              <LegalSection index={15} title="Einwilligungen im Formular">
                <p>
                  Vor dem Absenden bestimmter Formulare kann es erforderlich sein,
                  dass Sie Hinweise bestätigen oder Einwilligungen erteilen. Dies
                  betrifft insbesondere die Kenntnisnahme der Datenschutzerklärung,
                  die Verarbeitung Ihrer Angaben zur Bearbeitung der
                  Energieprüfungsanfrage, die Kontaktaufnahme per Telefon oder
                  E-Mail, die optionale Kontaktaufnahme per WhatsApp und, soweit
                  genutzt, die Weiterleitung an berechtigte Ansprechpartner.
                </p>
                <p>
                  Einwilligungen werden protokolliert, um die Rechtmäßigkeit der
                  Verarbeitung nachweisen zu können. Hierbei können insbesondere
                  Einwilligungstext, Zeitpunkt, Formularversion, Consent-Version,
                  IP-Hash oder technische Anfragekennung, ausgewählte Kontaktwege,
                  Herkunft der Anfrage und UTM-Parameter gespeichert werden.
                </p>
                <Law>
                  Rechtsgrundlagen: Art. 6 Abs. 1 lit. a DSGVO, Art. 7 DSGVO und
                  Art. 6 Abs. 1 lit. f DSGVO.
                </Law>
              </LegalSection>

              <LegalSection index={16} title="Pflichtangaben und freiwillige Angaben">
                <p>
                  Bestimmte Angaben sind erforderlich, damit wir Ihre Anfrage
                  bearbeiten und Sie kontaktieren können. Erforderlich können
                  insbesondere Name, Telefonnummer oder E-Mail-Adresse, gewünschter
                  Kontaktweg und grundlegende Angaben zum Anliegen sein.
                </p>
                <p>
                  Weitere Angaben, insbesondere detaillierte Informationen zu
                  Verbrauch, Anbieter, Vertragsdaten, Jahresabrechnungen oder
                  Zusatzinformationen, erfolgen freiwillig, können aber für eine
                  sachgerechte Energieprüfung erforderlich sein. Wenn erforderliche
                  Angaben nicht bereitgestellt werden, kann Ihre Anfrage
                  möglicherweise nicht oder nur eingeschränkt bearbeitet werden.
                </p>
              </LegalSection>

              <LegalSection index={17} title="Keine automatisierte Entscheidungsfindung">
                <p>
                  Eine automatisierte Entscheidungsfindung einschließlich Profiling
                  im Sinne von Art. 22 DSGVO findet nicht statt. Anfragen können
                  technisch sortiert, kategorisiert oder priorisiert werden, um
                  eine effiziente Bearbeitung zu ermöglichen. Eine rechtlich
                  relevante Entscheidung ausschließlich auf Grundlage
                  automatisierter Verarbeitung erfolgt nicht.
                </p>
              </LegalSection>

              <LegalSection index={18} title="Cookies und lokale Speichertechnologien">
                <p>
                  Unsere Website verwendet technisch notwendige Cookies und
                  vergleichbare lokale Speichertechnologien. Diese dienen
                  insbesondere der technischen Bereitstellung der Website, der
                  Sicherheit, der Speicherung von Einstellungen, der
                  Formularfunktionalität, der Verbesserung der Benutzerfreundlichkeit
                  und dem Schutz vor Missbrauch.
                </p>
                <Law>
                  Rechtsgrundlagen: § 25 Abs. 2 TDDDG und Art. 6 Abs. 1 lit. f
                  DSGVO. Sofern Analyse-, Komfort-, Tracking- oder
                  Marketingtechnologien eingesetzt werden, erfolgt dies
                  ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung
                  nach § 25 Abs. 1 TDDDG und Art. 6 Abs. 1 lit. a DSGVO.
                </Law>
                <p>
                  Einzelheiten finden Sie in unserer{' '}
                  <Link href="/cookie-richtlinie" className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    Cookie-Richtlinie
                  </Link>
            .
          </p>
              </LegalSection>

              <LegalSection index={19} title="Analyse, Tracking und Marketingtechnologien">
                <p>
                  Nach aktuellem Projektstand werden keine externen Marketing-Pixel
                  wie Meta Pixel und keine externen Analyse-Systeme wie Google
                  Analytics geladen. First-Party-Informationen wie UTM-Parameter,
                  Referrer und Empfehlungscodes können zur internen
                  Erfolgsmessung und Zuordnung einer Anfrage verarbeitet werden.
                </p>
                <p>
                  Sofern künftig Analyse-, Tracking-, Remarketing- oder
                  Marketingtechnologien eingesetzt werden, erfolgt der Einsatz nur
                  nach vorheriger Einwilligung. Anbieter, Zwecke, Datenkategorien,
                  Rechtsgrundlagen und mögliche Drittlandübermittlungen werden dann
                  konkret ergänzt.
                </p>
              </LegalSection>

              <LegalSection index={20} title="Social-Media-Verlinkungen">
                <p>
                  Unsere Website kann Verlinkungen zu sozialen Netzwerken oder
                  externen Plattformen enthalten. Beim bloßen Besuch unserer
                  Website werden dadurch keine personenbezogenen Daten an die
                  jeweiligen Anbieter übertragen. Eine Datenübermittlung erfolgt
                  erst, wenn Sie den entsprechenden Link aktiv anklicken oder eine
                  externe Plattform nutzen. Für die Datenverarbeitung auf den
                  verlinkten Plattformen ist grundsätzlich der jeweilige Anbieter
                  verantwortlich.
                </p>
              </LegalSection>

              <LegalSection index={21} title="Speicherdauer">
                <p>
                  Wir speichern personenbezogene Daten nur so lange, wie dies für
                  die jeweiligen Zwecke erforderlich ist.
                </p>
                <Bullets
                  items={[
                    'Kontakt- und Energieprüfungsanfragen: bis zur abschließenden Bearbeitung und darüber hinaus, soweit Dokumentations-, Nachweis- oder berechtigte Interessen bestehen',
                    'Kommunikationsdaten: solange dies für Bearbeitung, Nachverfolgung, Qualitätssicherung oder Nachweiszwecke erforderlich ist',
                    'Einwilligungsnachweise: solange dies zur rechtlichen Nachweisbarkeit erforderlich ist',
                    'Server-Logdaten: grundsätzlich maximal 30 Tage, soweit keine längere Speicherung aus Sicherheitsgründen erforderlich ist',
                    'gesetzlich relevante Unterlagen: entsprechend gesetzlicher Aufbewahrungspflichten',
                    'Daten zu widerrufenen Einwilligungen: soweit erforderlich zur Dokumentation des Widerrufs und zur Sicherstellung, dass keine weitere einwilligungsbasierte Verarbeitung erfolgt',
                  ]}
                />
              </LegalSection>

              <LegalSection index={22} title="Datensicherheit">
                <p>
                  Wir treffen technische und organisatorische Maßnahmen gemäß Art.
                  32 DSGVO, um ein dem Risiko angemessenes Schutzniveau
                  sicherzustellen.
                </p>
                <Bullets
                  items={[
                    'SSL-/TLS-Verschlüsselung',
                    'rollenbasierte Berechtigungskonzepte',
                    'Zugriffskontrollen und Zugriffsbeschränkungen',
                    'Protokollierungen',
                    'technische Systemüberwachung',
                    'sichere Formularverarbeitung',
                    'Schutz vor unbefugtem Zugriff',
                    'regelmäßige Sicherheitsupdates',
                    'Backups und Wiederherstellungskonzepte',
                    'Begrenzung von Zugriffsrechten auf erforderliche Personen',
                    'organisatorische Vertraulichkeitsmaßnahmen',
                  ]}
                />
              </LegalSection>

              <LegalSection index={23} title="Auftragsverarbeitung">
                <p>
                  Wir setzen externe Dienstleister ein, die personenbezogene Daten
                  ausschließlich in unserem Auftrag und auf Grundlage geeigneter
                  vertraglicher Vereinbarungen verarbeiten. Soweit Dienstleister
                  personenbezogene Daten in unserem Auftrag verarbeiten, erfolgt
                  dies auf Grundlage eines Auftragsverarbeitungsvertrages gemäß
                  Art. 28 DSGVO.
                </p>
                <div className="mt-4 grid gap-3">
                  {c.processors.map((processor) => (
                    <div key={processor.name} className="rounded-elo border border-borderLight bg-white p-4">
                      <p className="font-semibold text-navy">{processor.name}</p>
                      <p className="mt-1 text-[13.5px]">Zweck: {processor.purpose}</p>
                      <p className="mt-1 text-[13.5px]">Standort: {processor.location}</p>
                      <p className="mt-1 text-[13.5px]">Grundlage: {processor.basis}</p>
                    </div>
                  ))}
                </div>
              </LegalSection>

              <LegalSection index={24} title="Drittlandübermittlungen">
                <p>
                  Sofern personenbezogene Daten an Dienstleister oder Anbieter
                  außerhalb der Europäischen Union oder des Europäischen
                  Wirtschaftsraums übermittelt werden, erfolgt dies nur, soweit
                  hierfür eine gesetzliche Grundlage besteht.
                </p>
                <Bullets
                  items={[
                    'Angemessenheitsbeschluss der Europäischen Kommission',
                    'EU-Standardvertragsklauseln',
                    'zusätzliche technische und organisatorische Schutzmaßnahmen',
                    'ausdrückliche Einwilligung, soweit erforderlich',
                    'sonstige gesetzlich zulässige Garantien gemäß Art. 44 ff. DSGVO',
                  ]}
                />
              </LegalSection>

              <LegalSection index={25} title="Rechte der betroffenen Personen">
                <p>Sie haben nach Maßgabe der gesetzlichen Vorschriften jederzeit folgende Rechte:</p>
                <Bullets
                  items={[
                    'Recht auf Auskunft gemäß Art. 15 DSGVO',
                    'Recht auf Berichtigung gemäß Art. 16 DSGVO',
                    'Recht auf Löschung gemäß Art. 17 DSGVO',
                    'Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO',
                    'Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO',
                    'Recht auf Widerspruch gemäß Art. 21 DSGVO',
                    'Recht auf Widerruf erteilter Einwilligungen gemäß Art. 7 Abs. 3 DSGVO',
                    'Recht auf Beschwerde bei einer Datenschutzaufsichtsbehörde',
                  ]}
                />
                <p>
                  Zur Wahrnehmung Ihrer Rechte können Sie sich jederzeit an{' '}
                  <a href={`mailto:${c.contactEmail}`} className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    {c.contactEmail}
                  </a>{' '}
                  wenden.
                </p>
              </LegalSection>

              <LegalSection index={26} title="Widerruf von Einwilligungen">
                <p>
                  Sie können eine erteilte Einwilligung jederzeit mit Wirkung für
                  die Zukunft widerrufen. Der Widerruf berührt nicht die
                  Rechtmäßigkeit der Verarbeitung, die bis zum Widerruf auf
                  Grundlage der Einwilligung erfolgt ist.
                </p>
                <p>
                  Ein Widerruf kann insbesondere per E-Mail an{' '}
                  <a href={`mailto:${c.contactEmail}`} className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    {c.contactEmail}
                  </a>{' '}
                  oder über die im jeweiligen Kommunikationskanal bereitgestellten
                  Kontaktmöglichkeiten erfolgen.
                </p>
              </LegalSection>

              <LegalSection
                index={27}
                title="Widerspruch gegen Verarbeitung auf Grundlage berechtigter Interessen"
              >
                <p>
                  Wenn wir personenbezogene Daten auf Grundlage von Art. 6 Abs. 1
                  lit. f DSGVO verarbeiten, haben Sie das Recht, aus Gründen, die
                  sich aus Ihrer besonderen Situation ergeben, jederzeit Widerspruch
                  gegen diese Verarbeitung einzulegen.
                </p>
                <p>
                  Im Falle eines Widerspruchs verarbeiten wir die betroffenen
                  personenbezogenen Daten nicht mehr, es sei denn, wir können
                  zwingende schutzwürdige Gründe für die Verarbeitung nachweisen
                  oder die Verarbeitung dient der Geltendmachung, Ausübung oder
                  Verteidigung von Rechtsansprüchen.
                </p>
              </LegalSection>

              <LegalSection index={28} title="Beschwerderecht bei einer Aufsichtsbehörde">
                <p>
                  Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde
                  zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung
                  Ihrer personenbezogenen Daten gegen Datenschutzrecht verstößt.
                </p>
                <p>
                  Zuständige Datenschutzaufsichtsbehörde in Nordrhein-Westfalen:
                </p>
                <address className="not-italic text-navy">
                  Landesbeauftragte für Datenschutz und Informationsfreiheit
                  Nordrhein-Westfalen
                  <br />
                  Kavalleriestraße 2–4
                  <br />
                  40213 Düsseldorf
                  <br />
                  Deutschland
                  <br />
                  Website:{' '}
                  <a href="https://www.ldi.nrw.de" className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    https://www.ldi.nrw.de
                  </a>
                </address>
              </LegalSection>

              <LegalSection index={29} title="Änderungen dieser Datenschutzerklärung">
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                  sofern dies aufgrund technischer, organisatorischer, rechtlicher
                  oder wirtschaftlicher Änderungen erforderlich wird. Es gilt
                  jeweils die aktuelle auf unserer Website veröffentlichte Fassung.
                </p>
              </LegalSection>
            </article>

            <aside className="lg:sticky lg:top-[calc(var(--agi-header-row)+2rem)]">
              <div className="rounded-eloLg border border-borderLight bg-white p-5 shadow-soft">
                <h2 className="font-display text-[17px] font-semibold text-navy">
                  Verantwortliche Stelle
                </h2>
                <p className="mt-4 text-[13.5px] leading-relaxed text-slate">
                  {c.responsiblePerson}
                  <br />
                  {c.street}
                  <br />
                  {c.postalCity}
                  <br />
                  {c.country}
                </p>
                <p className="mt-4 text-[13.5px] leading-relaxed">
                  <a href={`mailto:${c.contactEmail}`} className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    {c.contactEmail}
                  </a>
                  <br />
                  <a href={`tel:${c.contactPhone.replace(/\s+/g, '')}`} className="text-premiumBlue underline underline-offset-4 hover:text-energyGreen">
                    {c.contactPhone}
                  </a>
          </p>
        </div>

              <nav
                aria-label="Abschnitte der Datenschutzerklärung"
                className="mt-4 max-h-[calc(100vh-var(--agi-header-row)-7rem)] overflow-auto rounded-eloLg border border-borderLight bg-white p-5 shadow-soft"
              >
                <h2 className="font-display text-[17px] font-semibold text-navy">
                  Auf dieser Seite
                </h2>
                <ol className="mt-4 space-y-2.5 text-[13.5px] leading-snug">
                  {sections.map((title, index) => (
                    <li key={title}>
                      <a
                        href={`#${sectionId(index + 1, title)}`}
                        className="text-slate underline-offset-4 hover:text-premiumBlue hover:underline"
                      >
                        {index + 1}. {title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function LegalSection({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  const id = sectionId(index, title);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <h2
        id={`${id}-title`}
        className="font-display text-[20px] font-semibold tracking-tight text-navy sm:text-[22px]"
      >
        {index}. {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-1.5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Law({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-elo border border-borderLight bg-white px-4 py-3 text-[14px] text-navy">
      {children}
    </p>
  );
}

function sectionId(index: number, title: string): string {
  return `${index}-${title
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;
}
