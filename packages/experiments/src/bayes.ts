/**
 * Beta-Bernoulli A/B-Auswertung.
 * Variante = (alpha, beta) Posterior. Wir schätzen P(Variante_i ist die beste)
 * via Monte-Carlo aus dem Posterior – einfach, robust, ohne externe Lib.
 */

export interface VariantStats {
  id: string;
  trials: number;
  successes: number;
}

export interface VariantPosterior {
  id: string;
  alpha: number;
  beta: number;
  meanRate: number;
  ci90Low: number;
  ci90High: number;
  probabilityBest: number;
}

export interface BayesResult {
  variants: VariantPosterior[];
  recommendation:
    | { type: 'continue'; reason: string }
    | { type: 'stop'; winnerId: string; probability: number };
}

// Box-Muller normal sample
function randNormal(mean = 0, stdev = 1): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + stdev * z;
}

// Marsaglia Gamma-Sampler
function randGamma(shape: number): number {
  if (shape < 1) {
    return randGamma(shape + 1) * Math.pow(Math.random(), 1 / shape);
  }
  const d = shape - 1 / 3;
  const c = 1 / Math.sqrt(9 * d);
  while (true) {
    let x = randNormal();
    let v = 1 + c * x;
    if (v <= 0) continue;
    v = v * v * v;
    const u = Math.random();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}

function randBeta(alpha: number, beta: number): number {
  const x = randGamma(alpha);
  const y = randGamma(beta);
  return x / (x + y);
}

function quantile(sorted: number[], q: number): number {
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor(q * (sorted.length - 1))));
  return sorted[idx]!;
}

export function evaluateBetaBernoulli(
  variants: VariantStats[],
  opts: { samples?: number; priorAlpha?: number; priorBeta?: number; stopThreshold?: number; minTrialsPerVariant?: number } = {},
): BayesResult {
  const samples = opts.samples ?? 5000;
  const priorAlpha = opts.priorAlpha ?? 1;
  const priorBeta = opts.priorBeta ?? 1;
  const stopThreshold = opts.stopThreshold ?? 0.95;
  const minTrials = opts.minTrialsPerVariant ?? 100;

  const posteriors = variants.map((v) => ({
    id: v.id,
    alpha: priorAlpha + v.successes,
    beta: priorBeta + Math.max(0, v.trials - v.successes),
    samples: [] as number[],
  }));

  // Monte Carlo: pro Sample Beta aus jeder Posterior, Gewinner zählen.
  const winCounts = new Map<string, number>();
  for (const p of posteriors) winCounts.set(p.id, 0);

  for (let s = 0; s < samples; s++) {
    let bestId = posteriors[0]!.id;
    let bestVal = -1;
    for (const p of posteriors) {
      const x = randBeta(p.alpha, p.beta);
      p.samples.push(x);
      if (x > bestVal) {
        bestVal = x;
        bestId = p.id;
      }
    }
    winCounts.set(bestId, (winCounts.get(bestId) ?? 0) + 1);
  }

  const variantsOut: VariantPosterior[] = posteriors.map((p) => {
    const sorted = [...p.samples].sort((a, b) => a - b);
    const meanRate = p.alpha / (p.alpha + p.beta);
    return {
      id: p.id,
      alpha: p.alpha,
      beta: p.beta,
      meanRate,
      ci90Low: quantile(sorted, 0.05),
      ci90High: quantile(sorted, 0.95),
      probabilityBest: (winCounts.get(p.id) ?? 0) / samples,
    };
  });

  const enoughData = variants.every((v) => v.trials >= minTrials);
  const top = [...variantsOut].sort((a, b) => b.probabilityBest - a.probabilityBest)[0]!;

  if (enoughData && top.probabilityBest >= stopThreshold) {
    return {
      variants: variantsOut,
      recommendation: {
        type: 'stop',
        winnerId: top.id,
        probability: top.probabilityBest,
      },
    };
  }

  return {
    variants: variantsOut,
    recommendation: {
      type: 'continue',
      reason: enoughData
        ? `Wahrscheinlichkeit für Sieger noch unter ${Math.round(stopThreshold * 100)}%.`
        : `Mindestens ${minTrials} Versuche pro Variante nötig.`,
    },
  };
}
