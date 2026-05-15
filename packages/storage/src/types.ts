import type {
  Lead,
  LeadId,
  LeadStatus,
  ResearchProspect,
  ResearchId,
  AuditEntry,
  AdminUser,
  UserId,
  FunnelEvent,
} from '@elo/core';

export interface LeadFilter {
  colors?: Lead['leadColor'][];
  statuses?: LeadStatus[];
  customerTypes?: Lead['customerType'][];
  interests?: Lead['interests'][number][];
  source?: Lead['source'];
  postalCodePrefix?: string;
  search?: string;
  assignedTo?: string;
  hasInvoice?: boolean;
}

export interface StorageAdapter {
  // Leads
  createLead(lead: Lead): Promise<Lead>;
  updateLead(id: LeadId, patch: Partial<Lead>): Promise<Lead | null>;
  getLead(id: LeadId): Promise<Lead | null>;
  listLeads(filter?: LeadFilter): Promise<Lead[]>;
  findDuplicate(args: {
    email?: string;
    phone?: string;
    name?: string;
    postalCode?: string;
  }): Promise<Lead | null>;

  // Research
  createResearch(p: ResearchProspect): Promise<ResearchProspect>;
  updateResearch(id: ResearchId, patch: Partial<ResearchProspect>): Promise<ResearchProspect | null>;
  getResearch(id: ResearchId): Promise<ResearchProspect | null>;
  listResearch(): Promise<ResearchProspect[]>;

  // Audit
  appendAudit(entry: AuditEntry): Promise<void>;
  listAudit(limit?: number): Promise<AuditEntry[]>;

  // Users
  getUserByEmail(email: string): Promise<AdminUser | null>;
  upsertUser(user: AdminUser): Promise<AdminUser>;
  updateUser(id: UserId, patch: Partial<AdminUser>): Promise<AdminUser | null>;

  // Events
  appendEvent(event: FunnelEvent): Promise<void>;
  listEvents(limit?: number): Promise<FunnelEvent[]>;
}
