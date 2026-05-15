/** Heuristische Ersteinschätzung (lokal, keine OCR). */

export type BillSegment = 'strom' | 'gas' | 'gewerbe';

export function hashFiles(files: readonly File[]): number {
  let h = 0;
  for (const f of files) {
    h = (h * 31 + f.name.length + (f.size % 999983)) >>> 0;
  }
  return h || 1;
}

export function estimateBill(files: readonly File[], segment: BillSegment) {
  const h = hashFiles(files);
  const isGas = segment === 'gas';
  const isGewerbe = segment === 'gewerbe';
  const base = isGewerbe ? 11 + (h % 8) : isGas ? 8 + (h % 7) : 10 + (h % 8);
  const span = 6 + (h % 9);
  const pctMin = Math.min(base, 28);
  const pctMax = Math.min(base + span, 38);
  const eurLow = isGewerbe ? 120 + (h % 180) : 18 + (h % 35);
  const eurHigh = isGewerbe ? eurLow + 180 + (h % 220) : eurLow + 22 + (h % 40);
  return { pctMin, pctMax, eurLow, eurHigh };
}

export function estimateRoof(files: readonly File[]) {
  const h = hashFiles(files);
  const n = files.length;
  const kwpLo = Math.round(6 + (h % 5) + n * 1.2);
  const kwpHi = Math.min(kwpLo + 4 + (h % 6) + n, 22);
  const areaLo = 35 + (h % 25) + n * 12;
  const areaHi = areaLo + 25 + (h % 35);
  return { kwpLo, kwpHi, areaLo, areaHi, perspectives: n };
}
