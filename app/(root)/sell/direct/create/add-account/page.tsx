"use client";

import { Navbar } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useTransition } from "react";
import { AllCurrencyBanks } from "@/constant/bankList";
import Image from "next/image";
import { accNumberValidate } from "@/actions/auth.actions";
import { FormError, FormSuccess } from "@/components/FormStatus";

export default function AddAccount() {
  const [feedback, setFeedback] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isVerified, setIsVerified] = useState(false);

  const [isPending, startTransition] = useTransition();
  const navigate = useRouter();

  const bankListArray = AllCurrencyBanks?.find(
    (bank) => bank.currency === "NGN"
  );

  const getBankCode: any = AllCurrencyBanks.find(
    (bank) => bank.currency === "NGN"
  )?.banks?.find((bank) => bank.name === bankName);

  const handleFeedback = (type: string, message: string) => {
    if (type === "success") setSuccess(message);
    if (type === "error") setError(message);

    return setFeedback(true);
  };

  const checkIDNumber = () => {
    if (accountNumber.length >= 1 && accountNumber.length !== 10) {
      return handleFeedback("error", "Provide 10 digits of account number");
    }

    if (accountNumber.length >= 10) {
      setAccountNumber(accountNumber.slice(0, 10));
      setAccountName("");
      handleCheckAccountNumber();
    }
  };

  const handleCheckAccountNumber = async () => {
    setIsVerified(false);
    startTransition(async () => {
      await accNumberValidate({
        number: accountNumber,
        bankCode: getBankCode?.value,
      })
        .then((data) => {
          if (data.status === "success") {
            setIsVerified(true);
            setAccountName(data.name);
            handleFeedback("success", "Account number is valid");
          } else {
            handleFeedback("error", "Account number is invalid");
          }
        })
        .catch(() => {
          handleFeedback("error", "Something went wrong");
        });
    });
  };

  const handleContinue = async () => {
    localStorage.setItem(
      "direct-account-details",
      JSON.stringify({
        bank_name: bankName,
        account_number: accountNumber,
        account_name: accountName,
      })
    );

    return navigate.push("/sell/direct/create/network");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (feedback || accountName) {
        setError("");
        setSuccess("");
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [feedback, error, success, accountName]);

  useEffect(() => {
    checkIDNumber();
    return () => {
      setIsVerified(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountNumber]);

  return (
    <main>
      <Navbar route="/sell/direct/create" title="Add bank account" />

      <form className="my-10">
        <FormError message={error} />
        <FormSuccess message={success} />

        <div className="space-y-5 mt-5">
          <div>
            <label htmlFor="bank" className="text-sm text-slate-500">
              Bank
            </label>
            <Select
              onValueChange={(value) => {
                setBankName(value);
                setAccountName("");
                setAccountNumber("");
              }}
              required
            >
              <SelectTrigger className="w-full outline-none bg-slate-100 py-5 rounded-md border-none text-base">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent className="h-56">
                {bankListArray?.banks.map((bank: any, index) => (
                  <SelectItem
                    key={index}
                    value={bank.name}
                    className="flex items-center"
                  >
                    <span className="inline-block">
                      <Image
                        src={bank?.image}
                        alt={bank?.label}
                        width={23}
                        height={23}
                        objectFit="cover"
                        className="rounded-full inline-block mr-2"
                      />
                    </span>
                    <span className="inline-block">{bank.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="account_number" className="text-sm text-slate-500">
              Account number
            </label>
            <Input
              type="number"
              name="account_number"
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value)}
              required
              disabled={bankName === "" ? true : false}
              className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
            />
          </div>
          <div>
            <label htmlFor="account_name" className="text-sm text-slate-500">
              Account name
            </label>
            <Input
              type="account_name"
              name="account_name"
              readOnly
              value={accountName}
              onChange={(event) => setAccountName(event.target.value)}
              required
              className="outline-none bg-slate-100 py-5 rounded-md border-none text-base"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={!isVerified}
          onClick={handleContinue}
          className={`bg-primary text-base text-white flex items-center disabled:cursor-pointer disabled:bg-primary/50 justify-center p-2 btn_position rounded-md`}
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
            "Confirm"
          )}
        </button>
      </form>
    </main>
  );
}
