'use client';

import { CabinIDProvider } from '@cabinid/nextjs';
import { PropsWithChildren } from 'react';

type AppProviderProps = {};

export function Providers({ children }: PropsWithChildren<AppProviderProps>) {
  return <CabinIDProvider>{children}</CabinIDProvider>;
}
