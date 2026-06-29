import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { GLOSSARY, getGlossaryEntry } from '@/data/energyGlossary';
import {
  breadcrumbSchema,
  definedTermSchema,
  jsonLdScriptProps,
} from '@/lib/seoSchemas';

export function generateStaticParams() {
  return GLOSSARY.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) return { title: 'Begriff nicht gefunden' };
  const path = `/glossar/${entry.slug}`;
  return {
    title: `${entry.term} – Energie-Glossar`,
    description: entry.shortDefinition,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: `${entry.term} – verständlich erklärt`,
      description: entry.shortDefinition,
      url: path,
    },
  };
}

export default async function GlossaryDetailPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const entry = getGlossaryEntry(slug);
  if (!entry) notFound();

  const path = `/glossar/${entry.slug}`;

  return (
    <>
      <script {...jsonLdScriptProps(definedTermSchema({
        path,
        term: entry.term,
        definition: entry.shortDefinition,
        category: entry.category,
      }))} />
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Glossar', path: '/glossar' },
        { name: entry.term, path },
      ]))} />

      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <article className="mx-auto max-w-3xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-20">
          <nav aria-label="Breadcrumb" className="text-[12px] text-slate/80">
            <Link href="/glossar" className="hover:text-navy">
              Glossar
            </Link>
            <span aria-hidden> · </span>
            <span className="text-energyGreen/90">{entry.category}</span>
          </nav>

          <h1 className="mt-4 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-navy leading-[1.1] tracking-tight">
            {entry.term}
          </h1>

          <p className="mt-6 text-[17px] sm:text-[18px] text-navy/85 leading-[1.75]">
            {entry.shortDefinition}
          </p>

          <section className="mt-8 rounded-elo border border-borderLight bg-white p-6">
            <h2 className="font-display text-[18px] font-semibold text-navy tracking-tight">
              Im Detail
            </h2>
            <p className="mt-3 text-[15.5px] text-slate leading-[1.8]">
              {entry.longExplanation}
            </p>
          </section>

          {entry.related?.length ? (
            <section className="mt-10">
              <h2 className="font-display text-[18px] font-semibold text-navy tracking-tight">
                Verwandte Begriffe
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {entry.related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/glossar/${r.slug}`}
                      className="inline-flex items-center rounded-full border border-borderLight bg-white px-3.5 py-1.5 text-[13px] text-navy hover:border-energyGreen/60 transition"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-12 rounded-elo border border-borderLight bg-white p-6 sm:p-7">
            <h2 className="font-display text-[18px] font-semibold text-navy tracking-tight">
              Sie haben eine konkrete Frage zu „{entry.term}"?
            </h2>
            <p className="mt-3 text-[15px] text-slate leading-[1.7]">
              Wir prüfen Ihre Situation persönlich – unverbindlich und kostenfrei.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/energiecheck"
                className="inline-flex items-center rounded-elo bg-gradient-to-br from-energyGreen to-premiumBlue px-5 h-11 text-[14.5px] font-semibold text-white shadow-lift hover:shadow-premium transition"
              >
                Energie-Check starten
              </Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
