import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FinalCta } from '@/components/landing/FinalCta';
import { EnergyLeadForm } from '@/components/landing/EnergyLeadForm';
import { StickyMobileCta } from '@/components/landing/StickyMobileCta';
import { CITIES, getCity, getNearbyCities } from '@/data/germanCities';
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
  localBusinessSchema,
  serviceSchema,
} from '@/lib/seoSchemas';
import { pickArticlesForCity } from '@/lib/contentDiscovery';

export function generateStaticParams() {
  return CITIES.map((c) => ({ stadt: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ stadt: string }> },
): Promise<Metadata> {
  const { stadt } = await params;
  const city = getCity(stadt);
  if (!city) return { title: 'Stadt nicht gefunden' };
  const path = `/energieberatung/${city.slug}`;
  return {
    title: `Energieberatung ${city.name} – persönliche Prüfung für Strom, Gas, PV`,
    description: `Persönliche Energieberatung für Strom, Gas, Photovoltaik und Gewerbe in ${city.name} und Umgebung. Unverbindlich, DSGVO-konform, ohne automatische Vertragsumstellung.`,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      title: `Energieberatung ${city.name} – AGI Energy`,
      description: `Persönliche Energieprüfung für Privathaushalte und Gewerbe in ${city.name}.`,
      url: path,
    },
  };
}

