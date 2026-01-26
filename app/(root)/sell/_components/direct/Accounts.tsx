"use client";

import { truncateString } from "@/lib/format";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type DirectProps = {
  data: {
    asset: string;
    bank_name: string;
    account_number: string;
    account_name: string;
    wallets: {
      walletId: string;
      address: string;
      network: string;
    }[];
    walletPhrase: string;
  };
};

export const DirectAccounts = ({ data }: DirectProps) => {
  const navigate = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return (
    <div>
      <section className="mt-5 flex items-start justify-between rounded-lg bg-[#DAEFFF] p-4">
        <div className="grid grid-cols-2 gap-x-2 gap-y-4">
          <div>
            <p className="text-xs font-medium">Account holder</p>
            <h2 className="font-bold text-sm truncate">{data?.account_name}</h2>
          </div>
          <div>
            <p className="text-xs font-medium">Account number</p>
            <h2 className="font-bold text-sm">
              {data?.account_number &&
                truncateString(String(data?.account_number), 2, 2, "****")}
            </h2>
          </div>
          <div>
            <p className="text-xs font-medium">Bank</p>
            <h2 className="font-bold text-sm">{data?.bank_name}</h2>
          </div>
          <div>
            <p className="text-xs font-medium">Rate</p>
            <h2 className="font-bold text-sm">
              1 {data?.asset} ~ 1 {data?.asset.slice(0, 3)}
            </h2>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate.push("/sell/direct/accounts/edit")}
          className="w-7 h-7 p-2 bg-[#EEF9FF] rounded-full flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-primary text-xl">
            edit
          </span>
        </button>
      </section>

      <section className="space-y-2 mt-5">
        {/* {data?.wallets.length < 2 && (
          <div className="flex justify-end">
            <button
              onClick={() => navigate.push("/sell/direct/create/network")}
              className="text-primary flex items-center gap-1"
            >
              <span className="text-xl material-symbols-outlined">
                add_circle
              </span>
              <p className="text-sm font-medium">Add a new network</p>
            </button>
          </div>
        )} */}

        <div className="h-64 scrollbar space-y-3 overflow-auto">
          {data?.wallets?.map((wallet, index) => (
            <div
              key={index}
              onClick={() =>
                navigate.push(`/sell/direct/accounts/${wallet?.network}`)
              }
              className="cursor-pointer hover:bg-neutral-200 transition-all flex items-center justify-between rounded-lg bg-[#F7F7F7] p-4 gap-2"
            >
              <div className="space-y-2">
                <p className="font-medium lead text-sm text-[#4E545F] capitalize">
                  {wallet?.network === "ethereum" ? "polygon" : wallet?.network}{" "}
                  address
                </p>
                <p className="break-all w-60 leading-tight font-medium text-xs">
                  {wallet?.address}
                </p>

                <div className="flex items-center gap-2">
                  <Image
                    src={`/assets/png/networks/${wallet?.network === "ethereum" ? "polygon" : wallet?.network}.png`}
                    alt={wallet?.network}
                    width={20}
                    height={20}
                  />
                  <p className="text-xs text-[#4E545F]">Only send NGNC</p>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(String(wallet?.address));
                }}
              >
                {copied ? (
                  <span className="material-icons text-green-600">check</span>
                ) : (
                  <span className={`material-symbols-outlined `}>
                    content_copy
                  </span>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
