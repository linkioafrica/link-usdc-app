"use client";

import Image from "next/image";
import Link from "next/link";

type StatusProps = {
  title: string;
  desc: string;
  route: string;
};

export const StatusSuccess = ({ title, desc, route }: StatusProps) => {
  return (
    <section className="grid gap-y-10">
      <div className="flex items-center justify-center mt-10">
        <Image
          src="/assets/png/success.svg"
          width={150}
          height={150}
          alt="success"
        />
      </div>

      <div className="text-center space-y-5">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>

      <div className="my-10">
        <Link
          href={route || "/"}
          className="bg-primary text-base text-white flex items-center justify-center p-2 btn_position rounded-md"
        >
          Done
        </Link>
      </div>
    </section>
  );
};
