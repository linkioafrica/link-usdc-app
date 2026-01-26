import { Navbar } from "@/components/Navbar";
import { CheckList } from "../../_components/direct/CheckList";
import { auth } from "@/auth";

export default async function create() {
  const session = await auth();

  return (
    <main>
      <Navbar route="/sell/direct" title="Create your account" />

      <CheckList hasKYC={session?.user?.hasKyc as boolean} />
    </main>
  );
}
