"use client";

import { loginActions } from "@/actions/auth.actions";
import { FormError, FormSuccess } from "@/components/FormStatus";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const LoginForm = ({ callbackUrl }: { callbackUrl?: string }) => {
  const [email, setEmail] = useState("");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSignIn = async () => {
    startTransition(async () => {
      await loginActions(email)
        .then((data) => {
          if (data?.error) return setError(data?.error);

          setSuccess(data?.message);
          const securityUrl = `/auth/security/${data.email}${
            callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""
          }`;
          router.push(securityUrl);
        })
        .catch(() => {
          return setError("Something went wrong!");
        });
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (error || success) {
        setError("");
        setSuccess("");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [error, success]);

  return (
    <form action={handleSignIn}>
      <FormError message={error} />
      <FormSuccess message={success} />
      <div>
        <label htmlFor="email" className="text-sm text-slate-500">
          Enter your email address
        </label>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none bg-slate-100 py-6 rounded-md border-none text-lg"
        />
      </div>

      <p className="text-xs my-8">
        By clicking “Continue” you are agreeing to LINK’s{" "}
        <Link
          href="https://linkio.africa"
          passHref={true}
          target="_blank"
          className="text-primary"
        >
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link
          href="https://linkio.africa"
          passHref={true}
          target="_blank"
          className="text-primary"
        >
          Privacy Policy
        </Link>
      </p>

      <div className="my-16">
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-base text-white flex items-center justify-center p-2 btn_position rounded-md"
        >
          {isPending ? (
            <Image
              src="/assets/progress_activity.svg"
              alt="progress_activity"
              className="animate-spin"
              width={24}
              height={24}
            />
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </form>
  );
};
