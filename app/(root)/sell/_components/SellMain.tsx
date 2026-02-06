/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  stablesOptions,
  AllStablesLimits,
  AllStablesReceiver,
  AllCurrencySellFees,
} from "@/constant/constant";
import { useRampContext } from "@/contexts/ramp.context";
import { useSellContext } from "@/contexts/sell.context";
import { useSellRatesContext } from "@/contexts/sellRates";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";

type SortedCurrency =
  | {
      value: string;
      label: string;
      img: string;
    }[]
  | any;

export const SellMain = ({ session_email }: { session_email: string }) => {
  // Get list of receiving currencies based on Stable selected
  const [sendAsset, setSendAsset] = useState(stablesOptions[0]);

  const sortedReceiveCurrencies: SortedCurrency = AllStablesReceiver.filter(
    (item) => item.stable === sendAsset.value
  )?.find((item) => item.stable === sendAsset.value)?.currencies;

  const [rate, setRate] = useState(1);
  const [fees, setFees] = useState(0);
  const [receiveAsset, setReceiveAsset] = useState(sortedReceiveCurrencies[1]);
  const [sendAmount, setSendAmount] = useState(30.0);
  const [receiveAmount, setReceiveAmount] = useState(0.0);

  const { sellRates } = useSellRatesContext();
  const { rampData, setRampData } = useRampContext();
  const { sellData, setSellData } = useSellContext();
  const router = useRouter();
  let calcFee = 0;

  // Params from URL
  let businessParam = useSearchParams().get("business_id");
  let businessTidParam = useSearchParams().get("business_tid");
  let orderIdParam = useSearchParams().get("order_id");
  let amountParam = useSearchParams().get("amount");
  let sendAssetParam = useSearchParams().get("send_asset") as string;
  let receiveAssetParam = useSearchParams().get("receive_asset") as string;
  let paymentTypeParam = useSearchParams().get("payment_type");

  const findOption = stablesOptions.find(
    (option) => option?.value === sendAsset.value
  );
  const reference = Math.floor(Math.random() * 10000000000);

  // Get rate conversion list based of Currency selected
  let selectedCurVal: any = sellRates?.filter(
    (item) => item.currency === sendAsset.value
  )[0]?.rates[0 as any];

  const getCurrencyRates = () => {
    if (selectedCurVal === undefined) {
      // setRate();
      return;
    } else {
      const matchingCurrencies = Object.entries(selectedCurVal)
        .filter(
          ([currency]) =>
            currency?.toUpperCase() === receiveAsset.value.toUpperCase()
        )
        .map(([currency, rate]) => ({ currency, rate }));
      setRate(matchingCurrencies[0].rate as number);
    }
  };

  // Get Currency input limit list based of Currency selected
  const selectedCurLimits: any = AllStablesLimits.filter(
    (item) => item.currency === sendAsset.value
  )?.find((item) => item.currency === sendAsset.value)?.limit[0];

  // Get fee conversion list based of Currency selected
  const selectedCurFee: any = AllCurrencySellFees.filter(
    (item) => item.currency === sendAsset.value
  )?.find((item) => item.currency === sendAsset.value)?.fees[0];

  const getCurrencyFees = () => {
    const matchingCurrencies = Object.entries(selectedCurFee)
      .filter(
        ([currency]) =>
          currency.toUpperCase() === receiveAsset.value.toUpperCase()
      )
      .map(([currency, rate]) => ({ currency, rate }));

    setFees(matchingCurrencies[0].rate as number);
  };

  const handleSendAmount = () => {
    let receiveAmount = 0;
    let fee = 0;
    if (receiveAsset.value === "ngn") {
      const amountInNgn = Number(sendAmount) * rate;

      if (Number(amountInNgn) >= 10000 && Number(amountInNgn) <= 10000000) {
        calcFee = amountInNgn * 0.01;
      }
      calcFee <= 650 ? (fee = calcFee + 110) : (fee = 760);
      receiveAmount = Math.round(amountInNgn - fee);
    } else {
      const beforeFee = Number(sendAmount) * rate;
      calcFee = beforeFee * (0.5 / 100);
      receiveAmount = beforeFee - calcFee;
    }
    const receiveAmountFixed = receiveAmount.toFixed(2);

    return setReceiveAmount(Number(receiveAmountFixed));
  };

  const getSendToken = stablesOptions?.find(
    (option) => option?.value === sendAsset.value
  );

  useEffect(() => {
    if (sendAmount > selectedCurLimits.maximumBuy) {
      setSendAmount(Number(selectedCurLimits.maximumBuy));
    }
  }, [sendAmount, receiveAsset]);

  useEffect(() => {
    getCurrencyFees();
    handleSendAmount();
  }, [handleSendAmount]);

  useEffect(() => {
    getCurrencyRates();
  }, [selectedCurVal, handleSendAmount]);

  useEffect(() => {
    handleSendAmount();
  }, [sendAmount, sendAsset, receiveAsset, rate, fees]);

  const handleContinue = () => {
    setRampData({
      ...rampData,
      send_asset: getSendToken?.label as string,
      receive_asset: receiveAsset.value,
      send_amount: sendAmount,
      receive_amount: receiveAmount,
      business_id: businessParam || "56781285",
      payment_type: paymentTypeParam as string,
      order_id: orderIdParam as string,
      business_tid: businessTidParam as string,
      merchant_fee: fees,
      rate: String(rate),
      reference: reference.toString(),
    });
    setSellData({
      ...sellData,
      network: findOption?.network as string,
    });

    return router.push("/sell/receiver");
  };

  const findSendOption = stablesOptions?.find(
    (option) => option?.value === sendAssetParam
  );

  const findReceiveOption = sortedReceiveCurrencies?.find(
    (option: any) => option?.value === receiveAssetParam
  );

  useEffect(() => {
    if (amountParam) {
      setSendAmount(Number(amountParam));
    }

    if (findSendOption === undefined || findReceiveOption === undefined) {
      setSendAsset({
        value: "usdc_stellar",
        label: "USDC",
        img: "/assets/svg/otc/usdc-stellar.svg",
        network: "stellar",
      });
      setReceiveAsset({
        value: "ngn",
        label: "NGN",
        img: "/assets/svg/fiat/ngn.svg",
      });
    }

    if (findSendOption) {
      setSendAsset(findSendOption);
    }

    if (findReceiveOption) {
      setReceiveAsset(findReceiveOption);
    }
  }, []);

  return (
    <form action={handleContinue} className="flex flex-col gap-y-5">
      <div>
        <label htmlFor="You send" className="text-sm text-slate-500">
          You send
        </label>
        <div className="relative bg-slate-100 py-1 rounded-lg flex items-center space-x-1 justify-center">
          <div className="after:absolute after:right-32 after:top-[0.6rem] after:bottom-0 after:w-[1px] after:h-7 after:bg-slate-400 after:content-[' ']">
            <Input
              type="tel"
              name="send_amount"
              placeholder="10000"
              className="outline-none py-1 number-input font-semibold border-none text-lg ring-0 focus-visible:ring-0"
              value={sendAmount}
              onChange={(e) => {
                setSendAmount(Number(e.target.value));
              }}
            />
          </div>

          <Listbox
            value={sendAsset}
            onChange={(option) => {
              setSendAsset(option);
            }}
          >
            <ListboxButton
              className={clsx(
                "relative block w-40 rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              )}
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={(sendAsset?.img as string) || ""}
                  alt={sendAsset?.img as string}
                  width={24}
                  height={24}
                  className="object-cover"
                />
                <p className="text-sm/6 text-black pt-1">{sendAsset.label}</p>
              </div>

              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
                aria-hidden="true"
              />
            </ListboxButton>

            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                "w-[var(--button-width)] rounded-xl shadow-xl bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
                "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
              )}
            >
              {stablesOptions.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={(option?.img as string) || ""}
                      alt={option?.img as string}
                      width={23}
                      height={23}
                      className="object-cover"
                    />
                    <p className="text-sm/6 text-black">{option.label}</p>
                  </div>
                  <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>

      <div>
        <label htmlFor="You send" className="text-sm text-slate-500">
          You receive
        </label>
        <div className="relative bg-slate-100 py-1 rounded-lg flex items-center space-x-1 justify-center">
          <div className="after:absolute after:right-32 after:top-[0.6rem] after:bottom-0 after:w-[1px] after:h-7 after:bg-slate-400 after:content-[' ']">
            <Input
              type="tel"
              name="receive_amount"
              placeholder="0.00"
              className={clsx(
                "outline-none py-1 number-input font-semibold border-none text-lg ring-0 focus-visible:ring-0",
                sendAmount < selectedCurLimits.minimum && "text-rose-600"
              )}
              value={receiveAmount}
              readOnly
            />
          </div>

          <Listbox
            value={receiveAsset}
            onChange={(option) => {
              setReceiveAsset(option);
            }}
          >
            <ListboxButton
              className={clsx(
                "relative block w-40 rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-black",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25"
              )}
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={(receiveAsset?.img as string) || ""}
                  alt={receiveAsset?.img as string}
                  width={24}
                  height={24}
                  className="object-cover"
                />
                <p className="text-sm/6 text-black pt-1">
                  {receiveAsset?.label}
                </p>
              </div>

              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
                aria-hidden="true"
              />
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={clsx(
                "w-[var(--button-width)] rounded-xl shadow-xl bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
                "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
              )}
            >
              {sortedReceiveCurrencies.map((option: SortedCurrency) => (
                <ListboxOption
                  key={option.value}
                  value={option}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={(option?.img as string) || ""}
                      alt={option?.img as string}
                      width={23}
                      height={23}
                      className="object-cover"
                    />
                    <p className="text-sm/6 text-black">{option.label}</p>
                  </div>
                  <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>
      </div>

      <div className="bg-slate-100 py-3 font-medium space-y-2 rounded-lg text-xs px-4">
        <div className="flex items-center justify-between">
          <p>Exchange rate</p>
          <p>
            1 {findOption?.label} = {rate} {receiveAsset?.value.toUpperCase()}
          </p>
        </div>
        {/* <div className="flex items-center justify-between">
          <p>Merchant fee</p>
          <p>{fees}%</p>
        </div> */}
      </div>

      <div className="my-20">
        <button
          type="submit"
          disabled={sendAmount < selectedCurLimits.minimum ? true : false}
          className={`${sendAmount < selectedCurLimits.minimum ? "cursor-not-allowed bg-primary opacity-50" : "cursor-pointer bg-primary opacity-100"} text-base text-white flex items-center justify-center p-2 btn_position rounded-md`}
        >
          {session_email ? "Sell Stables" : "Sign in to continue"}
        </button>
      </div>
    </form>
  );
};
