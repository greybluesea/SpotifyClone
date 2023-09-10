"use client";

import Image from "next/image";
import { Song } from "../../types_incl_stripe";
import useImageUrl from "@/hooks/useImageUrl";
import PlayButton from "./PlayButton";

/* interface SongItemProps {
  song: Song;
  onClick: (id: string) => void;
}
 */
const SongItem = ({ song }: { song: Song }) => {
  const imageUrl = useImageUrl(song);

  return (
    <div
      onClick={() => {}}
      className="
        group 
        rounded-md 
        overflow-hidden 
        bg-BGCOLOR-SECONDARY 
        cursor-pointer 
        hover:bg-BGCOLOR-HIGHLIGHT 
        transition 
        duration-200
        p-3
      "
    >
      <div
        className="
          relative
          w-full
          aspect-square
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imageUrl || "/images/music-placeholder.jpg"}
          fill
          alt="Image"
        />
        <div
          className="
          absolute 
          bottom-5
          right-5
        "
        >
          <PlayButton />
        </div>
      </div>
      <div className="py-4 space-y-1">
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p className="text-NEUTRAL text-sm w-full truncate">By {song.author}</p>
      </div>
    </div>
  );
};

export default SongItem;
