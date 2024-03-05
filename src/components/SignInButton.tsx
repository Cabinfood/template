'use client';
import Link from 'next/link';
import { useCabinID } from '../client-boundary/hooks';

const Button = () => {
  const { signInUrl } = useCabinID();

  return (
    <Link href={signInUrl}>
      <div className="h-10 w-44 bg-primary text-primary-foreground hover:bg-primary/90">
        Continue to Login
      </div>
    </Link>
  );
};

export { Button as SignInButton };
