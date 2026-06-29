import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getStorage } from '@elo/storage';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { ReferralCookieSetter } from '@/components/landing/ReferralCookieSetter';
import { EnergyLeadForm } from '@/components/landing/EnergyLeadForm';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    title: 'Persönliche Empfehlung – AGI Energy',
    description: `Sie wurden persönlich an AGI Energy weiterempfohlen (Code: ${code.toUpperCase()}). Persönliche Energieprüfung, unverbindlich, DSGVO-konform.`,
    robots: { index: false, follow: false },
  };
}

export default async function EmpfehlungPage({ params }: PageProps) {
  const { code } = await params;
  const normalized = code.toUpperCase().trim();

  const storage = getStorage();
  const referrer = await storage.findLeadByReferralCode(normalized);

  if (!referrer) {
    // Ungueltiger Code -> auf normale Energie-Check-Route umleiten, ohne Hinweis
    redirect('/energiecheck');
  }

  const firstName = referrer.firstName || '';

  return (
    <>
      <ReferralCookieSetter code={normalized} />
      <Header />
      <main className="min-h-[60vh] bg-softWhite">
        <section className="relative overflow-hidden bg-premium-dark agi-hero-bleed-under-nav pb-14">
          <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" aria-hidden />
          <div
            className="pointer-events-none absolute -top-32 -left-24 size-[520px] rounded-full bg-warmAmber/10 blur-[120px]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl px-5 lg:px-8 pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+96px)] sm:pt-[calc(env(safe-area-inset-top)+var(--agi-header-row)+112px)]">
            <p className="text-[11px] font-medium tracking-[0.22em] text-warmAmber/85 uppercase">
              Persönliche Empfehlung
            </p>
            <h1 className="mt-3 font-display text-[28px] sm:text-[38px] lg:text-[42px] font-semibold text-softWhite leading-[1.1] tracking-tight max-w-2xl">
              {firstName
                ? `Sie wurden von ${firstName} weiterempfohlen.`
                : 'Sie wurden persönlich weiterempfohlen.'}
            </h1>
            <p className="mt-5 text-[15.5px] sm:text-[16.5px] text-softWhite/72 leading-[1.7] max-w-xl font-light">
              Empfehlungen bekommen bei uns höchste Priorität. Ihre Anfrage wird
              persönlich bearbeitet – ohne automatische Vertragsumstellung und
              ohne Verpflichtung.
            </p>
            <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-softWhite/80">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#39d8e8]" aria-hidden />
              Empfehlungscode {normalized} aktiv
            </div>
          </div>
        </section>

        <section className="bg-softWhite py-[64px] sm:py-[80px]" aria-label="Kontaktformular">
          <div className="mx-auto max-w-lg px-5 lg:px-8">
            <EnergyLeadForm defaultCategory="strom" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
