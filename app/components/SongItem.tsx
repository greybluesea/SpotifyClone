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
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
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
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{song.title}</p>
        <p
          className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          By {song.author}
        </p>
      </div>
      <div
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
