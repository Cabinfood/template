import { auth } from '@cabinvn/cabinid-nextjs';

export default function Page() {
  const { user } = auth();

  console.log(user);

  return <div>User Page</div>;
}
