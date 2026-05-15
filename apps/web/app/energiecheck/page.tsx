import { Suspense } from 'react';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { EnergyCheckWizard } from '@/components/funnel/EnergyCheckWizard';

export const metadata = {
  title: 'Energie-Check starten',
};

function WizardFallback() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 text-center text-[15px] text-muted">
      Energie-Check wird geladen…
    </div>
  );
}

export default function EnergyCheckPage() {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">
        <Suspense fallback={<WizardFallback />}>
          <EnergyCheckWizard />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
