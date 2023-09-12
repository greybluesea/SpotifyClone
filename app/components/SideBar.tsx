"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { AiFillHome, AiOutlineHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import RouteItem, { Route } from "./RouteItem";
import YourUploads from "./YourUploads";
import { Song } from "../../types_incl_stripe";
import usePlayer from "@/hooks/usePlayer";
import useSongUrl from "@/hooks/useSongUrl";

type Props = {
  songs: Song[];
};

const SideBar = ({ songs }: Props) => {
  const pathname = usePathname();
  const activeSong = usePlayer((state) => state.activeSong);
  const songUrl = useSongUrl(activeSong!);

  const routes: Route[] = useMemo(
    () => [
      {
        icon: AiFillHome,
        label: "Home",
        href: "/",
        active:
          pathname.indexOf("search") === -1 &&
          pathname.indexOf("likedsongs") === -1 &&
          pathname.indexOf("youruploads") === -1,
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname.indexOf("search") !== -1,
      },
      {
        icon: AiOutlineHeart,
        label: "Liked Songs",
        href: "/likedsongs",
        active: pathname.indexOf("likedsongs") !== -1,
      },
    ],
    [pathname]
  );

  return (
    <aside
      className={
        "hidden sticky top-0 left-0 md:flex flex-col gap-y-2 w-[560px] p-2 pr-0 text-NEUTRAL font-semibold h-[100dvh] " +
        (activeSong && !!songUrl && " h-[92dvh]")
      }
    >
      <section id="Home and Search" className="box-within-sidebar">
        {routes.map((route) => (
          <RouteItem key={route.label} route={route} />
        ))}
      </section>
      <YourUploads songs={songs} />
    </aside>
  );
};

export default SideBar;
