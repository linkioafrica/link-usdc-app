import { StatusSuccess } from "@/components/Status";

type Props = {
  params: {
    id: string;
  };
};

export default function Success({ params }: Props) {
  if (params.id === "create")
    return (
      <StatusSuccess
        title="Success!"
        desc="Your account is ready. Tap “Continue” to make your first deposit"
        route="/sell/direct/accounts"
      />
    );
}
