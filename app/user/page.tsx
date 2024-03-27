import { auth } from '@cabinvn/cabinid-nextjs';

export default async function Page() {
  const { user } = await auth();

  console.log(user);
  
  return <div>User Page</div>;
}
