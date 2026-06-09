import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { logoutAction } from '@/app/actions/auth';
import { changePasswordAction } from '@/app/actions/accountMutations';
import { Button, Field, GlassCard } from '@elo/ui';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Passwort ändern' };

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function ChangePasswordPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const forced = session.mustChangePassword === true;

  return (
    <main className="min-h-screen bg-premium-dark flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" aria-hidden />
      <div className="pointer-events-none absolute top-0 right-0 size-[400px] rounded-full bg-energyGreen/10 blur-3xl" aria-hidden />

      <GlassCard className="relative w-full max-w-md p-8 sm:p-10 border-white/20">
        <h1 className="font-display text-[24px] sm:text-[26px] font-bold text-navy">
          {forced ? 'Neues Passwort vergeben' : 'Passwort ändern'}
        </h1>
        <p className="mt-2 text-[14px] text-slate">
          {forced
            ? 'Bitte vergeben Sie zum ersten Login ein eigenes, sicheres Passwort.'
            : `Angemeldet als ${session.name ?? session.username}.`}
        </p>

        <form action={changePasswordAction} className="mt-6 grid gap-4">
          <Field
            label="Aktuelles Passwort"
            name="current"
            type="password"
            autoComplete="current-password"
            required
          />
          <Field
            label="Neues Passwort"
            name="next"
            type="password"
            autoComplete="new-password"
            minLength={10}
            required
          />
          <Field
            label="Neues Passwort bestätigen"
            name="confirm"
            type="password"
            autoComplete="new-password"
            minLength={10}
            required
          />
          {sp.error && (
            <div className="rounded-elo border border-error/30 bg-error/5 px-3 py-2 text-error text-[14px]">
              {decodeURIComponent(sp.error)}
            </div>
          )}
          <Button type="submit" size="lg" variant="primary">
            Passwort speichern
          </Button>
          <p className="text-[12px] text-slate leading-snug">
            Mindestens 10 Zeichen. Verwenden Sie eine Kombination aus Buchstaben, Zahlen und
            Sonderzeichen.
          </p>
        </form>

        <div className="mt-6 flex items-center justify-between">
          {forced ? (
            <form action={logoutAction}>
              <button className="text-[13px] text-slate hover:underline underline-offset-4">
                Abmelden
              </button>
            </form>
          ) : (
            <Link
              href="/admin"
              className="text-[13px] text-premiumBlue font-medium hover:underline underline-offset-4"
            >
              Zurück zum Cockpit
            </Link>
          )}
        </div>
      </GlassCard>
    </main>
  );
}
