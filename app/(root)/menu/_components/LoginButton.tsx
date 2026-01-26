"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const LoginButton = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const params = searchParams.toString();

  // Determine destination based on type param
  let callbackUrl = "/buy"; // default
  if (type === "deposit" && params) {
    callbackUrl = `/buy?${params}`;
  } else if (type === "withdraw" && params) {
    callbackUrl = `/sell?${params}`;
  } else if (params) {
    callbackUrl = `/buy?${params}`;
  }

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
