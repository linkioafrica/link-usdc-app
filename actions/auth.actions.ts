"use server";

import { auth, signIn, signOut } from "@/auth";
import { getUserByEmail, resend2FA, sendKYC } from "@/lib/user";
import { DEFAULT_LOGIC_REDIRECT } from "@/routes";
import { server } from "@/www";
import { AuthError } from "next-auth";

export const loginActions = async (email: string) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.data.email) {
    return { error: "Email does not exist!" };
  }

  return { message: existingUser?.message, email: existingUser?.data?.email };
};

export const logoutActions = async () => {
  await signOut();
};

export const kycActions = async ({
  id_type,
  id_number,
}: {
  id_type: string;
  id_number: string;
}) => {
  const session = await auth();

  const response = await sendKYC(
    id_type,
    id_number,
    session?.user?.id as string
  );

  return response;
};

export const validate2FACode = async (
  email: string,
  code: string,
  callbackUrl?: string | null
) => {
  if (!email) {
    return { error: "Email not found!" };
  }

  if (!code) {
    return { error: "Enter 2FA code!" };
  }

  try {
    await signIn("credentials", {
      email,
      code,
      redirectTo: callbackUrl || DEFAULT_LOGIC_REDIRECT,
    });
    return { success: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "CallbackRouteError":
          return { error: "Callback route error!" };

        default:
          if (error.name === "InvalidError") {
            return { error: "Invalid security code!" };
          }
          if (error.name === "ExpiredError") {
            return { error: "2FA code expired!" };
          }

          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};

export const resend2FACode = async (email: string) => {
  const code = await resend2FA(email);

  return code;
};

export const walletValidate = async ({
  chain,
  value,
}: {
  chain: string;
  value: string;
}) => {
  try {
    const request = await fetch(
      `https://api.checkcryptoaddress.com/wallet-checks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: value,
          network: chain,
        }),
      }
    );

    return await request.json();
  } catch (error: any) {
    return { message: error?.Error };
  }
};

export const accNumberValidate = async ({
  number,
  bankCode,
}: {
  number: string;
  bankCode: string;
}) => {
  const session = await auth();

  try {
    const request = await fetch(
      `${server}/account/verify-account-number?num=${number}&bank_code=${bankCode}`,
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
