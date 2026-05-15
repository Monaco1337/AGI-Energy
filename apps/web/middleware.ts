import { NextRequest, NextResponse } from 'next/server';

// Wir setzen pro Request eine Nonce für eine strikte CSP. Edge-kompatibel.
function makeNonce(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return btoa(String.fromCharCode(...arr));
}

const ADMIN_PATHS = /^\/admin(?!\/login)(\/|$)/;

export function middleware(req: NextRequest) {
  const nonce = makeNonce();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-nonce', nonce);

  // Admin-Gate: Cookie muss existieren. Echte Verifikation in Server-Components/Routes.
  if (ADMIN_PATHS.test(req.nextUrl.pathname)) {
    const has = req.cookies.get('elo_session')?.value;
    if (!has) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('next', req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  const res = NextResponse.next({ request: { headers: requestHeaders } });

  const isDev = process.env.NODE_ENV !== 'production';

  // In Dev braucht Next.js eval (HMR, React-DevTools) und Inline-Skripte ohne Nonce-Propagation.
  // In Produktion bleibt die strikte Policy mit Nonce + strict-dynamic.
  const scriptSrc = isDev
    ? `script-src 'self' 'unsafe-eval' 'unsafe-inline'`
    : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`;

  const connectSrc = isDev
    ? `connect-src 'self' ws: wss:`
    : `connect-src 'self'`;

  const csp = [
    `default-src 'self'`,
    scriptSrc,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self' data:`,
    connectSrc,
    `frame-ancestors 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `object-src 'none'`,
  ].join('; ');

  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('x-nonce', nonce);
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
