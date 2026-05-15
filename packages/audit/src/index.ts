import { newId, nowIso } from '@elo/core';
import type { AuditAction, AuditEntry } from '@elo/core';
import { getStorage } from '@elo/storage';

export interface AuditContext {
  actorId: string;
  actorRole: AuditEntry['actorRole'];
  ipHash?: string;
  ua?: string;
  requestId?: string;
}

export function diffObjects(
  before: Record<string, unknown> | undefined,
  after: Record<string, unknown> | undefined,
): Record<string, { from: unknown; to: unknown }> | undefined {
  if (!before || !after) return undefined;
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  const out: Record<string, { from: unknown; to: unknown }> = {};
  for (const k of keys) {
    if (JSON.stringify(before[k]) !== JSON.stringify(after[k])) {
      out[k] = { from: before[k], to: after[k] };
    }
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export async function logAudit(args: {
  ctx: AuditContext;
  action: AuditAction;
  entity: AuditEntry['entity'];
  entityId: string;
  diff?: Record<string, { from: unknown; to: unknown }>;
}): Promise<void> {
  const storage = getStorage();
  const entry: AuditEntry = {
    id: newId('aud'),
    createdAt: nowIso(),
    actorId: args.ctx.actorId,
    actorRole: args.ctx.actorRole,
    action: args.action,
    entity: args.entity,
    entityId: args.entityId,
    ...(args.diff !== undefined ? { diff: args.diff } : {}),
    ...(args.ctx.ipHash !== undefined ? { ipHash: args.ctx.ipHash } : {}),
    ...(args.ctx.ua !== undefined ? { ua: args.ctx.ua } : {}),
    ...(args.ctx.requestId !== undefined ? { requestId: args.ctx.requestId } : {}),
  };
  await storage.appendAudit(entry);
}
