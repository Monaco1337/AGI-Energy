import Link from 'next/link';
import { redirect } from 'next/navigation';
import { loginAction } from '@/app/actions/auth';
import { getSession } from '@/lib/auth/session';
import { Button, Field, GlassCard } from '@elo/ui';

interface PageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export const metadata = { title: 'Admin Login' };

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const session = await getSession();
  if (session) redirect(sp.next ?? '/admin');

  return (
    <main className="min-h-screen bg-premium-dark flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-faint opacity-25" aria-hidden />
      <div className="pointer-events-none absolute top-0 right-0 size-[400px] rounded-full bg-energyGreen/10 blur-3xl" aria-hidden />

      <GlassCard className="relative w-full max-w-md p-8 sm:p-10 border-white/20">
        <h1 className="font-display text-[24px] sm:text-[26px] font-bold text-navy">Admin Login</h1>
        <p className="mt-2 text-[14px] text-slate">Nur für autorisierte Mitarbeiter.</p>
        <form action={loginAction} className="mt-6 grid gap-4">
          <input type="hidden" name="next" value={sp.next ?? '/admin'} />
          <Field label="Benutzername" name="username" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} required />
          <Field label="Passwort" name="password" type="password" autoComplete="current-password" required />
          {sp.error && (
            <div className="rounded-elo border border-error/30 bg-error/5 px-3 py-2 text-error text-[14px]">
              {decodeURIComponent(sp.error)}
            </div>
          )}
          <Button type="submit" size="lg" variant="primary">
            Anmelden
          </Button>
          <p className="text-[12px] text-slate leading-snug">
            Anmeldung mit persönlichem Benutzernamen. Beim ersten Login werden Vertriebspartner
            aufgefordert, ein eigenes Passwort zu vergeben.
          </p>
        </form>
        <p className="mt-6 text-center">
          <Link href="/" className="text-[13px] text-premiumBlue font-medium hover:underline underline-offset-4">
            Zur Website
          </Link>
        </p>
      </GlassCard>
    </main>
  );
}
