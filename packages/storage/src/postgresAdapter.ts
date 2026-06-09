import { sql } from '@vercel/postgres';
import type {
  Lead,
  LeadId,
  ResearchProspect,
  ResearchId,
  AuditEntry,
  AdminUser,
  UserId,
  FunnelEvent,
  Partner,
  PartnerId,
  Task,
  TaskId,
  Deal,
  DealId,
  Commission,
  CommissionId,
} from '@elo/core';
import type {
  StorageAdapter,
  LeadFilter,
  PartnerFilter,
  TaskFilter,
  DealFilter,
  CommissionFilter,
} from './types';

/**
 * Postgres-Adapter (Vercel Postgres / Neon, Treiber `@vercel/postgres`).
 *
 * Datenmodell: pro Entität eine Tabelle mit `id text PRIMARY KEY`, dem
 * vollständigen Objekt als `data jsonb` und `seq bigserial` für die
 * Einfügereihenfolge. Sämtliche Filter-/Suchlogik spiegelt exakt den
 * `BaseJsonAdapter` wider – sie wird in JS auf den geladenen Zeilen
 * angewandt. Bei den geringen Datenmengen eines Vertriebs-Leitstands ist
 * das robust und vermeidet Divergenzen zwischen JSON- und SQL-Logik.
 *
 * Hinweis: Tabellennamen stammen ausschließlich aus einer internen
 * Konstanten-Liste und werden nie aus Nutzereingaben gebildet – die
 * String-Interpolation in den Queries ist daher unkritisch.
 */

type Table =
  | 'users'
  | 'leads'
  | 'research'
  | 'audit'
  | 'events'
  | 'partners'
  | 'tasks'
  | 'deals'
  | 'commissions';

const ALL_TABLES: Table[] = [
  'users',
  'leads',
  'research',
  'audit',
  'events',
  'partners',
  'tasks',
  'deals',
  'commissions',
];

/**
 * Legt das Schema idempotent an (CREATE … IF NOT EXISTS). Sollte einmalig
 * vor dem ersten Zugriff (z. B. im Seed) ausgeführt werden.
 */
export async function ensurePostgresSchema(): Promise<void> {
  for (const t of ALL_TABLES) {
    await sql.query(
      `CREATE TABLE IF NOT EXISTS ${t} (id text PRIMARY KEY, data jsonb NOT NULL, seq bigserial)`,
    );
  }
  await sql.query(
    `CREATE UNIQUE INDEX IF NOT EXISTS users_username_uidx ON users ((lower(data->>'username')))`,
  );
  await sql.query(`CREATE INDEX IF NOT EXISTS users_email_idx ON users ((lower(data->>'email')))`);
  await sql.query(`CREATE INDEX IF NOT EXISTS users_partner_idx ON users ((data->>'partnerId'))`);
  await sql.query(`CREATE INDEX IF NOT EXISTS leads_partner_idx ON leads ((data->>'assignedPartnerId'))`);
  await sql.query(`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads ((data->>'status'))`);
  await sql.query(`CREATE INDEX IF NOT EXISTS tasks_partner_idx ON tasks ((data->>'partnerId'))`);
  await sql.query(`CREATE INDEX IF NOT EXISTS tasks_lead_idx ON tasks ((data->>'leadId'))`);
  await sql.query(`CREATE INDEX IF NOT EXISTS deals_partner_idx ON deals ((data->>'partnerId'))`);
  await sql.query(`CREATE INDEX IF NOT EXISTS deals_lead_idx ON deals ((data->>'leadId'))`);
  await sql.query(
    `CREATE INDEX IF NOT EXISTS commissions_partner_idx ON commissions ((data->>'partnerId'))`,
  );
}

export class PostgresStorageAdapter implements StorageAdapter {
  private async all<T>(table: Table, order: 'ASC' | 'DESC' = 'DESC'): Promise<T[]> {
    const { rows } = await sql.query(`SELECT data FROM ${table} ORDER BY seq ${order}`);
    return rows.map((r) => r.data as T);
  }

  private async one<T>(table: Table, id: string): Promise<T | null> {
    const { rows } = await sql.query(`SELECT data FROM ${table} WHERE id = $1`, [id]);
    return (rows[0]?.data as T) ?? null;
  }

  private async insert<T extends { id: string }>(table: Table, obj: T): Promise<T> {
    await sql.query(`INSERT INTO ${table} (id, data) VALUES ($1, $2::jsonb)`, [
      obj.id,
      JSON.stringify(obj),
    ]);
    return obj;
  }

