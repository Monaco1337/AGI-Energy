export type AuditAction =
  | 'lead.created'
  | 'lead.updated'
  | 'lead.status_changed'
  | 'lead.note_added'
  | 'lead.contact_logged'
  | 'lead.consent_updated'
  | 'research.created'
  | 'research.updated'
  | 'research.converted_to_lead'
  | 'import.batch'
  | 'auth.login_success'
  | 'auth.login_failed'
  | 'auth.logout'
  | 'experiment.created'
  | 'experiment.stopped'
  | 'settings.updated';

export interface AuditEntry {
  id: string;
  createdAt: string;
  actorId: string;
  actorRole: 'admin' | 'sales' | 'viewer' | 'system' | 'anonymous';
  action: AuditAction;
  entity: 'lead' | 'research' | 'user' | 'import' | 'experiment' | 'settings' | 'auth';
  entityId: string;
  diff?: Record<string, { from: unknown; to: unknown }>;
  ipHash?: string;
  ua?: string;
  requestId?: string;
}
