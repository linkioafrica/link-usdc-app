import { Navbar } from "@/components/Navbar";
import { ReceiverMain } from "../_components/receiverMain";

export default async function Receiver() {
  return (
    <main>
      <Navbar route="/sell" title="Receiver’s Account" />
      <ReceiverMain />
    </main>
  );
}
