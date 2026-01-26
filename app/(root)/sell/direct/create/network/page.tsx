"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState, useTransition } from "react";

import { Navbar } from "@/components/Navbar";
import {
  createDirectAccountActions,
  updateNetworkActions,
} from "@/actions/direct";
import { FormError } from "@/components/FormStatus";
import { useDirectContext } from "@/contexts/direct.context";

export default function Network() {
  const [networks, setNetworks] = useState<string[]>([]);
  const [error, setError] = useState<string | undefined>("");

  const { directData } = useDirectContext();
  const [isPending, startTransition] = useTransition();
  const navigate = useRouter();

  // const availableNetworks = networkList.filter((network) => {
  //   return directData?.wallets.some(
  //     (wallet) => wallet.network !== network.chain
  //   );
  // });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (error) {
        setError("");
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [error]);

  const handleSubmit = async () => {
    const arrangNetworks = networks.map((network) => {
      return { name: network };
    });

    if (directData?.wallets.length > 0) {
      return startTransition(async () => {
        const response = await updateNetworkActions(arrangNetworks);

        if (response.status === 201) {
          localStorage.removeItem("direct-account-details");
          return navigate.push("/sell/direct/status/create/success");
        }

        return setError(response?.error);
      });
    }

    startTransition(async () => {
      let response = await createDirectAccountActions({
        networks: arrangNetworks,
        ...JSON.parse(localStorage.getItem("direct-account-details") as string),
      });

      if (response.status === 201) {
        localStorage.removeItem("direct-account-details");
        return navigate.push("/sell/direct/status/create/success");
      }

      return setError(response?.error);
    });
  };

  return (
    <main>
      <Navbar route="/sell/direct/add-account" title="Select network" />
      <div className="bg-p-light p-2 rounded-md flex items-center space-x-1">
        <span className="material-icons-round block text-primary">info</span>
        <p className="text-primary text-xs">
          You can select one or multiple networks.
        </p>
      </div>
      <FormError message={error} />

      <section className="grid my-5">
        <ToggleGroup
          value={networks}
          onValueChange={(value: string[]) => {
            if (value) setNetworks(value);
          }}
          type="multiple"
          className="w-full block space-y-6 transition-all"
        >
          {networkList?.map((network, index) => (
            <ToggleGroupItem
              key={index}
              value={network.chain}
              className={`w-full block p-0`}
            >
              <div className="flex items-center justify-between rounded-md focus:bg-red-400 bg-[#F7F7F7] px-5 py-3">
                <div className="flex items-center gap-2">
                  <Image
                    src={network.image}
                    alt={network.name}
                    width={28}
                    height={28}
                  />
                  <p className="font-medium text-sm">{network.name}</p>
                </div>

                <span
                  className={`${networks.includes(network.chain) && "text-primary"} material-symbols-outlined text-lg text-[#DADADA]`}
                >
                  radio_button_checked
                </span>
              </div>
            </ToggleGroupItem>
          ))}

          <ToggleGroupItem
            aria-label="Toggle solana"
            value="solana"
            className="w-full block p-0 disabled:opacity-100"
            disabled
          >
            <div className="flex items-center justify-between rounded-md bg-[#F7F7F7] px-5 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/png/networks/solana.png"
                  alt="solana"
                  width={28}
                  height={28}
                />
                <p className="font-medium text-sm">
                  <span>Solana</span>
                  <span className="bg-p-light text-primary rounded-lg ml-1 text-[9px] p-1">
                    Coming soon
                  </span>
                </p>
              </div>

              <span
                className={`${networks.includes("solana") && "text-primary"} material-symbols-outlined text-lg text-[#DADADA]`}
              >
                radio_button_checked
              </span>
            </div>
          </ToggleGroupItem>

          <ToggleGroupItem
            aria-label="Toggle stellar"
            value="stellar"
            className="w-full block p-0 disabled:opacity-100"
            disabled
          >
            <div className="flex items-center justify-between  rounded-md bg-[#F7F7F7] px-5 py-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/assets/png/networks/stellar.png"
                  alt="stellar"
                  width={28}
                  height={28}
                />
                <p className="font-medium text-sm">
                  <span>Stellar</span>
                  <span className="bg-p-light text-primary rounded-lg ml-1 text-[9px] p-1">
                    Coming soon
                  </span>
                </p>
              </div>

              <span
                className={`${networks.includes("stellar") && "text-primary"} material-symbols-outlined text-lg text-[#DADADA]`}
              >
                radio_button_checked
              </span>
            </div>
          </ToggleGroupItem>
        </ToggleGroup>
      </section>

      <button
        type="button"
        disabled={isPending || networks.length === 0}
        onClick={handleSubmit}
        className={`bg-primary text-base text-white flex items-center justify-center p-2 btn_position rounded-md`}
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
          "Complete"
        )}
      </button>
    </main>
  );
}

let networkList = [
  {
    name: "Polygon",
    chain: "ethereum",
    image: "/assets/png/networks/polygon.png",
  },
  // {
  //   name: "Solana",
  //   chain: "solana",
  //   image: "/assets/png/networks/solana.png",
  // },
  // {
  //   name: "Stellar",
  //   chain: "stellar",
  //   image: "/assets/png/networks/stellar.png",
  // },
];
