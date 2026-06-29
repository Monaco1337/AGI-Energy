import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { glossaryByCategory } from '@/data/energyGlossary';
import { breadcrumbSchema, jsonLdScriptProps } from '@/lib/seoSchemas';

const PATH = '/glossar';

export const metadata: Metadata = {
  title: 'Energie-Glossar – Fachbegriffe verständlich erklärt',
  description:
    'Verständliche Erklärungen zu Strom-, Gas- und Photovoltaik-Fachbegriffen. Von Arbeitspreis bis Zustandszahl – kompakt und ergebnisoffen.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Energie-Glossar – AGI Energy',
    description: 'Fachbegriffe zu Strom, Gas und Photovoltaik – verständlich erklärt.',
    url: PATH,
  },
};

const CATEGORY_ORDER: Array<keyof ReturnType<typeof glossaryByCategory>> = [
  'Vertrag',
  'Strom',
  'Gas',
  'Photovoltaik',
  'Technik',
  'Recht',
  'Gewerbe',
];

export default function GlossarIndexPage() {
  const grouped = glossaryByCategory();

  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Glossar', path: PATH },
      ]))} />

      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <section className="mx-auto max-w-5xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-10">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
            Glossar
          </p>
          <h1 className="mt-3 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-semibold text-navy leading-[1.1] tracking-tight">
            Fachbegriffe verständlich erklärt.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] text-slate leading-[1.7]">
            Von Arbeitspreis bis Zustandszahl – die wichtigsten Begriffe rund um
            Strom, Gas, Photovoltaik und Energieverträge, kompakt und
            ergebnisoffen.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-24 space-y-14">
          {CATEGORY_ORDER.map((cat) => {
            const entries = grouped[cat];
            if (!entries?.length) return null;
            return (
              <section key={cat}>
                <h2 className="font-display text-[20px] sm:text-[24px] font-semibold text-navy tracking-tight">
                  {cat}
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {entries.map((e) => (
                    <Link
                      key={e.slug}
                      href={`/glossar/${e.slug}`}
                      className="group block rounded-elo border border-borderLight bg-white p-4 hover:border-energyGreen/60 transition"
                    >
                      <h3 className="text-[15px] font-semibold text-navy leading-snug">
                        {e.term}
                      </h3>
                      <p className="mt-2 text-[13.5px] text-slate leading-relaxed line-clamp-3">
                        {e.shortDefinition}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
