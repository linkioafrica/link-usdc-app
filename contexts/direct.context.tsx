"use client";

import { getDirectAccountActions } from "@/actions/direct";
import { createContext, useContext, useLayoutEffect, useState } from "react";

type DirectContextType = {
  children: React.ReactNode;
};

type DirectProps = {
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

type DirectContextProp = {
  directData: DirectProps;
  setDirectData: React.Dispatch<React.SetStateAction<DirectProps>>;
};

const DirectContext = createContext<DirectContextProp | null>(null);

export default function DirectContextProvider({ children }: DirectContextType) {
  const [directData, setDirectData] = useState<DirectProps>({
    asset: "",
    bank_name: "",
    account_number: "",
    account_name: "",
    wallets: [],
    walletPhrase: "",
  });

  const handleGetRates = async () => {
    const response = await getDirectAccountActions();

    if (response?.status === 200) return setDirectData(response?.data);
  };

  useLayoutEffect(() => {
    handleGetRates();
  }, []);

  return (
    <DirectContext.Provider value={{ directData, setDirectData }}>
      {children}
    </DirectContext.Provider>
  );
}

export const useDirectContext = () => {
  const context = useContext(DirectContext);

  if (!context) {
    throw new Error(
      "useDirectContext must be used within a useDirectContextProvider"
    );
  }
  return context;
};
