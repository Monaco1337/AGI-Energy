import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

export default function ImportPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-[28px] text-ink">CSV-Import</h1>
        <p className="mt-1 text-[14px] text-muted">
          Externe Leads (Google/Meta/LinkedIn Lead Gen Forms, manuelle Recherche, Empfehlungen) per CSV importieren.
        </p>
      </div>
      <div className="bg-card border border-line rounded-eloLg p-6">
        <div className="flex items-center gap-2"><Badge tone="gold">Phase 2</Badge><span className="text-[14px] text-ink2">UI-Skeleton</span></div>
        <p className="mt-3 text-[14px] text-ink2">
          Der Import-Pipeline-Plan steht: Spalten-Mapping, Pflicht <code>source</code> und <code>legalBasis</code>,
          Dubletten-Report (E-Mail/Telefon/Name+PLZ), Dry-Run, Audit-Eintrag pro Batch. Der Endpoint
          <code className="ml-1">/api/import/csv</code> nimmt aktuell Datei-Header entgegen und antwortet mit Hinweis-JSON.
        </p>
      </div>
    </div>
  );
}
