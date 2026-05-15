import type { AnswerState, AudienceKey } from '@elo/core';

export function audienceFromState(s: AnswerState): AudienceKey {
  if (s.customerType === 'business') return 'business';
  if (s.customerType === 'home_owner') return 'home_owner';
  if (s.customerType === 'landlord') return 'landlord';
  if (s.customerType === 'private') return 'private';
  return 'unknown';
}
