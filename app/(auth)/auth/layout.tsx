// import { AuthProvider } from "@/components/AuthProvider";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <div>{children}</div>;
}
