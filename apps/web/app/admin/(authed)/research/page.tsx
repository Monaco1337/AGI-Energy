import { getStorage } from '@elo/storage';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

export default async function ResearchPage() {
  const storage = getStorage();
  const items = await storage.listResearch();

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-[28px] text-ink">Research-Board</h1>
        <p className="mt-1 text-[14px] text-muted">
          Strukturierte manuelle Recherche – ohne Scraping, mit dokumentierter Quelle und rechtlicher Bewertung.
        </p>
      </div>

      <div className="bg-card border border-line rounded-eloLg p-6">
        <p className="text-[14px] text-ink2">
          Diese Sektion ist im aktuellen Bauschritt als <Badge tone="gold">Phase 2</Badge> markiert.
          Das Datenmodell, die Storage-Methoden <code className="text-[13px]">listResearch / createResearch / updateResearch</code> sowie das
          Lead-Konvertierungsfeld <code>legalReviewStatus</code> sind bereits angelegt. Die UI-Felder folgen, sobald die ersten echten Daten anstehen.
        </p>
        <ul className="mt-4 list-disc pl-5 text-[14px] text-muted space-y-1">
          <li>{items.length} Research-Einträge derzeit gespeichert.</li>
          <li>Konvertierung in Lead nur bei <code>approved_for_manual_contact</code>.</li>
          <li>Quelle (URL) und rechtliche Bewertung sind Pflichtfelder vor Konvertierung.</li>
        </ul>
      </div>
    </div>
  );
}
