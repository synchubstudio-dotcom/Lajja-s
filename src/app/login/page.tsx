import { redirect } from "next/navigation";

type LoginPageProps = {
  searchParams: Promise<{ returnTo?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { returnTo } = await searchParams;
  const isLocalPath =
    returnTo?.startsWith("/") &&
    !returnTo.startsWith("//") &&
    !returnTo.startsWith("/\\");
  const destination = isLocalPath ? returnTo : undefined;

  redirect(
    destination
      ? `/sign-in/?redirect_url=${encodeURIComponent(destination)}`
      : "/sign-in/"
  );
}
