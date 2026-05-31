import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host');

  // 1. Handling the dedicated Blog Domain
  if (host === 'shilingitimes.vercel.app') {
    // If they land on the root '/', silently serve the main /times page code
    if (url.pathname === '/') {
      url.pathname = '/times';
      return NextResponse.rewrite(url);
    }
    
    // If they visit a deep blog link (e.g., /my-first-post), silently rewrite it to /times/my-first-post
    if (!url.pathname.startsWith('/times')) {
      url.pathname = `/times${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // 2. Handling the Main App Domain
  if (host === 'shilingiapp.vercel.app' && url.pathname.startsWith('/times')) {
    const cleanPath = url.pathname.replace(/^\/times/, '');
    // If they explicitly typed /times on the main app, bounce them over to the clean blog domain
    return NextResponse.redirect(new URL(`https://shilingitimes.vercel.app${cleanPath}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};