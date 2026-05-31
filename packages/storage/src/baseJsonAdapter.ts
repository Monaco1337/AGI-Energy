import type {
  Lead,
  LeadId,
  ResearchProspect,
  ResearchId,
  AuditEntry,
  AdminUser,
  UserId,
  FunnelEvent,
} from '@elo/core';
import type { StorageAdapter, LeadFilter } from './types';

export interface DbShape {
  leads: Lead[];
  research: ResearchProspect[];
  audit: AuditEntry[];
  users: AdminUser[];
  events: FunnelEvent[];
}

export function emptyDb(): DbShape {
  return { leads: [], research: [], audit: [], users: [], events: [] };
}

/**
 * Gemeinsame JSON-Datenbanklogik für alle Speicher-Backends.
 *
 * Die konkrete Persistenz (Dateisystem, Vercel Blob, …) wird durch
 * `loadRaw`/`saveRaw` injiziert. Sämtliche Geschäftslogik (Filter,
 * Mutationen, Limits) lebt hier und bleibt damit Backend-unabhängig.
 */
export abstract class BaseJsonAdapter implements StorageAdapter {
  // Prozessweite Schreib-Serialisierung gegen Race-Conditions.
  private writeQueue: Promise<void> = Promise.resolve();

  /** Rohinhalt der DB laden. `null`, wenn noch nichts gespeichert wurde. */
  protected abstract loadRaw(): Promise<string | null>;

  /** Rohinhalt der DB persistieren. */
  protected abstract saveRaw(data: string): Promise<void>;

  protected async readDb(): Promise<DbShape> {
    const raw = await this.loadRaw();
    if (!raw) return emptyDb();
    try {
      const parsed = JSON.parse(raw) as Partial<DbShape>;
      return {
        leads: parsed.leads ?? [],
        research: parsed.research ?? [],
        audit: parsed.audit ?? [],
        users: parsed.users ?? [],
        events: parsed.events ?? [],
      };
    } catch {
      return emptyDb();
    }
  }

  protected async writeDb(db: DbShape): Promise<void> {
    await this.saveRaw(JSON.stringify(db, null, 2));
  }

  private async mutate<T>(fn: (db: DbShape) => Promise<T> | T): Promise<T> {
    let result!: T;
    this.writeQueue = this.writeQueue.then(async () => {
      const db = await this.readDb();
      result = await fn(db);
      await this.writeDb(db);
    });
    await this.writeQueue;
    return result;
  }

  async createLead(lead: Lead): Promise<Lead> {
    return this.mutate((db) => {
      db.leads.unshift(lead);
      return lead;
    });
  }

  async updateLead(id: LeadId, patch: Partial<Lead>): Promise<Lead | null> {
    return this.mutate((db) => {
      const idx = db.leads.findIndex((l) => l.id === id);
      if (idx === -1) return null;
      const existing = db.leads[idx]!;
      const updated: Lead = { ...existing, ...patch, updatedAt: new Date().toISOString() } as Lead;
      db.leads[idx] = updated;
      return updated;
    });
  }

  async getLead(id: LeadId): Promise<Lead | null> {
    const db = await this.readDb();
    return db.leads.find((l) => l.id === id) ?? null;
  }

