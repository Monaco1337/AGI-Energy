// Stabiles Bucketing per Hash, ohne externe Tracker.
import { createHash } from 'node:crypto';

export function bucketForKey(experimentId: string, key: string, variantIds: string[]): string {
  if (variantIds.length === 0) throw new Error('variantIds darf nicht leer sein');
  const h = createHash('sha256').update(experimentId).update(':').update(key).digest();
  // Erste 4 Bytes als uint32
  const n = h.readUInt32BE(0);
  const idx = n % variantIds.length;
  return variantIds[idx]!;
}
