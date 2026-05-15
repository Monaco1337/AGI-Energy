import type { Lead } from '@elo/core';

export interface MailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface Mailer {
  send(message: MailMessage): Promise<void>;
}

export type Templates = {
  leadConfirmation(lead: Lead): MailMessage;
  salesNotification(lead: Lead, salesInbox: string): MailMessage;
  followUpReminder(lead: Lead, salesInbox: string): MailMessage;
};
