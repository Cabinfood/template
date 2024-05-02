'use client';

import { useUser } from '@cabin-id/nextjs';

export const ClientComponent = () => {
  const { user, signOut } = useUser();
  return (
    <div>
      <p>This is Client Component</p>
      <p>{JSON.stringify(user, null, 4)}</p>
      <button className="p-4 bg-violet-300" onClick={() => signOut()}>
        SignOut
      </button>
    </div>
  );
};