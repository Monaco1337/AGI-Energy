/**
 * Baut eine tageszeit- und datenabhängige, sichere Anrede.
 *
 * Regeln:
 *  - Tageszeit (Europe/Berlin):
 *      05:00–10:59 → "Guten Morgen"
 *      11:00–17:59 → "Guten Tag"
 *      18:00–22:59 → "Guten Abend"
 *      23:00–04:59 → "Guten Tag"
 *  - Name:
 *      salutation "female"/"male" + Nachname → "Frau/Herr {Nachname}"
 *      sonst Vorname vorhanden → "{Vorname}"
 *      sonst neutral (nur Grußformel)
 *  - Niemals Geschlecht aus dem Vornamen ableiten.
 *  - Kein "undefined"/"null"/leerer Name; Namen werden getrimmt.
 *
 * Rückgabe ist reiner Text (z. B. "Guten Morgen, Kevin,"). Für HTML-Mails
 * muss der Aufrufer den String escapen.
 */

export type Salutation = 'female' | 'male' | 'unknown' | undefined;

export interface GreetingInput {
  firstName?: string | null;
  lastName?: string | null;
  salutation?: Salutation;
  timezone?: string;
  now?: Date;
}

function berlinHour(now: Date, timezone: string): number {
  try {
    const parts = new Intl.DateTimeFormat('de-DE', {
      timeZone: timezone,
      hour: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(now);
    const hourPart = parts.find((p) => p.type === 'hour')?.value ?? '12';
    const h = Number.parseInt(hourPart, 10);
    return Number.isFinite(h) ? h : 12;
  } catch {
    return 12;
  }
}

function greetingBase(hour: number): string {
  if (hour >= 5 && hour <= 10) return 'Guten Morgen';
  if (hour >= 11 && hour <= 17) return 'Guten Tag';
  if (hour >= 18 && hour <= 22) return 'Guten Abend';
  return 'Guten Tag'; // 23:00–04:59
}

function clean(value?: string | null): string {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const low = trimmed.toLowerCase();
  if (low === 'undefined' || low === 'null') return '';
  return trimmed;
}

export function getTimeBasedGreeting({
  firstName,
  lastName,
  salutation,
  timezone = 'Europe/Berlin',
  now = new Date(),
}: GreetingInput): string {
  const base = greetingBase(berlinHour(now, timezone));

  const first = clean(firstName);
  const last = clean(lastName);

  let name = '';
  if ((salutation === 'female' || salutation === 'male') && last) {
    name = `${salutation === 'female' ? 'Frau' : 'Herr'} ${last}`;
  } else if (first) {
    name = first;
  }
  // Nur-Nachname ohne eindeutige Anrede → bewusst neutral.

  return name ? `${base}, ${name},` : `${base},`;
}
