# CabinID Integration

This document provides you with all the necessary steps required to integrate CabinID into your application.

## Create your own project

1. [Sign in](https://cabinid.dev/sign-in) CabinID or [sign up](https://cabinid.dev/sign-up) if you don't have an account.
2. Go to the CabinID [dashboard](https://cabinid.dev/project) and create a project. Fill your project name and choose a subdomain for it. This subdomain is unique on our platform.
3. After the project is created, you will be redirected to the project's page. Go to the API Keys by the Navigation Menu on the left side by the path `Developers/API Keys`, copy the project's api key and save it for later.

## Integrate CabinID into your application

### 1. Install the CabinID SDK for NextJS

```bash
# using npm
npm i @cabinid/nextjs

# using npm
yarn add @cabinid/nextjs

# using pnpm
pnpm add @cabinid/nextjs
```

### 2. Set your environment variables

Add the following lines to your environment file with the value of your project's API Key and your site URL.

```dotenv
 # Your Project Key API here, for example: abcdefghijklmnop1234567890
 NEXT_PUBLIC_CABIN_ID_API_KEY=

 # Your site URL, for example: http://localhost:3000/
 NEXT_PUBLIC_CABIN_ID_REDIRECT_URL=
```

### 3. Add `<CabinIDProvider>` to your app

Create `app/provider.tsx` file at your root source folder. Then add the CabinIDProvider as the following example.

```tsx
// app/provider.tsx

 "use client";

 import { CabinIDProvider } from "@cabinid/nextjs";
 import { PropsWithChildren } from "react";

 type AppProviderProps = {}

 export function Providers({ children }: PropsWithChildren<AppProviderProps>) {
   return <CabinIDProvider>{children}</CabinIDProvider>;
 }
```

**NOTE**: You have to place CabinIDProvider in a Component has `use client` on the top of file.

After that, import the above `<Provider>` component to root `app/layout.tsx` file as the following example.

```tsx
// app/layout.tsx

import { Providers } from "./provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
return (
   <html lang="en">
     <body>
       <Providers>{children}</Providers>
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

import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  // Allow signed out users to access the specified routes:
  // publicRoutes: ['/anyone-can-visit-this-route'],
  // Prevent the specified routes from accessing
  // authentication information:
  // ignoredRoutes: ['/no-auth-in-this-route'],
});

export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.

    '/((?!.+\\.[\\w]+$|_next).*)',
    // Re-include any files in the api or trpc folders that might have an extension
    '/(api|trpc)(.*)',
  ],
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

4. (Optional) If you want to allow the access to any route without authentication, you can add the `publicRoutes` array to the `authMiddleware` function as the following example.

```ts
// middleware.ts

export default authMiddleware({
  publicRoutes: ['/'],
});
```

In this case, if you want to direct to CabinID's Authentication Portal, embedded the `SignInButton.tsx` to your authentication page.

```tsx
// app/auth.tsx

"use client"

import { SignInButton, logout } from "@cabinid/nextjs";

export default function AuthPage() {
  return (
    <div>
      <SignInButton />
    </div>
  )
}

```

**NOTE**: You have to place `SignInButton` in a Component has `use client` on the top of file. And inside a component which is wrapped by CabinIDProvider

### 6. Logout your session
CabinID provides you `logout` function to finish your session.

```tsx
// app/auth.tsx

import {logout} from "@cabinid/nextjs";

// Logout without any options
export default function AuthPage() {
  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

// Logout with assigned redirect url
export default function AuthPage() {
  const handleLogout = () => {
    logout({
      redirectUrl: "http://localhost:3000"
    });
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

```