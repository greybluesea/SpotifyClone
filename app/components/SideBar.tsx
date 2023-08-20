"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import RouteItem, { Route } from "./RouteItem";
import Library from "./Library";

type Props = {
  children: React.ReactNode;
};

const SideBar = ({ children }: Props) => {
  const pathname = usePathname();
  const routes: Route[] = useMemo(
    () => [
      {
        icon: AiFillHome,
        label: "Home",
        href: "/",
        active: pathname !== "/search",
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname]
  );

  return (
    <div className="flex h-full w-full">
      <aside className="hidden md:flex flex-col gap-y-2 w-[400px] p-2 ">
        <section
          id="Home and Search"
          className="bg-BGCOLOR-SECONDARY rounded-lg flex flex-col p-5 gap-y-4 font-semibold"
        >
          {routes.map((route) => (
            <RouteItem key={route.label} route={route} />
          ))}
        </section>
        <Library />
      </aside>

      {children}
    </div>
  );
};

export default SideBar;
