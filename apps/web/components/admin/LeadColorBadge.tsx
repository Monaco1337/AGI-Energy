import { Badge } from '@elo/ui';
import type { LeadColor } from '@elo/core';

const TONE: Record<LeadColor, 'red' | 'orange' | 'yellow' | 'blue' | 'gray' | 'black'> = {
  red: 'red',
  orange: 'orange',
  yellow: 'yellow',
  blue: 'blue',
  gray: 'gray',
  black: 'black',
};

const LABEL: Record<LeadColor, string> = {
  red: 'Rot',
  orange: 'Orange',
  yellow: 'Gelb',
  blue: 'Blau',
  gray: 'Grau',
  black: 'Schwarz',
};

export function LeadColorBadge({ color }: { color: LeadColor }) {
  return <Badge tone={TONE[color]}>● {LABEL[color]}</Badge>;
}
