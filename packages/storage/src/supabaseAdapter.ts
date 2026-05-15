import type { StorageAdapter } from './types';

/**
 * Skeleton: wird in Phase 2 mit @supabase/supabase-js verdrahtet.
 * Methoden werfen NotImplemented, damit das Storage-Setup deutlich auf den
 * Konfigurations-Fehler hinweist und nicht still einen leeren Pfad nimmt.
 */
export function createSupabaseAdapter(_config: { url: string; serviceKey: string }): StorageAdapter {
  const ni = (name: string) => async () => {
    throw new Error(`SupabaseAdapter.${name} not implemented yet (Phase 2).`);
  };
  return {
    createLead: ni('createLead') as StorageAdapter['createLead'],
    updateLead: ni('updateLead') as StorageAdapter['updateLead'],
    getLead: ni('getLead') as StorageAdapter['getLead'],
    listLeads: ni('listLeads') as StorageAdapter['listLeads'],
    findDuplicate: ni('findDuplicate') as StorageAdapter['findDuplicate'],
    createResearch: ni('createResearch') as StorageAdapter['createResearch'],
    updateResearch: ni('updateResearch') as StorageAdapter['updateResearch'],
    getResearch: ni('getResearch') as StorageAdapter['getResearch'],
    listResearch: ni('listResearch') as StorageAdapter['listResearch'],
    appendAudit: ni('appendAudit') as StorageAdapter['appendAudit'],
    listAudit: ni('listAudit') as StorageAdapter['listAudit'],
    getUserByEmail: ni('getUserByEmail') as StorageAdapter['getUserByEmail'],
    upsertUser: ni('upsertUser') as StorageAdapter['upsertUser'],
    updateUser: ni('updateUser') as StorageAdapter['updateUser'],
    appendEvent: ni('appendEvent') as StorageAdapter['appendEvent'],
    listEvents: ni('listEvents') as StorageAdapter['listEvents'],
  };
}
