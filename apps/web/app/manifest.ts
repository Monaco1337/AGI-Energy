import type { MetadataRoute } from 'next';

// PWA-/Web-App-Manifest – Android-Homescreen, „Zum Startbildschirm hinzufügen",
// Installierbarkeit. Icons werden dynamisch generiert (siehe icon-192 / icon-512).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AGI Energy',
    short_name: 'AGI Energy',
    description: 'AGI Energy – Tarifprüfung & Lead Operations Center.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#07111F',
    theme_color: '#07111F',
    icons: [
      { src: '/icon-192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
