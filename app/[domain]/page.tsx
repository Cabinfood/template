export default async function Page({ params }: { params: { domain: string } }) {
  const domain = decodeURIComponent(params.domain);

  return (
    <div className="mb-20 w-full">This is domain page. Name: {domain}</div>
  );
}
