'use client';

import { useUser } from '@cabin-id/nextjs';

export const ClientComponent = () => {
  const user = useUser();
  // console.log('ClientComponent', user);
  return <div>This is Client Component {JSON.stringify(user, null, 4)}</div>;
};
