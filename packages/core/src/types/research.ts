import type { ResearchId, LeadId } from './lead';

export type LegalReviewStatus =
  | 'not_reviewed'
  | 'approved_for_manual_contact'
  | 'blocked'
  | 'needs_consent';

export interface ResearchProspect {
  id: ResearchId;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  industry: string;
  website?: string;
  city?: string;
  postalCode?: string;
  publicSourceUrl?: string;
  energyPotentialScore: number;
  relevanceLabel: string;
  legalReviewStatus: LegalReviewStatus;
  notes: string;
  convertedLeadId?: LeadId;
  isDemo?: boolean;
}
