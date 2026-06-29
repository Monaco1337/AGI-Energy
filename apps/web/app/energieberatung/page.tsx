import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { CITIES } from '@/data/germanCities';
import { breadcrumbSchema, jsonLdScriptProps } from '@/lib/seoSchemas';

const PATH = '/energieberatung';

export const metadata: Metadata = {
  title: 'Energieberatung in Deutschland – persönlich, alle Städte',
  description:
    'Persönliche Energieberatung für Strom, Gas und Photovoltaik in über 100 deutschen Städten. Postleitzahlen-genaue Prüfung – ohne automatische Vertragsumstellung.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Energieberatung in ganz Deutschland',
    description: 'Persönliche Energieberatung in über 100 Städten – verständlich und ergebnisoffen.',
    url: PATH,
  },
};

const REGIONS = Array.from(new Set(CITIES.map((c) => c.region))).sort((a, b) =>
  a.localeCompare(b, 'de'),
);

export default function EnergieberatungIndexPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Energieberatung', path: PATH },
      ]))} />

      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <section className="mx-auto max-w-5xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-10">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
            Energieberatung Deutschland
          </p>
          <h1 className="mt-3 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-semibold text-navy leading-[1.1] tracking-tight">
            Persönliche Energieberatung in Ihrer Stadt.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] text-slate leading-[1.7]">
            Über 100 deutsche Städte mit eigener Energie-Übersicht: regionale
            Netzentgelte, lokale Versorgerlandschaft, postleitzahlen-genauer
            Tarif-Check. Wählen Sie Ihre Stadt oder Region.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-24 space-y-12">
          {REGIONS.map((region) => {
            const inRegion = CITIES.filter((c) => c.region === region).sort(
              (a, b) => b.population - a.population,
            );
            return (
              <section key={region}>
                <h2 className="font-display text-[20px] sm:text-[22px] font-semibold text-navy tracking-tight">
                  {region}
                  <span className="ml-2 text-[13px] font-normal text-slate/80">
                    · {inRegion.length} Städte
                  </span>
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {inRegion.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/energieberatung/${c.slug}`}
                        className="inline-flex items-center rounded-full border border-borderLight bg-white px-3.5 py-1.5 text-[13.5px] text-navy hover:border-energyGreen/60 transition"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
