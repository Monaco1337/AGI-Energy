import { z } from 'zod';

export const leadSourceSchema = z.enum([
  'website',
  'google_ads',
  'meta_ads',
  'linkedin_lead_gen_form',
  'referral',
  'partner',
  'manual_research',
  'csv_import',
  'phone',
  'event',
  'existing_customer',
]);

export const legalBasisSchema = z.enum([
  'consent',
  'contract_request',
  'legitimate_interest_b2b_review_required',
  'existing_customer',
  'referral_with_permission',
  'unknown_blocked',
]);

export const customerTypeSchema = z.enum(['private', 'home_owner', 'business', 'landlord', 'unknown']);
export const interestSchema = z.enum(['strom', 'gas', 'photovoltaik', 'strom_gas', 'unknown']);
export const urgencySchema = z.enum(['immediate', 'weeks', 'information', 'unknown']);
export const hasInvoiceSchema = z.enum(['upload_now', 'later', 'no', 'unknown']);
export const monthlyEnergyCostsSchema = z.enum(['under_100', '100_200', '200_400', 'over_400', 'unknown']);
export const ownsPropertySchema = z.enum(['yes', 'no', 'business_property', 'rental_property', 'unknown']);
export const contactPreferenceSchema = z.enum(['phone', 'whatsapp', 'email']);

export const consentRecordSchema = z.object({
  contactConsent: z.boolean(),
  privacyAccepted: z.boolean(),
  consentTextVersion: z.string().min(1),
  consentTimestamp: z.string().min(1),
  source: z.string().min(1),
});

// Schema für den Funnel-Submit (öffentlich, vom Browser eingereicht)
export const leadFunnelInputSchema = z.object({
  source: leadSourceSchema.default('website'),
  sourceDetails: z.string().max(200).optional(),
  utmSource: z.string().max(120).optional(),
  utmMedium: z.string().max(120).optional(),
  utmCampaign: z.string().max(120).optional(),
  campaignId: z.string().max(120).optional(),

  customerType: customerTypeSchema,
  interests: z.array(interestSchema).min(1).max(5),
  urgency: urgencySchema,
  hasInvoice: hasInvoiceSchema,
  monthlyEnergyCosts: monthlyEnergyCostsSchema,
  ownsProperty: ownsPropertySchema,
  contactPreference: contactPreferenceSchema.optional(),

  firstName: z.string().trim().min(1, 'Bitte Vornamen angeben.').max(80),
  lastName: z.string().trim().min(1, 'Bitte Nachnamen angeben.').max(80),
  phone: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+\d\s\-/().]{5,}$/u, 'Bitte gültige Telefonnummer angeben.')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  email: z
    .string()
    .trim()
    .max(160)
    .email('Bitte gültige E-Mail-Adresse angeben.')
    .optional()
    .or(z.literal('').transform(() => undefined)),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Bitte fünfstellige Postleitzahl angeben.'),
  city: z.string().trim().max(120).optional(),
  message: z.string().trim().max(2000).optional(),

  legalBasis: legalBasisSchema.default('consent'),
  consent: consentRecordSchema.optional(),

  // Honeypot – muss leer bleiben
  website_url: z.string().max(0).optional().or(z.literal('').optional()),
  // Anti-Bot: Submit-Zeit in ms seit Start
  __ts: z.number().int().nonnegative().optional(),
}).refine((d) => Boolean(d.phone) || Boolean(d.email), {
  message: 'Bitte mindestens Telefon oder E-Mail angeben.',
  path: ['email'],
});

export type LeadFunnelInputParsed = z.infer<typeof leadFunnelInputSchema>;
