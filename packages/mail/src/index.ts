export type { Mailer, MailMessage, Templates } from './types';
export { ConsoleMailer, ResendMailer, getMailer } from './adapters';
export {
  leadConfirmation,
  salesNotification,
  followUpReminder,
  newsletterConfirm,
  newsletterWelcome,
} from './templates';
