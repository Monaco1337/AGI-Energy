import type { LegalBasis } from '@elo/core';

const LABEL: Record<LegalBasis, string> = {
  consent: 'Einwilligung',
  contract_request: 'Vertragsanfrage',
  legitimate_interest_b2b_review_required: 'B2B – prüfen',
  existing_customer: 'Bestandskunde',
  referral_with_permission: 'Empfehlung',
  unknown_blocked: 'Gesperrt',
};

const TONE: Record<LegalBasis, string> = {
  consent: 'text-sage bg-sage/10 border-sage/25',
  contract_request: 'text-sage bg-sage/10 border-sage/25',
  legitimate_interest_b2b_review_required: 'text-gold bg-gold/10 border-gold/30',
  existing_customer: 'text-sage bg-sage/10 border-sage/25',
  referral_with_permission: 'text-sage bg-sage/10 border-sage/25',
  unknown_blocked: 'text-leadRed bg-leadRed/10 border-leadRed/30',
};

export function ConsentBadge({ legalBasis }: { legalBasis: LegalBasis }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 h-5 rounded-full border text-[11px] font-medium ${TONE[legalBasis]}`}
    >
      <span
        aria-hidden
        className="size-1 rounded-full"
        style={{ background: 'currentColor' }}
      />
      {LABEL[legalBasis]}
    </span>
  );
}
