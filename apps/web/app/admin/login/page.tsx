import Link from 'next/link';
import { redirect } from 'next/navigation';
import { loginAction } from '@/app/actions/auth';
import { getSession } from '@/lib/auth/session';
import { Logo } from '@/components/brand/Logo';

interface PageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Anmelden · AGI Operations' };

const fieldCls =
  'w-full h-12 pl-11 pr-3 rounded-xl bg-white/[0.035] border border-[var(--ops-border)] text-[var(--ops-text)] placeholder:text-[var(--ops-muted)] focus:outline-none focus:border-[rgba(54,230,208,0.5)] focus:ring-2 focus:ring-[rgba(54,230,208,0.16)] transition-colors text-[14.5px]';

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const session = await getSession();
  if (session) redirect(sp.next ?? '/admin');

  return (
    <main className="agi-admin min-h-screen flex items-center justify-center px-5 py-14 relative overflow-hidden">
      {/* Dekorativer Hintergrund */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-faint opacity-[0.14]" />
        <div className="absolute -top-40 right-[-12%] size-[560px] rounded-full blur-3xl bg-[radial-gradient(circle,rgba(54,230,208,0.16),transparent_62%)]" />
        <div className="absolute bottom-[-22%] left-[-12%] size-[520px] rounded-full blur-3xl bg-[radial-gradient(circle,rgba(56,189,248,0.12),transparent_62%)]" />
      </div>

      <div className="relative w-full max-w-[420px]">
        <div className="flex flex-col items-center text-center mb-7">
          <Logo variant="wordmark" size="lg" onDark />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1 border border-[var(--ops-border)] bg-white/[0.03]">
            <span className="size-1.5 rounded-full bg-[var(--ops-cyan)] shadow-[0_0_8px_var(--ops-cyan)]" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--ops-text-2)]">
              Operations Center
            </span>
          </div>
        </div>

        <div className="ops-card p-7 sm:p-9">
          <h1 className="font-display text-[24px] sm:text-[26px] font-semibold tracking-[-0.015em] text-[var(--ops-text)]">
            Anmelden
          </h1>
          <p className="mt-1.5 text-[13.5px] text-[var(--ops-text-2)]">
            Zugang zum Vertriebs-Leitstand.
          </p>

          <form action={loginAction} className="mt-6 grid gap-4">
            <input type="hidden" name="next" value={sp.next ?? '/admin'} />

            <div className="grid gap-1.5">
              <label htmlFor="username" className="text-[12.5px] font-medium text-[var(--ops-text-2)]">
                Benutzername
              </label>
              <div className="relative group">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ops-muted)] transition-colors group-focus-within:text-[var(--ops-cyan)]">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="10" cy="6.5" r="3.1" />
                    <path d="M3.8 16.5c.7-3 3.1-4.7 6.2-4.7s5.5 1.7 6.2 4.7" />
                  </svg>
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  inputMode="text"
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder="z. B. vorname.nachname"
                  required
                  className={fieldCls}
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="password" className="text-[12.5px] font-medium text-[var(--ops-text-2)]">
                Passwort
              </label>
              <div className="relative group">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ops-muted)] transition-colors group-focus-within:text-[var(--ops-cyan)]">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="8.5" width="12" height="8" rx="2" />
                    <path d="M6.8 8.5V6.4a3.2 3.2 0 016.4 0v2.1" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  className={fieldCls}
                />
              </div>
            </div>

            {sp.error && (
              <div className="flex items-start gap-2 rounded-xl border border-[rgba(239,68,68,0.32)] bg-[rgba(239,68,68,0.08)] px-3 py-2.5 text-[13px] text-[#fca5a5]">
                <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="10" cy="10" r="7.2" />
                  <path d="M10 6.5v4.2M10 13.4h.01" />
                </svg>
                <span>{decodeURIComponent(sp.error)}</span>
              </div>
            )}

            <button type="submit" className="ops-cta h-11 rounded-xl mt-1 text-[14px] w-full">
              Anmelden
            </button>

            <p className="text-[12px] text-[var(--ops-muted)] leading-snug text-center">
              Vertriebspartner vergeben beim ersten Login ein eigenes Passwort.
            </p>
          </form>
        </div>

        <p className="mt-6 text-center">
          <Link
            href="/"
            className="text-[13px] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)] transition-colors"
          >
            ← Zur Website
          </Link>
        </p>
      </div>
    </main>
  );
}
