"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AiFillHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import RouteItem, { Route } from "./RouteItem";
import YourUploads from "./YourUploads";

/* type Props = {
  children: React.ReactNode;
}; */

const SideBar = (/* { children }: Props */) => {
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
    <aside className="hidden md:flex flex-col gap-y-2 w-[560px] p-2 pr-0 text-NEUTRAL font-semibold">
      <section id="Home and Search" className="box-within-sidebar">
        {routes.map((route) => (
          <RouteItem key={route.label} route={route} />
        ))}
      </section>
      <YourUploads />
    </aside>
  );
};

export default SideBar;
