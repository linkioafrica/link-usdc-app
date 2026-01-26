import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { LoginForm } from "./_components/loginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  if (session?.user?.id) return redirect("/");

  return (
    <main>
      <Navbar route="/buy" />

      <div className="my-9 space-y-3">
        <div className="flex items-center justify-center">
          <Image src="/logo.png" alt="logo" width={150} height={150} />
        </div>
        <p className="text-xs text-center">
          Log in to your account to buy or sell stables.
        </p>
      </div>

      <LoginForm />
    </main>
  );
}
