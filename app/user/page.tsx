import { auth } from '@cabin-id/nextjs';

export default function Page() {
  const { userId } = auth();

  console.log(userId);

  return <div>User Page</div>;
}
