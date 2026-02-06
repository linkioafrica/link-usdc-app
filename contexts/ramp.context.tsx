"use client";

import { createContext, useContext, useState } from "react";

type RampContextType = {
  children: React.ReactNode;
};

type RampProps = {
  send_asset: string;
  receive_asset: string;
  send_amount: number;
  receive_amount: number;
  rate: string;
  business_id: string;
  payment_type: string;
  business_tid: string;
  order_id: string;
  merchant_fee: number;
  reference?: string;
};

type RampContextProp = {
  rampData: RampProps;
  setRampData: React.Dispatch<React.SetStateAction<RampProps>>;
};

const RampContext = createContext<RampContextProp | null>(null);

export default function RampContextProvider({ children }: RampContextType) {
  const [rampData, setRampData] = useState<RampProps>({
    send_asset: "",
    receive_asset: "",
    send_amount: 0,
    receive_amount: 0,
    rate: "",
    business_id: "",
    business_tid: "",
    payment_type: "",
    order_id: "",
    merchant_fee: 0,
    reference: "",
  });

  return (
    <RampContext.Provider value={{ rampData, setRampData }}>
      {children}
    </RampContext.Provider>
  );
}

export const useRampContext = () => {
  const context = useContext(RampContext);

  if (!context) {
    throw new Error(
      "useRampContext must be used within a useRampContextProvider"
    );
  }
  return context;
};
