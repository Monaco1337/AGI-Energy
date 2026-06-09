/* eslint-disable no-console */
import {
  newId,
  nowIso,
  type AdminUser,
  type Partner,
  type PartnerId,
  type UserId,
} from '@elo/core';
import { getStorage, ensurePostgresSchema } from '@elo/storage';
import { hashPassword } from '../lib/auth/password';

/**
 * Provisioniert die produktiven Login-Konten (Admin + 5 Vertriebspartner).
 *
 * - Läuft gegen den aktiven Storage-Treiber (`getStorage()`). Ist eine
 *   `POSTGRES_URL` gesetzt, wird zunächst das Schema idempotent angelegt.
 * - Vollständig idempotent: existiert ein Benutzer mit gleichem `username`,
 *   wird er NICHT überschrieben (Passwörter bleiben erhalten).
 *
 * Passwörter (überschreibbar via Env):
 *   - Admin:   ADMIN_BOOTSTRAP_PASSWORD  (Default: Volvic1337!)
 *   - Partner: PARTNER_INITIAL_PASSWORD  (Default: AGI-Start2026!)
 */

const ADMIN_PASSWORD = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? 'Volvic1337!';
const PARTNER_PASSWORD = process.env.PARTNER_INITIAL_PASSWORD ?? 'AGI-Start2026!';

interface PartnerSeed {
  username: string;
  name: string;
}

const PARTNERS: PartnerSeed[] = [
  { username: 'jennifer.ast', name: 'Jennifer Ast' },
  { username: 'michael.dyck', name: 'Michael Dyck' },
  { username: 'andreas.drauschke', name: 'Andreas Drauschke' },
  { username: 'gerd.tepe', name: 'Gerd Tepe' },
  { username: 'andreas.nazarenus', name: 'Andreas Nazarenus' },
];

async function main() {
  const usePostgres =
    process.env.STORAGE_DRIVER === 'postgres' || Boolean(process.env.POSTGRES_URL);

  if (usePostgres) {
    console.log('Lege Postgres-Schema an (idempotent) …');
    await ensurePostgresSchema();
  } else {
    console.log('Kein POSTGRES_URL erkannt – seede in den aktiven Treiber (json/blob).');
  }

  const storage = getStorage();

  // ─── Admin ────────────────────────────────────────────────────────────────
  const existingAdmin = await storage.getUserByUsername('admin');
  if (existingAdmin) {
    console.log('• Admin "admin" existiert bereits – übersprungen.');
  } else {
    const admin: AdminUser = {
      id: newId('usr') as UserId,
      username: 'admin',
      name: 'Administrator',
      email: process.env.ADMIN_BOOTSTRAP_EMAIL,
      role: 'admin',
      passwordHash: await hashPassword(ADMIN_PASSWORD),
      createdAt: nowIso(),
      failedLoginCount: 0,
      mustChangePassword: false,
    };
    await storage.upsertUser(admin);
    console.log('✓ Admin "admin" angelegt.');
  }

  // ─── Vertriebspartner ───────────────────────────────────────────────────
  for (const p of PARTNERS) {
    const existing = await storage.getUserByUsername(p.username);
    if (existing) {
      console.log(`• Partner "${p.username}" existiert bereits – übersprungen.`);
      continue;
    }

    const partnerId = newId('prt') as PartnerId;
    const userId = newId('usr') as UserId;

    const partner: Partner = {
      id: partnerId,
      createdAt: nowIso(),
      updatedAt: nowIso(),
      name: p.name,
      email: `${p.username}@agi-energy.de`,
      userId,
      regionPrefixes: [],
      specialties: [],
      capacity: 25,
      status: 'active',
      isDemo: false,
    };
    await storage.createPartner(partner);

    const user: AdminUser = {
      id: userId,
      username: p.username,
      name: p.name,
      role: 'partner',
      passwordHash: await hashPassword(PARTNER_PASSWORD),
      createdAt: nowIso(),
      failedLoginCount: 0,
      mustChangePassword: true,
      partnerId,
    };
    await storage.upsertUser(user);
    console.log(`✓ Partner "${p.username}" (${p.name}) angelegt + verknüpft.`);
  }

  console.log('\nFertig. Login über Benutzername:');
  console.log(`  admin / ${ADMIN_PASSWORD}`);
  for (const p of PARTNERS) {
    console.log(`  ${p.username} / ${PARTNER_PASSWORD} (Passwortänderung beim 1. Login erzwungen)`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
