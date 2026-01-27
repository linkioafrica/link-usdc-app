"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginButton = () => {
  const searchParams = useSearchParams();
  const params = searchParams.toString();

  // Always redirect back to /menu after login so server-side verification check can run
  const callbackUrl = params ? `/menu?${params}` : "/menu";

  const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`;

  return (
    <Link
      href={loginUrl}
      className="bg-primary text-base text-white flex items-center justify-center p-2 w-full rounded-md"
    >
      Login
    </Link>
  );
};
