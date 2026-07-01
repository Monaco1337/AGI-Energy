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

const TRUST_POINTS = [
  'Individuelle Prüfung Ihrer Angaben',
  'Keine pauschalen Sparversprechen',
  'Persönliche Rückmeldung durch einen Ansprechpartner',
];

export default async function DankePage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; mail?: string }>;
}) {
  const { ref, mail } = await searchParams;
  const code = normalizeCode(ref);
  const mailConfirmed = mail === 'sent';

  return (
    <>
      <Header />
      <main className="min-h-[70vh] bg-premium-dark relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-faint opacity-30" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-5 py-16 sm:py-24 space-y-6">
          <div className="rounded-xl3 border border-white/15 bg-white/[0.08] backdrop-blur-md shadow-premium p-8 sm:p-12 text-center">
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-energyGreen font-semibold mb-4">
              <span className="size-1.5 rounded-full bg-energyGreen" aria-hidden />
              Anfrage übermittelt
            </p>
            <h1 className="font-display text-[28px] sm:text-[36px] font-bold leading-tight text-softWhite">
              Vielen Dank. Ihre Anfrage ist eingegangen.
            </h1>
            <p className="mt-4 text-[16px] sm:text-[17px] text-softWhite/75 leading-relaxed">
              Ihre Angaben zur persönlichen Energieprüfung wurden erfolgreich übermittelt. Wir prüfen Ihre
              Anfrage sorgfältig und melden uns zeitnah mit einer passenden Einschätzung bei Ihnen.
            </p>
            <p className="mt-3 text-[15px] text-softWhite/60 leading-relaxed">
              {mailConfirmed
                ? 'Wir haben Ihnen zusätzlich eine Bestätigung per E-Mail gesendet.'
                : 'Falls Sie eine E-Mail-Adresse angegeben haben, erhalten Sie zusätzlich eine Bestätigung per E-Mail.'}
            </p>

            <ul className="mt-7 space-y-2.5 text-[15px] text-softWhite/75 text-left max-w-md mx-auto">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span>{point}</span>
                </li>
              ))}
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

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-0.5 shrink-0 text-energyGreen"
    >
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
