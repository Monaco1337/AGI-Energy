import type { CustomerType, Interest, Urgency, HasInvoice, MonthlyEnergyCosts, OwnsProperty, ContactPreference } from './lead';

export type AudienceKey = 'private' | 'home_owner' | 'business' | 'landlord' | 'unknown';

export type AnswerValue = string | string[] | undefined;

export interface AnswerState {
  interests?: Interest[];
  customerType?: CustomerType;
  urgency?: Urgency;
  hasInvoice?: HasInvoice;
  monthlyEnergyCosts?: MonthlyEnergyCosts;
  pvInterest?: 'home' | 'business' | 'maybe' | 'no';
  ownsProperty?: OwnsProperty;
  contactPreference?: ContactPreference;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  postalCode?: string;
  city?: string;
  message?: string;
  contactConsent?: boolean;
  privacyAccepted?: boolean;
}

export type StepType = 'single_choice' | 'multi_choice' | 'contact' | 'consent';

export interface StepOption {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface FunnelStep {
  id: string;
  question: string;
  helpText?: string;
  type: StepType;
  field?: keyof AnswerState;
  options?: StepOption[];
  // sichtbar nur, wenn Bedingung erfüllt; sonst übersprungen
  visibleIf?: (state: AnswerState) => boolean;
  // pro Audience kann das Step überschrieben werden
  audienceOverrides?: Partial<Record<AudienceKey, Partial<FunnelStep>>>;
}

export interface FunnelConfig {
  version: string;
  steps: FunnelStep[];
}
