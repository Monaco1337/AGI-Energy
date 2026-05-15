import { createHash } from 'node:crypto';

export function sha256(input: string, salt = ''): string {
  return createHash('sha256').update(salt).update(input).digest('hex');
}

// Kurzer, nicht reversibler IP-Hash für Rate-Limit/Events.
export function hashIp(ip: string, salt: string): string {
  return sha256(ip, salt).slice(0, 24);
}
