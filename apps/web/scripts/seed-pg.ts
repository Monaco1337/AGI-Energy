/* eslint-disable no-console */
import { seedAccounts, ADMIN_USERNAME, PARTNER_SEEDS } from '../lib/seedAccounts';

/**
 * Provisioniert die produktiven Login-Konten gegen den aktiven Storage-Treiber.
 * Ist eine `POSTGRES_URL` gesetzt, wird zuvor das Schema idempotent angelegt.
 *
 * Hinweis: Da Vercel DB-Verbindungsstrings als „Sensitive" schützt, lassen sie
 * sich oft nicht via `vercel pull` auslesen. In dem Fall ist der geschützte
 * Bootstrap-Endpoint (/api/admin/bootstrap) der zuverlässigere Weg.
 */

async function main() {
  const usePostgres =
    process.env.STORAGE_DRIVER === 'postgres' || Boolean(process.env.POSTGRES_URL);

  if (usePostgres) {
    console.log('Lege Postgres-Schema an (idempotent) …');
  } else {
    console.log('Kein POSTGRES_URL erkannt – seede in den aktiven Treiber (json/blob).');
  }

  const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? 'Volvic1337!';
  const partnerPassword = process.env.PARTNER_INITIAL_PASSWORD ?? 'AGI-Start2026!';

  const { created, skipped } = await seedAccounts({
    adminPassword,
    partnerPassword,
    ensureSchema: usePostgres,
  });

  for (const u of created) console.log(`✓ ${u} angelegt.`);
  for (const u of skipped) console.log(`• ${u} existiert bereits – übersprungen.`);

  console.log('\nFertig. Login über Benutzername:');
  console.log(`  ${ADMIN_USERNAME} / ${adminPassword}`);
  for (const p of PARTNER_SEEDS) {
    console.log(`  ${p.username} / ${partnerPassword} (Passwortänderung beim 1. Login erzwungen)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
