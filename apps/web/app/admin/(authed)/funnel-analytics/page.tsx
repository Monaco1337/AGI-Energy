import { getStorage } from '@elo/storage';

export const dynamic = 'force-dynamic';

const STEP_ORDER = [
  'interests',
  'customerType',
  'urgency',
  'hasInvoice',
  'monthlyEnergyCosts',
  'pvInterest',
  'ownsProperty',
  'contactPreference',
  'contact',
  'consent',
];

export default async function FunnelAnalytics() {
  const storage = getStorage();
  const events = await storage.listEvents(20_000);

  const views = new Map<string, number>();
  const completes = new Map<string, number>();
  const dropOffs = new Map<string, number>();
  for (const e of events) {
    const key = e.stepId ?? 'unknown';
    if (e.type === 'step_view') views.set(key, (views.get(key) ?? 0) + 1);
    if (e.type === 'step_complete') completes.set(key, (completes.get(key) ?? 0) + 1);
    if (e.type === 'drop_off') dropOffs.set(key, (dropOffs.get(key) ?? 0) + 1);
  }

  const totalSubmits = events.filter((e) => e.type === 'submit_success').length;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display text-[28px] text-ink">Funnel-Analytics</h1>
        <p className="mt-1 text-[14px] text-muted">
          First-Party-Events. Keine externen Tracker. Aggregiert ohne PII.
        </p>
      </div>

      <div className="bg-card border border-line rounded-eloLg p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-[18px] text-ink">Trichter</h2>
          <div className="text-[14px] text-muted">Submits gesamt: <b className="text-ink">{totalSubmits}</b></div>
        </div>
        <ul className="mt-4 space-y-3">
          {STEP_ORDER.map((id) => {
            const v = views.get(id) ?? 0;
            const c = completes.get(id) ?? 0;
            const d = dropOffs.get(id) ?? 0;
            const rate = v > 0 ? Math.round((c / v) * 100) : 0;
            return (
              <li key={id}>
                <div className="flex items-center justify-between text-[13px] text-muted">
                  <span className="font-mono">{id}</span>
                  <span>Views {v} · Complete {c} · DropOff {d} · {rate}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-paper2 overflow-hidden">
                  <div className="h-full bg-sage" style={{ width: `${rate}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
