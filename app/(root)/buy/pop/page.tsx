import { Navbar } from "@/components/Navbar";
import { POPMain } from "../_components/popMain";

export default async function ProofOfPayment() {
  return (
    <main>
      <Navbar route="/buy/payment" title="Proof of Payment" />
      <div className="bg-p-light p-2 rounded-md flex space-x-1">
        <span className="material-icons-round block text-primary">info</span>
        <p className="text-primary text-[9px]">
          Ensure the Account details provided below match the details used to
          make Payment or initiate deposit request.
        </p>
      </div>

      <POPMain />
    </main>
  );
}
