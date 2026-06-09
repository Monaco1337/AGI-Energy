import { NextResponse } from 'next/server';
import { seedAccounts } from '@/lib/seedAccounts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Einmaliger, geschützter Bootstrap-Endpoint zum Provisionieren der Login-
 * Konten direkt in der Vercel-Laufzeit (wo POSTGRES_URL verfügbar ist – im
 * Gegensatz zu `vercel pull`, das „Sensitive"-Variablen ausblendet).
 *
 * Schutz: Header `x-seed-secret` oder Query `?secret=` muss SEED_SECRET
 * entsprechen. Idempotent: legt nur fehlende Konten an, überschreibt nichts.
 * Nach erfolgreichem Seed bleibt der Endpoint ohne Wirkung (nichts mehr zu tun)
 * und kann gefahrlos entfernt werden.
 */
async function handle(req: Request): Promise<Response> {
  const expected = process.env.SEED_SECRET;
  if (!expected) {
    return NextResponse.json(
      { ok: false, error: 'SEED_SECRET ist nicht gesetzt.' },
      { status: 503 },
    );
  }

  const url = new URL(req.url);
  const provided = req.headers.get('x-seed-secret') ?? url.searchParams.get('secret') ?? '';
  if (provided !== expected) {
    return NextResponse.json({ ok: false, error: 'Nicht autorisiert.' }, { status: 401 });
  }

  try {
    const usePostgres =
      process.env.STORAGE_DRIVER === 'postgres' || Boolean(process.env.POSTGRES_URL);
    const result = await seedAccounts({ ensureSchema: usePostgres });
    return NextResponse.json({
      ok: true,
      driver: usePostgres ? 'postgres' : 'other',
      created: result.created,
      skipped: result.skipped,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}

export async function GET(req: Request): Promise<Response> {
  return handle(req);
}

export async function POST(req: Request): Promise<Response> {
  return handle(req);
}
