'use client';

import { useUser } from '@cabin-id/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const UserInfo = () => {
  const user = useUser();
  const route = useRouter();
  useEffect(() => {
    if (!user) {
      route.push('/auth');
    }
  }, [route]);
  return (
    <div>
      {`xin chao ${user?.firstName}`}
      {user?.id ? <div>LogOut</div> : null}
    </div>
  );
};
export { UserInfo };
