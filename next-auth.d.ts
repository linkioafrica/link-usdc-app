import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  hasKyc: boolean;
  hasDW: boolean;
  customerId?: string;
  verified?: boolean;
  userIdNumber?: string;
  userIdType?: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
