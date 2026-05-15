import { NextResponse } from 'next/server';
import { getStorage } from '@elo/storage';
import { getMailer, followUpReminder } from '@elo/mail';
import { env } from '@/lib/env';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const secret = req.headers.get('x-cron-secret');
  if (secret !== env.CRON_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const storage = getStorage();
  const leads = await storage.listLeads();
  const now = Date.now();
  const due = leads.filter((l) => l.nextFollowUpAt && new Date(l.nextFollowUpAt).getTime() <= now);
  const inbox = env.SALES_INBOX_EMAIL;
  if (inbox) {
    const mailer = getMailer();
    for (const lead of due) {
      try {
        await mailer.send(followUpReminder(lead, inbox));
      } catch {
        /* nicht blockieren */
      }
    }
  }
  return NextResponse.json({ ok: true, processed: due.length });
}