export default async function StadtPage(
  { params }: { params: Promise<{ stadt: string }> },
) {
  const { stadt } = await params;
  const city = getCity(stadt);
  if (!city) notFound();

  const path = `/energieberatung/${city.slug}`;
  const nearby = getNearbyCities(city, 6);
  const cityArticles = pickArticlesForCity(3);

  const localFaqs = [
    {
      q: `Wie persönlich erfolgt die Beratung in ${city.name}?`,
      a: `Sie senden uns Ihre Eckdaten – optional die Jahresabrechnung. Wir prüfen Ihre Situation persönlich und melden uns innerhalb von 24 Stunden an Werktagen per Telefon oder E-Mail. Eine Vor-Ort-Beratung ist nicht zwingend nötig, kann auf Wunsch aber arrangiert werden.`,
    },
    {
      q: `Kennt AGI Energy die regionalen Besonderheiten in ${city.region}?`,
      a: `Netzentgelte und regionale Tarifoptionen variieren in ${city.region}. Wir berücksichtigen Ihre Postleitzahl (${city.postalCodePrefix}xxx) bei der Prüfung, da Netzentgelte etwa 25-30 % des Strompreises ausmachen und sich pro Region deutlich unterscheiden.`,
    },
    {
      q: `Welche Themen passen in ${city.name} besonders?`,
      a: `Neben klassischer Strom- und Gasvertragsprüfung lohnt sich in vielen Lagen von ${city.name} eine Photovoltaik-Wirtschaftlichkeitsprüfung. Für Gewerbebetriebe ist zudem eine Lastprofil-Analyse interessant – insbesondere bei Verbräuchen über 100.000 kWh/Jahr.`,
    },
    {
      q: `Werden meine Daten an Dritte in ${city.name} weitergegeben?`,
      a: `Nein. Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nur dann an einen konkreten Anbieter weitergegeben, wenn Sie einen Wechsel ausdrücklich beauftragen. DSGVO-konform, EU-Server.`,
    },
  ];

  return (
    <>
      <script {...jsonLdScriptProps(localBusinessSchema({
        path,
        city: city.name,
        region: city.region,
        postalCodePrefix: city.postalCodePrefix,
        lat: city.lat,
        lng: city.lng,
      }))} />
      <script {...jsonLdScriptProps(serviceSchema({
        path,
        name: `Energieberatung in ${city.name}`,
        description: `Persönliche Energieberatung für Strom, Gas, Photovoltaik und Gewerbe in ${city.name} und Umgebung.`,
        serviceType: 'Lokale Energieberatung',
      }))} />
      <script {...jsonLdScriptProps(faqSchema(localFaqs))} />
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Energieberatung', path: '/energieberatung' },
        { name: city.name, path },
      ]))} />

      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        {/* Hero */}
        <section className="relative overflow-hidden bg-premium-dark agi-hero-bleed-under-nav pb-16 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" aria-hidden />
          <div
            className="pointer-events-none absolute -top-32 -left-24 size-[520px] rounded-full bg-warmAmber/10 blur-[120px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute top-1/3 -right-24 size-[420px] rounded-full bg-cyan/8 blur-[120px]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+112px)]">
            <p className="text-[11px] font-medium tracking-[0.22em] text-warmAmber/85 uppercase">
              Energieberatung · {city.region}
            </p>
            <h1 className="mt-3 font-display text-[30px] sm:text-[42px] lg:text-[48px] font-semibold text-softWhite leading-[1.08] tracking-tight max-w-3xl">
              Energieberatung in {city.name} – persönlich geprüft.
            </h1>
            <p className="mt-5 text-[16px] sm:text-[17px] text-softWhite/72 leading-[1.7] max-w-2xl font-light">
              Strom, Gas, Photovoltaik und Gewerbeenergie für {city.name} und
              Umgebung. Persönliche Prüfung statt anonymem Tarifportal – mit
              Blick auf Ihre konkrete Situation, Postleitzahl und regionale
              Netzentgelte.
            </p>
          </div>
        </section>

        {/* Editorial */}
        <section className="border-b border-white/[0.06] bg-premium-dark">
          <div className="mx-auto max-w-6xl px-5 lg:px-8 py-[72px] sm:py-[92px]">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#39d8e8]/90 uppercase">
              {city.name} im Detail
            </p>
            <h2 className="mt-3 font-display text-[28px] sm:text-[36px] font-semibold text-[#f7fbff] tracking-[-0.02em] leading-[1.1] max-w-3xl">
              Was bei einer Energie­prüfung in {city.name} zählt
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] text-[rgba(235,245,250,0.74)] leading-[1.75]">
              Energie ist regional. Netzentgelte, lokale Versorgerlandschaft und
              Photovoltaik-Bedingungen unterscheiden sich – wir berücksichtigen
              das.
            </p>

            <div className="mt-11 grid gap-5 md:grid-cols-2">
              <div className="premium-glass-card topic-editorial-panel">
                <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#f7fbff] tracking-tight leading-snug">
                  Was wir konkret prüfen
                </h3>
                <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-[rgba(235,245,250,0.78)]">
                  <li className="flex gap-3.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]" aria-hidden />
                    <span>Netzentgelte im Postleitzahlenraum {city.postalCodePrefix}xxx</span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]" aria-hidden />
                    <span>Lokale Grundversorger und Wettbewerb in {city.region}</span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]" aria-hidden />
                    <span>Verbrauch und Tarifoptionen in Ihrer konkreten Wohnsituation</span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]" aria-hidden />
                    <span>Photovoltaik-Wirtschaftlichkeit basierend auf regionalen Ertragsdaten</span>
                  </li>
                </ul>
              </div>
              <div className="premium-glass-card topic-editorial-panel">
                <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#f7fbff] tracking-tight leading-snug">
                  Woran Sie uns erkennen
                </h3>
                <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-[rgba(235,245,250,0.78)]">
                  <li className="flex gap-3.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]" aria-hidden />
                    <span>Keine automatische Vertragsumstellung, keine Verpflichtung</span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]" aria-hidden />
                    <span>Persönlicher Ansprechpartner statt Callcenter</span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]" aria-hidden />
                    <span>DSGVO-konforme Bearbeitung, EU-Server</span>
                  </li>
                  <li className="flex gap-3.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]" aria-hidden />
                    <span>Rückmeldung innerhalb von 24 Stunden an Werktagen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="bg-softWhite py-[72px] sm:py-[96px] scroll-mt-24" aria-label="Kontaktformular">
          <div className="mx-auto max-w-lg px-5 lg:px-8">
            <EnergyLeadForm defaultCategory="strom" />
          </div>
        </section>

        {/* Local FAQ */}
        <section className="bg-softWhite border-t border-borderLight">
          <div className="mx-auto max-w-3xl px-5 lg:px-8 py-16 sm:py-20">
            <h2 className="font-display text-[22px] sm:text-[28px] font-semibold text-navy tracking-tight">
              Fragen zur Energieberatung in {city.name}
            </h2>
            <div className="mt-6 divide-y divide-borderLight rounded-elo border border-borderLight bg-white">
              {localFaqs.map((it) => (
                <details key={it.q} className="group px-5 py-4 sm:px-6 sm:py-5">
                  <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
                    <span className="text-[16px] font-semibold text-navy leading-snug">
                      {it.q}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-borderLight text-[14px] text-slate group-open:rotate-45 transition"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-[1.7] text-slate">
                    {it.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Passende Ratgeber */}
        {cityArticles.length > 0 ? (
          <section className="bg-softWhite border-t border-borderLight">
            <div className="mx-auto max-w-5xl px-5 lg:px-8 py-14 sm:py-16">
              <h2 className="font-display text-[20px] sm:text-[24px] font-semibold text-navy tracking-tight">
                Vor der Beratung lesen: kompakte Ratgeber
              </h2>
              <p className="mt-3 max-w-2xl text-[14.5px] text-slate leading-relaxed">
                Wenn Sie sich vorab orientieren wollen, finden Sie hier kurze,
                herstellerunabhängige Erklärungen zu den wichtigsten Themen rund um
                Strom, Gas und Vertragswechsel.
              </p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cityArticles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/ratgeber/${a.slug}`}
                      className="block h-full rounded-elo border border-borderLight bg-white p-5 hover:border-energyGreen/60 transition"
                    >
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-energyGreen/90">
                        {a.category} · {a.readingMinutes} Min
                      </span>
                      <span className="mt-2 block text-[15.5px] font-semibold text-navy leading-snug">
                        {a.title}
                      </span>
                      <span className="mt-2 block text-[13.5px] text-slate leading-relaxed line-clamp-3">
                        {a.description}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Nachbarstaedte */}
        {nearby.length > 0 ? (
          <section className="bg-softWhite border-t border-borderLight">
            <div className="mx-auto max-w-5xl px-5 lg:px-8 py-14 sm:py-16">
              <h2 className="font-display text-[18px] sm:text-[20px] font-semibold text-navy tracking-tight">
                Energieberatung auch in der Umgebung von {city.name}
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {nearby.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/energieberatung/${n.slug}`}
                      className="inline-flex items-center rounded-full border border-borderLight bg-white px-3.5 py-1.5 text-[13.5px] text-navy hover:border-energyGreen/60 transition"
                    >
                      Energieberatung {n.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[13px] text-slate/80">
                <Link href="/energieberatung" className="underline hover:text-navy">
                  Alle Städte ansehen
                </Link>
              </p>
            </div>
          </section>
        ) : null}

        <FinalCta />
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
