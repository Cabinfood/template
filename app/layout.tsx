import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { CabinIDProvider } from '@cabin-id/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CabinIDProvider>
          <div className="min-h-screen">{children}</div>
        </CabinIDProvider>
      </body>
    </html>
  );
}
