import { evaluateBetaBernoulli } from '@elo/experiments';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

// Demo-Auswertung: solange noch keine echten Experiment-Daten persistiert sind,
// zeigen wir die Bayes-Engine an einem klaren Beispiel.
export default async function ExperimentsPage() {
  const result = evaluateBetaBernoulli([
    { id: 'A', trials: 1200, successes: 84 },
    { id: 'B', trials: 1180, successes: 122 },
  ]);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-[28px] text-ink">Experimente</h1>
        <p className="mt-1 text-[14px] text-muted">
          Bayes-Auswertung (Beta-Bernoulli) für Funnel-Varianten.
          <Badge tone="gold" className="ml-2">Demo-Daten</Badge>
        </p>
      </div>

      <div className="bg-card border border-line rounded-eloLg p-6">
        <h2 className="font-display text-[18px] text-ink">Aktuelle Auswertung</h2>
        <ul className="mt-4 space-y-4">
          {result.variants.map((v) => (
            <li key={v.id} className="border border-line rounded-elo p-4">
              <div className="flex items-center justify-between text-[14px]">
                <div className="font-medium">Variante {v.id}</div>
                <div className="text-muted">P(Best) {(v.probabilityBest * 100).toFixed(1)}%</div>
              </div>
              <div className="mt-2 text-[13px] text-muted">
                Mean Rate {(v.meanRate * 100).toFixed(2)}% · 90% CI [{(v.ci90Low * 100).toFixed(2)}% – {(v.ci90High * 100).toFixed(2)}%]
              </div>
              <div className="mt-2 h-2 rounded-full bg-paper2 overflow-hidden">
                <div className="h-full bg-sage" style={{ width: `${v.probabilityBest * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-elo bg-paper2/60 border border-line p-4 text-[14px]">
          {result.recommendation.type === 'stop' ? (
            <span>
              Empfehlung: <b>Stop</b> – Variante {result.recommendation.winnerId} mit {(result.recommendation.probability * 100).toFixed(1)}% Wahrscheinlichkeit überlegen.
            </span>
          ) : (
            <span>Empfehlung: <b>Weitermessen</b> – {result.recommendation.reason}</span>
          )}
        </div>
      </div>
    </div>
  );
}
