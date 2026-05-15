import type { LeadPayload } from '@/types/lead';

const MOCK_MS = 800;

/**
 * Mock submission for the hero lead form.
 * TODO: Replace with POST /api/leads when backend is connected.
 */
export function leadMockSubmit(payload: LeadPayload): Promise<void> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console -- intentional dev payload trace per product spec
        console.log('[AGI Energy] LeadPayload (mock):', payload);
      }
      resolve();
    }, MOCK_MS);
  });
}
