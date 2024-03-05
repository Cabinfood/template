'use client';
import { useSearchParams } from 'next/navigation';
import {createContext, Suspense, useCallback} from 'react';
import type { PropsWithChildren } from 'react';
export type CabinIDProviderProps = { user: CabinIDUser | null; signInUrl: string };

export const CabinIDContext = createContext<CabinIDProviderProps>({
  user: null,
  signInUrl: '',
});

const origin =
  typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : '';

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
