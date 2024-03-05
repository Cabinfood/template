'use client';
import { useContext } from 'react';
import { CabinIDContext, CabinIDProviderProps } from '../pages/provider';

export const useCabinID = (): CabinIDProviderProps => {
  const cabinIDData = useContext<CabinIDProviderProps>(CabinIDContext);
  if (!cabinIDData) {
    throw new Error(
      'CabinIDData not found. Wrap your component with a CabinIDData provider.'
    );
  }
  return cabinIDData;
};
