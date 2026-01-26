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
  buyRates: RatesProps;
  setBuyRates: React.Dispatch<React.SetStateAction<RatesProps>>;
};

const BuyRatesContext = createContext<RatesContextProp | null>(null);

export default function BuyRatesContextProvider({
  children,
}: RatesContextType) {
  const [buyRates, setBuyRates] = useState<RatesProps>([]);

  const handleGetRates = async () => {
    try {
      const request = await fetch(
        "https://api.linkio.world/live/ramp/buy-rate"
      );
      const response = await request.json();
      let format = await currencyRates(response?.rates);
      setBuyRates(format);

      return response;
    } catch (error) {
      return;
    }
  };

  useLayoutEffect(() => {
    handleGetRates();
  }, []);
  return (
    <BuyRatesContext.Provider value={{ buyRates, setBuyRates }}>
      {children}
    </BuyRatesContext.Provider>
  );
}

export const useBuyRatesContext = () => {
  const context = useContext(BuyRatesContext);

  if (!context) {
    throw new Error(
      "useBuyRatesContext must be used within a useBuyRatesContextProvider"
    );
  }
  return context;
};
