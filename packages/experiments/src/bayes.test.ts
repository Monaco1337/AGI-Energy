import { describe, it, expect } from 'vitest';
import { evaluateBetaBernoulli } from './bayes';
import { bucketForKey } from './bucket';

describe('evaluateBetaBernoulli', () => {
  it('empfiehlt Stop bei klarem Sieger', () => {
    const r = evaluateBetaBernoulli(
      [
        { id: 'a', trials: 1000, successes: 50 },
        { id: 'b', trials: 1000, successes: 120 },
      ],
      { samples: 4000, minTrialsPerVariant: 200, stopThreshold: 0.95 },
    );
    expect(r.recommendation.type).toBe('stop');
    if (r.recommendation.type === 'stop') {
      expect(r.recommendation.winnerId).toBe('b');
    }
  });

  it('empfiehlt continue bei zu wenig Daten', () => {
    const r = evaluateBetaBernoulli([
      { id: 'a', trials: 10, successes: 1 },
      { id: 'b', trials: 10, successes: 2 },
    ]);
    expect(r.recommendation.type).toBe('continue');
  });
});

describe('bucketForKey', () => {
  it('ist stabil', () => {
    const a = bucketForKey('exp1', 'session-xyz', ['A', 'B']);
    const b = bucketForKey('exp1', 'session-xyz', ['A', 'B']);
    expect(a).toBe(b);
  });

  it('verteilt grob gleichmäßig', () => {
    const counts: Record<string, number> = { A: 0, B: 0 };
    for (let i = 0; i < 2000; i++) {
      const v = bucketForKey('exp1', `s-${i}`, ['A', 'B']);
      counts[v]! += 1;
    }
    const ratio = counts.A! / 2000;
    expect(ratio).toBeGreaterThan(0.4);
    expect(ratio).toBeLessThan(0.6);
  });
});
