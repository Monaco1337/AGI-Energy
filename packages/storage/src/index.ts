import path from 'node:path';
import { JsonStorageAdapter } from './jsonAdapter';
import { createSupabaseAdapter } from './supabaseAdapter';
import type { StorageAdapter } from './types';

export type { StorageAdapter, LeadFilter } from './types';
export { JsonStorageAdapter } from './jsonAdapter';
export { createSupabaseAdapter } from './supabaseAdapter';

let cached: StorageAdapter | null = null;

export function getStorage(): StorageAdapter {
  if (cached) return cached;
  const driver = process.env.STORAGE_DRIVER ?? 'json';
  if (driver === 'supabase') {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('STORAGE_DRIVER=supabase setzt SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY voraus.');
    }
    cached = createSupabaseAdapter({ url, serviceKey: key });
    return cached;
  }
  const file = process.env.STORAGE_JSON_FILE ?? path.join(process.cwd(), 'data', 'leads.json');
  cached = new JsonStorageAdapter(file);
  return cached;
}

export function resetStorageForTests(): void {
  cached = null;
}
