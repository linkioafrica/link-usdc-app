import { StatusSuccess } from "@/components/Status";

export default function Success() {
  return (
    <StatusSuccess
      title="Buy Request Received"
      desc=" Your wallet will be funded, once the payment has been confirmed."
      route="/buy"
    />
  );
}
