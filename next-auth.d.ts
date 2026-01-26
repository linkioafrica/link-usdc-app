import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  hasKyc: boolean;
  hasDW: boolean;
  customerId?: string;
  verified?: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
