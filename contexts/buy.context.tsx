"use client";

import { createContext, useContext, useState } from "react";

type BuyContextType = {
  children: React.ReactNode;
};

type BuyProps = {
  // User crypto destination
  wallet_address: string;
  stellar_memo: string;
  network: string;

  // Quote info
  quote_id: string;
  ticket_id?: string;

  // Sender identifier (user-provided bank account or phone number)
  payment_method: string;
  sender_identifier: string;

  // Vendor payout details (from backend response)
  agent?: string;
  vendor_details?: string;
  expires_at?: string;

  // URL params (from external integrations)
  transaction_type?: string;
  asset_code?: string;
  transaction_id?: string;

  // SEP-24 params (from URL, persisted in context)
  token?: string;
  user_wallet?: string; // Pre-filled wallet from URL
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
    quote_id: "",
    ticket_id: "",
    payment_method: "",
    sender_identifier: "",
    agent: "",
    vendor_details: "",
    expires_at: "",
    transaction_type: "",
    asset_code: "",
    transaction_id: "",
    token: "",
    user_wallet: "",
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
