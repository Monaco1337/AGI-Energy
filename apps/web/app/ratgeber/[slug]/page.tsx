import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import {
  RATGEBER_ARTICLES,
  getArticle,
} from '@/data/ratgeberArticles';
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
} from '@/lib/seoSchemas';

export function generateStaticParams() {
  return RATGEBER_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Artikel nicht gefunden' };
  const path = `/ratgeber/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: path,
      publishedTime: article.publishedAt,
    },
  };
}

export default async function RatgeberArtikelPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const path = `/ratgeber/${article.slug}`;

  return (
    <>
      <script {...jsonLdScriptProps(articleSchema({
        path,
        title: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        category: article.category,
      }))} />
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Ratgeber', path: '/ratgeber' },
        { name: article.title, path },
      ]))} />
      {article.faq?.length ? (
        <script {...jsonLdScriptProps(faqSchema(article.faq))} />
      ) : null}

      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <article className="mx-auto max-w-3xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-20">
          <nav aria-label="Breadcrumb" className="text-[12px] text-slate/80">
            <Link href="/ratgeber" className="hover:text-navy">
              Ratgeber
            </Link>
            <span aria-hidden> · </span>
            <span className="text-energyGreen/90">{article.category}</span>
          </nav>

          <h1 className="mt-4 font-display text-[28px] sm:text-[36px] lg:text-[40px] font-semibold text-navy leading-[1.12] tracking-tight">
            {article.title}
          </h1>
          <p className="mt-4 text-[15px] text-slate/80">
            {article.readingMinutes} Min Lesezeit
          </p>

          <p className="mt-7 text-[17px] sm:text-[18px] text-navy/85 leading-[1.75]">
            {article.intro}
          </p>

          <div className="mt-10 space-y-9">
            {article.sections.map((s) => (
              <section key={s.heading ?? s.body.slice(0, 24)}>
                {s.heading ? (
                  <h2 className="font-display text-[20px] sm:text-[22px] font-semibold text-navy leading-snug tracking-tight">
                    {s.heading}
                  </h2>
                ) : null}
                <p className="mt-3 text-[15.5px] text-slate leading-[1.8]">
                  {s.body}
                </p>
              </section>
            ))}
          </div>

          {article.faq?.length ? (
            <section className="mt-14">
              <h2 className="font-display text-[22px] sm:text-[24px] font-semibold text-navy tracking-tight">
                Häufige Fragen dazu
              </h2>
              <div className="mt-5 divide-y divide-borderLight rounded-elo border border-borderLight bg-white">
                {article.faq.map((it) => (
                  <details key={it.q} className="group px-5 py-4 sm:px-6 sm:py-5">
                    <summary className="flex cursor-pointer items-start justify-between gap-4 list-none">
                      <span className="text-[15.5px] font-semibold text-navy leading-snug">
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
            </section>
          ) : null}

          {article.relatedLinks?.length ? (
            <section className="mt-14 rounded-elo border border-borderLight bg-white p-6 sm:p-7">
              <h2 className="font-display text-[18px] sm:text-[20px] font-semibold text-navy tracking-tight">
                Passend dazu
              </h2>
              <ul className="mt-4 space-y-2">
                {article.relatedLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-flex items-center text-[15px] text-navy/85 hover:text-energyGreen transition"
                    >
                      → {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </main>
      <Footer />
    </>
  );
}
