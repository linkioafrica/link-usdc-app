"use client";

import { currencyRates } from "@/lib/utils";
import { createContext, useContext, useLayoutEffect, useState } from "react";

type RatesContextType = {
  children: React.ReactNode;
};

type RatesProps = {
  currency: string;
  rates: [];
}[];

type RatesContextProp = {
  sellRates: RatesProps;
  setSellRates: React.Dispatch<React.SetStateAction<RatesProps>>;
};

const SellRatesContext = createContext<RatesContextProp | null>(null);

export default function SellRatesContextProvider({
  children,
}: RatesContextType) {
  const [sellRates, setSellRates] = useState<RatesProps>([]);

  const handleGetRates = async () => {
    try {
      const request = await fetch(
        "https://api.linkio.world/live/ramp/sell-rate"
      );
      const response = await request.json();
      let format = await currencyRates(response?.rates);
      setSellRates(format);

      return response;
    } catch (error) {
      return;
    }
  };

  useLayoutEffect(() => {
    handleGetRates();
  }, []);
  return (
    <SellRatesContext.Provider value={{ sellRates, setSellRates }}>
      {children}
    </SellRatesContext.Provider>
  );
}

export const useSellRatesContext = () => {
  const context = useContext(SellRatesContext);

  if (!context) {
    throw new Error(
      "useSellRatesContext must be used within a useSellRatesContextProvider"
    );
  }
  return context;
};
