"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

type SideBarProps = {
  children: React.ReactNode;
};

const SideBar = ({ children }: SideBarProps) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: AiFillHome,
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname !== "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  return (
    <aside>
      <section className="hidden md:flex flex-col gap-y-2 w-[300px] p-2"></section>

      {children}
    </aside>
  );
};

export default SideBar;
