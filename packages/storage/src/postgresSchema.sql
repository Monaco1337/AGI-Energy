-- AGI Energy – Postgres-Schema (Vercel Postgres / Neon)
--
-- Jede Entität liegt in einer eigenen Tabelle. Das vollständige Objekt wird
-- als JSONB in `data` gespeichert; `id` ist der Primärschlüssel, `seq` erhält
-- die Einfügereihenfolge (für „neueste zuerst"-Listen). Häufig gefilterte
-- Felder werden über funktionale Indizes auf JSONB-Ausdrücken beschleunigt.
--
-- Dieses Skript ist idempotent (CREATE TABLE/INDEX IF NOT EXISTS) und wird von
-- `ensurePostgresSchema()` im Postgres-Adapter ausgeführt.

CREATE TABLE IF NOT EXISTS users (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);
CREATE UNIQUE INDEX IF NOT EXISTS users_username_uidx ON users ((lower(data->>'username')));
CREATE INDEX IF NOT EXISTS users_email_idx  ON users ((lower(data->>'email')));
CREATE INDEX IF NOT EXISTS users_partner_idx ON users ((data->>'partnerId'));

CREATE TABLE IF NOT EXISTS leads (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);
CREATE INDEX IF NOT EXISTS leads_partner_idx ON leads ((data->>'assignedPartnerId'));
CREATE INDEX IF NOT EXISTS leads_status_idx  ON leads ((data->>'status'));

CREATE TABLE IF NOT EXISTS research (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);

CREATE TABLE IF NOT EXISTS audit (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);

CREATE TABLE IF NOT EXISTS events (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);

CREATE TABLE IF NOT EXISTS partners (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);

CREATE TABLE IF NOT EXISTS tasks (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);
CREATE INDEX IF NOT EXISTS tasks_partner_idx ON tasks ((data->>'partnerId'));
CREATE INDEX IF NOT EXISTS tasks_lead_idx    ON tasks ((data->>'leadId'));

CREATE TABLE IF NOT EXISTS deals (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);
CREATE INDEX IF NOT EXISTS deals_partner_idx ON deals ((data->>'partnerId'));
CREATE INDEX IF NOT EXISTS deals_lead_idx    ON deals ((data->>'leadId'));

CREATE TABLE IF NOT EXISTS commissions (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);
CREATE INDEX IF NOT EXISTS commissions_partner_idx ON commissions ((data->>'partnerId'));

CREATE TABLE IF NOT EXISTS subscribers (
  id   text PRIMARY KEY,
  data jsonb NOT NULL,
  seq  bigserial
);
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_email_uidx ON subscribers ((lower(data->>'email')));
CREATE INDEX IF NOT EXISTS subscribers_confirm_idx ON subscribers ((data->>'confirmToken'));
CREATE INDEX IF NOT EXISTS subscribers_unsub_idx ON subscribers ((data->>'unsubscribeToken'));
CREATE INDEX IF NOT EXISTS subscribers_status_idx ON subscribers ((data->>'status'));
