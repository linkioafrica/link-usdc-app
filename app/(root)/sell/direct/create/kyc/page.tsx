import { IDMain } from "@/app/(root)/buy/_components/idMain";
import { Navbar } from "@/components/Navbar";

export default async function Identification() {
  return (
    <main>
      <Navbar title="Identification" />
      <div className="bg-p-light p-2 rounded-md flex">
        <span className="material-icons-round block text-primary">info</span>
        <p className="text-primary text-[9px]">
          Ensure the identification details provided below are accurate.
        </p>
      </div>

      <IDMain route="/sell/direct/create/add-account" />
    </main>
  );
}