  async listLeads(filter: LeadFilter = {}): Promise<Lead[]> {
    const db = await this.readDb();
    let result = db.leads;
    if (filter.colors?.length) result = result.filter((l) => filter.colors!.includes(l.leadColor));
    if (filter.statuses?.length) result = result.filter((l) => filter.statuses!.includes(l.status));
    if (filter.customerTypes?.length)
      result = result.filter((l) => filter.customerTypes!.includes(l.customerType));
    if (filter.interests?.length)
      result = result.filter((l) => l.interests.some((i) => filter.interests!.includes(i)));
    if (filter.source) result = result.filter((l) => l.source === filter.source);
    if (filter.postalCodePrefix)
      result = result.filter((l) => l.postalCode.startsWith(filter.postalCodePrefix!));
    if (filter.assignedTo) result = result.filter((l) => l.assignedTo === filter.assignedTo);
    if (filter.hasInvoice !== undefined) {
      result = result.filter((l) =>
        filter.hasInvoice
          ? l.hasInvoice === 'upload_now' || l.hasInvoice === 'later' || l.files.some((f) => f.category === 'invoice')
          : l.hasInvoice === 'no',
      );
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (l) =>
          l.firstName.toLowerCase().includes(q) ||
          l.lastName.toLowerCase().includes(q) ||
          (l.email ?? '').toLowerCase().includes(q) ||
          (l.phone ?? '').toLowerCase().includes(q) ||
          l.postalCode.includes(q),
      );
    }
    return result;
  }

  async findDuplicate(args: {
    email?: string;
    phone?: string;
    name?: string;
    postalCode?: string;
  }): Promise<Lead | null> {
    const db = await this.readDb();
    const email = args.email?.toLowerCase().trim();
    const phone = args.phone?.replace(/\D/g, '');
    return (
      db.leads.find((l) => {
        if (email && l.email?.toLowerCase().trim() === email) return true;
        if (phone && l.phone?.replace(/\D/g, '') === phone) return true;
        if (
          args.name &&
          args.postalCode &&
          `${l.firstName} ${l.lastName}`.toLowerCase().trim() === args.name.toLowerCase().trim() &&
          l.postalCode === args.postalCode
        )
          return true;
        return false;
      }) ?? null
    );
  }

  async createResearch(p: ResearchProspect): Promise<ResearchProspect> {
    return this.mutate((db) => {
      db.research.unshift(p);
      return p;
    });
  }

  async updateResearch(id: ResearchId, patch: Partial<ResearchProspect>): Promise<ResearchProspect | null> {
    return this.mutate((db) => {
      const idx = db.research.findIndex((r) => r.id === id);
      if (idx === -1) return null;
      const existing = db.research[idx]!;
      const updated: ResearchProspect = { ...existing, ...patch, updatedAt: new Date().toISOString() };
      db.research[idx] = updated;
      return updated;
    });
  }

  async getResearch(id: ResearchId): Promise<ResearchProspect | null> {
    const db = await this.readDb();
    return db.research.find((r) => r.id === id) ?? null;
  }

  async listResearch(): Promise<ResearchProspect[]> {
    const db = await this.readDb();
    return db.research;
  }

  async appendAudit(entry: AuditEntry): Promise<void> {
    await this.mutate((db) => {
      db.audit.unshift(entry);
      // Audit ist append-only, aber im JSON beschränken wir die letzten 5000.
      if (db.audit.length > 5000) db.audit.length = 5000;
    });
  }

  async listAudit(limit = 200): Promise<AuditEntry[]> {
    const db = await this.readDb();
    return db.audit.slice(0, limit);
  }

  async getUserByEmail(email: string): Promise<AdminUser | null> {
    const db = await this.readDb();
    const e = email.toLowerCase().trim();
    return db.users.find((u) => u.email.toLowerCase() === e) ?? null;
  }

  async upsertUser(user: AdminUser): Promise<AdminUser> {
    return this.mutate((db) => {
      const idx = db.users.findIndex((u) => u.id === user.id);
      if (idx === -1) db.users.push(user);
      else db.users[idx] = user;
      return user;
    });
  }

  async updateUser(id: UserId, patch: Partial<AdminUser>): Promise<AdminUser | null> {
    return this.mutate((db) => {
      const idx = db.users.findIndex((u) => u.id === id);
      if (idx === -1) return null;
      const existing = db.users[idx]!;
      const updated: AdminUser = { ...existing, ...patch };
      db.users[idx] = updated;
      return updated;
    });
  }

  async appendEvent(event: FunnelEvent): Promise<void> {
    await this.mutate((db) => {
      db.events.unshift(event);
      if (db.events.length > 50_000) db.events.length = 50_000;
    });
  }

  async listEvents(limit = 5000): Promise<FunnelEvent[]> {
    const db = await this.readDb();
    return db.events.slice(0, limit);
  }
}
