import { env } from '@/lib/env';
import { Badge } from '@elo/ui';

export const dynamic = 'force-dynamic';

export default function SettingsPage() {
  const flags = [
    { k: 'STORAGE_DRIVER', v: env.STORAGE_DRIVER },
    { k: 'MAIL_DRIVER', v: env.MAIL_DRIVER },
    { k: 'AI_ASSIST', v: env.AI_ASSIST },
    { k: 'EXPERIMENTS_ENABLED', v: env.EXPERIMENTS_ENABLED },
    { k: 'AI_PROVIDER', v: env.AI_PROVIDER },
  ];
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="font-display text-[28px] text-ink">Einstellungen</h1>
      <div className="bg-card border border-line rounded-eloLg p-6">
        <h2 className="font-display text-[18px] text-ink">Feature-Flags</h2>
        <ul className="mt-4 divide-y divide-line">
          {flags.map((f) => (
            <li key={f.k} className="py-3 flex items-center justify-between text-[14px]">
              <code className="text-ink2">{f.k}</code>
              <Badge tone={f.v === 'on' || f.v === 'json' || f.v === 'console' ? 'sage' : 'neutral'}>{f.v}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
