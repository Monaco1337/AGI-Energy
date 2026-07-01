import type { Lead, Subscriber } from '@elo/core';
import type { MailMessage } from './types';

const wrap = (title: string, body: string): string => `
<!doctype html>
<html lang="de"><body style="margin:0;background:#f6f4ee;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="background:#ffffff;border:1px solid #e8e2d4;border-radius:16px;padding:32px;">
      <h1 style="font-size:20px;margin:0 0 16px 0;color:#1a1a1a;font-weight:600;">${title}</h1>
      ${body}
      <p style="margin-top:32px;font-size:13px;color:#6b6b6b;">Diese E-Mail wurde automatisch erstellt. Antworten Sie einfach auf diese E-Mail, falls Sie Fragen haben.</p>
    </div>
  </div>
</body></html>`;

export function leadConfirmation(lead: Lead): MailMessage {
  const to = lead.email ?? '';
  const subject = 'Ihr Energie-Check ist eingegangen';
  const text = `Guten Tag ${lead.firstName} ${lead.lastName},

vielen Dank für Ihren Energie-Check. Wir haben Ihre Angaben erhalten und prüfen, ob bei Strom, Gas oder Photovoltaik ein Einsparpotenzial für Sie besteht.

Falls eine sinnvolle Einschätzung möglich ist, melden wir uns persönlich bei Ihnen – ohne Drängen, ohne Werbeanruf.

Mit freundlichen Grüßen
Ihr Energie-Check-Team`;
  const html = wrap(
    'Ihr Energie-Check ist eingegangen',
    `<p>Guten Tag ${escape(lead.firstName)} ${escape(lead.lastName)},</p>
     <p>vielen Dank für Ihren Energie-Check. Wir haben Ihre Angaben erhalten und prüfen, ob bei Strom, Gas oder Photovoltaik ein Einsparpotenzial für Sie besteht.</p>
     <p>Falls eine sinnvolle Einschätzung möglich ist, melden wir uns persönlich bei Ihnen – ohne Drängen, ohne Werbeanruf.</p>
     <p>Mit freundlichen Grüßen<br/>Ihr Energie-Check-Team</p>`,
  );
  return { to, subject, text, html };
}

export function salesNotification(lead: Lead, salesInbox: string): MailMessage {
  const colorEmoji: Record<string, string> = {
    red: '●',
    orange: '●',
    yellow: '●',
    blue: '●',
    gray: '●',
    black: '✕',
  };
  const subject = `[${colorEmoji[lead.leadColor]} ${lead.leadColor.toUpperCase()}] Neuer Lead: ${lead.firstName} ${lead.lastName} (Score ${lead.leadScore})`;
  const text = `Neuer Lead eingetroffen.

Name: ${lead.firstName} ${lead.lastName}
PLZ: ${lead.postalCode} ${lead.city ?? ''}
Telefon: ${lead.phone ?? '-'}
E-Mail: ${lead.email ?? '-'}
Kundentyp: ${lead.customerType}
Interessen: ${lead.interests.join(', ')}
Dringlichkeit: ${lead.urgency}
Kosten: ${lead.monthlyEnergyCosts}
Score: ${lead.leadScore}  Farbe: ${lead.leadColor}  Label: ${lead.leadLabel}

Empfehlung: ${lead.recommendedAction}`;
  return { to: salesInbox, subject, text };
}

export function followUpReminder(lead: Lead, salesInbox: string): MailMessage {
  const subject = `Follow-up fällig: ${lead.firstName} ${lead.lastName}`;
  const text = `Erinnerung: Follow-up für ${lead.firstName} ${lead.lastName} (Score ${lead.leadScore}, ${lead.leadColor}) ist fällig.
Empfohlene Aktion: ${lead.recommendedAction}`;
  return { to: salesInbox, subject, text };
}

/**
 * Double-Opt-In-Bestaetigungsmail fuer einen Newsletter-Abonnenten.
 * Pflicht nach DSGVO/UWG: Erst nach Klick auf den Bestaetigungslink
 * darf die Adresse fuer Werbung verwendet werden.
 */
