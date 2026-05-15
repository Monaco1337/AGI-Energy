import { ImageResponse } from 'next/og';

// AGI Energy – Brand-Mark als Favicon
// Zwei sich überlappende, gold-getönte Kreise auf schwarzem rundem Hintergrund.
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0e0e0e',
          borderRadius: '50%',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 64 64">
          <circle cx="38" cy="32" r="18" fill="#e8b66a" />
          <circle cx="26" cy="32" r="18" fill="#0e0e0e" />
          <circle cx="28" cy="32" r="15.5" fill="#e8b66a" />
          <circle cx="22" cy="32" r="15.5" fill="#0e0e0e" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
