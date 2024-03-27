'use client';

import { CabinIDProvider } from '@cabinvn/cabinid-nextjs';
import { PropsWithChildren } from 'react';

type AppProviderProps = {};

export function Providers({ children }: PropsWithChildren<AppProviderProps>) {
  return <CabinIDProvider>{children}</CabinIDProvider>;
}
