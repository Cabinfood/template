export type CabinIDSignUp = {
  phoneNumber: string;
  password: string;
  firstName: string;
  lastName: string;
};

export const signUp = async (payload: CabinIDSignUp) => {
  const res = await fetch('http://locahost:3001/api/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const signIn = async (payload: CabinIDSignUp) => {
  const res = await fetch('http://locahost:3001/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const checkValidApiKey = async (apiKey: string) => {
  const res = await fetch('http://locahost:3001/api/api-key/check-api-key', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ apiKey }),
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const getSubdomain = async (apiKey: string) => {
  const res = await fetch(`http://locahost:3001/api/api-key/${apiKey}/domain`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};