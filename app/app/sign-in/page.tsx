import { SignInButton } from "@cabin-id/nextjs";

export default function Page(): JSX.Element {
  return (
    <div className="p-4">
      <span>This is sign in page</span>
      <SignInButton/>
    </div>
  );
}
