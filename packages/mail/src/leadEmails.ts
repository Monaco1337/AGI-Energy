import type { Lead, LeadEmailStatus } from '@elo/core';
import { leadConfirmationMessage, internalLeadMessage } from './templates';

/**
 * Zentrale, ausschließlich serverseitig genutzte Logik für die zwei
 * transaktionalen Lead-Mails:
 *   1. Bestätigung an den Interessenten (falls E-Mail vorhanden)
 *   2. Interne Benachrichtigung an das AGI-Energy-Team
 *
 * Liest die Mail-Konfiguration aus den Umgebungsvariablen:
 *   MAIL_ENABLED      – "true" aktiviert den Versand
 *   MAIL_PROVIDER     – "resend" nutzt die Resend-API, sonst nur Log
 *   RESEND_API_KEY    – Resend API-Key
 *   MAIL_FROM         – Absender, z. B. 'AGI Energy <info@agienergy.de>'
 *   MAIL_REPLY_TO     – Antwortadresse, z. B. 'info@agienergy.de'
 *   MAIL_INTERNAL_TO  – Empfänger der internen Benachrichtigung
 *
 * Wirft nie: Fehler werden gefangen und im Status zurückgegeben, damit ein
 * gespeicherter Lead niemals durch Mailprobleme verloren geht.
 */

interface ResendPayload {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html?: string;
  reply_to?: string;
}

function readMailConfig() {
  const norm = (v: string | undefined) => (typeof v === 'string' ? v.trim() : '');
  return {
    enabled: norm(process.env.MAIL_ENABLED) === 'true',
    provider: norm(process.env.MAIL_PROVIDER) || norm(process.env.MAIL_DRIVER) || 'console',
    apiKey: norm(process.env.RESEND_API_KEY),
    from: norm(process.env.MAIL_FROM),
    replyTo: norm(process.env.MAIL_REPLY_TO) || undefined,
    internalTo: norm(process.env.MAIL_INTERNAL_TO) || norm(process.env.SALES_INBOX_EMAIL) || undefined,
  };
}

async function resendSend(apiKey: string, payload: ResendPayload): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(12_000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}

/**
 * Versendet die transaktionalen Lead-Mails und liefert den Versandstatus.
 * Idempotent: bereits erfolgreich versendete Mails (laut `previous`) werden
 * nicht erneut gesendet – schützt vor Doppel-Mails bei Retry.
 */
export async function sendLeadEmails(
  lead: Lead,
  siteUrl: string,
  previous?: LeadEmailStatus,
): Promise<LeadEmailStatus | null> {
  const cfg = readMailConfig();

  // Global deaktiviert → nichts tun, kein Status.
  if (!cfg.enabled) return null;

  const status: LeadEmailStatus = {
    provider: cfg.provider,
    ...(previous ?? {}),
  };

  // Konsolen-Fallback (kein echter Versand) – z. B. lokale Entwicklung.
  if (cfg.provider !== 'resend') {
    // eslint-disable-next-line no-console
    console.log('[mail] MAIL_PROVIDER != resend – kein Versand.', {
      to: lead.email,
      leadId: lead.id,
    });
    return status;
  }

  if (!cfg.apiKey || !cfg.from) {
    const msg = 'Mail-Konfiguration unvollständig (RESEND_API_KEY/MAIL_FROM fehlt).';
    console.error('[mail]', msg);
    status.confirmationError = msg;
    status.internalError = msg;
    return status;
  }

  // 1) Kundenbestätigung – nur wenn E-Mail vorhanden und noch nicht gesendet.
  if (lead.email && !status.confirmationSentAt) {
    try {
      const msg = leadConfirmationMessage(lead);
      await resendSend(cfg.apiKey, {
        from: cfg.from,
        to: [lead.email],
        subject: msg.subject,
        text: msg.text,
        ...(msg.html ? { html: msg.html } : {}),
        ...(cfg.replyTo ? { reply_to: cfg.replyTo } : {}),
      });
      status.confirmationSentAt = new Date().toISOString();
      status.confirmationError = undefined;
    } catch (err) {
      status.confirmationError = err instanceof Error ? err.message : 'unbekannter Fehler';
      console.error('[mail] Kundenbestätigung fehlgeschlagen', err);
    }
  }

  // 2) Interne Benachrichtigung – nur wenn Empfänger konfiguriert und noch nicht gesendet.
  if (cfg.internalTo && !status.internalSentAt) {
    try {
      const msg = internalLeadMessage(lead, siteUrl);
      await resendSend(cfg.apiKey, {
        from: cfg.from,
        to: [cfg.internalTo],
        subject: msg.subject,
        text: msg.text,
        ...(msg.html ? { html: msg.html } : {}),
        ...(cfg.replyTo ? { reply_to: cfg.replyTo } : {}),
      });
      status.internalSentAt = new Date().toISOString();
      status.internalError = undefined;
    } catch (err) {
      status.internalError = err instanceof Error ? err.message : 'unbekannter Fehler';
      console.error('[mail] Interne Benachrichtigung fehlgeschlagen', err);
    }
  }

  return status;
}
