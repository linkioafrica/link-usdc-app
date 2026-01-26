import { getDirectAccountActions } from "@/actions/direct";
import { Navbar } from "@/components/Navbar";
import { DirectAccounts } from "../../_components/direct/Accounts";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  const response = await getDirectAccountActions();

  if (!session?.user?.hasDW) {
    return redirect("/sell/direct/create");
  }

  return (
    <main>
      <Navbar route="/sell/options" title="Your Accounts" />

      <DirectAccounts data={response?.data} />
    </main>
  );
}
