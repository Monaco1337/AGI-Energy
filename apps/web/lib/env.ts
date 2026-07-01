import { z } from 'zod';

// Helfer: behandelt "" als undefined, damit optionale URL-/String-Vars
// nicht an .url()-Validierung scheitern, wenn sie im .env leer stehen.
const trim = z.preprocess(
  (v) => (typeof v === 'string' ? v.trim() : v),
  z.unknown(),
);
const emptyToUndef = z.preprocess(
  (v) => {
    if (typeof v === 'string') {
      const t = v.trim();
      return t === '' ? undefined : t;
    }
    return v;
  },
  z.unknown(),
);
const optStr = emptyToUndef.pipe(z.string().optional());
const optUrl = emptyToUndef.pipe(z.string().url().optional());

const schema = z.object({
  NODE_ENV: trim.pipe(z.enum(['development', 'test', 'production']).default('development')),
  NEXT_PUBLIC_SITE_URL: emptyToUndef.pipe(
    z
      .string()
      .url()
      .default(
        process.env.NODE_ENV === 'production'
          ? 'https://www.agienergy.de'
          : 'http://localhost:3000',
      ),
  ),

  STORAGE_DRIVER: trim.pipe(z.enum(['json', 'supabase', 'blob', 'postgres']).optional()),
  STORAGE_BLOB_PATHNAME: optStr,
  BLOB_READ_WRITE_TOKEN: optStr,
  SUPABASE_URL: optUrl,
  SUPABASE_ANON_KEY: optStr,
  SUPABASE_SERVICE_ROLE_KEY: optStr,

  // Vercel Postgres / Neon. POSTGRES_URL aktiviert (auch ohne STORAGE_DRIVER)
  // automatisch den Postgres-Treiber.
  POSTGRES_URL: optStr,
  POSTGRES_URL_NON_POOLING: optStr,
  POSTGRES_PRISMA_URL: optStr,

  NEXTAUTH_SECRET: emptyToUndef.pipe(z.string().min(16).default('dev-secret-change-me-32-chars-please')),
  NEXTAUTH_URL: emptyToUndef.pipe(z.string().url().default('http://localhost:3000')),

  MAIL_DRIVER: trim.pipe(z.enum(['console', 'resend', 'smtp']).default('console')),
  /** Aktiviert den transaktionalen Mailversand (Lead-Bestätigung + intern). */
  MAIL_ENABLED: trim.pipe(z.enum(['true', 'false']).default('false')),
  /** Mail-Provider für Lead-Mails ("resend" nutzt die Resend-API). */
  MAIL_PROVIDER: trim.pipe(z.enum(['console', 'resend']).default('console')),
  RESEND_API_KEY: optStr,
  MAIL_FROM: emptyToUndef.pipe(z.string().default('Energy Lead OS <noreply@example.com>')),
  /** Antwortadresse der Lead-Mails, z. B. info@agienergy.de. */
  MAIL_REPLY_TO: optStr,
  /** Empfänger der internen Lead-Benachrichtigung. */
  MAIL_INTERNAL_TO: optStr,
  SALES_INBOX_EMAIL: optStr,

  CRON_SECRET: emptyToUndef.pipe(z.string().default('dev-cron-secret')),

  AI_ASSIST: trim.pipe(z.enum(['on', 'off']).default('off')),
  EXPERIMENTS_ENABLED: trim.pipe(z.enum(['on', 'off']).default('on')),

  AI_PROVIDER: trim.pipe(z.enum(['noop', 'mistral_eu', 'azure_openai_eu']).default('noop')),
  AI_API_KEY: optStr,
  AI_BASE_URL: optStr,

  ADMIN_BOOTSTRAP_EMAIL: optStr,
  ADMIN_BOOTSTRAP_PASSWORD: optStr,

  /** Schützt den einmaligen Bootstrap-Endpoint /api/admin/bootstrap. */
  SEED_SECRET: optStr,

  /** Optional: Zapier / Make / HubSpot / n8n Webhook – FAQ-Kontaktanfragen */
  CRM_CONTACT_WEBHOOK_URL: optUrl,
  CRM_CONTACT_WEBHOOK_SECRET: optStr,
});

export const env = schema.parse(process.env);
export type Env = z.infer<typeof schema>;
