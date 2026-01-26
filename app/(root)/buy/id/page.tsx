import { Navbar } from "@/components/Navbar";
import { IDMain } from "../_components/idMain";

export default async function Identification() {
  return (
    <main>
      <Navbar route="/buy/confirm" title="Identification" />
      <div className="bg-p-light p-2 rounded-md flex">
        <span className="material-icons-round block text-primary">info</span>
        <p className="text-primary text-[9px]">
          Ensure the identification details provided below are accurate.
        </p>
      </div>

      <IDMain />
    </main>
  );
}
