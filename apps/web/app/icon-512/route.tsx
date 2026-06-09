import { ImageResponse } from 'next/og';
import { BrandIcon } from '@/lib/brandIcon';

// 512×512 PWA-Icon (any + maskable) für das Web-App-Manifest.
// Höherer Sicherheitsabstand, damit die Marke auch in der maskable-Safe-Zone
// (zentrale ~80 %) vollständig sichtbar bleibt.
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(<BrandIcon size={512} radius={0.22} pad={0.16} />, {
    width: 512,
    height: 512,
  });
}
