"use server";

import { auth } from "@/auth";
import { server } from "@/www";
import { revalidateTag } from "next/cache";

interface DirectActionsProps {
  data: {
    bank_name: string;
    account_number: string;
    account_name: string;
    networks: [];
  };
}

export const createDirectAccountActions = async (data: DirectActionsProps) => {
  const session = await auth();

  try {
    const request = await fetch(`${server}/direct/create-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        customer_id: session?.user?.id,
      }),
    });

    revalidateTag("direct-account");
    return await request.json();
  } catch (error: any) {
    return { message: error?.Error };
  }
};

export const updateNetworkActions = async (networks: { name: string }[]) => {
  const session = await auth();

  try {
    const request = await fetch(`${server}/direct/add-network`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        networks: networks,
        customer_id: session?.user?.id,
      }),
    });

    return await request.json();
  } catch (error: any) {
    return { message: error?.Error };
  }
};

export const updateDirectAccountActions = async (
  bank_name?: string,
  account_number?: string,
  account_name?: string
) => {
  const session = await auth();

  try {
    const request = await fetch(`${server}/direct/update-account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_name: account_name,
        account_number: account_number,
        bank_name: bank_name,
        customer_id: session?.user?.id,
      }),
    });

    return await request.json();
  } catch (error: any) {
    return { message: error?.Error };
  }
};

export const getDirectAccountActions = async () => {
  const session = await auth();

  try {
    const request = await fetch(
      `${server}/direct/get-account/${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["direct-account"],
        },
      }
    );

    return await request.json();
  } catch (error: any) {
    return { message: error?.Error };
  }
};

export const getDirectTranasctionsActions = async () => {
  const session = await auth();

  try {
    const request = await fetch(
      `${server}/direct/get-transactions/${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return await request.json();
  } catch (error: any) {
    return { message: error?.Error };
  }
};
