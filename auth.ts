import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./lib/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.hasKyc = token.hasKyc as boolean;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.hasDW = token.hasDW as boolean;
        session.user.customerId = token.customerId as string;
        session.user.verified = token.verified as boolean;
        session.user.userIdNumber = token.userIdNumber as string;
        session.user.userIdType = token.userIdType as string;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return null;

      const existingAccount = await getUserById(token.sub);
      if (!existingAccount) return null;

      token.name = existingAccount?.data?.name;
      token.hasKyc = existingAccount?.data?.hasKYC;
      token.hasDW = existingAccount?.data?.hasDW;
      token.customerId = existingAccount?.data?.accure_customer_id;
      token.verified = existingAccount?.data?.accrue_verified;
      token.userIdNumber = existingAccount?.data?.id_number;
      token.userIdType = existingAccount?.data?.id_type;

      return token;
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});
