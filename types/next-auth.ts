import { AuthError } from "next-auth";

export class InvalidError extends AuthError {}
export class ExpiredError extends AuthError {}
