import { z } from 'zod';

export const legalReviewStatusSchema = z.enum([
  'not_reviewed',
  'approved_for_manual_contact',
  'blocked',
  'needs_consent',
]);

export const researchProspectInputSchema = z.object({
  companyName: z.string().trim().min(1).max(200),
  industry: z.string().trim().min(1).max(120),
  website: z.string().trim().url().max(300).optional().or(z.literal('').transform(() => undefined)),
  city: z.string().trim().max(120).optional(),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}$/)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  publicSourceUrl: z
    .string()
    .trim()
    .url()
    .max(500)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  legalReviewStatus: legalReviewStatusSchema.default('not_reviewed'),
  notes: z.string().max(4000).default(''),
});

export type ResearchProspectInput = z.infer<typeof researchProspectInputSchema>;
