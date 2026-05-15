import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getStorage } from '@elo/storage';
import type { LeadId } from '@elo/core';
import { LeadColorBadge } from '@/components/admin/LeadColorBadge';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const storage = getStorage();
  const lead = await storage.getLead(id as LeadId);
  if (!lead) notFound();

  return (
    <div className="space-y-8 max-w-5xl">
      {lead.isDemo && (
        <div className="no-print rounded-elo border border-gold/40 bg-gold/[0.08] px-4 py-2.5 flex items-center gap-3">
          <span aria-hidden className="size-2 rounded-full bg-gold" />
          <span className="text-[13px] text-gold2 font-medium uppercase tracking-[0.12em]">
            Demo-Lead
          </span>
          <span className="text-[13px] text-ink2">
            Dieser Datensatz ist ein Beispiel-Lead und nicht real.
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <Link href="/admin/leads" className="text-[13px] text-sage no-print">← Alle Leads</Link>
          <h1 className="mt-2 font-display text-[28px] text-ink">
            {lead.firstName} {lead.lastName}
          </h1>
          <div className="mt-2 flex gap-2 items-center flex-wrap">
            <LeadColorBadge color={lead.leadColor} />
            <Badge tone="neutral">Score {lead.leadScore}</Badge>
            <Badge tone="sage">{lead.status}</Badge>
          </div>
        </div>
        <button
          onClick={undefined}
          className="no-print h-10 px-4 rounded-elo border border-line bg-card text-[14px]"
          // bewusst kein Client-JS – Browser-Print-Dialog reicht
        >
          <a href="javascript:window.print()" className="text-ink">Drucken / PDF</a>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <section className="print-card bg-card border border-line rounded-eloLg p-6">
            <h2 className="font-display text-[18px] text-ink">Empfohlene Aktion</h2>
            <p className="mt-2 text-[15px] text-ink2 leading-relaxed">{lead.recommendedAction}</p>
            <div className="mt-3 text-[13px] text-muted">{lead.leadLabel}</div>
          </section>

          <section className="print-card bg-card border border-line rounded-eloLg p-6">
            <h2 className="font-display text-[18px] text-ink">Score-Begründung</h2>
            <ul className="mt-3 divide-y divide-line">
              {lead.scoreReasons.map((r) => (
                <li key={r.code} className="py-2 flex items-center gap-3 text-[14px]">
                  <span className="font-mono text-[12px] text-muted w-32 truncate">{r.code}</span>
                  <span className="flex-1">{r.label}</span>
                  <span className={r.delta >= 0 ? 'text-sage font-medium' : 'text-leadRed font-medium'}>
                    {r.delta >= 0 ? `+${r.delta}` : r.delta}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="print-card bg-card border border-line rounded-eloLg p-6">
            <h2 className="font-display text-[18px] text-ink">Kontaktverlauf</h2>
            {lead.contactHistory.length === 0 ? (
              <p className="mt-2 text-[14px] text-muted">Noch keine Einträge.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {lead.contactHistory.map((c) => (
                  <li key={c.id} className="text-[14px] text-ink2">
                    <span className="font-medium text-ink">{c.type}</span> · {new Date(c.createdAt).toLocaleString('de-DE')} · {c.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="print-card bg-card border border-line rounded-eloLg p-6">
            <h2 className="font-display text-[18px] text-ink">Kontakt</h2>
            <dl className="mt-3 grid grid-cols-3 gap-y-2 text-[14px]">
              <dt className="text-muted">Telefon</dt><dd className="col-span-2">{lead.phone ?? '—'}</dd>
              <dt className="text-muted">E-Mail</dt><dd className="col-span-2">{lead.email ?? '—'}</dd>
              <dt className="text-muted">PLZ</dt><dd className="col-span-2">{lead.postalCode} {lead.city ?? ''}</dd>
              <dt className="text-muted">Wunsch</dt><dd className="col-span-2">{lead.contactPreference ?? '—'}</dd>
            </dl>
          </section>

          <section className="print-card bg-card border border-line rounded-eloLg p-6">
            <h2 className="font-display text-[18px] text-ink">Profil</h2>
            <dl className="mt-3 grid grid-cols-3 gap-y-2 text-[14px]">
              <dt className="text-muted">Typ</dt><dd className="col-span-2">{lead.customerType}</dd>
              <dt className="text-muted">Interessen</dt><dd className="col-span-2">{lead.interests.join(', ')}</dd>
              <dt className="text-muted">Dringlichkeit</dt><dd className="col-span-2">{lead.urgency}</dd>
              <dt className="text-muted">Kosten</dt><dd className="col-span-2">{lead.monthlyEnergyCosts}</dd>
              <dt className="text-muted">Eigentum</dt><dd className="col-span-2">{lead.ownsProperty}</dd>
              <dt className="text-muted">Rechnung</dt><dd className="col-span-2">{lead.hasInvoice}</dd>
            </dl>
          </section>

          <section className="print-card bg-card border border-line rounded-eloLg p-6">
            <h2 className="font-display text-[18px] text-ink">Consent</h2>
            <dl className="mt-3 grid grid-cols-3 gap-y-2 text-[14px]">
              <dt className="text-muted">Rechtsgrundlage</dt><dd className="col-span-2">{lead.legalBasis}</dd>
              <dt className="text-muted">Version</dt><dd className="col-span-2">{lead.consent?.consentTextVersion ?? '—'}</dd>
              <dt className="text-muted">Zeitpunkt</dt>
              <dd className="col-span-2">{lead.consent?.consentTimestamp ? new Date(lead.consent.consentTimestamp).toLocaleString('de-DE') : '—'}</dd>
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}
