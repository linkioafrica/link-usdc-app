import { IDMain } from "@/app/(root)/buy/_components/idMain";
import { Navbar } from "@/components/Navbar";
import { auth } from "@/auth";

export default async function Identification() {
  const session = await auth();

  return (
    <main>
      <Navbar title="Identification" />
      <div className="bg-p-light p-2 rounded-md flex">
        <span className="material-icons-round block text-primary">info</span>
        <p className="text-primary text-[9px]">
          Ensure the identification details provided below are accurate.
        </p>
      </div>

      <IDMain
        route="/sell/direct/create/add-account"
        hasKyc={session?.user?.hasKyc ?? false}
        verified={session?.user?.verified ?? false}
        customerId={session?.user?.customerId}
        userName={session?.user?.name ?? undefined}
      />
    </main>
  );
}
