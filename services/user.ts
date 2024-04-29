'use server';

import { currentUser } from '@cabin-id/nextjs';

export const getCurrentUser: any = async () => {
  const user = await currentUser();
  if (!user) return null;
  return user;
};
