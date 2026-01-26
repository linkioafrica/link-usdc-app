import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByCode } from "./lib/user";

import { ExpiredError, InvalidError } from "@/types/next-auth";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", name: "email" },
        code: { label: "code", name: "code" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await getUserByCode(
          credentials?.email as string,
          credentials?.code as string
        );

        if (user?.type === "invalid") throw new InvalidError();

        if (user?.type === "expired") throw new ExpiredError();

        if (user?.type === "error") return null;

        const response = JSON.parse(user);

        return response.data;
      },
    }),
  ],
} satisfies NextAuthConfig;
