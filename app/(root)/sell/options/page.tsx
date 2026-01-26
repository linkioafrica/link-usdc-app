import { auth } from "@/auth";
import { SellOption } from "../_components/direct/Option";

export default async function page() {
  const session = await auth();

  return <SellOption hasDW={session?.user?.hasDW as boolean} />;
}
