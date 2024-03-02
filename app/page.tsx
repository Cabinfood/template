'use client';
import { SignInButton } from '@/sdk/CabinID';
import { getCookie } from 'cookies-next';

export default function Home() {
  const token = getCookie('token');
  console.log('cookies', token);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {token ? 'You have logged in' : <SignInButton />}
    </main>
  );
}
