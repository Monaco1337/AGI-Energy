import { ImageResponse } from 'next/og';
import { BrandIcon } from '@/lib/brandIcon';

// 192×192 PWA-Icon für das Web-App-Manifest (Android-Homescreen).
export const dynamic = 'force-static';

export function GET() {
  return new ImageResponse(<BrandIcon size={192} radius={0.22} pad={0.12} />, {
    width: 192,
    height: 192,
  });
}
