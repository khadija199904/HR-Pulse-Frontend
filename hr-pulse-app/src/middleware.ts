import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  // Logic: if not logged in and not on login page, redirect to login
  // For demo, we skip redirect if token is missing
  /*
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
