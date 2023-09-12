"use client";

import Image from "next/image";

/* import usePlayer from "@/hooks/usePlayer"; */
import { Song } from "../../types_incl_stripe";
import useImageUrl from "@/hooks/useImageUrl";
import PlayButton from "./PlayButton";
import { useMemo } from "react";
import LikeButton from "./LikeButton";
import usePlayer from "@/hooks/usePlayer";

interface UploadItemProps {
  song: Song;
  handleClick: (song: Song) => void;
}

const UploadItem = ({ song, handleClick }: UploadItemProps) => {
  // const player = usePlayer();
  const imageUrl = useImageUrl(song);
  const activeSong = usePlayer((state) => state.activeSong);

  /*   const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  
    return player.setId(data.id);
  }; */

  return (
    <div
      onClick={() => handleClick(song)}
      className={
        "flex cursor-pointer transition duration-200 hover:bg-BGCOLOR-SECONDARY w-full p-2 group rounded-md " +
        (activeSong?.id === song.id && " bg-BGCOLOR-HIGHLIGHT")
      }
    >
      <div
        className="flex  
        items-center 
        gap-x-3 
        w-full
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
      </div>

      {/*  <LikeButton songId={song.id} /> */}
    </div>
  );
};

export default UploadItem;