export function newsletterConfirm(
  subscriber: Subscriber,
  siteUrl: string,
): MailMessage {
  const confirmUrl = `${siteUrl}/newsletter/bestaetigen?token=${encodeURIComponent(subscriber.confirmToken)}`;
  const unsubUrl = `${siteUrl}/newsletter/abmelden?token=${encodeURIComponent(subscriber.unsubscribeToken)}`;
  const name = subscriber.firstName ? ` ${subscriber.firstName}` : '';
  const subject = 'Bitte Newsletter-Anmeldung bestaetigen';
  const text = `Hallo${name},

vielen Dank fuer Ihr Interesse am AGI-Energy-Newsletter. Bitte bestaetigen Sie Ihre Anmeldung mit einem Klick:

${confirmUrl}

Sie erhalten kuenftig kompakte Tipps zu Strom, Gas und Photovoltaik. Keine Werbeflut, keine Daten an Dritte.
Wenn Sie diese Mail nicht angefordert haben, ignorieren Sie sie einfach - dann passiert nichts.

Abmelden jederzeit moeglich: ${unsubUrl}

Mit freundlichen Gruessen
AGI Energy`;
  const html = wrap(
    'Bitte Newsletter-Anmeldung bestaetigen',
    `<p>Hallo${escape(name)},</p>
     <p>vielen Dank fuer Ihr Interesse am AGI-Energy-Newsletter. Bitte bestaetigen Sie Ihre Anmeldung mit einem Klick:</p>
     <p style="text-align:center;margin:24px 0;">
       <a href="${confirmUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:600;">Anmeldung bestaetigen</a>
     </p>
     <p style="font-size:12px;color:#6b6b6b;">Oder Link kopieren:<br/><a href="${confirmUrl}">${confirmUrl}</a></p>
     <p>Sie erhalten kuenftig kompakte Tipps zu Strom, Gas und Photovoltaik. Keine Werbeflut, keine Daten an Dritte.</p>
     <p style="font-size:12px;color:#6b6b6b;">Wenn Sie diese Mail nicht angefordert haben, ignorieren Sie sie einfach - dann passiert nichts.<br/>
     Abmelden jederzeit moeglich: <a href="${unsubUrl}">Abmelden</a></p>`,
  );
  return { to: subscriber.email, subject, text, html };
}

/**
 * Bestaetigungsmail nach erfolgter DOI - kein erneuter Klick noetig.
 */
export function newsletterWelcome(
  subscriber: Subscriber,
  siteUrl: string,
): MailMessage {
  const unsubUrl = `${siteUrl}/newsletter/abmelden?token=${encodeURIComponent(subscriber.unsubscribeToken)}`;
  const name = subscriber.firstName ? ` ${subscriber.firstName}` : '';
  const subject = 'Willkommen beim AGI-Energy-Newsletter';
  const text = `Hallo${name},

vielen Dank, Ihre Anmeldung ist bestaetigt. Sie erhalten ab sofort unsere kompakten Tipps zu Strom, Gas und Photovoltaik.

Falls Sie konkret Geld sparen wollen: Unser kostenloser Energie-Check rechnet Ihnen Ihr Einsparpotenzial auf Basis Ihrer Jahresabrechnung aus.
${siteUrl}/energiecheck

Abmelden jederzeit moeglich: ${unsubUrl}

Mit freundlichen Gruessen
AGI Energy`;
  const html = wrap(
    'Willkommen beim AGI-Energy-Newsletter',
    `<p>Hallo${escape(name)},</p>
     <p>vielen Dank, Ihre Anmeldung ist bestaetigt. Sie erhalten ab sofort unsere kompakten Tipps zu Strom, Gas und Photovoltaik.</p>
     <p>Falls Sie konkret Geld sparen wollen: Unser kostenloser Energie-Check rechnet Ihnen Ihr Einsparpotenzial auf Basis Ihrer Jahresabrechnung aus.</p>
     <p style="text-align:center;margin:24px 0;">
       <a href="${siteUrl}/energiecheck" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:14px 28px;border-radius:10px;font-weight:600;">Energie-Check starten</a>
     </p>
     <p style="font-size:12px;color:#6b6b6b;">Abmelden jederzeit moeglich: <a href="${unsubUrl}">Abmelden</a></p>`,
  );
  return { to: subscriber.email, subject, text, html };
}

