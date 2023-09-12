"use client";

import Image from "next/image";
import { Song } from "../../types_incl_stripe";
import useImageUrl from "@/hooks/useImageUrl";
import PlayButton from "./PlayButton";
import LikeButton from "./LikeButton";
import usePlayer from "@/hooks/usePlayer";

interface SongItemProps {
  song: Song;
  handleClick: (song: Song) => void;
}

const SongItem = ({ song, handleClick }: SongItemProps) => {
  const imageUrl = useImageUrl(song);
  const activeSong = usePlayer((state) => state.activeSong);

  return (
    <div
      onClick={() => handleClick(song)}
      className={
        " group rounded-md overflow-hidden bg-BGCOLOR-SECONDARY hover-bg-highlight p-3 " +
        (activeSong?.id === song.id && " bg-neutral-600")
      }
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
      <div className="flex justify-between space-x-2">
        <div className="py-4 space-y-1 truncate">
          <p className="font-semibold truncate">{song.title}</p>
          <p className="text-NEUTRAL text-sm w-full truncate">
            By {song.author}
          </p>
        </div>
        <LikeButton songId={song.id} />
      </div>
    </div>
  );
};

export default SongItem;
