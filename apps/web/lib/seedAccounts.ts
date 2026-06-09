import {
  newId,
  nowIso,
  type AdminUser,
  type Partner,
  type PartnerId,
  type UserId,
} from '@elo/core';
import { getStorage, ensurePostgresSchema } from '@elo/storage';
import { hashPassword } from './auth/password';

/**
 * Provisioniert die produktiven Login-Konten (Admin + 5 Vertriebspartner).
 * Wird sowohl vom CLI-Skript (`seed:pg`) als auch vom geschützten
 * Bootstrap-Endpoint genutzt, damit die Logik nur an einer Stelle lebt.
 *
 * Vollständig idempotent: existiert ein Benutzer mit gleichem `username`,
 * wird er NICHT überschrieben (Passwörter bleiben erhalten).
 */

export const ADMIN_USERNAME = 'admin';

export interface PartnerSeed {
  username: string;
  name: string;
}

export const PARTNER_SEEDS: PartnerSeed[] = [
  { username: 'jennifer.ast', name: 'Jennifer Ast' },
  { username: 'michael.dyck', name: 'Michael Dyck' },
  { username: 'andreas.drauschke', name: 'Andreas Drauschke' },
  { username: 'gerd.tepe', name: 'Gerd Tepe' },
  { username: 'andreas.nazarenus', name: 'Andreas Nazarenus' },
];

export interface SeedAccountsOptions {
  adminPassword?: string;
  partnerPassword?: string;
  /** Postgres-Schema vorab anlegen (nur sinnvoll bei aktivem Postgres-Treiber). */
  ensureSchema?: boolean;
}

export interface SeedAccountsResult {
  created: string[];
  skipped: string[];
}

export async function seedAccounts(opts: SeedAccountsOptions = {}): Promise<SeedAccountsResult> {
  const adminPassword = opts.adminPassword ?? process.env.ADMIN_BOOTSTRAP_PASSWORD ?? 'Volvic1337!';
  const partnerPassword =
    opts.partnerPassword ?? process.env.PARTNER_INITIAL_PASSWORD ?? 'AGI-Start2026!';

  if (opts.ensureSchema) {
    await ensurePostgresSchema();
  }

  const storage = getStorage();
  const created: string[] = [];
  const skipped: string[] = [];

  // Admin
  const existingAdmin = await storage.getUserByUsername(ADMIN_USERNAME);
  if (existingAdmin) {
    skipped.push(ADMIN_USERNAME);
  } else {
    const admin: AdminUser = {
      id: newId('usr') as UserId,
      username: ADMIN_USERNAME,
      name: 'Administrator',
      email: process.env.ADMIN_BOOTSTRAP_EMAIL,
      role: 'admin',
      passwordHash: await hashPassword(adminPassword),
      createdAt: nowIso(),
      failedLoginCount: 0,
      mustChangePassword: false,
    };
    await storage.upsertUser(admin);
    created.push(ADMIN_USERNAME);
  }

  // Vertriebspartner
  for (const p of PARTNER_SEEDS) {
    const existing = await storage.getUserByUsername(p.username);
    if (existing) {
      skipped.push(p.username);
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
      passwordHash: await hashPassword(partnerPassword),
      createdAt: nowIso(),
      failedLoginCount: 0,
      mustChangePassword: true,
      partnerId,
    };
    await storage.upsertUser(user);
    created.push(p.username);
  }

  return { created, skipped };
}
