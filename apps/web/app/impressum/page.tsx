import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';

export const metadata = { title: 'Impressum' };

export default function Page() {
  return (
    <>
      <Header />
      <main className="min-h-[50vh] bg-softWhite mx-auto max-w-3xl px-5 py-16 sm:py-20">
        <h1 className="font-display text-[30px] sm:text-[34px] font-bold tracking-tight text-navy">Impressum</h1>
        <p className="mt-6 text-[16px] text-slate leading-relaxed">
          Demo-Plattform. Bitte ergänzen Sie hier die gemäß § 5 TMG erforderlichen Angaben.
        </p>
      </main>
      <Footer />
    </>
  );
}
