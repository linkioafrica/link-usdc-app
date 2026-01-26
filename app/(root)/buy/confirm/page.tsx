import { Navbar } from "@/components/Navbar";
import { ConfirmForm } from "../_components/confirmMain";
import { auth } from "@/auth";

export default async function Confirm() {
  const session = await auth();

  return (
    <main>
      <Navbar route="/buy" title="Confirm" />
      <div className="bg-p-light p-2 rounded-md flex space-x-1">
        <span className="material-icons-round block text-primary">info</span>
        <p className="text-primary text-[9px]">
          Before you confirm make sure the AMOUNT and WALLET ADDRESS are
          correct. Any errors will result in loss of funds!
        </p>
      </div>

      <ConfirmForm hasKYC={session?.user?.hasKyc as boolean} />
    </main>
  );
}
