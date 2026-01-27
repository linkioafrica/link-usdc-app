import { Navbar } from "@/components/Navbar";
import { IDMain } from "../_components/idMain";

export default async function Identification({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string; [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  // Extract returnTo and preserve all other original params
  const { returnTo, ...originalParams } = params;
  const queryString = new URLSearchParams(
    originalParams as Record<string, string>
  ).toString();

  // Determine redirect route after KYC completion
  const redirectRoute =
    returnTo === "sell"
      ? queryString
        ? `/sell?${queryString}`
        : "/sell"
      : queryString
        ? `/buy?${queryString}`
        : "/buy";

  return (
    <main>
      <Navbar route="/menu" title="Identification" />
      <div className="bg-p-light p-2 rounded-md flex">
        <span className="material-icons-round block text-primary">info</span>
        <p className="text-primary text-[9px]">
          Ensure the identification details provided below are accurate.
        </p>
      </div>

      <IDMain route={redirectRoute} />
    </main>
  );
}
