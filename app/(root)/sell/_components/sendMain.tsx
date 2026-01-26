"use client";

import { rampSellActions } from "@/actions/ramp.actions";

import { CopyButton } from "@/components/CopyButton";
import { Navbar } from "@/components/Navbar";
import { networkAddress } from "@/constant/constant";
import { useRampContext } from "@/contexts/ramp.context";
import { useSellContext } from "@/contexts/sell.context";
import { useQRCode } from "next-qrcode";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export const SendMain = () => {
  const [isPending, startTransition] = useTransition();
  const { rampData } = useRampContext();
  const { sellData } = useSellContext();

  const { Canvas } = useQRCode();
  const navigate = useRouter();

  const address = networkAddress.find(
    (item) => item.network === sellData?.network
  )?.address;

  let user_name: any;
  rampData?.receive_asset.toUpperCase() === "NGN"
    ? (user_name = sellData?.account_name)
    : (user_name = sellData?.full_name);

  const handleSubmit = async () => {
    const request = await rampSellActions({
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
        account_name: user_name,
        account_number: sellData?.account_number,
        bank_name: sellData?.bank_name,
        reference: rampData?.reference,
        wallet_address: address,
        routing_number: sellData?.routing_number,
        account_type: sellData?.account_type,
        network: sellData?.network,
        pix_key: sellData?.pix_key,
        interac: sellData?.interac,
      },
    });

    if (request.status === 201) return navigate.push("/sell/status/success");
    return navigate.push("/sell/request/error");
  };

  return (
    <>
      <Navbar
        route="/sell/receiver"
        title={`Send ${rampData?.send_asset.toUpperCase()}`}
      />
      <div className="space-y-4">
        <div className="flex shadow rounded-lg p-3 items-center justify-center">
          <div className="text-center">
            <p className="text-xs">
              Send this amount to the wallet address below
            </p>
            <h2 className="font-bold text-2xl">
              {rampData.send_amount} {rampData.send_asset.toUpperCase()}
            </h2>
            <p className="text-xs text-slate-500">
              Network:{" "}
              <span className="text-black font-medium">
                {sellData?.network} network
              </span>
            </p>
          </div>
        </div>

        {/* <div className="bg-p-light p-2 rounded-md flex items-center justify-center space-x-1">
          <span className="material-icons-round block text-primary">info</span>
          <p className="text-primary text-[10px]">
            ADD THE REFERENCE ({rampData?.reference}) NAME AS THE MEMO
          </p>
        </div> */}

        <div className="border-2 border-primary mt-5 py-2 px-3 space-x-1 rounded-lg text-black flex items-center">
          <p className="break-all font-medium text-sm uppercase leading-none">
            {address}.
          </p>
          <CopyButton value={address as string} />
        </div>

        <div className="mx-auto w-max mt-5">
          <Canvas
            text={address || "0"}
            options={{
              margin: 2,
              scale: 5,
              width: 110,
            }}
          />
        </div>

        <div className="my-5">
          <button
            type="button"
            disabled={isPending}
            onClick={() => startTransition(() => handleSubmit())}
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
              "I've sent funds"
            )}
          </button>
        </div>
      </div>
    </>
  );
};
