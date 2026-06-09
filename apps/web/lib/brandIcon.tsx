/**
 * Geteilte AGI-Energy-Brand-Grafik für alle generierten Icons
 * (Favicon, Apple-Touch-Icon, PWA-Manifest-Icons).
 *
 * Bewusst auf Lesbarkeit in kleinen Größen optimiert: kräftiges „A" als
 * V-Strich in Soft-White auf tiefem Navy, mit Cyan-Energie-Swoosh als
 * Querbalken. Nur solide Füllungen + einfache Pfade → rendert zuverlässig
 * über Satori (`next/og` ImageResponse) in jeder Auflösung.
 */
export interface BrandIconProps {
  /** Kantenlänge in px (quadratisch). */
  size: number;
  /** Eckenradius als Anteil der Größe (0 = eckig, ~0.22 = App-Icon-Look). */
  radius?: number;
  /** Sicherheitsabstand als Anteil der Größe (für maskable Icons höher). */
  pad?: number;
  /** Hintergrund zeichnen (true) oder transparent lassen (false). */
  background?: boolean;
}

export function BrandIcon({ size, radius = 0.22, pad = 0.06, background = true }: BrandIconProps) {
  const padPx = Math.round(pad * size);
  const inner = size - padPx * 2;

  return (
    <div
      style={{
        display: 'flex',
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Math.round(radius * size),
        background: background
          ? 'linear-gradient(145deg, #102338 0%, #07111F 72%)'
          : 'transparent',
      }}
    >
      <svg width={inner} height={inner} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cyan-Glow hinter dem Swoosh */}
        <path
          d="M20 58 C 38 74, 62 74, 80 58"
          stroke="#35E6D0"
          strokeOpacity="0.32"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* „A" als V-Strich */}
        <path
          d="M27 80 L50 18 L73 80"
          stroke="#F4F8FC"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cyan-Energie-Swoosh als Querbalken */}
        <path
          d="M20 58 C 38 74, 62 74, 80 58"
          stroke="#35E6D0"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
