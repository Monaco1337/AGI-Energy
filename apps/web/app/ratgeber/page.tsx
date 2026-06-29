import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { RATGEBER_ARTICLES } from '@/data/ratgeberArticles';
import { breadcrumbSchema, jsonLdScriptProps } from '@/lib/seoSchemas';

const PATH = '/ratgeber';

export const metadata: Metadata = {
  title: 'Ratgeber – Energie ehrlich erklärt',
  description:
    'Verständliche Artikel zu Stromabrechnung, Anbieterwechsel und Photovoltaik – ohne Werbeversprechen, ergebnisoffen, aufklärend.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Energie-Ratgeber – AGI Energy',
    description:
      'Verständliche Artikel zu Strom, Gas, Anbieterwechsel und Photovoltaik – ergebnisoffen erklärt.',
    url: PATH,
  },
};

export default function RatgeberIndexPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Ratgeber', path: PATH },
      ]))} />

      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <section className="mx-auto max-w-5xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-10">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
            Ratgeber
          </p>
          <h1 className="mt-3 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-semibold text-navy leading-[1.1] tracking-tight">
            Energie ehrlich erklärt.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] text-slate leading-[1.7]">
            Verständliche Artikel zu Strom, Gas, Anbieterwechsel und Photovoltaik
            – ergebnisoffen formuliert, ohne Werbeversprechen. Wenn Sie ein Thema
            vermissen, schreiben Sie uns gerne.
          </p>
        </section>

        <section className="mx-auto max-w-5xl px-5 lg:px-8 pb-24">
          <div className="grid gap-5 sm:grid-cols-2">
            {RATGEBER_ARTICLES.map((a) => (
              <Link
                key={a.slug}
                href={`/ratgeber/${a.slug}`}
                className="group rounded-elo border border-borderLight bg-white p-6 sm:p-7 hover:border-energyGreen/60 transition flex flex-col"
              >
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-energyGreen/85">
                  {a.category}
                </span>
                <h2 className="mt-3 font-display text-[19px] sm:text-[20px] font-semibold text-navy leading-snug tracking-tight">
                  {a.title}
                </h2>
                <p className="mt-3 text-[14.5px] text-slate leading-relaxed flex-1">
                  {a.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-[12.5px] text-slate/80">
                  <span>{a.readingMinutes} Min Lesezeit</span>
                  <span aria-hidden>·</span>
                  <span className="text-energyGreen group-hover:translate-x-0.5 transition">
                    Artikel lesen →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
