import { ImageResponse } from 'next/og';
import { BrandIcon } from '@/lib/brandIcon';

// Apple-Touch-Icon (iOS/iPadOS Homescreen). Quadratisch, opak und ohne
// eigene Rundung – iOS maskiert die Ecken selbst. Sicherheitsabstand, damit
// die Marke innerhalb der iOS-Maske komplett sichtbar bleibt.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(<BrandIcon size={180} radius={0} pad={0.16} />, { ...size });
}
