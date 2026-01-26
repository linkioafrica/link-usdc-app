import { Navbar } from "@/components/Navbar";
import { SellMain } from "./_components/SellMain";
import { auth } from "@/auth";

export default async function Sell() {
  const session = await auth();

  return (
    <main>
      <Navbar title="Sell stables" route="/sell/options" />
      <SellMain session_email={session?.user?.email as string} />
    </main>
  );
}
