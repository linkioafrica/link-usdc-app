import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyRates = async (rates: any) => {
  let format = [
    {
      currency: "usdc_base",
      rates: rates,
    },
    {
      currency: "usdc_polygon",
      rates: rates,
    },
    {
      currency: "usdc_solana",
      rates: rates,
    },
    {
      currency: "usdc_stellar",
      rates: rates,
    },
    {
      currency: "usdc_ripple",
      rates: rates,
    },
    {
      currency: "usdt_polygon",
      rates: rates,
    },
    {
      currency: "usdt_solana",
      rates: rates,
    },
    {
      currency: "ngnc_base",
      rates: [
        {
          NGN: 1,
          USD: rates[0]?.NGNCUSD,
        },
      ],
    },
    {
      currency: "ngnc_polygon",
      rates: [
        {
          NGN: 1,
          USD: rates[0]?.NGNCUSD,
        },
      ],
    },
    {
      currency: "ngnc_solana",
      rates: [
        {
          NGN: 1,
          USD: rates[0]?.NGNCUSD,
        },
      ],
    },
  ];
  return format;
};
