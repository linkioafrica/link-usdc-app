"use client";

import { kycActions } from "@/actions/auth.actions";
import { FormError, FormSuccess } from "@/components/FormStatus";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const IDMain = ({ route }: { route?: string }) => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [idType, setIdType] = useState("");

  const navigate = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (error || success) {
        setError("");
        setSuccess("");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [error, success]);

  const handleContinue = async (event: FormData) => {
    await kycActions({
      id_type: idType,
      id_number: event?.get("id_number") as string,
    })
      .then(async (data) => {
        if (data.status === 400) return setError(data?.message);
        // await update({
        //   ...session?.user,
        //   hasKYC: data?.data?.hasKYC,
        // });

        setSuccess(data?.message);
        return navigate.push(route ? route : "/buy/payment");
      })
      .catch(() => {
        setError("Something went wrong");
      });
  };

  return (
    <form>
      <FormError message={error} />
      <FormSuccess message={success} />

      <div className="space-y-5 mt-5">
        <div>
          <label htmlFor="id_type" className="text-sm text-slate-500">
            ID Type
          </label>
          <Select onValueChange={(value) => setIdType(value)} required>
            <SelectTrigger className="w-full outline-none bg-slate-100 py-5 rounded-md border-none text-base">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bvn">BVN</SelectItem>
              <SelectItem value="nin">NIN</SelectItem>
              <SelectItem value="vin">Voters Card</SelectItem>
              {/* <SelectItem value="dl">Driving License</SelectItem> */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="id_number" className="text-sm text-slate-500">
            ID number
          </label>
          <Input
            type="id_number"
            name="id_number"
            disabled={idType === "" ? true : false}
            required
            className="outline-none bg-slate-100 py-5 rounded-md border-none text-base"
          />
        </div>
      </div>

      <div className="my-32">
        <button
          type="submit"
          disabled={isPending}
          formAction={(event) => startTransition(() => handleContinue(event))}
          className={
            "bg-primary text-base text-white flex items-center justify-center p-2 btn_position rounded-md"
          }
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
