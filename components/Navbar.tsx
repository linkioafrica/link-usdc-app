"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// const menuItems = [
//   { name: "Buy Stables", href: "/buy" },
//   { name: "Sell Stables", href: "/sell/options" },
// ];

export const Navbar = ({
  route,
  title,
}: {
  route?: string;
  title?: string;
}) => {
  const path = usePathname();
  const navigate = useRouter();

  return (
    <nav className="relative flex items-center justify-between gap-5 mb-3">
      {path === "/buy" || path === "/sell/options" ? (
        // menuItems.map((item, index) => (
        //   <Link
        //     href={item?.href}
        //     key={index}
        //     className={`${
        //       path.indexOf(item.href) !== -1 ? "text-primary" : "text-gray-400"
        //     } block text-base font-medium`}
        //   >
        //     {item?.name}
        //   </Link>
        // ))
        <div className="flex items-center justify-between w-full">
          <Link
            href="/buy"
            className={`${
              path.indexOf("/buy") !== -1 ? "text-primary" : "text-gray-400"
            } block text-base font-medium`}
          >
            Buy Stables
          </Link>
          <Link
            href="/sell/options"
            className={`${
              path.indexOf("/sell") !== -1 ? "text-primary" : "text-gray-400"
            } block text-base font-medium`}
          >
            Sell Stables
          </Link>
        </div>
      ) : (
        <div
          onClick={() => {
            if (route) navigate.push(route);
            else navigate.back();
          }}
          className="bg-p-light cursor-pointer text-primary flex items-center justify-center rounded-full p-1.5"
        >
          <span className="material-icons-round">arrow_back</span>
        </div>
      )}

      {title && <p className="font-medium text-lg">{title}</p>}

      <Link
        href="/menu"
        className="bg-p-light text-primary flex items-center justify-center rounded-full p-1.5"
      >
        <span className="material-icons-round">menu</span>
      </Link>
    </nav>
  );
};

export const MenuNavbar = () => {
  const navigate = useRouter();
  return (
    <nav className="flex items-center justify-between mb-5">
      <p className="font-medium">Menu</p>

      <div
        onClick={() => navigate.back()}
        className="bg-p-light text-primary cursor-pointer flex items-center justify-center rounded-full p-1.5"
      >
        <span className="material-icons-round">close</span>
      </div>
    </nav>
  );
};
