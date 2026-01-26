"use client";

import { Navbar } from "@/components/Navbar";
import { useBuyContext } from "@/contexts/buy.context";
import { useRampContext } from "@/contexts/ramp.context";
import { useRouter } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import Link from "next/link";
import { useQRCode } from "next-qrcode";
import { AllVendorBankList } from "@/constant/constant";
// import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Image from "next/image";

export const MakePayment = () => {
  const { buyData } = useBuyContext();
  const { rampData } = useRampContext();
  const navigate = useRouter();
  const { Canvas } = useQRCode();

  const handleContinue = () => {
    navigate.push("/buy/pop");
  };

  let selectedRampAsset = rampData?.send_asset.toUpperCase();

  return (
    <section>
      <Navbar route="/buy/confirm" title="Make Your Payment" />

      <div className="space-y-2">
        {selectedRampAsset === "USD" && (
          <div className="bg-p-light p-2 rounded-md items-center flex space-x-1">
            <span className="material-icons-round block text-primary">
              info
            </span>
            <p className="text-primary text-xs">
              Transfer via Wire or ACH Transfer
            </p>
          </div>
        )}

        {selectedRampAsset === "CAD" && (
          <>
            <div className="bg-p-light p-2 rounded-md flex">
              <span className="material-icons-round block text-primary">
                info
              </span>
              <p className="text-primary text-[9px]">
                This transaction is powered by our trusted third-party banking
                partner.
              </p>
            </div>
          </>
        )}
        <div className="flex shadow rounded-lg p-2 items-center justify-center">
          <div className="text-center">
            <p className="text-xs">Amount to send</p>
            <h2 className="font-bold text-2xl">
              {rampData?.send_asset.toUpperCase()} {rampData.send_amount}
            </h2>
            <p className="text-xs">
              (Merchant fee of {rampData?.merchant_fee}% included){" "}
            </p>
          </div>
          <CopyButton value={String(rampData?.send_amount)} />
        </div>
        <div className="bg-p-light p-2 rounded-md flex items-center justify-between">
          {/* <p className="text-primary">
            Deposit time <span className="font-semibold">15:00</span>
          </p>{" "} */}
          <p className="text-primary">Contact us:</p>
          <div className="flex items-center justify-center gap-2">
            <Link
              href="https://api.whatsapp.com/send/?phone=16893033761&text&type=phone_number&app_absent=0"
              passHref={true}
              target="_blank"
              className="inline-block"
            >
              <button className="bg-primary flex items-center justify-center text-white rounded-full w-7 h-7">
                <span className="material-icons text-lg">sms</span>
              </button>
            </Link>
            <Link
              href="https://call.whatsapp.com/voice/x6n2yjS4MvaErkKSRSBHBc"
              passHref={true}
              target="_blank"
              className="inline-block"
            >
              <button className="bg-primary flex items-center justify-center text-white rounded-full w-7 h-7">
                <span className="material-icons text-lg">call</span>
              </button>
            </Link>
          </div>{" "}
        </div>
        {/* Cad payment method */}
        {selectedRampAsset === "CAD" && (
          <>
            <p className="text-md text-slate-900 my-3">Interac Payment</p>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Reference code:</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton value={String(rampData.reference)} className="" />
                <span>{rampData.reference}</span>
              </p>
            </div>

            <div className="bg-p-light p-2 rounded-md flex">
              <span className="material-icons-round block text-primary">
                info
              </span>
              <p className="text-primary text-[9px]">
                Remember to copy or write down the reference code above. It will
                be needed to process your transaction.
              </p>
            </div>
          </>
        )}

        {(selectedRampAsset === "EUR" || selectedRampAsset === "GBP") && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Bank</p>
              <p className="font-medium">{buyData?.ven_bank_name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account name</p>
              <p className="font-medium text-right">
                {buyData?.ven_account_name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account number</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton
                  value={String(buyData?.ven_account_number)}
                  className=""
                />
                <span>{buyData?.ven_account_number}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Sort code</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton
                  value={String(buyData?.ven_sort_code)}
                  className=""
                />
                <span>{buyData?.ven_sort_code}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Reference code</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton value={String(rampData.reference)} className="" />
                <span>{rampData.reference}</span>
              </p>
            </div>
          </>
        )}

        {(selectedRampAsset == "AUD" ||
          selectedRampAsset === "JPY" ||
          selectedRampAsset == "KES" ||
          selectedRampAsset == "NZD" ||
          selectedRampAsset == "SGD" ||
          selectedRampAsset == "ZAR" ||
          selectedRampAsset === "TRY") && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Bank</p>
              <p className="font-medium">{buyData?.ven_bank_name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account name</p>
              <p className="font-medium text-right">
                {buyData?.ven_account_name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account number</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton
                  value={String(buyData?.ven_account_number)}
                  className=""
                />
                <span>{buyData?.ven_account_number}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Swift code</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton
                  value={String(buyData?.ven_swift_code)}
                  className=""
                />
                <span>{buyData?.ven_swift_code}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Reference code</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton value={String(rampData.reference)} className="" />
                <span>{rampData.reference}</span>
              </p>
            </div>
          </>
        )}

        {/* Ngn payment method */}
        {selectedRampAsset === "NGN" && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Bank</p>
              <p className="font-medium">{buyData?.ven_bank_name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account name</p>
              <p className="font-medium text-right">
                {buyData?.ven_account_name}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account number</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton
                  value={String(buyData?.ven_account_number)}
                  className=""
                />
                <span>{buyData?.ven_account_number}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Reference code</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton value={String(rampData.reference)} className="" />
                <span>{rampData.reference}</span>
              </p>
            </div>
          </>
        )}

        {/* Usd payment method */}
        {selectedRampAsset === "USD" && (
          <>
            <div className="flex items-center justify-between pt-2">
              <p className="text-slate-500">Bank:</p>
              <p className="font-medium">{buyData?.ven_bank_name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account name:</p>
              <p className="font-medium ">{buyData?.ven_account_name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account number:</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton
                  value={String(buyData?.ven_account_number)}
                  className=""
                />
                <span>{buyData?.ven_account_number}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Routing number:</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton
                  value={String(buyData?.ven_routing_number)}
                  className=""
                />
                <span>{buyData?.ven_routing_number}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Account type:</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton
                  value={String(buyData?.ven_account_type)}
                  className=""
                />
                <span>{buyData?.ven_account_type}</span>
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Reference code:</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton value={String(rampData.reference)} className="" />
                <span>{rampData.reference}</span>
              </p>
            </div>
          </>
        )}

        {/* Brl payment method */}
        {selectedRampAsset === "BRL" && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-slate-500">Ref code:</p>
              <p className="font-medium flex items-center space-x-1">
                <CopyButton value={String(rampData.reference)} className="" />
                <span>{rampData.reference}</span>
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <p className="text-slate-500">Pix key:</p>
                <p className="font-medium flex items-center space-x-1 text-sm">
                  <CopyButton
                    value={"11754090-d0cf-4b1b-9d45-6669b695f5f3" as string}
                    className=""
                  />
                  <span>
                    11754090-d0cf-4b1b-
                    <br />
                    9d45-6669b695f5f3
                  </span>
                </p>
              </div>

              <div className="mx-auto w-max mt-5">
                <Canvas
                  text={"11754090-d0cf-4b1b-9d45-6669b695f5f3"}
                  options={{
                    margin: 2,
                    scale: 5,
                    width: 110,
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="my-5">
        <button
          type="button"
          onClick={handleContinue}
          className="bg-primary text-base text-white flex items-center justify-center p-2 btn_position rounded-md"
        >
          {/* I&apos;ve made payment */}
          Payment made
        </button>
      </div>
    </section>
  );
};
