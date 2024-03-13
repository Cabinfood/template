"use client";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { getCurrentUser, getProjectByApiKey } from "./request";
import { getCookie } from "cookies-next";

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
  isLoggedIn: boolean;
};

export const CabinIDContext = createContext<CabinIDProviderProps>({
  user: null,
  signInUrl: "",
  isLoggedIn: false,
});

const CabinIDProvider = ({ children }: PropsWithChildren<any>) => {
  const [project, setProject] = useState<any>(null);
  const [user, setUser] = useState<CabinIDUser | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_CABIN_ID_API_KEY as string;
  if (!apiKey) {
    throw new Error(
      "You must set the NEXT_PUBLIC_CABIN_ID_API_KEY environment variable.",
    );
  }

  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    async function initialData() {
      const project = await getProjectByApiKey(apiKey);
      setProject(project);
    }
    initialData();
  }, [apiKey]);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setUser(user);
    }
    fetchUser();
  }, [accessToken]);

  const isLoggedIn = !!user;

  const signInUrl = useMemo(() => {
    if (!project) {
      return "";
    }
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";
    const params = new URLSearchParams({
      redirect_url: origin,
    });
    return `https://${project.subdomain}.cabinid.dev/sign-in?${params.toString()}`;
  }, [redirectUrl, project]);

  return (
    <CabinIDContext.Provider value={{ user, signInUrl, isLoggedIn }}>
      {children}
    </CabinIDContext.Provider>
  );
};

export { CabinIDProvider };