  private async upsert<T extends { id: string }>(table: Table, obj: T): Promise<T> {
    await sql.query(
      `INSERT INTO ${table} (id, data) VALUES ($1, $2::jsonb)
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data`,
      [obj.id, JSON.stringify(obj)],
    );
    return obj;
  }

  private async patch<T extends { id: string }>(
    table: Table,
    id: string,
    patch: Partial<T>,
    touchUpdatedAt = true,
  ): Promise<T | null> {
    const cur = await this.one<T>(table, id);
    if (!cur) return null;
    const updated = {
      ...cur,
      ...patch,
      ...(touchUpdatedAt ? { updatedAt: new Date().toISOString() } : {}),
    } as T;
    await sql.query(`UPDATE ${table} SET data = $2::jsonb WHERE id = $1`, [
      id,
      JSON.stringify(updated),
    ]);
    return updated;
  }

  private async remove(table: Table, id: string): Promise<boolean> {
    const { rowCount } = await sql.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
    return (rowCount ?? 0) > 0;
  }

  // ─── Leads ──────────────────────────────────────────────────────────────

  async createLead(lead: Lead): Promise<Lead> {
    return this.insert('leads', lead);
  }

  async updateLead(id: LeadId, patch: Partial<Lead>): Promise<Lead | null> {
    return this.patch<Lead>('leads', id, patch);
  }

  async getLead(id: LeadId): Promise<Lead | null> {
    return this.one<Lead>('leads', id);
  }

  async deleteLead(id: LeadId): Promise<boolean> {
    return this.remove('leads', id);
  }

