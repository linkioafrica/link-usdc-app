"use client";

import { getDirectTranasctionsActions } from "@/actions/direct";
import { createContext, useContext, useLayoutEffect, useState } from "react";

type DTContextType = {
  children: React.ReactNode;
};

type DTProps = {
  asset: string;
  amount: number;
  transaction_status: string;
}[];

type DTContextProp = {
  transactions: DTProps;
  setTransactions: React.Dispatch<React.SetStateAction<DTProps>>;
};

const DTContext = createContext<DTContextProp | null>(null);

export default function DTContextProvider({ children }: DTContextType) {
  const [transactions, setTransactions] = useState<DTProps>([]);

  const handleTransactions = async () => {
    const response = await getDirectTranasctionsActions();
    return setTransactions(response.data);
  };

  useLayoutEffect(() => {
    handleTransactions();
  }, []);
  return (
    <DTContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </DTContext.Provider>
  );
}

export const useDTContext = () => {
  const context = useContext(DTContext);

  if (!context) {
    throw new Error("useDTContext must be used within a useDTContextProvider");
  }
  return context;
};
