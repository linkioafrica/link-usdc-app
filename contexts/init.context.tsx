"use client";

import { createContext, useContext, useState } from "react";

type InitContextType = {
  children: React.ReactNode;
};

type InitProps = {
  id: string;
  type: string;
  amount: number;
  buyFiat: string;
  buyCrypto: string;
  sellFiat: string;
  sellCrypto: string;
  network: string;
};

type InitContextProp = {
  initData: InitProps;
  setInitData: React.Dispatch<React.SetStateAction<InitProps>>;
};

const InitContext = createContext<InitContextProp | null>(null);

export default function InitContextProvider({ children }: InitContextType) {
  const [initData, setInitData] = useState<InitProps>({
    id: "",
    type: "",
    amount: 0,
    buyFiat: "",
    buyCrypto: "",
    sellFiat: "",
    sellCrypto: "",
    network: "",
  });

  return (
    <InitContext.Provider value={{ initData, setInitData }}>
      {children}
    </InitContext.Provider>
  );
}

export const useInitContext = () => {
  const context = useContext(InitContext);

  if (!context) {
    throw new Error(
      "useInitContext must be used within a useInitContextProvider"
    );
  }
  return context;
};