  async listLeads(filter: LeadFilter = {}): Promise<Lead[]> {
    let result = await this.all<Lead>('leads');
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
    if (filter.assignedPartnerId)
      result = result.filter((l) => l.assignedPartnerId === filter.assignedPartnerId);
    if (filter.unassigned) result = result.filter((l) => !l.assignedPartnerId);
    if (filter.hasInvoice !== undefined) {
      result = result.filter((l) =>
        filter.hasInvoice
          ? l.hasInvoice === 'upload_now' ||
            l.hasInvoice === 'later' ||
            l.files.some((f) => f.category === 'invoice')
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
    const leads = await this.all<Lead>('leads');
    const email = args.email?.toLowerCase().trim();
    const phone = args.phone?.replace(/\D/g, '');
    return (
      leads.find((l) => {
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

  // ─── Research ───────────────────────────────────────────────────────────

  async createResearch(p: ResearchProspect): Promise<ResearchProspect> {
    return this.insert('research', p);
  }

  async updateResearch(
    id: ResearchId,
    patch: Partial<ResearchProspect>,
  ): Promise<ResearchProspect | null> {
    return this.patch<ResearchProspect>('research', id, patch);
  }

  async getResearch(id: ResearchId): Promise<ResearchProspect | null> {
    return this.one<ResearchProspect>('research', id);
  }

  async listResearch(): Promise<ResearchProspect[]> {
    return this.all<ResearchProspect>('research');
  }

  // ─── Audit ──────────────────────────────────────────────────────────────

  async appendAudit(entry: AuditEntry): Promise<void> {
    await this.insert('audit', entry);
    // Append-only, aber Retention auf die letzten 5000 Einträge begrenzen.
    await sql.query(
      `DELETE FROM audit WHERE seq <= (
         SELECT seq FROM audit ORDER BY seq DESC OFFSET 5000 LIMIT 1
       )`,
    );
  }

  async listAudit(limit = 200): Promise<AuditEntry[]> {
    const { rows } = await sql.query(
      `SELECT data FROM audit ORDER BY seq DESC LIMIT $1`,
      [limit],
    );
    return rows.map((r) => r.data as AuditEntry);
  }

  // ─── Users ──────────────────────────────────────────────────────────────

  async getUserByEmail(email: string): Promise<AdminUser | null> {
    const e = email.toLowerCase().trim();
    const { rows } = await sql.query(
      `SELECT data FROM users WHERE lower(data->>'email') = $1 LIMIT 1`,
      [e],
    );
    return (rows[0]?.data as AdminUser) ?? null;
  }

  async getUserByUsername(username: string): Promise<AdminUser | null> {
    const u = username.toLowerCase().trim();
    const { rows } = await sql.query(
      `SELECT data FROM users WHERE lower(data->>'username') = $1 LIMIT 1`,
      [u],
    );
    return (rows[0]?.data as AdminUser) ?? null;
  }

  async getUser(id: UserId): Promise<AdminUser | null> {
    return this.one<AdminUser>('users', id);
  }

  async listUsers(): Promise<AdminUser[]> {
    return this.all<AdminUser>('users', 'ASC');
  }

  async upsertUser(user: AdminUser): Promise<AdminUser> {
    return this.upsert('users', user);
  }

  async updateUser(id: UserId, patch: Partial<AdminUser>): Promise<AdminUser | null> {
    return this.patch<AdminUser>('users', id, patch, false);
  }

  // ─── Events ─────────────────────────────────────────────────────────────

  async appendEvent(event: FunnelEvent): Promise<void> {
    await this.insert('events', event);
    await sql.query(
      `DELETE FROM events WHERE seq <= (
         SELECT seq FROM events ORDER BY seq DESC OFFSET 50000 LIMIT 1
       )`,
    );
  }

  async listEvents(limit = 5000): Promise<FunnelEvent[]> {
    const { rows } = await sql.query(
      `SELECT data FROM events ORDER BY seq DESC LIMIT $1`,
      [limit],
    );
    return rows.map((r) => r.data as FunnelEvent);
  }

  // ─── Partner ────────────────────────────────────────────────────────────

  async createPartner(p: Partner): Promise<Partner> {
    return this.insert('partners', p);
  }

  async updatePartner(id: PartnerId, patch: Partial<Partner>): Promise<Partner | null> {
    return this.patch<Partner>('partners', id, patch);
  }

  async getPartner(id: PartnerId): Promise<Partner | null> {
    return this.one<Partner>('partners', id);
  }

  async listPartners(filter: PartnerFilter = {}): Promise<Partner[]> {
    let result = await this.all<Partner>('partners');
    if (filter.statuses?.length) result = result.filter((p) => filter.statuses!.includes(p.status));
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          (p.regionLabel ?? '').toLowerCase().includes(q),
      );
    }
    return result;
  }

  async deletePartner(id: PartnerId): Promise<boolean> {
    return this.remove('partners', id);
  }

  // ─── Tasks ──────────────────────────────────────────────────────────────

  async createTask(t: Task): Promise<Task> {
    return this.insert('tasks', t);
  }

  async updateTask(id: TaskId, patch: Partial<Task>): Promise<Task | null> {
    return this.patch<Task>('tasks', id, patch);
  }

  async getTask(id: TaskId): Promise<Task | null> {
    return this.one<Task>('tasks', id);
  }

  async listTasks(filter: TaskFilter = {}): Promise<Task[]> {
    let result = await this.all<Task>('tasks');
    if (filter.statuses?.length) result = result.filter((t) => filter.statuses!.includes(t.status));
    if (filter.ownerId) result = result.filter((t) => t.ownerId === filter.ownerId);
    if (filter.partnerId) result = result.filter((t) => t.partnerId === filter.partnerId);
    if (filter.leadId) result = result.filter((t) => t.leadId === filter.leadId);
    return result;
  }

  async deleteTask(id: TaskId): Promise<boolean> {
    return this.remove('tasks', id);
  }

  // ─── Deals ──────────────────────────────────────────────────────────────

  async createDeal(d: Deal): Promise<Deal> {
    return this.insert('deals', d);
  }

  async updateDeal(id: DealId, patch: Partial<Deal>): Promise<Deal | null> {
    return this.patch<Deal>('deals', id, patch);
  }

  async getDeal(id: DealId): Promise<Deal | null> {
    return this.one<Deal>('deals', id);
  }

  async listDeals(filter: DealFilter = {}): Promise<Deal[]> {
    let result = await this.all<Deal>('deals');
    if (filter.statuses?.length) result = result.filter((d) => filter.statuses!.includes(d.status));
    if (filter.partnerId) result = result.filter((d) => d.partnerId === filter.partnerId);
    if (filter.leadId) result = result.filter((d) => d.leadId === filter.leadId);
    return result;
  }

  // ─── Commissions ────────────────────────────────────────────────────────

  async createCommission(c: Commission): Promise<Commission> {
    return this.insert('commissions', c);
  }

  async updateCommission(
    id: CommissionId,
    patch: Partial<Commission>,
  ): Promise<Commission | null> {
    return this.patch<Commission>('commissions', id, patch);
  }

  async getCommission(id: CommissionId): Promise<Commission | null> {
    return this.one<Commission>('commissions', id);
  }

  async listCommissions(filter: CommissionFilter = {}): Promise<Commission[]> {
    let result = await this.all<Commission>('commissions');
    if (filter.statuses?.length) result = result.filter((c) => filter.statuses!.includes(c.status));
    if (filter.partnerId) result = result.filter((c) => c.partnerId === filter.partnerId);
    return result;
  }
}
