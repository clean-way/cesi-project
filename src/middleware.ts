import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (token && (pathname === '/auth/signin' || pathname === '/auth/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if(!token && pathname === '/map') {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  if((!token || token.role == 'USER') && pathname === '/articles/create') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/signin', '/auth/signup', '/map', '/articles/create'],
};