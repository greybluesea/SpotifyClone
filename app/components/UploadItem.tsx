"use client";

import Image from "next/image";

/* import usePlayer from "@/hooks/usePlayer"; */
import { Song } from "../../types_incl_stripe";
import useImageUrl from "@/hooks/useImageUrl";
import PlayButton from "./PlayButton";
import { useMemo } from "react";

const UploadItem = ({ song }: { song: Song }) => {
  // const player = usePlayer();
  const imageUrl = useMemo(() => useImageUrl(song), [song]);

  /*   const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  
    return player.setId(data.id);
  }; */

  return (
    <button
      //   onClick={handleClick}
      className="
        flex 
        items-center 
        gap-x-3 
        hover:bg-BGCOLOR-SECONDARY 
        w-full 
        p-2 
        rounded-md
        group
      "
    >
      <div
        className="
          relative 
          rounded-md 
          h-[64px] 
          w-[64px] 
          overflow-hidden
        "
      >
        <Image
          fill
          src={imageUrl || "/images/music-placeholder.jpg"}
          alt="UploadItem"
          className="object-cover"
        />
        <div
          className="
          absolute 
          top-2
          left-2
        "
        >
          <PlayButton />
        </div>
      </div>
      <div className="space-y-1 text-left">
        <p className="text-PRIMARY truncate">{song.title}</p>
        <p className="text-NEUTRAL text-sm truncate">By {song.author}</p>
      </div>
    </button>
  );
};

export default UploadItem;
