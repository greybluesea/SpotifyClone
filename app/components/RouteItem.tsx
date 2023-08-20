import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

export type Route = {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
};

type Props = {
  route: Route;
};

const RouteItem = ({
  route: { icon: Icon, label, active = true, href },
}: Props) => {
  return (
    <Link
      href={href}
      className={
        `
        flex 
        flex-row 
        items-center 
        gap-x-5 
        cursor-pointer
        text-NEUTRAL hover-highlight
        ` + (active && "text-HIGHLIGHT")
      }
    >
      <Icon size={26} />
      <p>{label}</p>
    </Link>
  );
};

export default RouteItem;
