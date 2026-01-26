import { StatusSuccess } from "@/components/Status";

export default function Success() {
  return (
    <StatusSuccess
      title="Sell Request Received"
      desc=" Once your asset has been received, a vendor will send the quivalent amount to the bank account provided."
      route="/sell"
    />
  );
}
