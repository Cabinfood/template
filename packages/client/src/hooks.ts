"use client";
import { useContext } from "react";
import { CabinIDContext, CabinIDProviderProps } from "./provider";

export const useCabinID = (): CabinIDProviderProps => {
  const cabinIDData = useContext<CabinIDProviderProps>(CabinIDContext);
  if (!cabinIDData) {
    throw new Error(
      "Please wrap your application with a CabinIDData provider.",
    );
  }
  return cabinIDData;
};

export const useUser = () => {
  const cabinIDData = useContext<CabinIDProviderProps>(CabinIDContext);
  if (!cabinIDData) {
    throw new Error(
      "Please wrap your application with a CabinIDData provider.",
    );
  }
  return cabinIDData.user;
};
