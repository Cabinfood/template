"use server";

import { cookies } from "next/headers";

export type CabinIDSignUp = {
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
};

const BASE_API_URL = "https://cabinid-public.up.railway.app/api";

export const signUp = async (payload: CabinIDSignUp) => {
  const res = await fetch(`${BASE_API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const signIn = async (payload: CabinIDSignUp) => {
  const res = await fetch(`${BASE_API_URL}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const checkValidApiKey = async (apiKey: string) => {
  const res = await fetch(`${BASE_API_URL}/api-key/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiKey }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const getSubdomain = async (apiKey: string) => {
  const res = await fetch(`${BASE_API_URL}/api-key/${apiKey}/domain`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const getProjectByApiKey = async (apiKey: string) => {
  const res = await fetch(`${BASE_API_URL}/project/api-key/${apiKey}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken");
  if (!accessToken) {
    return
  }
  const res = await fetch(`${BASE_API_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};
