"use client";

import { validate2FACode, resend2FACode } from "@/actions/auth.actions";
import { FormError, FormSuccess } from "@/components/FormStatus";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export const VerifCode = ({ email }: { email: string }) => {
  const [code, setCode] = useState("");
  const decodedEmail = decodeURIComponent(email);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "";

  const handleSubmit = useCallback(() => {
    startTransition(async () => {
      await validate2FACode(decodedEmail, code, callbackUrl)
        .then((data) => {
          if (data?.error) return setError(data?.error);
          if (data?.success) return setSuccess(data?.success);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  }, [code, decodedEmail, callbackUrl]);

  useEffect(() => {
    if (code.length === 6) {
      handleSubmit();
    }
  }, [code, handleSubmit]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (error || success) {
        setError("");
        setSuccess("");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [error, success]);

  const handleResend = () => {
    setCode("");

    startTransition(async () => {
      await resend2FACode(decodedEmail)
        .then((data) => {
          if (data?.error) {
            return setError(data?.error);
          }
          if (data?.success) return setSuccess(data?.success);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  };

  return (
    <form action={handleSubmit}>
      <FormError message={error} />
      <FormSuccess message={success} />

      <div>
        <Input
          type="number"
          name="code"
          onChange={(event) => setCode(event.target.value)}
          value={code}
          required
          className="outline-none number-input text-center bg-slate-100 py-6 rounded-md border-none text-lg"
        />
      </div>

      <div className="text-xs flex items-center justify-center space-x-1 my-8">
        <p>Didn’t receive a code?</p>{" "}
        <div
          onClick={() => startTransition(() => handleResend())}
          className={`${isPending ? "text-slate-600" : "text-primary"} cursor-pointer`}
        >
          Resend
        </div>
      </div>

      <div className="my-36">
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
