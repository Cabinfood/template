# CabinID Integration

This document provides you with all the necessary steps required to integrate CabinID into your application.

## Create your own project

1. [Sign in](https://cabinid.dev/sign-in) CabinID or [sign up](https://cabinid.dev/sign-up) if you don't have an account.
2. Go to the CabinID [dashboard](https://cabinid.dev/project) and create a project. Fill your project name and choose a subdomain for it. This subdomain is unique on our platform.
3. After the project is created, you will be redirected to the project's page. Go to the API Keys by the Navigation Menu on the left side by the path `Developers/API Keys`, save the project's Secret Key and Public Key for later.

## Integrate CabinID into your application

### 1. Install the CabinID SDK for NextJS

```bash
# using npm
npm i @cabin-id/nextjs

# using npm
yarn add @cabin-id/nextjs

# using pnpm
pnpm add @cabin-id/nextjs
```

### 2. Set your environment variables

Add the following lines to your environment file with the value of your project's Secret Key, Publish Key and your site URL.

```dotenv
# Your Project's Publish Key here, for example: cabin_pk_abcdefghijklmnop1234567890
NEXT_PUBLIC_CABIN_ID_PUBLISH_KEY=

# Your Project's Secret Key here, for example: abcdefghijklmnop1234567890
CABIN_ID_SECRET_KEY=

# Your custom path for sign in, for example: /sign-in
NEXT_PUBLIC_CABIN_ID_SIGN_IN_URL=

# Your custom path for sign up, for example: /sign-up
NEXT_PUBLIC_CABIN_ID_SIGN_UP_URL=

# Your custom path which you want to redirect after sign in, for example: /private
NEXT_PUBLIC_CABIN_ID_AFTER_SIGN_IN_URL=

# Your custom path which you want to redirect after sign up, for example: /private
NEXT_PUBLIC_CABIN_ID_AFTER_SIGN_UP_URL=
```

```tsx
// app/layout.tsx

import { CabinIDProvider } from '@cabin-id/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <CabinIDProvider>{children}</CabinIDProvider>
      </body>
    </html>
  );
}
```

### 4. Add authentication to your app

1. Create a `middleware.ts` file at the root of your project, or in your `src/` directory if you have one.
2. Add `authMiddleware` to your `middleware.ts` file as the following example. This helper enables authentication and blocks access for signed out visitors on routes that your middleware runs on.

```ts
// middleware.ts

import { authMiddleware } from '@cabin-id/nextjs/server';

export default authMiddleware();

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

### 5. Try accessing your app

1. Access your app to verify that authentication is enabled:

```bash
# using npm
npm run dev

# using yarn
yarn dev

# using pnpm
pnpm run dev
```

2. Visit http://localhost:3000 to access your app. The Middleware will redirect you to your Sign Up page, provided by CabinID's Account Portal feature.

3. Sign up to gain access to your application.

4. Use `createRouteMatcher` to create a validator for the types of route which you want to check. See the following example to get your idea.

```ts
// middleware.ts

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
```

In this case, if you want to direct to CabinID's Authentication Portal, embedded the `SignInButton.tsx` to your authentication page.

```tsx
// app/auth/page.tsx

'use client';

import { SignInButton, logout } from '@cabin-id/nextjs';

export default function AuthPage() {
  return (
    <div>
      <SignInButton />
    </div>
  );
}
```

5. You also get some example with the [Clerk document](https://clerk.com/docs/references/nextjs/clerk-middleware)

### 6. Getting CabinID user data

You can use function `currentUser` for getting CabinID's user data from server and `useUser` hook for client

```tsx
// client file

'use client';

import { useUser } from '@cabin-id/nextjs';

export default function Page() {
  const { user, isSignedIn } = useUser();

  if (!user && !isSignedIn) {
    return null;
  }

  return (
    <div>
      <p>User: {user.firstName + ' ' + user.lastName}</p>
      <p>Phone number: {user.phoneNumber}</p>
    </div>
  );
}
```

```tsx
// server file

'use server';

import { currentUser } from '@cabin-id/nextjs';
import { notFound } from 'next/navigation';

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <p>User: {user.firstName + ' ' + user.lastName}</p>
      <p>Phone number: {user.phoneNumber}</p>
    </div>
  );
}
```

```tsx
// route handler

import { currentUser } from '@cabin-id/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const user = await currentUser();
  return Response.json({ user });
}
```

### 7. Sign out your session

1. You can sign out your session by use the `signOut` function in `useUser` hook

```tsx
'use client';

import { useUser } from '@cabin-id/nextjs';

export const SignOutButton = () => {
  const { signOut } = useUser();
  return (
    <button className="p-4 bg-violet-300" onClick={() => signOut()}>
      SignOut
    </button>
  );
};
```
