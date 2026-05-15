// Sehr einfache, deterministische Hilfen. Die schwere Krypto-Last
// (Argon2 für Passwörter) liegt in lib/auth/password.ts.

export function isLikelyDisposableEmail(email?: string): boolean {
  if (!email) return false;
  const e = email.toLowerCase();
  const blocked = [
    'mailinator.com',
    'guerrillamail.com',
    '10minutemail.com',
    'temp-mail.org',
    'trashmail.com',
    'yopmail.com',
    'getnada.com',
    'sharklasers.com',
  ];
  return blocked.some((d) => e.endsWith(`@${d}`));
}

export function looksLikeBotSubmit(args: { honeypot?: string | null; submittedAtMs?: number; minMs?: number }): boolean {
  if (args.honeypot && args.honeypot.length > 0) return true;
  if (args.submittedAtMs && args.minMs && args.submittedAtMs < args.minMs) return true;
  return false;
}
