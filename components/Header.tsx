import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="px-10 py-5 flex items-center">
      <Image
        src="/link-white.png"
        className="object-cover"
        alt="logo"
        width={125}
        height={125}
      />

      {/* {session?.user?.name ? (
        <Link href="/menu">
          <button
            type="submit"
            className="cursor-pointer bg-primary opacity-100 text-base text-white flex items-center justify-center py-2 px-5 rounded-lg"
          >
            Menu
          </button>
        </Link>
      ) : (
        <Link href="/auth/sign-in">
          <button
            type="submit"
            className="cursor-pointer bg-primary opacity-100 text-base text-white flex items-center justify-center py-2 px-5 rounded-lg"
          >
            Sign in
          </button>
        </Link>
      )} */}
    </header>
  );
};
