'use server';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { hashIp } from '@elo/core';
import { logAudit } from '@elo/audit';
import { getStorage } from '@elo/storage';
import { getClientKeyFromHeaders } from '@/lib/rateLimit';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { getSession, setSession } from '@/lib/auth/session';
import { env } from '@/lib/env';

const PW_PAGE = '/admin/konto/passwort';

function fail(message: string): never {
  redirect(`${PW_PAGE}?error=${encodeURIComponent(message)}`);
}

/**
 * Passwort des eingeloggten Users ändern. Verlangt das aktuelle Passwort,
 * setzt den neuen argon2-Hash und löscht `mustChangePassword`. Danach wird
 * die Session aktualisiert (sonst bliebe der erzwungene Redirect bestehen).
 */
export async function changePasswordAction(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) redirect('/admin/login');

  const current = String(formData.get('current') ?? '');
  const next = String(formData.get('next') ?? '');
  const confirm = String(formData.get('confirm') ?? '');

  if (!current || !next || !confirm) fail('Bitte alle Felder ausfüllen.');
  if (next.length < 10) fail('Das neue Passwort muss mindestens 10 Zeichen lang sein.');
  if (next !== confirm) fail('Die neuen Passwörter stimmen nicht überein.');
  if (next === current) fail('Das neue Passwort muss sich vom aktuellen unterscheiden.');

  const storage = getStorage();
  const user = await storage.getUser(session.userId as never);
  if (!user) redirect('/admin/login');

  const ok = await verifyPassword(user.passwordHash, current);
  if (!ok) fail('Das aktuelle Passwort ist falsch.');

  const passwordHash = await hashPassword(next);
  await storage.updateUser(user.id, { passwordHash, mustChangePassword: false });

  await setSession({
    userId: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    mustChangePassword: false,
  });

  const h = await headers();
  const ip = getClientKeyFromHeaders(h);
  await logAudit({
    ctx: { actorId: user.id, actorRole: user.role, ipHash: hashIp(ip, env.NEXTAUTH_SECRET) },
    action: 'settings.updated',
    entity: 'user',
    entityId: user.id,
  });

  redirect('/admin');
}
