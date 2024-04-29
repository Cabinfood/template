import { auth } from '@cabin-id/nextjs';

export default async function Page() {
  const { userId } = await auth();

  console.log(userId);

  return <div>User Page</div>;
}
