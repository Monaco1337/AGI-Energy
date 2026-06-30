'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { nowIso, hashIp } from '@elo/core';
import { logAudit } from '@elo/audit';
import { getStorage } from '@elo/storage';
import { rateLimit, getClientKeyFromHeaders } from '@/lib/rateLimit';
import { verifyPassword } from '@/lib/auth/password';
import { setSession, clearSession } from '@/lib/auth/session';
import { env } from '@/lib/env';

const LOCKOUT_THRESHOLD = 5;
const LOCKOUT_MINUTES = 15;

export async function loginAction(formData: FormData): Promise<void> {
  const h = await headers();
  const ip = getClientKeyFromHeaders(h);
  const rl = rateLimit(ip, 'login');
  const next = (formData.get('next') as string | null) || '/admin';
  if (!rl.allowed) {
    redirect(`/admin/login?next=${encodeURIComponent(next)}&error=${encodeURIComponent('Zu viele Versuche. Bitte später erneut.')}`);
  }

  const username = String(formData.get('username') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  if (!username || !password) {
    redirect(`/admin/login?error=${encodeURIComponent('Bitte Benutzername und Passwort angeben.')}`);
  }

  const storage = getStorage();
  const user = await storage.getUserByUsername(username);
  const ipHash = hashIp(ip, env.NEXTAUTH_SECRET);

  if (!user) {
    await logAudit({
      ctx: { actorId: 'anonymous', actorRole: 'anonymous', ipHash },
      action: 'auth.login_failed',
      entity: 'auth',
      entityId: username,
    });
    redirect(`/admin/login?error=${encodeURIComponent('Benutzername oder Passwort ist falsch.')}`);
  }
  if (user.lockedUntil && new Date(user.lockedUntil).getTime() > Date.now()) {
    redirect(`/admin/login?error=${encodeURIComponent('Konto temporär gesperrt. Bitte später erneut.')}`);
  }

  const ok = await verifyPassword(user.passwordHash, password);
  if (!ok) {
    const failed = (user.failedLoginCount ?? 0) + 1;
    const lockedUntil =
      failed >= LOCKOUT_THRESHOLD
        ? new Date(Date.now() + LOCKOUT_MINUTES * 60_000).toISOString()
        : undefined;
    await storage.updateUser(user.id, {
      failedLoginCount: failed,
      ...(lockedUntil ? { lockedUntil } : {}),
    });
    await logAudit({
      ctx: { actorId: user.id, actorRole: user.role, ipHash },
      action: 'auth.login_failed',
      entity: 'auth',
      entityId: username,
    });
    redirect(`/admin/login?error=${encodeURIComponent('Benutzername oder Passwort ist falsch.')}`);
  }

  await storage.updateUser(user.id, {
    failedLoginCount: 0,
    lockedUntil: undefined,
    lastLoginAt: nowIso(),
  });
  await setSession({
    userId: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    mustChangePassword: user.mustChangePassword ?? false,
  });
  await logAudit({
    ctx: { actorId: user.id, actorRole: user.role, ipHash },
    action: 'auth.login_success',
    entity: 'auth',
    entityId: user.id,
  });
  // Erstlogin bzw. erzwungene Änderung: zuerst Passwort setzen lassen.
  if (user.mustChangePassword) {
    redirect('/admin/konto/passwort');
  }
  redirect(next);
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect('/admin/login');
}
