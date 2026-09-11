import Login from "./_components/Login";

interface LoginPageProps {
  searchParams: Promise<{
    callbackUrl?: string;
  }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <Login
      callbackUrl={params.callbackUrl ?? "/"}
    />
  );
}