"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const CheckList = ({ hasKYC }: { hasKYC: boolean }) => {
  const [directAccountDetails, setDirectAccountDetails] = useState(null);

  const navigate = useRouter();

  useEffect(() => {
    if (localStorage.getItem("direct-account-details"))
      setDirectAccountDetails({
        ...JSON.parse(localStorage.getItem("direct-account-details") as string),
      });
  }, []);

  const handleContinue = () => {
    if (!hasKYC) return navigate.push("/sell/direct/create/kyc");
    if (directAccountDetails)
      return navigate.push("/sell/direct/create/network");

    return navigate.push("/sell/direct/create/add-account");
  };

  return (
    <section>
      <div className="grid gap-5 my-10">
        <div className="flex items-center rounded-md bg-[#F7F7F7] p-3 gap-2">
          <div className="w-7 h-7 p-2 border border=[#ECECEC] bg-white rounded-full flex items-center justify-center">
            {hasKYC && (
              <span className="material-symbols-outlined text-[#0F973D]">
                check
              </span>
            )}
          </div>
          <p className="font-medium text-sm">Verify your identity</p>
        </div>

        <div className="flex items-center rounded-md bg-[#F7F7F7] p-3 gap-2">
          <div className="w-7 h-7 p-2 border border=[#ECECEC] bg-white rounded-full flex items-center justify-center">
            {directAccountDetails && (
              <span className="material-symbols-outlined text-[#0F973D]">
                check
              </span>
            )}
          </div>
          <p className="font-medium text-sm">Add your bank account details</p>
        </div>

        <div className="flex items-center rounded-md bg-[#F7F7F7] p-3 gap-2">
          <div className="w-7 h-7 p-2 border border=[#ECECEC] bg-white rounded-full flex items-center justify-center">
            {/* <span className="material-symbols-outlined text-[#0F973D]">
              check
            </span> */}
          </div>
          <p className="font-medium text-sm">Generate address</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className={`bg-primary hover:bg-primary/95 transition-all text-base text-white flex items-center justify-center p-2 btn_position rounded-md`}
      >
        Complete setup
      </button>
    </section>
  );
};
