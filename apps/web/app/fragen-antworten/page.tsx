import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { FAQ_CATEGORIES, flattenFaq } from '@/data/energyFaq';
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdScriptProps,
} from '@/lib/seoSchemas';

const PATH = '/fragen-antworten';

export const metadata: Metadata = {
  title: 'Fragen & Antworten – persönliche Energieprüfung',
  description:
    'Antworten auf häufige Fragen rund um Energieprüfung, Anbieterwechsel, Datenschutz, Photovoltaik und Gewerbeenergie. Verständlich, ergebnisoffen.',
  alternates: { canonical: PATH },
  openGraph: {
    type: 'website',
    title: 'Fragen & Antworten – AGI Energy',
    description:
      'Die wichtigsten Fragen rund um Energieprüfung, Anbieterwechsel und Datenschutz – verständlich beantwortet.',
    url: PATH,
  },
};

export default function FragenAntwortenPage() {
  const allFaqs = flattenFaq();

  return (
    <>
      <script {...jsonLdScriptProps(faqSchema(allFaqs))} />
      <script {...jsonLdScriptProps(breadcrumbSchema([
        { name: 'Startseite', path: '/' },
        { name: 'Fragen & Antworten', path: PATH },
      ]))} />

      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <section className="mx-auto max-w-4xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+72px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] pb-12">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-energyGreen/90">
            Fragen & Antworten
          </p>
          <h1 className="mt-3 font-display text-[30px] sm:text-[40px] lg:text-[44px] font-semibold text-navy leading-[1.1] tracking-tight">
            Was Sie vorab wissen sollten.
          </h1>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] text-slate leading-[1.7]">
            Die wichtigsten Fragen rund um die persönliche Energieprüfung,
            Anbieterwechsel, Datenschutz, Photovoltaik und Gewerbeenergie. Wenn
            Ihre Frage hier nicht beantwortet wird, schreiben Sie uns einfach –
            wir antworten persönlich.
          </p>

          <nav aria-label="Inhaltsverzeichnis" className="mt-10">
            <ul className="grid gap-2 sm:grid-cols-2">
              {FAQ_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <a
                    href={`#${c.id}`}
                    className="block rounded-elo border border-borderLight bg-white px-4 py-3 text-[15px] text-navy/85 hover:border-energyGreen/60 hover:text-navy transition"
                  >
                    {c.title}
                    <span className="ml-2 text-[12px] text-slate">
                      · {c.items.length} Fragen
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <div className="mx-auto max-w-4xl px-5 lg:px-8 pb-24 space-y-16">
          {FAQ_CATEGORIES.map((c) => (
            <section key={c.id} id={c.id} className="scroll-mt-28">
              <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-navy tracking-tight">
                {c.title}
              </h2>
              <p className="mt-2 text-[15px] text-slate leading-relaxed max-w-2xl">
                {c.intro}
              </p>
              <div className="mt-6 divide-y divide-borderLight rounded-elo border border-borderLight bg-white">
                {c.items.map((it) => (
                  <details
                    key={it.q}
                    className="group px-5 py-4 sm:px-6 sm:py-5"
                  >
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
            </section>
          ))}

          <section className="rounded-elo border border-borderLight bg-white p-6 sm:p-8">
            <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-navy tracking-tight">
              Frage nicht dabei?
            </h2>
            <p className="mt-3 text-[15px] text-slate leading-[1.7] max-w-2xl">
              Schreiben Sie uns Ihre Situation in zwei bis drei Sätzen –
              persönlich, ohne Verkaufsdruck. Wir melden uns innerhalb von
              24 Stunden an Werktagen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/energiecheck"
                className="inline-flex items-center rounded-elo bg-gradient-to-br from-energyGreen to-premiumBlue px-5 h-11 text-[14.5px] font-semibold text-white shadow-lift hover:shadow-premium transition"
              >
                Energie-Check starten
              </Link>
              <Link
                href="/jahresabrechnung-pruefen"
                className="inline-flex items-center rounded-elo border border-borderLight bg-white px-5 h-11 text-[14.5px] font-semibold text-navy hover:border-energyGreen/60 transition"
              >
                Jahresabrechnung prüfen
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
