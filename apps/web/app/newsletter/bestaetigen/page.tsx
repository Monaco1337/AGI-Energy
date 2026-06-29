import type { Metadata } from 'next';
import Link from 'next/link';
import { nowIso } from '@elo/core';
import { getStorage } from '@elo/storage';
import { getMailer, newsletterWelcome } from '@elo/mail';
import { env } from '@/lib/env';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Newsletter-Anmeldung bestaetigen | AGI Energy',
  description: 'Bestaetigung Ihrer Newsletter-Anmeldung.',
  robots: { index: false, follow: false },
};

type Status = 'confirmed' | 'already' | 'missing' | 'invalid';

async function processToken(token: string | undefined): Promise<Status> {
  if (!token) return 'missing';
  const storage = getStorage();
  const sub = await storage.findSubscriberByConfirmToken(token);
  if (!sub) return 'invalid';
  if (sub.status === 'confirmed') return 'already';
  const updated = await storage.updateSubscriber(sub.id, {
    status: 'confirmed',
    confirmedAt: nowIso(),
  });
  if (updated) {
    try {
      await getMailer().send(newsletterWelcome(updated, env.NEXT_PUBLIC_SITE_URL));
    } catch {
      /* nicht blockieren */
    }
  }
  return 'confirmed';
}

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const status = await processToken(token);

  const headline =
    status === 'confirmed'
      ? 'Anmeldung bestaetigt'
      : status === 'already'
        ? 'Sie sind bereits angemeldet'
        : status === 'missing'
          ? 'Kein Token uebergeben'
          : 'Bestaetigungslink ungueltig oder abgelaufen';

  const message =
    status === 'confirmed'
      ? 'Vielen Dank. Sie erhalten ab sofort unsere kompakten Tipps zu Strom, Gas und Photovoltaik. Eine Begruessungsmail ist unterwegs.'
      : status === 'already'
        ? 'Ihre E-Mail-Adresse ist bereits aktiv im Newsletter eingetragen. Sie muessen nichts weiter tun.'
        : 'Bitte fordern Sie den Newsletter erneut an. Falls Sie den Link mehrfach geklickt haben, ist Ihre Anmeldung trotzdem aktiv.';

  return (
    <div className="bg-[#f6f4ee] min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="bg-white rounded-2xl border border-[#e8e2d4] p-10 shadow-sm">
          <div className="mb-6">
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                status === 'confirmed' || status === 'already'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {status === 'confirmed' || status === 'already' ? 'Erfolg' : 'Hinweis'}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-3">{headline}</h1>
          <p className="text-[#3a3a3a] mb-8 leading-relaxed">{message}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/energiecheck"
              className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-5 py-3 rounded-lg font-medium hover:bg-black transition"
            >
              Energie-Check starten
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-white text-[#1a1a1a] border border-[#1a1a1a] px-5 py-3 rounded-lg font-medium hover:bg-[#f6f4ee] transition"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
