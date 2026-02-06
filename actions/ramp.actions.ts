"use server";

import { auth } from "@/auth";
import { server } from "@/www";

interface BuyActionsProps {
  data: {
    send_asset: string;
    receive_asset: string;
    send_amount: number;
    receive_amount: number;
    rate: string;
    merchant_fee: number;
    wallet_address?: string;
    stellar_memo?: string;
    network?: string;
    ven_bank_name?: string;
    ven_account_number?: string;
    ven_account_name?: string;
    pop_bank_name?: string;
    pop_account_name?: string;
    pop_account_number?: string;
    reference?: string;
    pix_key?: string;
    interac?: string;
    business_id: string;
    payment_type: string;
    business_tid: string;
    order_id: string;
  };
}
interface SellActionsProps {
  data: {
    send_asset: string;
    receive_asset: string;
    send_amount: number;
    receive_amount: number;
    rate: string;
    merchant_fee: number;
    bank_name?: string;
    account_number?: string;
    account_name?: string;
    reference?: string;
    wallet_address?: string;
    network?: string;
    routing_number?: string;
    account_type?: string;
    full_name?: string;
    pix_key?: string;
    interac?: string;
    business_id?: string;
    payment_type?: string;
    business_tid?: string;
    order_id?: string;
  };
}

export const rampBuyActions = async ({ data }: BuyActionsProps) => {
  const session = await auth();

  try {
    const request = await fetch(`${server}/onchain/buy-ramp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        type: "buy",
        customer_id: session?.user?.id,
      }),
    });

    return await request.json();
  } catch (error: any) {
    return { message: error?.Error };
  }
};

export const rampSellActions = async ({ data }: SellActionsProps) => {
  const session = await auth();

  try {
    const request = await fetch(`${server}/onchain/sell-ramp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        type: "sell",
        customer_id: session?.user?.id,
      }),
    });

    return await request.json();
  } catch (error: any) {
    return { message: error?.Error };
  }
};
