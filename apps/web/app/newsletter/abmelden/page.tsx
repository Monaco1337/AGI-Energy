import type { Metadata } from 'next';
import Link from 'next/link';
import { nowIso } from '@elo/core';
import { getStorage } from '@elo/storage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Newsletter abmelden | AGI Energy',
  description: 'Abmeldung vom AGI-Energy-Newsletter.',
  robots: { index: false, follow: false },
};

type Status = 'done' | 'already' | 'missing' | 'invalid';

async function processToken(token: string | undefined): Promise<Status> {
  if (!token) return 'missing';
  const storage = getStorage();
  const sub = await storage.findSubscriberByUnsubscribeToken(token);
  if (!sub) return 'invalid';
  if (sub.status === 'unsubscribed') return 'already';
  await storage.updateSubscriber(sub.id, {
    status: 'unsubscribed',
    unsubscribedAt: nowIso(),
  });
  return 'done';
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const status = await processToken(token);

  const headline =
    status === 'done'
      ? 'Sie sind abgemeldet'
      : status === 'already'
        ? 'Sie waren bereits abgemeldet'
        : status === 'missing'
          ? 'Kein Token uebergeben'
          : 'Abmeldelink ungueltig';

  const message =
    status === 'done' || status === 'already'
      ? 'Sie erhalten ab sofort keinen Newsletter mehr von uns. Sollten Sie sich versehentlich abgemeldet haben, koennen Sie sich jederzeit erneut anmelden.'
      : 'Bitte nutzen Sie den Abmeldelink aus der zuletzt erhaltenen E-Mail oder melden Sie sich bei uns.';

  return (
    <div className="bg-[#f6f4ee] min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="bg-white rounded-2xl border border-[#e8e2d4] p-10 shadow-sm">
          <div className="mb-6">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-[#f6f4ee] text-[#1a1a1a] border border-[#e8e2d4]">
              {status === 'done' || status === 'already' ? 'Abgemeldet' : 'Hinweis'}
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-3">{headline}</h1>
          <p className="text-[#3a3a3a] mb-8 leading-relaxed">{message}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/newsletter"
              className="inline-flex items-center justify-center bg-white text-[#1a1a1a] border border-[#1a1a1a] px-5 py-3 rounded-lg font-medium hover:bg-[#f6f4ee] transition"
            >
              Erneut anmelden
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#1a1a1a] text-white px-5 py-3 rounded-lg font-medium hover:bg-black transition"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
