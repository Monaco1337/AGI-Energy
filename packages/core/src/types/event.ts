export type FunnelEventType =
  | 'page_view'
  | 'step_view'
  | 'step_complete'
  | 'step_back'
  | 'field_focus'
  | 'field_blur'
  | 'drop_off'
  | 'submit_success'
  | 'submit_error'
  | 'exit_intent_shown'
  | 'exit_intent_accepted'
  | 'exit_intent_dismissed';

export interface FunnelEvent {
  id: string;
  createdAt: string;
  type: FunnelEventType;
  sessionId: string;
  stepId?: string;
  fieldId?: string;
  audience?: string;
  variantId?: string;
  experimentId?: string;
  durationMs?: number;
  meta?: Record<string, string | number | boolean>;
  ipHash?: string;
  uaClass?: 'mobile' | 'tablet' | 'desktop' | 'unknown';
}
