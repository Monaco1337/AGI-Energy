# Energy Lead OS

Premium-Plattform für Energie-Lead-Akquise (Strom, Gas, Photovoltaik) in Deutschland.

> **Status**: Phase 1 frontend-fokussiert. Funnel + Landing + Scoring + Admin-Cockpit + Audit-Log lauffähig. Research-Board und CSV-Import sind als Phase-2-UI markiert.

## Setup

Voraussetzungen: Node.js >= 20.11, pnpm 10.

```bash
cd /Users/cel/energy-lead-os
cp .env.example .env.local
pnpm install
pnpm --filter @elo/web seed   # legt Admin-User + Demo-Leads an
pnpm dev
```

Aufrufbar:
- Landingpage: http://localhost:3000
- Energie-Check: http://localhost:3000/energiecheck
- Admin: http://localhost:3000/admin (Login mit `ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD` aus `.env.local`, Default `admin@example.com` / `changeme1234!`)

## Architektur

Monorepo (pnpm workspaces):

- `apps/web` – Next.js 15 App Router
- `packages/core` – Types, Zod-Schemas, Hilfen
- `packages/scoring` – deterministische Scoring-Engine v2 + AI-Assist-Interface
- `packages/storage` – Adapter (Json Default, Supabase per ENV)
- `packages/ui` – Premium Design-System (Tokens, Primitives, Tailwind-Preset)
- `packages/audit` – Audit-Trail
- `packages/mail` – Mail-Adapter + React-light-Templates
- `packages/experiments` – Bayes-A/B-Engine

## Persistenz

Default: lokale JSON-Datei unter `apps/web/data/leads.json`.
Supabase: setzen Sie `STORAGE_DRIVER=supabase` und `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` und führen Sie `supabase/schema.sql` + `supabase/policies.sql` aus. Der Supabase-Adapter ist als Skeleton vorhanden und wird in Phase 2 ausimplementiert.

## DSGVO

- Keine externen Tracker, keine Drittanbieter-Marketing-Cookies.
- Lokale Fonts (über `next/font` ausgelieferte Inter + Source Serif).
- Consent-Banner für funktional notwendige Cookies + zwei explizite Einwilligungen im Funnel mit Versionierung.
- IP wird nicht persistiert; nur ein gehashter Wert für Rate-Limit/Events (mit Server-Secret gesalzen).
- Audit-Trail ab Tag 1 für Lead-/Auth-Events.
- Privacy-Center: `/datenschutz` und `/datenschutz/anfrage`.

## Sicherheit

- Nonce-basierte CSP via `middleware.ts`.
- Argon2id-Passwort-Hashing.
- Brute-Force-Lockout (5 Fehlversuche → 15 Min Sperre).
- Token-Bucket-Rate-Limit (Funnel-Submit strenger als Default).
- Honeypot-Feld + Min-Time-Heuristik.
- HMAC-signierte Session-Cookies (httpOnly, SameSite=Lax, Secure in Prod).

## Was Phase-2 ist (klar markiert)

- Research-Board CRUD-UI (Datenmodell + Storage bereits da)
- CSV-Import-Pipeline (UI-Skeleton + Endpoint-Hinweis-JSON)
- Echte Supabase-Adapter-Implementierung
- Funnel-Event-Tracking aktiv im Wizard (Server-Endpoint `/api/events` ist da, Wizard-Sender folgt)
- E-Mail-Templates als React-Email-Komponenten (aktuell HTML-Strings)
- Telefonie-Integration (vorbereitet, nicht aktiv)

## Befehle

- `pnpm dev` – Dev-Server
- `pnpm build` – Build
- `pnpm typecheck` – TS-Check über alle Pakete
- `pnpm test` – Vitest in allen Paketen mit Tests (`scoring`, `experiments`)
- `pnpm --filter @elo/web seed` – Demo-Daten + Admin-User

## Designprinzipien

- Ruhig, deutsch, vertrauenswürdig. Keine Neon-Töne, keine Stockfotos.
- Komfort-/Seniorenmodus (Toggle im Header) – größere Schrift, höhere Kontraste, weniger Animation.
- `prefers-reduced-motion` und `prefers-contrast: more` werden respektiert.
- Eine Entscheidung pro Funnel-Screen, große Tap-Targets, `Zurück` immer sichtbar, Tastatur-Shortcuts (←/→).
- Sticky-CTA mobil ab 25% Scroll.
- Honeypot statt Captcha-Hürde.

## Lizenz / Hinweis

Demo-Plattform. Bitte Impressum, Datenschutzhinweise und ggf. Auftragsverarbeitungsverträge mit Mail-/Storage-Providern eigenständig ergänzen.
