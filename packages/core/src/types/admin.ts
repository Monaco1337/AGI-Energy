import type { UserId } from './lead';

/**
 * Rollen-Hierarchie:
 *  - admin   : Vollzugriff (Distribution, Provisionen, Settings)
 *  - sales   : interner Vertriebsmitarbeiter (alle Leads)
 *  - partner : externer Vertriebspartner (sieht nur eigene Leads)
 *  - viewer  : reiner Lesezugriff
 */
export type Role = 'admin' | 'sales' | 'partner' | 'viewer';

export interface AdminUser {
  id: UserId;
  /** Eindeutiger Login-Name (klein, z. B. `jennifer.ast`). Primäres Login-Merkmal. */
  username: string;
  /** Optionale E-Mail (Benachrichtigungen/Anzeige). Login erfolgt über `username`. */
  email?: string;
  name: string;
  role: Role;
  passwordHash: string;
  createdAt: string;
  failedLoginCount: number;
  lockedUntil?: string;
  lastLoginAt?: string;
  /** Erzwingt eine Passwortänderung beim nächsten Login (z. B. nach Provisionierung). */
  mustChangePassword?: boolean;
  /** Verknüpfung Login-Konto ↔ Vertriebspartner-Stammdaten. */
  partnerId?: string;
}
