"use client";

import { createContext, useContext, useState } from "react";

type BuyContextType = {
  children: React.ReactNode;
};

type BuyProps = {
  wallet_address: string;
  stellar_memo: string;
  network: string;
  ven_bank_name?: string;
  ven_account_number?: string;
  ven_account_name?: string;
  ven_account_type?: string;
  ven_routing_number?: string;
  ven_iban?: string;
  ven_institution_number?: string;
  ven_sort_code?: string;
  ven_branch_code?: string;
  ven_swift_code?: string;
};

type BuyContextProp = {
  buyData: BuyProps;
  setBuyData: React.Dispatch<React.SetStateAction<BuyProps>>;
};

const BuyContext = createContext<BuyContextProp | null>(null);

export default function BuyContextProvider({ children }: BuyContextType) {
  const [buyData, setBuyData] = useState<BuyProps>({
    wallet_address: "",
    stellar_memo: "",
    network: "",
    ven_bank_name: "",
    ven_account_number: "",
    ven_account_name: "",
    ven_account_type: "",
    ven_routing_number: "",
    ven_iban: "",
    ven_institution_number: "",
    ven_sort_code: "",
    ven_branch_code: "",
    ven_swift_code: "",
  });

  return (
    <BuyContext.Provider value={{ buyData, setBuyData }}>
      {children}
    </BuyContext.Provider>
  );
}

export const useBuyContext = () => {
  const context = useContext(BuyContext);

  if (!context) {
    throw new Error(
      "useBuyContext must be used within a useBuyContextProvider"
    );
  }
  return context;
};
