/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { rampBuyActions } from "@/actions/ramp.actions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { accNumberValidate } from "@/actions/auth.actions";
import { AllCurrencyBanks } from "@/constant/bankList";
import { useBuyContext } from "@/contexts/buy.context";
import { useRampContext } from "@/contexts/ramp.context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { FormError, FormSuccess } from "@/components/FormStatus";

export const POPMain = () => {
  const [feedback, setFeedback] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [interacNo, setInteracNo] = useState("");

  const [isVerified, setIsVerified] = useState(false);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const navigate = useRouter();
  const { buyData } = useBuyContext();
  const { rampData } = useRampContext();
  let selectedRampAsset = rampData?.send_asset.toUpperCase();

  const bankListArray = AllCurrencyBanks?.find(
    (bank) => bank.currency === rampData?.send_asset.toUpperCase()
  );

  const getBankCode: any = AllCurrencyBanks.find(
    (bank) => bank.currency === rampData?.send_asset.toUpperCase()
  )?.banks?.find((bank) => bank.name === bankName);

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
    if (accountName === "") return setIsVerified(false);
  }, [accountNumber, accountName]);

  useEffect(() => {
    if (rampData?.send_asset.toUpperCase() !== "NGN")
      return setIsVerified(true);
    if (rampData?.send_asset.toUpperCase() === "NGN") return checkIDNumber();
  }, [accountNumber]);

  const handleSubmit = async (event: FormData) => {
    const request = await rampBuyActions({
      data: {
        merchant_fee: rampData?.merchant_fee,
        send_amount: rampData?.send_amount,
        send_asset: rampData?.send_asset,
        rate: rampData?.rate,
        receive_amount: rampData?.receive_amount,
        receive_asset: rampData?.receive_asset,
        business_id: rampData?.business_id,
        business_tid: rampData?.business_tid,
        order_id: rampData?.order_id,
        payment_type: rampData?.payment_type,
        network: buyData?.network,
        pix_key: pixKey,
        interac: interacNo,
        wallet_address: buyData?.wallet_address,
        stellar_memo: buyData?.stellar_memo,
        reference: rampData?.reference,
        pop_bank_name: bankName,
        pop_account_name: accountName,
        pop_account_number: event.get("account_number") as string,
      },
    });
    if (request.status === 201) return navigate.push("/buy/status/success");
    return navigate.push("/buy/request/error");
  };

  return (
    <form className="">
      <FormError message={error} />
      <FormSuccess message={success} />

      {selectedRampAsset === "NGN" && (
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
              readOnly={
                rampData?.send_asset.toUpperCase() === "NGN" ? true : false
              }
              value={accountName}
              onChange={(event) => setAccountName(event.target.value)}
              required
              className="outline-none bg-slate-100 py-5 rounded-md border-none text-base"
            />
          </div>
        </div>
      )}

      {selectedRampAsset === "USD" && (
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
                    <span className="inline-block relative">
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
              readOnly={
                rampData?.send_asset.toUpperCase() === "NGN" ? true : false
              }
              value={accountName}
              onChange={(event) => setAccountName(event.target.value)}
              required
              className="outline-none bg-slate-100 py-5 rounded-md border-none text-base"
            />
          </div>
        </div>
      )}

      {selectedRampAsset === "BRL" && (
        <div className="mt-5">
          <label htmlFor="pix_key" className="text-sm text-slate-500">
            PIX Key
          </label>
          <Input
            type="text"
            name="pix_key"
            value={pixKey}
            placeholder="Enter PiX key"
            onChange={(event) => setPixKey(event.target.value)}
            required
            className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
          />
        </div>
      )}

      {selectedRampAsset === "CAD" && (
        <div className="mt-5">
          <label htmlFor="account_number" className="text-sm text-slate-500">
            Interac Number
          </label>
          <Input
            type="text"
            name="interac_number"
            value={interacNo}
            placeholder="interac deposit number"
            onChange={(event) => setInteracNo(event.target.value)}
            required
            className="outline-none number-input bg-slate-100 py-5 rounded-md border-none text-base"
          />
        </div>
      )}

      {/* <div className="bg-white p-1 rounded flex items-center mt-2 space-x-2">
        <p className="text-black text-xs">{error}</p>
      </div> */}

      <div className="my-32">
        <button
          type="submit"
          disabled={!isVerified}
          formAction={(event) => startTransition(() => handleSubmit(event))}
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
            "Request deposit"
          )}
        </button>
      </div>
    </form>
  );
};
