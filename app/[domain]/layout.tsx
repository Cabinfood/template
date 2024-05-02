import { ReactNode } from 'react';

export default async function Layout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);

  return (
    <div>
      <p>This is domain layout. Name {domain}</p>
      {children}
    </div>
  );
}
