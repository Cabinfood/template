## CabinID Integration
This document provides you with all the necessary steps required to integrate CabinID into your application.

Follow the steps below:
1. Register a cabinID account
    - API: https://cabinid-internal.up.railway.app/i/api/auth/sign-in
   ```bash
   curl --location 'https://cabinid-internal.up.railway.app/i/api/auth/sign-in' \
    --header 'Content-Type: application/json' \
    --data '{
    "phoneNumber": "0889554247",
    "password": "nhathoang0012345"
    }'
    ```
2. Create a Project and Retrieve Your API Key
    - API: https://cabinid-internal.up.railway.app/i/api/project
    - Add token to the Authorization field and select Bearer Token.
   ```bash
    curl --location 'https://cabinid-internal.up.railway.app/i/api/project' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <your_token_here>' \
    --data '{
    "name": "cabinID",
    "subdomain": "cabinID",
    "organizationId": "organization_id_here",
    "creatorId": "creator_id_here"
    }'
   ```
3. Integrate cabinID SDK
    ```bash
   npm i @cabinid/client
    ```
4. Configuration
    - Add the following variables into your environment (.env) file.
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
6. Add SignInButton to Your Authentication Page app/auth/sign-in
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