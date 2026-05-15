import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs/promises';

const BASE = 'http://localhost:3000';
const OUT = path.resolve(__dirname, '..', 'preview');

interface Shot {
  name: string;
  url: string;
  fullPage?: boolean;
  cookies?: { name: string; value: string; domain: string; path: string }[];
  // Schritt-Funktion vor dem Screenshot
  setup?: (page: import('playwright').Page) => Promise<void>;
}

async function login(context: import('playwright').BrowserContext) {
  const page = await context.newPage();
  await page.goto(`${BASE}/admin/login`);
  await page.fill('input[name=email]', 'admin@example.com');
  await page.fill('input[name=password]', 'changeme1234!');
  await Promise.all([
    page.waitForURL((url) => !url.pathname.startsWith('/admin/login'), { timeout: 10_000 }),
    page.click('button[type=submit]'),
  ]);
  await page.close();
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'de-DE',
  });
  await login(context);

  const shots: Shot[] = [
    { name: '01-landing', url: `${BASE}/`, fullPage: false },
    { name: '02-landing-full', url: `${BASE}/`, fullPage: true },
    { name: '03-funnel-step1', url: `${BASE}/energiecheck`, fullPage: false },
    {
      name: '04-funnel-step2',
      url: `${BASE}/energiecheck`,
      setup: async (page) => {
        // Erste Option auswählen, einmal weiter (best-effort, kein Fehler bei Timeout)
        try {
          await page.locator('button[role=radio], [data-option-card]').first().click({ timeout: 2000 });
          await page
            .locator('button:has-text("Weiter"):not([disabled])')
            .click({ timeout: 4000 });
        } catch {
          /* Wenn Funnel-Markup abweicht, einfach Step 1 zeigen */
        }
      },
    },
    { name: '05-strom', url: `${BASE}/stromkosten-senken`, fullPage: false },
    { name: '06-pv', url: `${BASE}/photovoltaik-beratung`, fullPage: false },
    { name: '07-gewerbe', url: `${BASE}/gewerbe-energiecheck`, fullPage: false },
    { name: '08-danke', url: `${BASE}/danke`, fullPage: false },
    { name: '09-datenschutz', url: `${BASE}/datenschutz`, fullPage: false },
    { name: '10-admin-login', url: `${BASE}/admin/login`, fullPage: false },
    { name: '11-admin-dashboard', url: `${BASE}/admin`, fullPage: true },
    { name: '12-admin-leads', url: `${BASE}/admin/leads`, fullPage: false },
    { name: '13-admin-funnel', url: `${BASE}/admin/funnel-analytics`, fullPage: false },
    { name: '14-admin-experiments', url: `${BASE}/admin/experiments`, fullPage: false },
    { name: '15-admin-audit', url: `${BASE}/admin/audit`, fullPage: false },
  ];

  for (const s of shots) {
    const page = await context.newPage();
    await page.goto(s.url, { waitUntil: 'networkidle' });
    if (s.setup) {
      await s.setup(page);
      await page.waitForTimeout(300);
    }
    const file = path.join(OUT, `${s.name}.png`);
    await page.screenshot({ path: file, fullPage: s.fullPage });
    // eslint-disable-next-line no-console
    console.log('shot', file);
    await page.close();
  }

  // Mobile-Screenshot
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: 'de-DE',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const mp = await mobile.newPage();
  await mp.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await mp.screenshot({ path: path.join(OUT, '16-mobile-landing.png'), fullPage: true });
  console.log('shot', path.join(OUT, '16-mobile-landing.png'));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
