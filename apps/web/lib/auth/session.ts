import { cookies } from 'next/headers';
import type { Role } from '@elo/core';
import { env } from '@/lib/env';
import { createHmac, randomBytes } from 'node:crypto';

const COOKIE = 'elo_session';
const MAX_AGE_SEC = 60 * 60 * 8; // 8h Idle, einfach gehalten

export interface Session {
  userId: string;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

function sign(payload: string): string {
  return createHmac('sha256', env.NEXTAUTH_SECRET).update(payload).digest('hex');
}

function encode(s: Session): string {
  const body = Buffer.from(JSON.stringify(s)).toString('base64url');
  const sig = sign(body);
  return `${body}.${sig}`;
}

function decode(token: string | undefined): Session | null {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  if (sign(body) !== sig) return null;
  try {
    const obj = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as Session;
    if (obj.exp < Math.floor(Date.now() / 1000)) return null;
    return obj;
  } catch {
    return null;
  }
}

export async function setSession(s: Omit<Session, 'iat' | 'exp'>): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const session: Session = { ...s, iat: now, exp: now + MAX_AGE_SEC };
  const c = await cookies();
  c.set(COOKIE, encode(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE_SEC,
  });
}

export async function clearSession(): Promise<void> {
  const c = await cookies();
  c.delete(COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const c = await cookies();
  return decode(c.get(COOKIE)?.value);
}

export async function requireRole(role: Role | Role[]): Promise<Session> {
  const s = await getSession();
  if (!s) throw new Response('Unauthorized', { status: 401 });
  const allow = Array.isArray(role) ? role : [role];
  if (!allow.includes(s.role)) throw new Response('Forbidden', { status: 403 });
  return s;
}

export function freshSessionId(): string {
  return randomBytes(16).toString('hex');
}
