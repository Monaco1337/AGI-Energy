import type { Lead } from '@elo/core';

export interface AiAssistResult {
  summary: string;
  suggestedAction: string;
}

export interface AiAssist {
  enabled: boolean;
  summarizeLead(lead: Lead): Promise<AiAssistResult | null>;
}

export class NoopAi implements AiAssist {
  enabled = false;
  async summarizeLead(): Promise<AiAssistResult | null> {
    return null;
  }
}
