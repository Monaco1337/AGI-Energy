import type { UserId } from './lead';

export type Role = 'admin' | 'sales' | 'viewer';

export interface AdminUser {
  id: UserId;
  email: string;
  name: string;
  role: Role;
  passwordHash: string;
  createdAt: string;
  failedLoginCount: number;
  lockedUntil?: string;
  lastLoginAt?: string;
}
