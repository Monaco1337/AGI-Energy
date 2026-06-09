/* eslint-disable no-console */
import { newId, nowIso, type AdminUser, type Lead, type LeadId, type UserId } from '@elo/core';
import { getStorage, resetStorageForTests } from '@elo/storage';
import { hashPassword } from '../lib/auth/password';
import { scoreLead } from '@elo/scoring';

async function main() {
  resetStorageForTests();
  const storage = getStorage();

  const email = process.env.ADMIN_BOOTSTRAP_EMAIL ?? 'admin@example.com';
  const username = process.env.ADMIN_BOOTSTRAP_USERNAME ?? 'admin';
  const password = process.env.ADMIN_BOOTSTRAP_PASSWORD ?? 'changeme1234!';
  const existing = await storage.getUserByUsername(username);
  if (!existing) {
    const user: AdminUser = {
      id: newId('usr') as UserId,
      username,
      email,
      name: 'Admin',
      role: 'admin',
      passwordHash: await hashPassword(password),
      createdAt: nowIso(),
      failedLoginCount: 0,
      mustChangePassword: false,
    };
    await storage.upsertUser(user);
    console.log(`Admin angelegt: ${username}`);
  } else {
    console.log(`Admin existiert bereits: ${username}`);
  }

  // Demo-Leads, deutlich als isDemo=true markiert.
  const demos: Array<Partial<Lead> & { _seed: 'red' | 'orange' | 'gray' }> = [
    {
      _seed: 'red',
      firstName: 'Anna',
      lastName: 'Berger',
      phone: '+49 30 1234567',
      email: 'anna.berger@example.com',
      postalCode: '10115',
      city: 'Berlin',
      customerType: 'home_owner',
      interests: ['photovoltaik'],
      urgency: 'immediate',
      monthlyEnergyCosts: 'over_400',
      ownsProperty: 'yes',
      hasInvoice: 'upload_now',
      contactPreference: 'phone',
      legalBasis: 'consent',
    },
    {
      _seed: 'orange',
      firstName: 'Bäckerei',
      lastName: 'Müller GmbH',
      phone: '+49 89 7654321',
      email: 'kontakt@baeckerei-mueller.example',
      postalCode: '80331',
      city: 'München',
      customerType: 'business',
      interests: ['strom_gas'],
      urgency: 'weeks',
      monthlyEnergyCosts: '200_400',
      ownsProperty: 'business_property',
      hasInvoice: 'later',
      contactPreference: 'phone',
      legalBasis: 'consent',
    },
    {
      _seed: 'gray',
      firstName: 'Karl',
      lastName: 'Test',
      email: 'karl@example.com',
      postalCode: '20095',
      customerType: 'private',
      interests: ['unknown'],
      urgency: 'information',
      monthlyEnergyCosts: 'unknown',
      ownsProperty: 'unknown',
      hasInvoice: 'unknown',
      legalBasis: 'consent',
    },
  ];

  for (const d of demos) {
    const score = scoreLead({
      source: 'website',
      customerType: d.customerType ?? 'unknown',
      interests: d.interests ?? ['unknown'],
      urgency: d.urgency ?? 'unknown',
      hasInvoice: d.hasInvoice ?? 'unknown',
      monthlyEnergyCosts: d.monthlyEnergyCosts ?? 'unknown',
      ownsProperty: d.ownsProperty ?? 'unknown',
      firstName: d.firstName ?? '',
      lastName: d.lastName ?? '',
      phone: d.phone ?? undefined,
      email: d.email ?? undefined,
      postalCode: d.postalCode ?? '00000',
      legalBasis: d.legalBasis ?? 'consent',
      contactPreference: d.contactPreference,
    });
    const id = newId('lead') as LeadId;
    const now = nowIso();
    const lead: Lead = {
      id,
      createdAt: now,
      updatedAt: now,
      source: 'website',
      customerType: d.customerType ?? 'unknown',
      interests: d.interests ?? ['unknown'],
      urgency: d.urgency ?? 'unknown',
      hasInvoice: d.hasInvoice ?? 'unknown',
      monthlyEnergyCosts: d.monthlyEnergyCosts ?? 'unknown',
      ownsProperty: d.ownsProperty ?? 'unknown',
      contactPreference: d.contactPreference,
      firstName: d.firstName ?? '',
      lastName: d.lastName ?? '',
      phone: d.phone,
      email: d.email,
      postalCode: d.postalCode ?? '00000',
      city: d.city,
      legalBasis: d.legalBasis ?? 'consent',
      consent: {
        contactConsent: true,
        privacyAccepted: true,
        consentTextVersion: '2025-01-01',
        consentTimestamp: now,
        source: 'seed',
      },
      leadScore: score.score,
      leadColor: score.color,
      leadLabel: score.label,
      scoreReasons: score.reasons,
      recommendedAction: score.recommendedAction,
      status: 'Neu',
      notes: [],
      contactHistory: [],
      files: [],
      isDemo: true,
    };
    await storage.createLead(lead);
  }
  console.log('Demo-Leads angelegt (markiert als DEMO).');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
