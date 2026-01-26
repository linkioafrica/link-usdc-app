"use client";

import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SellOption = ({ hasDW }: { hasDW: boolean }) => {
  const navigate = useRouter();

  const handleContinue = () => {
    if (hasDW) return navigate.push("/sell/direct/accounts");
    return navigate.push("/sell/direct");
  };

  return (
    <main className="space-y-5">
      <Navbar />

      <div
        onClick={() => navigate.push("/sell")}
        className="flex items-center cursor-pointer hover:bg-neutral-200 transition-all justify-between rounded-md bg-[#F7F7F7] p-3"
      >
        <div className="flex items-center gap-3">
          <Image
            src="/assets/png/exchange.png"
            alt="bank"
            width={35}
            height={35}
          />
          <p className="font-medium text-sm">Sell via P2P</p>
        </div>

        <span className="material-symbols-outlined text-lg text-black">
          arrow_forward_ios
        </span>
      </div>

      <div
        onClick={handleContinue}
        className="flex items-center cursor-pointer justify-between rounded-md bg-[#F7F7F7] hover:bg-neutral-200 transition-all p-3"
      >
        <div className="flex items-center gap-3">
          <Image src="/assets/png/bank.png" alt="bank" width={35} height={35} />
          <div>
            <p className="font-semibold text-sm leading-none">
              Direct withdrawal{" "}
              <span className="bg-primary text-white rounded-lg mb-3 text-[9px] p-1">
                New
              </span>
            </p>
            <p className="text-[#696F79] text-[9px] mt-1 w-52">
              Send NGNC to a designated address, and receive cash instantly
            </p>
          </div>
        </div>

        <span className="material-symbols-outlined text-lg text-black">
          arrow_forward_ios
        </span>
      </div>
    </main>
  );
};
