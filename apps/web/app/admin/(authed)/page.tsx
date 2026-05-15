import Link from 'next/link';
import { getStorage } from '@elo/storage';
import type { Lead, LeadColor } from '@elo/core';
import { LeadColorBadge } from '@/components/admin/LeadColorBadge';
import { ContactBadge } from '@/components/admin/ContactBadge';
import { ConsentBadge } from '@/components/admin/ConsentBadge';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

const COLOR_PRIORITY: Record<LeadColor, number> = {
  red: 5,
  orange: 4,
  yellow: 3,
  blue: 2,
  gray: 1,
  black: 0,
};

function isToday(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

function canBeContacted(l: Lead): boolean {
  return l.legalBasis !== 'unknown_blocked' && l.leadColor !== 'black';
}

export default async function AdminCockpit() {
  const storage = getStorage();
  const leads = await storage.listLeads();

  const newToday = leads.filter((l) => isToday(l.createdAt));
  const hot = leads.filter((l) => l.leadColor === 'red' || l.leadColor === 'orange');
  const callableToday = leads
    .filter((l) => canBeContacted(l) && l.contactHistory.length === 0)
    .sort((a, b) => {
      const cp = COLOR_PRIORITY[b.leadColor] - COLOR_PRIORITY[a.leadColor];
      if (cp !== 0) return cp;
      return b.leadScore - a.leadScore;
    });

  const top = callableToday.slice(0, 5);
  const next = callableToday.slice(5, 12);

  const blocked = leads.filter((l) => !canBeContacted(l));

  // Pipeline / sekundäre Übersicht
  const pipeline: Array<{ key: string; label: string; count: number; color: LeadColor }> = [
    { key: 'red', label: 'Sofort-Abschluss', count: leads.filter((l) => l.leadColor === 'red').length, color: 'red' },
    { key: 'orange', label: 'Sehr heiß', count: leads.filter((l) => l.leadColor === 'orange').length, color: 'orange' },
    { key: 'yellow', label: 'Warm', count: leads.filter((l) => l.leadColor === 'yellow').length, color: 'yellow' },
    { key: 'blue', label: 'Information', count: leads.filter((l) => l.leadColor === 'blue').length, color: 'blue' },
    { key: 'gray', label: 'Niedrig', count: leads.filter((l) => l.leadColor === 'gray').length, color: 'gray' },
    { key: 'black', label: 'Gesperrt', count: leads.filter((l) => l.leadColor === 'black').length, color: 'black' },
  ];

  const bySource = new Map<string, number>();
  for (const l of leads) bySource.set(l.source, (bySource.get(l.source) ?? 0) + 1);
  const sources = [...bySource.entries()].sort((a, b) => b[1] - a[1]);

  const isDemoMode = leads.length > 0 && leads.every((l) => l.isDemo);

  return (
    <div className="space-y-10 max-w-[1240px]">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[12px] uppercase tracking-[0.16em] text-sage font-medium">Vertriebs-Cockpit</p>
          <h1 className="mt-1 font-display text-[30px] tracking-[-0.012em] text-ink">Heute wichtigste Leads</h1>
          <p className="text-[14px] text-muted mt-1">
            {callableToday.length} kontaktierbare Leads · {newToday.length} neu heute · {hot.length} heiße
          </p>
        </div>
        {isDemoMode && (
          <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-gold/40 bg-gold/10 text-gold text-[12px] font-medium uppercase tracking-[0.12em]">
            <span aria-hidden className="size-1.5 rounded-full bg-gold" />
            Demo-Daten
          </span>
        )}
      </div>

      {/* TOP-PRIORITÄTEN */}
      <section>
        <SectionHeader
          eyebrow="01 · Wen jetzt kontaktieren"
          title="Top-Prioritäten"
          right={
            <Link
              href="/admin/leads?color=red&color=orange"
              className="text-sage text-[14px] font-medium hover:text-sage2"
            >
              Alle priorisierten Leads →
            </Link>
          }
        />
        {top.length === 0 ? (
          <EmptyState
            title="Keine offenen Top-Leads."
            hint="Aktuell gibt es keine roten oder orangen Leads ohne Bearbeitung."
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {top.map((l) => (
              <LeadCockpitCard key={l.id} lead={l} />
            ))}
          </div>
        )}
      </section>

      {/* NÄCHSTE LEADS – kompakte Liste */}
      {next.length > 0 && (
        <section>
          <SectionHeader eyebrow="02 · Danach" title="Weitere offene Leads" />
          <div className="bg-card border border-line rounded-eloLg overflow-hidden divide-y divide-line">
            {next.map((l) => (
              <CompactLeadRow key={l.id} lead={l} />
            ))}
          </div>
        </section>
      )}

      {/* SEKUNDÄR: Pipeline + Quellen */}
      <section className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-card border border-line rounded-eloLg p-6">
          <SectionHeader eyebrow="03 · Pipeline" title="Verteilung nach Priorität" inline />
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {pipeline.map((p) => (
              <Link
                key={p.key}
                href={`/admin/leads?color=${p.key}`}
                className="block rounded-elo border border-line bg-paper2/40 hover:bg-paper2 px-4 py-3.5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] text-muted">{p.label}</span>
                  <LeadColorBadge color={p.color} />
                </div>
                <div className="mt-2 font-display text-[24px] text-ink">{p.count}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-card border border-line rounded-eloLg p-6">
          <SectionHeader eyebrow="Quellen" title="Top-Kanäle" inline />
          {sources.length === 0 ? (
            <p className="mt-4 text-[14px] text-muted">Noch keine Daten.</p>
          ) : (
            <ul className="mt-4 space-y-3 text-[14px]">
              {sources.slice(0, 6).map(([s, n]) => (
                <li key={s} className="flex items-center justify-between">
                  <span className="text-ink2">{s}</span>
                  <span className="text-ink font-medium">{n}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Gesperrte / Prüfung erforderlich */}
      {blocked.length > 0 && (
        <section>
          <SectionHeader
            eyebrow="04 · Achtung"
            title="Kontaktaufnahme aktuell nicht freigegeben"
            right={<span className="text-[13px] text-muted">{blocked.length} Leads</span>}
          />
          <div className="bg-card border border-line rounded-eloLg overflow-hidden divide-y divide-line">
            {blocked.slice(0, 5).map((l) => (
              <CompactLeadRow key={l.id} lead={l} blocked />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  right,
  inline,
}: {
  eyebrow: string;
  title: string;
  right?: React.ReactNode;
  inline?: boolean;
}) {
  return (
    <div className={inline ? 'flex items-end justify-between gap-3' : 'mb-5 flex items-end justify-between gap-3'}>
      <div>
        <p className="text-[11.5px] uppercase tracking-[0.14em] text-muted font-medium">{eyebrow}</p>
        <h2 className="mt-1 font-display text-[20px] sm:text-[22px] tracking-[-0.005em] text-ink leading-tight">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="rounded-eloLg border border-dashed border-line bg-paper2/30 px-6 py-10 text-center">
      <div className="text-[15px] font-medium text-ink">{title}</div>
      <p className="mt-1.5 text-[13.5px] text-muted">{hint}</p>
    </div>
  );
}

function LeadCockpitCard({ lead }: { lead: Lead }) {
  const why = lead.scoreReasons.slice(0, 3).map((r) => r.label);
  return (
    <article className="group relative bg-card border border-line rounded-eloLg p-5 hover:border-lineStrong hover:shadow-eloSm transition-all flex flex-col">
      {lead.isDemo && (
        <span className="absolute -top-2.5 right-4 inline-flex items-center h-5 px-2 rounded-full bg-gold/12 border border-gold/30 text-gold text-[10.5px] uppercase tracking-[0.14em] font-medium">
          Demo
        </span>
      )}

      <header className="flex items-start gap-3">
        <LeadColorBadge color={lead.leadColor} />
        <div className="flex-1 min-w-0">
          <div className="text-[15.5px] font-semibold text-ink truncate">
            {lead.firstName} {lead.lastName}
          </div>
          <div className="text-[12.5px] text-muted truncate">
            {lead.postalCode} {lead.city ?? ''} · {lead.customerType}
          </div>
        </div>
        <Badge tone="neutral">Score {lead.leadScore}</Badge>
      </header>

      {/* Empfohlene Aktion */}
      <div className="mt-4 rounded-elo bg-sage/[0.05] border border-sage/20 px-4 py-3">
        <div className="text-[11px] uppercase tracking-[0.14em] text-sage font-medium">Nächste Aktion</div>
        <p className="mt-1 text-[14px] text-ink leading-snug">{lead.recommendedAction}</p>
      </div>

      {/* Begründung */}
      {why.length > 0 && (
        <div className="mt-3">
          <div className="text-[11px] uppercase tracking-[0.14em] text-muted font-medium">Warum wichtig</div>
          <ul className="mt-1.5 space-y-1">
            {why.map((w) => (
              <li
                key={w}
                className="text-[13px] text-ink2 leading-snug flex items-start gap-2"
              >
                <span aria-hidden className="mt-1.5 size-1 rounded-full bg-sage shrink-0" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer: Kontakt-Wunsch + Consent + CTA */}
      <footer className="mt-4 pt-4 border-t border-line flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <ContactBadge preference={lead.contactPreference} />
          <ConsentBadge legalBasis={lead.legalBasis} />
        </div>
        <Link
          href={`/admin/leads/${lead.id}`}
          className="inline-flex items-center gap-1.5 text-sage hover:text-sage2 text-[13.5px] font-medium shrink-0"
        >
          Details
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </footer>
    </article>
  );
}

function CompactLeadRow({ lead, blocked = false }: { lead: Lead; blocked?: boolean }) {
  return (
    <Link
      href={`/admin/leads/${lead.id}`}
      className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5 hover:bg-paper2/40 transition-colors"
    >
      <LeadColorBadge color={lead.leadColor} />
      <div className="min-w-0">
        <div className="text-[14.5px] font-medium text-ink truncate">
          {lead.firstName} {lead.lastName}
          {lead.isDemo && (
            <span className="ml-2 text-[10.5px] uppercase tracking-[0.14em] text-gold">Demo</span>
          )}
        </div>
        <div className="text-[12.5px] text-muted truncate">
          {blocked ? (
            <>
              <span className="text-leadRed font-medium">Kontakt nicht freigegeben</span> ·{' '}
              {lead.legalBasis}
            </>
          ) : (
            lead.recommendedAction
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <Badge tone="neutral">Score {lead.leadScore}</Badge>
        <span aria-hidden className="text-muted">→</span>
      </div>
    </Link>
  );
}
