import { z } from 'zod';

export const funnelEventTypeSchema = z.enum([
  'page_view',
  'step_view',
  'step_complete',
  'step_back',
  'field_focus',
  'field_blur',
  'drop_off',
  'submit_success',
  'submit_error',
  'exit_intent_shown',
  'exit_intent_accepted',
  'exit_intent_dismissed',
]);

export const funnelEventInputSchema = z.object({
  type: funnelEventTypeSchema,
  sessionId: z.string().min(8).max(80),
  stepId: z.string().max(60).optional(),
  fieldId: z.string().max(60).optional(),
  audience: z.string().max(40).optional(),
  variantId: z.string().max(40).optional(),
  experimentId: z.string().max(80).optional(),
  durationMs: z.number().int().nonnegative().max(3_600_000).optional(),
  meta: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export type FunnelEventInput = z.infer<typeof funnelEventInputSchema>;
