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
