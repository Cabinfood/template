'use server';

// import { currentUser } from '@cabin-id/nextjs';
import { ClientComponent } from './component';
import { notFound } from 'next/navigation';
import { getCurrentUser } from '../../../services/user';

export default async function Page(): Promise<JSX.Element> {
  const user = await getCurrentUser();

  return (
    <div className="p-4">
      <span>This is private page</span>
      <p>User id: {user?.id}</p>
      <p>User phone number: {user?.phoneNumber}</p>
      <ClientComponent />
    </div>
  );
}
