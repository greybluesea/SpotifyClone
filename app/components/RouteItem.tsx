import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

export type Route = {
  icon: IconType;
  label: string;
  active: boolean;
  href: string;
};

type Props = {
  route: Route;
};

const RouteItem = ({
  route: { icon: Icon, label, active = true, href },
}: Props) => {
  const user = useUser();
  if (!user && label === "Liked Songs") return null;

  return (
    <Link
      href={href}
      className={
        `
        flex 
        flex-row 
        items-center 
        gap-x-5 
        hover-text-highlight
        ` + (active && "text-HIGHLIGHT")
      }
    >
      <Icon size={26} />
      <p>{label}</p>
    </Link>
  );
};

export default RouteItem;
