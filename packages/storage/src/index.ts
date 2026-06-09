import path from 'node:path';
import { JsonStorageAdapter } from './jsonAdapter';
import { BlobStorageAdapter } from './blobAdapter';
import { createSupabaseAdapter } from './supabaseAdapter';
import { PostgresStorageAdapter, ensurePostgresSchema } from './postgresAdapter';
import type { StorageAdapter } from './types';

export type { StorageAdapter, LeadFilter } from './types';
export { JsonStorageAdapter } from './jsonAdapter';
export { BlobStorageAdapter } from './blobAdapter';
export { createSupabaseAdapter } from './supabaseAdapter';
export { PostgresStorageAdapter, ensurePostgresSchema } from './postgresAdapter';

let cached: StorageAdapter | null = null;

export function getStorage(): StorageAdapter {
  if (cached) return cached;
  // Auto-Erkennung der Reihenfolge:
  //  1) explizit gesetzter STORAGE_DRIVER
  //  2) Postgres, wenn eine POSTGRES_URL vorhanden ist (Vercel Postgres/Neon)
  //  3) Blob, wenn ein Blob-Token vorhanden ist
  //  4) sonst lokale JSON-Datei
  const driver =
    process.env.STORAGE_DRIVER ??
    (process.env.POSTGRES_URL
      ? 'postgres'
      : process.env.BLOB_READ_WRITE_TOKEN
        ? 'blob'
        : 'json');

  if (driver === 'postgres') {
    if (!process.env.POSTGRES_URL) {
      throw new Error('STORAGE_DRIVER=postgres setzt POSTGRES_URL voraus.');
    }
    cached = new PostgresStorageAdapter();
    return cached;
  }

  if (driver === 'supabase') {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('STORAGE_DRIVER=supabase setzt SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY voraus.');
    }
    cached = createSupabaseAdapter({ url, serviceKey: key });
    return cached;
  }

  if (driver === 'blob') {
    cached = new BlobStorageAdapter({
      pathname: process.env.STORAGE_BLOB_PATHNAME ?? 'db/agi-energy.json',
    });
    return cached;
  }

  const file = process.env.STORAGE_JSON_FILE ?? path.join(process.cwd(), 'data', 'leads.json');
  cached = new JsonStorageAdapter(file);
  return cached;
}

export function resetStorageForTests(): void {
  cached = null;
}
