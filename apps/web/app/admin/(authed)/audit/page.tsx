import { getStorage } from '@elo/storage';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

export default async function AuditPage() {
  const storage = getStorage();
  const entries = await storage.listAudit(200);
  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="font-display text-[28px] text-ink">Audit-Log</h1>
      <p className="text-[14px] text-muted">Letzte 200 Einträge. Append-only.</p>

      <div className="bg-card border border-line rounded-eloLg overflow-hidden">
        <table className="w-full text-[14px]">
          <thead className="bg-paper2/60 text-muted">
            <tr className="text-left">
              <th className="px-4 py-3">Zeit</th>
              <th className="px-4 py-3">Aktor</th>
              <th className="px-4 py-3">Rolle</th>
              <th className="px-4 py-3">Aktion</th>
              <th className="px-4 py-3">Entity</th>
              <th className="px-4 py-3">ID</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-muted">Noch keine Einträge.</td></tr>
            )}
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-line">
                <td className="px-4 py-3 text-muted">{new Date(e.createdAt).toLocaleString('de-DE')}</td>
                <td className="px-4 py-3">{e.actorId}</td>
                <td className="px-4 py-3"><Badge tone="neutral">{e.actorRole}</Badge></td>
                <td className="px-4 py-3"><Badge tone="sage">{e.action}</Badge></td>
                <td className="px-4 py-3">{e.entity}</td>
                <td className="px-4 py-3 text-muted truncate max-w-[18ch]">{e.entityId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
