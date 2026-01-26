/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  fiatOptions,
  stablesOptions,
  AllVendorBankList,
  AllCurrencyLimits,
  AllCurrencyReceiver,
  AllCurrencyBuyFees,
} from "@/constant/constant";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRampContext } from "@/contexts/ramp.context";
import { useBuyContext } from "@/contexts/buy.context";
import { useBuyRatesContext } from "@/contexts/buyRates.context";
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

export const BuyMain = ({ session_email }: { session_email: string }) => {
  const [rate, setRate] = useState(1);
  const [fees, setFees] = useState(0);

  const [sendAsset, setSendAsset] = useState(fiatOptions[1]);
  const [receiveAsset, setReceiveAsset] = useState(stablesOptions[0]);
  const [sendAmount, setSendAmount] = useState(20000);
  const [receiveAmount, setReceiveAmount] = useState(0.0);

  const [vendorDetails, setVendorDetails] = useState({
    accountName: "",
    bankName: "",
    accountNumber: "",
    accountType: "",
    routingNumber: "",
    iban: "",
    institutionNumber: "",
    sortCode: "",
    branchCode: "",
    swiftCode: "",
  } as any);

  const { buyRates } = useBuyRatesContext();
  const { rampData, setRampData } = useRampContext();
  const { buyData, setBuyData } = useBuyContext();

  const router = useRouter();

  const findOption = stablesOptions.find(
    (option) => option?.value === receiveAsset.value
  );

  const reference = Math?.floor(Math?.random() * 10000000000);

  // Send initial message to parent window that popup is ready
  useEffect(() => {
    if (typeof window !== 'undefined' && window.opener) {
      try {
        window.opener.postMessage(
          {
            type: "interactive_popup_ready" // Signal that popup loaded successfully
          },
          "http://localhost:8000" // Your app's HOST_URL (matches current app)
        );
      } catch (error) {
        console.log('Failed to send message to parent window:', error);
      }
    }
  }, []);

// Get Vendor array list based of Currency selected
let selectedVendorBanks = AllVendorBankList?.filter(
  (item) => item?.currency === sendAsset?.value.toUpperCase()
);
  const currencyBanks = selectedVendorBanks[0]?.banks;
  const randomizeVendorAccount = () => {
    const randomIndex = Math?.floor(Math?.random() * currencyBanks?.length);
    const randomBankDetail = currencyBanks[randomIndex];
    return setVendorDetails(randomBankDetail);
  };

  // Get rate conversion list based of Currency selected
  let selectedCurVal = buyRates?.filter(
    (item) => item.currency === receiveAsset.value
  )[0]?.rates[0 as any];

  const getCurrencyRates = () => {
    if (selectedCurVal === undefined) return;
    const matchingCurrencies = Object?.entries(selectedCurVal)
      ?.filter(
        ([currency]) =>
          currency.toUpperCase() === sendAsset?.value.toUpperCase()
      )
      ?.map(([currency, rate]) => ({ currency, rate }));
    setRate(matchingCurrencies[0]?.rate as number);
  };

  // Get Currency input limit list based of Currency selected
  let selectedCurLimit = AllCurrencyLimits?.filter(
    (item) => item.currency === sendAsset?.value.toUpperCase()
  );
  const selectedCurLimits = selectedCurLimit[0]?.limit[0];

  // Get list of receiving stables based on  Currency selected
  let selectedCurReceive = AllCurrencyReceiver?.filter(
    (item) => item?.currency === sendAsset?.value.toUpperCase()
  );
  const currencyReceive = selectedCurReceive[0]?.stables;

  // Get fee conversion list based of Currency selected
  let selectedCurFee = AllCurrencyBuyFees?.filter(
    (item) => item?.currency === receiveAsset.value
  );
  const selectedBuyCurFees = selectedCurFee[0]?.fees[0];

  const getCurrencyFees = () => {
    const matchingCurrencies = Object?.entries(selectedBuyCurFees)
      ?.filter(
        ([currency]) =>
          currency.toUpperCase() === sendAsset?.value.toUpperCase()
      )
      ?.map(([currency, rate]) => ({ currency, rate }));
    setFees(matchingCurrencies[0]?.rate);
  };

  const handleSendAmount = () => {
    let amountAfterFee = 0;
    let receiveAmount = 0;
    let calcFee;
    if (sendAsset.value === "ngn") {
      calcFee =
        sendAmount >= 20000 && sendAmount < 100000
          ? sendAmount * 0.015
          : sendAmount * 0.008 + 1050;
      amountAfterFee = Number(sendAmount) - calcFee;
      receiveAmount = amountAfterFee / rate;
    } else {
      calcFee = Number(sendAmount) * (fees / 100);
      amountAfterFee = Number(sendAmount) - calcFee;
      receiveAmount = amountAfterFee / rate;
    }
    const receiveAmountFixed = receiveAmount?.toFixed(2);
    return setReceiveAmount(Number(receiveAmountFixed));
  };

  // Params from URL
  let businessParam = useSearchParams().get("business_id");
  let businessTidParam = useSearchParams().get("business_tid");
  let orderIdParam = useSearchParams().get("order_id");
  let amountParam = useSearchParams().get("amount");
  let sendAssetParam = useSearchParams().get("send_asset") as string;
  let receiveAssetParam = useSearchParams().get("received_asset") as string;
  let paymentTypeParam = useSearchParams().get("payment_type");

  useEffect(() => {
    if (sendAmount > selectedCurLimits?.maximumBuy) {
      return setSendAmount(Number(selectedCurLimits?.maximumBuy));
    }
  }, [sendAmount]);

  useEffect(() => {
    getCurrencyFees();
    randomizeVendorAccount();
  }, [handleSendAmount]);

  useEffect(() => {
    getCurrencyRates();
  }, [selectedCurVal, handleSendAmount]);

  useEffect(() => {
    handleSendAmount();
  }, [sendAmount, sendAsset, receiveAsset, rate, fees]);

  const handleContinue = () => {
    if (!session_email) {
      // Redirect to login with callback URL to current page
      const callbackUrl = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/auth/login?callbackUrl=${callbackUrl}`;
      return;
    }

    setRampData({
      ...rampData,
      send_asset: sendAsset.value,
      receive_asset: receiveAsset.value,
      send_amount: sendAmount,
      receive_amount: receiveAmount,
      merchant_fee: fees,
      rate: String(rate),
      reference: reference,
      business_id: businessParam || "56781285",
      payment_type: paymentTypeParam as string,
      order_id: orderIdParam as string,
      business_tid: businessTidParam as string,
    });
    setBuyData({
      ...buyData,
      network: findOption?.network as string,
      ven_account_name: vendorDetails.accountName,
      ven_bank_name: vendorDetails.bankName,
      ven_account_number: vendorDetails.accountNumber,
      ven_account_type: vendorDetails.accountType,
      ven_routing_number: vendorDetails.routingNumber,
      ven_iban: vendorDetails.iban,
      ven_institution_number: vendorDetails.institutionNumber,
      ven_sort_code: vendorDetails.sortCode,
      ven_branch_code: vendorDetails.branchCode,
      ven_swift_code: vendorDetails.swiftCode,
    });

    return router.push("/buy/confirm");
  };

  const findSendOption = fiatOptions?.find(
    (option) => option?.value === sendAssetParam
  );

  const findReceiveOption = stablesOptions?.find(
    (option: any) => option?.value === receiveAssetParam
  );

  useEffect(() => {
    if (amountParam) {
      setSendAmount(Number(amountParam));
    }

    if (findSendOption === undefined || findReceiveOption === undefined) {
      setSendAsset({
        value: "ngn",
        label: "NGN",
        img: "/assets/svg/fiat/ngn.svg",
      });
      setReceiveAsset({
        value: "usdc_polygon",
        label: "USDC",
        img: "/assets/svg/otc/usdc-stellar.svg",
        network: "stellar",
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
              {fiatOptions.map((option) => (
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
                  {receiveAsset.label}
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
              {currencyReceive.map((option) => (
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
            1 {findOption?.label} = {rate} {sendAsset?.value.toUpperCase()}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Merchant fee</p>
          <p>{fees}%</p>
        </div>
      </div>

      <div className="my-20">
        <button
          type="submit"
          disabled={sendAmount < selectedCurLimits?.minimum ? true : false}
          className={`${sendAmount < selectedCurLimits?.minimum ? "cursor-not-allowed bg-primary opacity-50" : "cursor-pointer bg-primary opacity-100"} text-base text-white flex items-center justify-center p-2 btn_position rounded-md`}
        >
          {session_email ? "Buy Stables" : "Sign in to continue"}
          {/* {session_email ? `Buy ${receiveAsset.value}` : "Sign in to continue"} */}
        </button>
      </div>
    </form>
  );
};
