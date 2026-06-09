import { ImageResponse } from 'next/og';
import { BrandIcon } from '@/lib/brandIcon';

// AGI Energy – markenkonformes Favicon in mehreren Auflösungen.
// Browser wählen die passende Größe (16/32/48) für Tab, Lesezeichen & Verlauf.
export const contentType = 'image/png';

export function generateImageMetadata() {
  return [
    { id: '16', size: { width: 16, height: 16 }, contentType },
    { id: '32', size: { width: 32, height: 32 }, contentType },
    { id: '48', size: { width: 48, height: 48 }, contentType },
  ];
}

export default function Icon({ id }: { id: string }) {
  const px = Number(id);
  return new ImageResponse(
    <BrandIcon size={px} radius={px <= 16 ? 0.16 : 0.22} pad={px <= 32 ? 0.03 : 0.05} />,
    { width: px, height: px },
  );
}
