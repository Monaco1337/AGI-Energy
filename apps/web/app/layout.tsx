import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { cookies } from 'next/headers';
import { ConsentBanner } from '@/components/landing/ConsentBanner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
const display = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Energie-Tarifprüfung für Strom, Gas, Solar & Gewerbe | AGI Energy',
    template: '%s | AGI Energy',
  },
  description:
    'Laden Sie Ihre Jahresabrechnung hoch und lassen Sie Strom-, Gas-, Solar- oder Gewerbetarife persönlich prüfen. Keine Tarifliste, sondern eine klare Empfehlung.',
  applicationName: 'AGI Energy',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    title: 'Energie-Tarifprüfung für Strom, Gas, Solar & Gewerbe',
    description:
      'Jahresabrechnung hochladen – persönliche Prüfung statt Tarifchaos. Verständlich, zweckgebunden und DSGVO-orientiert.',
  },
};

export const viewport: Viewport = {
  themeColor: '#07111F',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await cookies();
  const comfort = c.get('comfort')?.value === '1' ? '1' : '0';
  return (
    <html lang="de" data-comfort={comfort} className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen bg-softWhite text-navy antialiased font-sans">
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
