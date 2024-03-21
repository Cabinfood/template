## CabinID Integration
This document provides you with all the necessary steps required to integrate CabinID into your application.

Follow the steps below:
1. Sign up for a CabinID account at https://cabinid.dev/sign-in.
    
2. Go to the CabinID dashboard and create a project at https://cabinid.dev/project.
3. At CabinID dashboard, get the api key at Develop/Api-keys.
3. Integrate cabinID SDK
    ```bash
   npm i @cabinid/client
    ```
4. Configuration
    - Add the following variables into your environment (.env) file.
    - Set the required Clerk environment variables as shown in [the example](./.env-example).
   ```dotenv
    NEXT_PUBLIC_CABIN_ID_API_KEY=    # Your Project Key API here
    NEXT_PUBLIC_CABIN_ID_REDIRECT_URL=    # Your site URL, for example: http://localhost:3000/
    ```
5. Add CabinIDProvider to Your Next.js Project
    ```tsx
    import { CabinIDProvider } from "@cabinid/nextjs";

    export default function RootLayout({
      children,
    }: Readonly<{
      children: React.ReactNode;
    }>) {
      return (
        <html lang="en">
        <CabinIDProvider>
        <body className={inter.className}>{children}</body>
        </CabinIDProvider>
        </html>
      );
    }
    ```
6. Add SignInButton to Your Authentication Page app/auth/page.tsx
    ```tsx
    import { SignInButton } from "@cabinid/nextjs";
    export default function Auth() {
      return (
        <div>
            <SignInButton/>
        </div>
      )
    }
    ```
7. Try accessing your app
   - Access your app to verify that authentication is enabled:
      ```bash
      npm run dev
      ```
   - Visit http://localhost:3000 to access your app.