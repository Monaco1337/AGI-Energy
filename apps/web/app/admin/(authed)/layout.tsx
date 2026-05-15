import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth/session';
import { logoutAction } from '@/app/actions/auth';
import { Badge } from '@elo/ui';
import { Logo } from '@/components/brand/Logo';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect('/admin/login');
  return (
    <div className="min-h-screen bg-paper2/40">
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-line bg-paper hidden lg:flex flex-col">
        <div className="px-5 h-16 flex items-center border-b border-line">
          <Link
            href="/admin"
            className="flex items-center"
            aria-label="AGI Energy – Admin"
          >
            <Logo variant="wordmark" size="sm" />
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 text-[14px]">
          <SectionLabel>Vertrieb</SectionLabel>
          <NavLink href="/admin" label="Cockpit" />
          <NavLink href="/admin/leads" label="Leads" />

          <SectionLabel className="mt-5">Konto</SectionLabel>
          <NavLink href="/admin/settings" label="Einstellungen" />

          <SectionLabel className="mt-5">In Vorbereitung</SectionLabel>
          <PreparedLink href="/admin/funnel-analytics" label="Funnel-Analytics" />
          <PreparedLink href="/admin/experiments" label="Experimente" />
          <PreparedLink href="/admin/research" label="Research-Board" />
          <PreparedLink href="/admin/import" label="CSV-Import" />
          <PreparedLink href="/admin/audit" label="Audit-Log" />
          <p className="px-3 mt-2 text-[11.5px] leading-snug text-muted">
            Phase-2-Module. Werden produktiv mit Supabase, Cron und CRM-Integration freigeschaltet.
          </p>
        </nav>

        <div className="p-4 border-t border-line">
          <div className="text-[12px] text-muted truncate">{session.email}</div>
          <div className="mt-1.5 flex items-center gap-2">
            <Badge tone="sage">{session.role}</Badge>
            <span className="text-[11px] text-muted">Demo-Umgebung</span>
          </div>
          <form action={logoutAction} className="mt-3">
            <button className="text-[13px] text-muted hover:text-ink underline underline-offset-4">
              Abmelden
            </button>
          </form>
        </div>
      </aside>
      <main className="lg:pl-64">
        <div className="px-5 lg:px-10 py-8 lg:py-10">{children}</div>
      </main>
    </div>
  );
}

function SectionLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`px-3 pt-2 pb-1 text-[10.5px] uppercase tracking-[0.12em] text-muted/80 ${className}`}
    >
      {children}
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block rounded-elo px-3 py-2 text-ink2 hover:bg-paper2 hover:text-ink transition-colors"
    >
      {label}
    </Link>
  );
}

function PreparedLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-elo px-3 py-2 text-muted hover:bg-paper2 hover:text-ink2 transition-colors"
    >
      <span>{label}</span>
      <span className="text-[10px] uppercase tracking-wider rounded-full border border-line px-1.5 py-0.5 text-muted/80 group-hover:border-lineStrong">
        bald
      </span>
    </Link>
  );
}