function escape(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

/* ────────────────────────────────────────────────────────────────────────
 * Transaktionale Lead-Mails (AGI Energy) – exakt abgestimmte Texte.
 * Werden ausschließlich serverseitig über sendLeadEmails() versendet.
 * ──────────────────────────────────────────────────────────────────────── */

const AGI_FOOTER_TEXT = `AGI Energy
ein Angebot von Jennifer Ast-Priluzki
Bertolt-Brecht-Str. 20, 59427 Unna
info@agienergy.de
https://www.agienergy.de
Impressum: https://www.agienergy.de/impressum
Datenschutz: https://www.agienergy.de/datenschutz`;

const AGI_FOOTER_HTML = `
  <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e8e2d4;font-size:12px;line-height:1.6;color:#6b6b6b;">
    <strong style="color:#1a1a1a;">AGI Energy</strong><br/>
    ein Angebot von Jennifer Ast-Priluzki<br/>
    Bertolt-Brecht-Str. 20, 59427 Unna<br/>
    <a href="mailto:info@agienergy.de" style="color:#6b6b6b;">info@agienergy.de</a><br/>
    <a href="https://www.agienergy.de" style="color:#6b6b6b;">https://www.agienergy.de</a><br/>
    <a href="https://www.agienergy.de/impressum" style="color:#6b6b6b;">Impressum</a>
    &nbsp;·&nbsp;
    <a href="https://www.agienergy.de/datenschutz" style="color:#6b6b6b;">Datenschutz</a>
  </div>`;

/**
 * Kunden-Bestätigungsmail nach Eingang einer Energieprüfungsanfrage.
 * Transaktional (Art. 6 Abs. 1 lit. b DSGVO) – kein Newsletter.
 */
export function leadConfirmationMessage(lead: Lead): MailMessage {
  const to = lead.email ?? '';
  const subject = 'Ihre Anfrage zur persönlichen Energieprüfung ist eingegangen';

  const body = `Vielen Dank für Ihre Anfrage zur persönlichen Energieprüfung bei AGI Energy.

Wir haben Ihre Angaben erhalten und prüfen diese sorgfältig. Ein persönlicher Ansprechpartner meldet sich zeitnah bei Ihnen, um die nächsten Schritte zu besprechen.

Je nach Anfrage kann es dabei um Strom, Gas, Photovoltaik, Anbieterwechsel, Jahresabrechnung, Verbrauchsoptimierung oder Gewerbeenergie gehen.

Bitte beachten Sie: Konkrete Angebote, Einsparpotenziale und Empfehlungen hängen immer vom jeweiligen Einzelfall, Ihrem Standort, Ihrem Verbrauchsprofil, bestehenden Vertragsverhältnissen und den verfügbaren Marktbedingungen ab.

Wenn Sie Rückfragen haben, können Sie einfach auf diese E-Mail antworten.

Freundliche Grüße
Ihr AGI Energy Team`;

  const text = `${body}

—
${AGI_FOOTER_TEXT}`;

  const html = wrap(
    'Ihre Anfrage ist eingegangen',
    `<p>Vielen Dank für Ihre Anfrage zur persönlichen Energieprüfung bei AGI Energy.</p>
     <p>Wir haben Ihre Angaben erhalten und prüfen diese sorgfältig. Ein persönlicher Ansprechpartner meldet sich zeitnah bei Ihnen, um die nächsten Schritte zu besprechen.</p>
     <p>Je nach Anfrage kann es dabei um Strom, Gas, Photovoltaik, Anbieterwechsel, Jahresabrechnung, Verbrauchsoptimierung oder Gewerbeenergie gehen.</p>
     <p style="font-size:13px;color:#4b4b4b;">Bitte beachten Sie: Konkrete Angebote, Einsparpotenziale und Empfehlungen hängen immer vom jeweiligen Einzelfall, Ihrem Standort, Ihrem Verbrauchsprofil, bestehenden Vertragsverhältnissen und den verfügbaren Marktbedingungen ab.</p>
     <p>Wenn Sie Rückfragen haben, können Sie einfach auf diese E-Mail antworten.</p>
     <p style="margin-top:24px;">Freundliche Grüße<br/>Ihr AGI Energy Team</p>
     ${AGI_FOOTER_HTML}`,
  );

  return { to, subject, text, html };
}

const INTEREST_LABEL_MAIL: Record<string, string> = {
  strom: 'Strom',
  gas: 'Gas',
  photovoltaik: 'Photovoltaik',
  strom_gas: 'Strom + Gas',
  unknown: 'offen',
};

/**
 * Interne Lead-Benachrichtigung an das AGI-Energy-Team.
 * Bewusst kompakt: nur Eckdaten + Link ins Admin-Cockpit, wo alle
 * personenbezogenen Detaildaten sicher und vollständig einsehbar sind.
 */
export function internalLeadMessage(lead: Lead, siteUrl: string): MailMessage {
  const adminUrl = `${siteUrl.replace(/\/$/, '')}/admin/leads/${lead.id}`;
  const region = [lead.postalCode, lead.city].filter(Boolean).join(' ') || '—';
  const interests =
    lead.interests.map((i) => INTEREST_LABEL_MAIL[i] ?? i).join(', ') || '—';
  const subject = 'Neue Energieprüfungsanfrage über AGI Energy';

  const text = `Es ist eine neue Energieprüfungsanfrage eingegangen.

Bereich:   ${interests}
Region:    ${region}
Bewertung: ${lead.leadLabel} (Score ${lead.leadScore})
Rechnung:  ${lead.files.length > 0 ? 'liegt vor' : 'nicht angehängt'}
Eingang:   ${new Date(lead.createdAt).toLocaleString('de-DE')}

Alle Details (Kontaktdaten, Unterlagen, Verlauf) im Admin-Cockpit:
${adminUrl}

— Automatische Benachrichtigung, AGI Energy`;

  const html = wrap(
    'Neue Energieprüfungsanfrage',
    `<p>Es ist eine neue Energieprüfungsanfrage eingegangen.</p>
     <table style="border-collapse:collapse;font-size:14px;margin:16px 0;">
       <tr><td style="padding:4px 16px 4px 0;color:#6b6b6b;">Bereich</td><td style="padding:4px 0;color:#1a1a1a;">${escape(interests)}</td></tr>
       <tr><td style="padding:4px 16px 4px 0;color:#6b6b6b;">Region</td><td style="padding:4px 0;color:#1a1a1a;">${escape(region)}</td></tr>
       <tr><td style="padding:4px 16px 4px 0;color:#6b6b6b;">Bewertung</td><td style="padding:4px 0;color:#1a1a1a;">${escape(lead.leadLabel)} (Score ${lead.leadScore})</td></tr>
       <tr><td style="padding:4px 16px 4px 0;color:#6b6b6b;">Rechnung</td><td style="padding:4px 0;color:#1a1a1a;">${lead.files.length > 0 ? 'liegt vor' : 'nicht angehängt'}</td></tr>
       <tr><td style="padding:4px 16px 4px 0;color:#6b6b6b;">Eingang</td><td style="padding:4px 0;color:#1a1a1a;">${escape(new Date(lead.createdAt).toLocaleString('de-DE'))}</td></tr>
     </table>
     <p style="text-align:center;margin:24px 0;">
       <a href="${adminUrl}" style="display:inline-block;background:#1a1a1a;color:#fff;text-decoration:none;padding:12px 24px;border-radius:10px;font-weight:600;">Im Admin öffnen</a>
     </p>
     <p style="font-size:12px;color:#6b6b6b;">Alle personenbezogenen Detaildaten sind ausschließlich im Admin-Cockpit einsehbar.</p>`,
  );

  return { to: '', subject, text, html };
}
