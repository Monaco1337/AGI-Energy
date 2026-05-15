import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  // Phase-2-Stub: nimmt Header entgegen, erkennt CSV, antwortet mit
  // klar dokumentiertem Hinweis. Eigentliche Persistierung folgt.
  const ct = req.headers.get('content-type') ?? '';
  if (!ct.includes('multipart/form-data') && !ct.includes('text/csv')) {
    return NextResponse.json({ ok: false, error: 'Bitte CSV-Datei senden.' }, { status: 415 });
  }
  return NextResponse.json({
    ok: false,
    phase: 2,
    message:
      'CSV-Import-Pipeline ist als Phase 2 vorbereitet. Spalten-Mapping, Dry-Run, Dubletten-Report und Audit-Eintrag folgen.',
  });
}
