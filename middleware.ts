import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const token = url.clone().searchParams.get('token');
  if (token) {
    url.searchParams.delete('token');
    const response = NextResponse.redirect(url.href);
    response.cookies.set('token', token);
    return response;
  }
  return NextResponse.rewrite(req.url);
}
