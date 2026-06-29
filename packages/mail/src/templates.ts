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
