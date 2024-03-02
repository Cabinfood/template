'use client';
import { useContext } from 'react';
import { CabinIDContext, CabinIDContextProps } from './provider';

export const useCabinID = (): CabinIDContextProps => {
  const cabinIDData = useContext<CabinIDContextProps>(CabinIDContext);
  if (!cabinIDData) {
    throw new Error(
      'CabinIDData not found. Wrap your component with a CabinIDData provider.'
    );
  }

  return cabinIDData;
};
