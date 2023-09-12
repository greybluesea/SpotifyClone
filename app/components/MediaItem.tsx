"use client";

import Image from "next/image";

import useImageUrl from "@/hooks/useImageUrl";
import { Song } from "../../types_incl_stripe";
import LikeButton from "./LikeButton";

const MediaItem = ({ song }: { song: Song }) => {
  const imageUrl = useImageUrl(song);
  return (
    <div
      className="
        flex 
        w-full 
        p-2 py-1
        group 
        rounded-md 
      "
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
            alt="MediaItem"
            className="object-cover"
          />
        </div>

        <div className="space-y-1 text-left">
          <p className="text-PRIMARY truncate">{song.title}</p>
          <p className="text-NEUTRAL text-sm truncate">By {song.author}</p>
        </div>
      </div>

      {/* <LikeButton songId={song.id} /> */}
    </div>
  );
};

export default MediaItem;
