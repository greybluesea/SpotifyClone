"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import PlayButton from "./PlayButton";

/* import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
 */
export interface List {
  image?: string;
  name?: string;
  href?: string;
}

const ListItem = ({ image, name, href }: List) => {
  const router = useRouter();
  /* const authModal = useAuthModal();
  const { user } = useUser();
   */
  const onClick = () => {
    /*   if (!user) {
      return authModal.onOpen();
    } */
    //  router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className="
        relative 
        group 
        flex 
        items-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-BGCOLOR-SECONDARY 
        hover-bg-highlight
        
        pr-4
      "
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        {/*  <Image className="object-cover" src={image} fill alt="Image" /> */}
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute right-5">
        <PlayButton />
      </div>
    </button>
  );
};

export default ListItem;
