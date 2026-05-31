import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');

  // 1. If someone visits the dedicated blog domain
  if (host === 'shilingitimes.vercel.app') {
    // If they are at the root '/', silently serve the /times page layout
    if (url.pathname === '/') {
      url.pathname = '/times';
      return NextResponse.rewrite(url);
    }
    
    // If they manually typed /times on the blog domain, clean it up by removing it
    if (url.pathname.startsWith('/times')) {
      url.pathname = url.pathname.replace(/^\/times/, '');
      return NextResponse.redirect(url);
    }
  }

  // 2. If someone is on the main app domain but tries to access /times, bounce them to the clean domain
  if (host === 'shilingiapp.vercel.app' && url.pathname.startsWith('/times')) {
    const cleanPath = url.pathname.replace(/^\/times/, '');
    return NextResponse.redirect(new URL(`https://shilingitimes.vercel.app${cleanPath}`, request.url));
  }

  return NextResponse.next();
}

// Ensure the middleware only runs on actual pages, ignoring static assets and APIs
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};