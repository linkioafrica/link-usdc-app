/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyButton } from "@/components/CopyButton";
import { accNumberValidate } from "@/actions/auth.actions";
import { AllCurrencyBanks } from "@/constant/bankList";
import { useRampContext } from "@/contexts/ramp.context";
import { useSellContext } from "@/contexts/sell.context";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FormError, FormSuccess } from "@/components/FormStatus";

export const ReceiverMain = () => {
  const [feedback, setFeedback] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();
  const [isVerified, setIsVerified] = useState(false);

  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountType, setAccountType] = useState("checking");
  const [fullName, setFullName] = useState("");
  const [interac, setInterac] = useState("");
  const [pixKey, setPixKey] = useState("");

  const { sellData, setSellData } = useSellContext();
  const { rampData } = useRampContext();
  const navigate = useRouter();

  // const filterBankCode = bankList.filter((bank: any) => {
  //   if (bankName === bank.name) {
  //     return bank;
  //   }
  // });

  const bankListArray = AllCurrencyBanks?.find(
    (bank) => bank.currency === rampData?.receive_asset.toUpperCase()
  );

  const getBankCode: any = AllCurrencyBanks.find(
    (bank) => bank.currency === rampData?.receive_asset.toUpperCase()
  )?.banks?.find((bank) => bank.name === bankName);

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

  useEffect(() => {
    if (rampData?.receive_asset.toUpperCase() !== "NGN")
      return setIsVerified(true);
    if (rampData?.receive_asset.toUpperCase() === "NGN") return checkIDNumber();
  }, [accountNumber]);

  const handleContinue = () => {
    setSellData({
      ...sellData,
      account_name: accountName,
      account_number: accountNumber,
      bank_name: bankName,
      routing_number: routingNumber,
      account_type: accountType,
      full_name: fullName,
      pix_key: pixKey,
      interac: interac,
    });

    return navigate.push("/sell/send");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (feedback || accountName) {
        setError("");
        setSuccess("");
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [feedback, error, success]);

  const handleFeedback = (type: string, message: string) => {
    if (type === "success") setSuccess(message);
    if (type === "error") setError(message);

    return setFeedback(true);
  };

  return (
    <div className="space-y-3">
      <div className="flex shadow rounded-lg p-3 items-center justify-center">
        <div className="text-center">
          <p className="text-xs">Amount to receive</p>
          <h2 className="font-bold text-2xl">
            {rampData?.receive_asset?.toUpperCase()} {rampData?.receive_amount}
          </h2>
          <p className="text-xs">
            ( merchant fee of {rampData?.merchant_fee}% included )
          </p>
        </div>
        <CopyButton value={String(rampData?.send_amount)} />
      </div>

      <form
        action={handleContinue}
        className="overflow-auto h-60 scrollbar p-3"
      >
        <FormError message={error} className="w-72" />
        <FormSuccess message={success} className="w-72" />
        <div className="space-y-2">
          {rampData?.receive_asset.toUpperCase() === "USD" && (
            <div>
              <label htmlFor="full_name" className="text-sm text-slate-500">
                Full name of account holder
              </label>
              <Input
                type="text"
                name="full_name"
                placeholder=""
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
              />
            </div>
          )}

          {rampData?.receive_asset.toUpperCase() === "NGN" && (
            <>
              <div>
                <label htmlFor="bank" className="text-sm text-slate-500">
                  Bank
                </label>
                <Select
                  required
                  onValueChange={(value) => {
                    setBankName(value);
                    setAccountName("");
                    setAccountNumber("");
                  }}
                >
                  <SelectTrigger className="w-full outline-none bg-slate-100 py-5 rounded-md border-none text-base">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="h-56">
                    {bankListArray?.banks.map((bank: any, index: number) => (
                      <SelectItem
                        key={index}
                        value={bank.name}
                        className="flex items-center"
                      >
                        <span className="inline-block">
                          <Image
                            src={bank?.image}
                            alt={bank?.label}
                            width={20}
                            height={20}
                            className="object-cover inline-block mr-2"
                          />
                        </span>
                        <span className="inline-block">{bank.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="account_number"
                  className="text-sm text-slate-500"
                >
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
            </>
          )}

          {rampData?.receive_asset.toUpperCase() === "USD" && (
            <>
              <div>
                <label htmlFor="bank" className="text-sm text-slate-500">
                  Bank
                </label>

                <Select
                  required
                  onValueChange={(value) => {
                    setBankName(value);
                    setAccountName("");
                    setAccountNumber("");
                  }}
                >
                  <SelectTrigger className="w-full outline-none bg-slate-100 py-5 rounded-md border-none text-base">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="h-56">
                    {bankListArray?.banks.map((bank: any, index: number) => (
                      <SelectItem
                        key={index}
                        value={bank.name}
                        className="flex items-center"
                      >
                        <span className="inline-block">
                          <Image
                            src={bank?.image}
                            alt={bank?.label}
                            width={20}
                            height={20}
                            className="object-cover inline-block mr-2"
                          />
                        </span>
                        <span className="inline-block">{bank.label}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="account_number"
                  className="text-sm text-slate-500"
                >
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
            </>
          )}

          {rampData?.receive_asset.toUpperCase() === "BRL" && (
            <>
              <div className="bg-p-light p-2 rounded-md flex">
                <span className="material-icons-round block text-primary">
                  info
                </span>
                <p className="text-primary text-[10px]">
                  Please provide customer name and pix account key to pay funds
                  to.
                </p>
              </div>
              <div>
                <label htmlFor="full_name" className="text-sm text-slate-500">
                  Full name of account holder
                </label>
                <Input
                  type="text"
                  name="full_name"
                  placeholder="customer name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
                />
              </div>
              <div className="mt-5">
                <label htmlFor="pix_key" className="text-sm text-slate-500">
                  PIX Key
                </label>
                <Input
                  type="text"
                  name="pix_key"
                  value={pixKey}
                  placeholder="Enter Pix key"
                  onChange={(event) => setPixKey(event.target.value)}
                  required
                  className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
                />
              </div>
            </>
          )}

          {rampData?.receive_asset.toUpperCase() === "NGN" && (
            <div>
              <label htmlFor="account_name" className="text-sm text-slate-500">
                Account name
              </label>
              <Input
                type="account_name"
                name="account_name"
                readOnly={
                  rampData?.receive_asset.toUpperCase() === "NGN" ? true : false
                }
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
                required
                className="outline-none bg-slate-100 py-5 rounded-md border-none text-base"
              />
            </div>
          )}

          {rampData?.receive_asset.toUpperCase() === "CAD" && (
            <>
              <div className="bg-p-light p-2 rounded-md flex">
                <span className="material-icons-round block text-primary">
                  info
                </span>
                <p className="text-primary text-[10px]">
                  Please provide customer name and interac account number to pay
                  funds to.
                </p>
              </div>
              <div>
                <label htmlFor="full_name" className="text-sm text-slate-500">
                  Full name of account holder
                </label>
                <Input
                  type="text"
                  name="full_name"
                  placeholder="customer name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                  className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
                />
              </div>
              <div>
                <label htmlFor="interac" className="text-sm text-slate-500">
                  Interac
                </label>
                <Input
                  type="text"
                  name="interac"
                  placeholder="Enter interac"
                  value={interac}
                  onChange={(event) => setInterac(event.target.value)}
                  required
                  className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
                />
              </div>
            </>
          )}

          {rampData?.receive_asset.toUpperCase() === "USD" && (
            <>
              <div>
                <label
                  htmlFor="routing_number"
                  className="text-sm text-slate-500"
                >
                  ACH Routing number
                </label>
                <Input
                  type="number"
                  name="routing_number"
                  value={routingNumber}
                  onChange={(event) => setRoutingNumber(event.target.value)}
                  required
                  className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
                />
              </div>
              <div>
                <label
                  htmlFor="account_type"
                  className="text-sm text-slate-500"
                >
                  Account type
                </label>
                <Select
                  required
                  value={accountType}
                  defaultValue="checking"
                  onValueChange={(value) => {
                    setAccountType(value);
                  }}
                >
                  <SelectTrigger className="w-full outline-none bg-slate-100 py-5 rounded-md border-none text-base">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking" className="flex items-center">
                      Checking
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <div className="my-5">
          <button
            type="submit"
            disabled={!isVerified || isPending}
            className={`"cursor-pointer bg-primary opacity-100" disabled:bg-primary/60 disabled:cursor-not-allowed text-base text-white flex items-center justify-center p-2 btn_position rounded-md`}
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
    </div>
  );
};
