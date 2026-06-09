import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { PartnerId } from '@elo/core';
import { getStorage } from '@elo/storage';
import { requireRole } from '@/lib/agi/permissions';
import { PartnerForm } from '@/components/agi/partners/PartnerForm';
import { LeadCard } from '@/components/agi/leads/LeadCard';
import {
  setPartnerStatusAction,
  deletePartnerAction,
  setPartnerLoginPolicyAction,
  resetPartnerPasswordAction,
  unlockPartnerLoginAction,
} from '@/app/actions/partnerMutations';
import { ConfirmSubmit } from '@/components/agi/shared/ConfirmSubmit';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const storage = getStorage();
  const partner = await storage.getPartner(id as PartnerId);
  return { title: `${partner?.name ?? 'Partner'} · AGI Operations` };
}

function fmtEur(v: number): string {
  return v.toLocaleString('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

export default async function PartnerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireRole(['admin', 'sales']);
  const { id } = await params;
  const storage = getStorage();
  const partner = await storage.getPartner(id as PartnerId);
  if (!partner) notFound();

  const [leads, deals, commissions, users] = await Promise.all([
    storage.listLeads({ assignedPartnerId: partner.id }),
    storage.listDeals({ partnerId: partner.id }),
    storage.listCommissions({ partnerId: partner.id }),
    storage.listUsers(),
  ]);

  const loginUser =
    (partner.userId ? users.find((u) => u.id === partner.userId) : undefined) ??
    users.find((u) => u.partnerId === partner.id) ??
    null;

  const lockedUntil =
    loginUser?.lockedUntil && new Date(loginUser.lockedUntil).getTime() > Date.now()
      ? new Date(loginUser.lockedUntil)
      : null;

  const active = leads.filter(
    (l) => l.status !== 'Abgeschlossen' && l.status !== 'Verloren' && l.status !== 'Gesperrt',
  );
  const closed = leads.filter((l) => l.status === 'Abgeschlossen');
  const conv = leads.length > 0 ? closed.length / leads.length : 0;
  const pendingCom = commissions
    .filter((c) => c.status === 'pending' || c.status === 'approved')
    .reduce((sum, c) => sum + (c.amount ?? 0), 0);
  const paidCom = commissions
    .filter((c) => c.status === 'paid')
    .reduce((sum, c) => sum + (c.amount ?? 0), 0);

  const isActive = partner.status === 'active';

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/vertriebspartner"
            className="text-[12px] text-[var(--ops-text-2)] hover:text-[var(--ops-cyan)]"
          >
            ← Vertriebspartner
          </Link>
          <h1 className="mt-2 font-display text-[28px] sm:text-[32px] tracking-[-0.015em] text-[var(--ops-text)]">
            {partner.name}
          </h1>
          <p className="mt-1 text-[13.5px] text-[var(--ops-text-2)]">
            {partner.regionLabel || partner.regionPrefixes.join(', ') || 'Bundesweit'} ·{' '}
            {partner.specialties.join(' / ') || 'allg.'} · Kapazität {partner.capacity}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <form action={setPartnerStatusAction}>
            <input type="hidden" name="id" value={partner.id} />
            <input type="hidden" name="status" value={isActive ? 'inactive' : 'active'} />
            <input type="hidden" name="redirectTo" value={`/admin/vertriebspartner/${partner.id}`} />
            <button className="ops-cta-ghost h-9 px-4 rounded-lg text-[12.5px]">
              {isActive ? 'Deaktivieren' : 'Aktivieren'}
            </button>
          </form>
          <form action={deletePartnerAction}>
            <input type="hidden" name="id" value={partner.id} />
            <input type="hidden" name="redirectTo" value="/admin/vertriebspartner" />
            <ConfirmSubmit
              message="Partner wirklich löschen? Alle aktiven Leads müssen vorher neu zugewiesen sein."
              className="h-9 px-4 rounded-lg border border-[rgba(239,68,68,0.32)] text-[var(--ops-critical)] hover:bg-[rgba(239,68,68,0.08)] text-[12.5px]"
            >
              Löschen
            </ConfirmSubmit>
          </form>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Aktive Leads</div>
          <div className="mt-2 text-[28px] font-display font-semibold text-[var(--ops-text)] tabular-nums">
            {active.length}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">von {leads.length} insgesamt</div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Conversion</div>
          <div className="mt-2 text-[28px] font-display font-semibold text-[var(--ops-cyan)] tabular-nums">
            {Math.round(conv * 100)}%
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">{closed.length} abgeschlossen</div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Offene Provision</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-gold)] tabular-nums">
            {fmtEur(pendingCom)}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">freigegeben + ungeprüft</div>
        </div>
        <div className="ops-kpi">
          <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">Ausgezahlt</div>
          <div className="mt-2 text-[24px] font-display font-semibold text-[var(--ops-success)] tabular-nums">
            {fmtEur(paidCom)}
          </div>
          <div className="mt-0.5 text-[11px] text-[var(--ops-text-2)]">{commissions.filter((c) => c.status === 'paid').length} Auszahlungen</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-5">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-[18px] text-[var(--ops-text)]">Zugewiesene Leads</h2>
            <span className="text-[11.5px] text-[var(--ops-text-2)]">{active.length} aktiv</span>
          </div>
          {active.length === 0 ? (
            <div className="ops-card p-8 text-center text-[13px] text-[var(--ops-text-2)]">
              Keine aktiven Leads bei diesem Partner.
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-3">
              {active.slice(0, 12).map((l) => (
                <li key={l.id}>
                  <LeadCard lead={l} partner={partner} compact />
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="space-y-5">
          <div>
            <h2 className="font-display text-[18px] text-[var(--ops-text)] mb-3">Login-Konto</h2>
            {loginUser ? (
              <div className="ops-card p-4 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10.5px] uppercase tracking-[0.14em] text-[var(--ops-muted)]">
                      Benutzername
                    </div>
                    <div className="mt-0.5 text-[14px] text-[var(--ops-text)] font-medium truncate">
                      @{loginUser.username}
                    </div>
                  </div>
                  <span
                    className="ops-pill shrink-0"
                    data-tone={lockedUntil ? 'critical' : loginUser.mustChangePassword ? 'gold' : 'success'}
                  >
                    {lockedUntil ? 'Gesperrt' : loginUser.mustChangePassword ? 'Erst-Login offen' : 'Aktiv'}
                  </span>
                </div>

                {lockedUntil ? (
                  <p className="text-[12px] text-[var(--ops-critical)] leading-snug">
                    Konto temporär gesperrt (zu viele Fehlversuche) – automatisch frei ab{' '}
                    {lockedUntil.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr.
                    Du kannst die Sperre sofort aufheben.
                  </p>
                ) : (
                  <p className="text-[12px] text-[var(--ops-text-2)] leading-snug">
                    {loginUser.mustChangePassword
                      ? 'Beim ersten Login muss ein eigenes Passwort vergeben werden. Zum Reinschauen kannst du die Pflicht aufheben.'
                      : 'Dieser Partner kann sich direkt mit seinem Passwort anmelden.'}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {lockedUntil && (
                    <form action={unlockPartnerLoginAction}>
                      <input type="hidden" name="id" value={partner.id} />
                      <input
                        type="hidden"
                        name="redirectTo"
                        value={`/admin/vertriebspartner/${partner.id}`}
                      />
                      <button className="ops-cta h-9 px-3 rounded-lg text-[12.5px]">
                        Sperre aufheben
                      </button>
                    </form>
                  )}
                  <form action={setPartnerLoginPolicyAction}>
                    <input type="hidden" name="id" value={partner.id} />
                    <input
                      type="hidden"
                      name="mustChange"
                      value={loginUser.mustChangePassword ? 'false' : 'true'}
                    />
                    <input
                      type="hidden"
                      name="redirectTo"
                      value={`/admin/vertriebspartner/${partner.id}`}
                    />
                    <button className="ops-cta-ghost h-9 px-3 rounded-lg text-[12.5px]">
                      {loginUser.mustChangePassword
                        ? 'Erst-Login-Pflicht aufheben'
                        : 'Erst-Login-Pflicht aktivieren'}
                    </button>
                  </form>

                  <form action={resetPartnerPasswordAction}>
                    <input type="hidden" name="id" value={partner.id} />
                    <input
                      type="hidden"
                      name="redirectTo"
                      value={`/admin/vertriebspartner/${partner.id}`}
                    />
                    <ConfirmSubmit
                      message="Passwort dieses Partners auf das Start-Passwort zurücksetzen? Der Partner muss es beim nächsten Login neu setzen."
                      className="h-9 px-3 rounded-lg border border-[var(--ops-border)] text-[var(--ops-text-2)] hover:text-[var(--ops-text)] hover:bg-white/[0.04] text-[12.5px]"
                    >
                      Passwort zurücksetzen
                    </ConfirmSubmit>
                  </form>
                </div>
              </div>
            ) : (
              <div className="ops-card p-4 text-[13px] text-[var(--ops-text-2)]">
                Kein Login-Konto verknüpft.
              </div>
            )}
          </div>

          <div>
            <h2 className="font-display text-[18px] text-[var(--ops-text)] mb-3">Stammdaten bearbeiten</h2>
            <PartnerForm partner={partner} redirectTo={`/admin/vertriebspartner/${partner.id}`} />
          </div>
        </aside>
      </div>
    </div>
  );
}
