import type { Mailer, MailMessage } from './types';

export class ConsoleMailer implements Mailer {
  async send(message: MailMessage): Promise<void> {
    // eslint-disable-next-line no-console
    console.log('[ConsoleMailer]', { to: message.to, subject: message.subject, text: message.text });
  }
}

export class ResendMailer implements Mailer {
  constructor(
    private readonly apiKey: string,
    private readonly from: string,
  ) {}

  async send(message: MailMessage): Promise<void> {
    if (!message.to) return;
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: this.from,
        to: [message.to],
        subject: message.subject,
        text: message.text,
        ...(message.html ? { html: message.html } : {}),
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend send failed: ${res.status} ${await res.text()}`);
    }
  }
}

export function getMailer(): Mailer {
  const driver = process.env.MAIL_DRIVER ?? 'console';
  if (driver === 'resend') {
    const key = process.env.RESEND_API_KEY;
    const from = process.env.MAIL_FROM ?? 'Energy Lead OS <noreply@example.com>';
    if (!key) throw new Error('MAIL_DRIVER=resend setzt RESEND_API_KEY voraus.');
    return new ResendMailer(key, from);
  }
  return new ConsoleMailer();
}
