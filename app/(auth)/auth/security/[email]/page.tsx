import { Navbar } from "@/components/Navbar";
import { VerifCode } from "../_component/verifCode";

type Props = {
  params: {
    email: string;
  };
};

export default async function Verification({ params }: Props) {
  return (
    <main>
      <Navbar route="/auth/login" title="Verification code" />

      <p className="text-xs pt-5 mb-3">
        To continue, enter the 6-digit verification code sent to your Email
      </p>

      <VerifCode email={params.email} />
    </main>
  );
}
