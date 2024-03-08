'use client';
import { useSearchParams } from 'next/navigation';
import { createContext, useCallback } from 'react';
import type { PropsWithChildren } from 'react';

type CabinIDUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
};

export type CabinIDProviderProps = {
  user: CabinIDUser | null;
  signInUrl: string;
};

export const CabinIDContext = createContext<CabinIDProviderProps>({
  user: null,
  signInUrl: '',
});

const CabinIDProvider = ({ children }: PropsWithChildren<any>) => {
  const apiKey = process.env.NEXT_PUBLIC_CABIN_ID_API_KEY as string;
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const signInUrl = `http://app.localhost:3000/sign-in?${
    createQueryString('redirect_url', origin) +
    '&' +
    createQueryString('api_key', apiKey)
  }`;

  return (
    <CabinIDContext.Provider value={{ user: null, signInUrl }}>
      {children}
    </CabinIDContext.Provider>
  );
};

export { CabinIDProvider };
