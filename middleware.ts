import { authMiddleware } from '@cabin-id/nextjs';
import { createRouteMatcher } from '@cabin-id/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/auth', '/sign-in']);

export default authMiddleware((auth, req) => {
  const { userId } = auth();

  if (!userId && !isPublicRoute(req)) {
    const redirect = auth().redirectToSignIn({ returnBackUrl: req.url });
    return redirect;
  }

  if (userId && !isPublicRoute(req)) return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
