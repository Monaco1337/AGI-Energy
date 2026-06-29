// Klein, abhängigkeitsfrei. crypto ist global in Node 20+.
export function newId(prefix = ''): string {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  const uuid =
    c && 'randomUUID' in c
      ? c.randomUUID()
      : // sehr seltener Fallback (sollte in Node 20+ nie greifen)
        `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  return prefix ? `${prefix}_${uuid}` : uuid;
}

export function nowIso(): string {
  return new Date().toISOString();
}

/**
 * Generiert einen menschlich lesbaren, gut teilbaren Empfehlungscode (8 Zeichen,
 * ohne verwechselbare 0/O/1/I/L). Beispiel: "K7H3F2QM".
 */
export function newReferralCode(): string {
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  const len = alphabet.length;
  const c = (globalThis as { crypto?: Crypto }).crypto;
  let out = '';
  if (c && 'getRandomValues' in c) {
    const buf = new Uint8Array(8);
    c.getRandomValues(buf);
    for (let i = 0; i < 8; i += 1) {
      const byte = buf[i] ?? 0;
      out += alphabet.charAt(byte % len);
    }
  } else {
    for (let i = 0; i < 8; i += 1) {
      out += alphabet.charAt(Math.floor(Math.random() * len));
    }
  }
  return out;
}
