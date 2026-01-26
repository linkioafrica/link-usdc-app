"use client";

import { useRouter } from "next/navigation";

export default function Direct() {
  const navigate = useRouter();

  return (
    <main className="space-y-6">
      <div
        onClick={() => navigate.push("/sell/options")}
        className="bg-p-light cursor-pointer w-10 h-10 text-primary flex items-center justify-center rounded-full p-1.5"
      >
        <span className="material-icons-round">arrow_back</span>
      </div>

      <div className="space-y-3 w-72">
        <div>
          <span className="material-symbols-outlined text-4xl text-primary">
            account_balance
          </span>
        </div>

        <h1 className="font-semibold text-lg">What are Direct withdrawals?</h1>
        <p className="text-[#696F79] text-xs">
          Send NGNC to a designated wallet address linked to your bank account
          and receive cash instantly.
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-sm">How to get started:</p>

        <div className="space-y-2">
          <div className="flex gap-1 items-center justify-start">
            <span className="material-symbols-outlined text-xl text-primary">
              account_balance
            </span>

            <p className="text-xs">Add your bank account details.</p>
          </div>
          <div className="flex gap-1 items-center justify-start">
            <span className="material-symbols-outlined text-xl text-primary">
              wallet
            </span>

            <p className="text-xs">
              You’ll get an address on your preferred network (we support
              <strong> Stellar, Solana,</strong> and <strong>Polygon</strong>)
            </p>
          </div>
          <div className="flex gap-1 items-center justify-start">
            <span className="material-symbols-outlined text-xl text-primary">
              bolt
            </span>

            <p className="text-xs">
              Send <strong>NGNC</strong> to the address and your bank account
              gets credited with cash, instantly!
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate.push("/sell/direct/create")}
        className={`bg-primary hover:bg-primary/95 transition-all text-base text-white flex items-center justify-center p-2 btn_position rounded-md`}
      >
        Get started
      </button>
    </main>
  );
}
