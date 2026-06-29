import Link from 'next/link';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { cn } from '@elo/ui';
import ReferralShare from '@/components/landing/ReferralShare';
import { SITE_URL } from '@/lib/seoSchemas';

const btnPrimary =
  'inline-flex items-center justify-center font-semibold rounded-elo min-h-[48px] h-14 px-8 text-[17px] bg-gradient-to-br from-energyGreen to-premiumBlue text-white shadow-lift hover:shadow-premium hover:-translate-y-px transition-all';
const btnSecondary =
  'inline-flex items-center justify-center font-semibold rounded-elo min-h-[48px] h-14 px-8 text-[17px] border border-borderLight bg-card text-navy hover:bg-bgSoft shadow-glass';

export const metadata = {
  title: 'Danke – Ihr Energie-Check ist eingegangen',
  robots: { index: false, follow: false },
};

function normalizeCode(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const upper = raw.toUpperCase().trim();
  if (!/^[A-Z0-9]{4,16}$/.test(upper)) return undefined;
  return upper;
}

export default async function DankePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const code = normalizeCode(ref);

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-premium-dark relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-5 py-16 sm:py-24 space-y-6">
          <div className="rounded-xl3 border border-white/15 bg-white/[0.08] backdrop-blur-md shadow-premium p-8 sm:p-12 text-center">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-energyGreen font-semibold mb-4">
              <span className="size-1.5 rounded-full bg-energyGreen" aria-hidden />
              Übermittelt
            </p>
            <h1 className="font-display text-[28px] sm:text-[36px] font-bold leading-tight text-softWhite">
              Danke. Ihr Energie-Check wurde übermittelt.
            </h1>
            <p className="mt-4 text-[17px] text-softWhite/75 leading-relaxed">
              Ihre Angaben werden geprüft. Wir melden uns mit einer passenden Einschätzung – persönlich und ohne
              Verkaufsdruck.
            </p>
            <ul className="mt-6 space-y-2 text-[15px] text-softWhite/70 text-left max-w-md mx-auto">
              <li>• Keine pauschalen Sparversprechen.</li>
              <li>• Individuelle Prüfung Ihrer Angaben.</li>
              <li>• Widerruf Ihrer Einwilligung jederzeit möglich.</li>
            </ul>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className={cn(btnPrimary)}>
                Zur Startseite
              </Link>
              <Link href="/datenschutz" className={cn(btnSecondary)}>
                Datenschutzhinweise
              </Link>
            </div>
          </div>

          {code ? <ReferralShare code={code} siteUrl={SITE_URL} /> : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
