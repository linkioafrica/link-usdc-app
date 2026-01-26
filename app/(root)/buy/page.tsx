import { Navbar } from "@/components/Navbar";
import { BuyMain } from "./_components/buyMain";
import { auth } from "@/auth";

export default async function Buy() {
  const session = await auth();

  return (
    <main>
      <Navbar />
      <BuyMain session_email={session?.user?.email as string} />
    </main>
  );
}
