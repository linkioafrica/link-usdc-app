"use client";

import { CopyButton } from "@/components/CopyButton";
import { Navbar } from "@/components/Navbar";
import { useDirectContext } from "@/contexts/direct.context";
import { useQRCode } from "next-qrcode";

type props = {
  params: {
    id: string;
  };
};

export default function QrCode({ params }: props) {
  const { Canvas } = useQRCode();
  const { directData } = useDirectContext();

  const getData = directData?.wallets?.find(
    (item) => item?.network === params?.id
  );

  return (
    <>
      <Navbar
        route={`/sell/direct/accounts/${getData?.network}`}
        title={`Send ${directData?.asset}`}
      />
      <div className="space-y-10 mt-10">
        <div className="space-y-2">
          <p className="text-[#4E545F] text-sm capitalize">
            {getData?.network === "ethereum" ? "Polygon" : getData?.network}{" "}
            address
          </p>
          <div className="border-2 border-primary py-2 px-3 space-x-1 rounded-lg text-black flex items-center">
            <p className="break-all font-medium text-sm uppercase leading-none">
              {getData?.address}
            </p>
            <CopyButton value={String(getData?.address)} />
          </div>
        </div>

        <div className="mx-auto w-max mt-5">
          <Canvas
            text={String(getData?.address) || "0"}
            options={{
              margin: 2,
              scale: 10,
              width: 150,
            }}
          />
        </div>
      </div>
    </>
  );
}
