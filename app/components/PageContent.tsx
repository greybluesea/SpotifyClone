"use client";

import { Song } from "../../types_incl_stripe";
import SongItem from "./SongItem";
/* import useOnPlay from "@/hooks/useOnPlay";
import SongItem from "@/components/SongItem"; */

interface PageContentProps {
  songs: Song[];
}

const PageContent = ({ songs }: PageContentProps) => {
  /* const onPlay = useOnPlay(songs); */

  if (songs.length === 0) {
    return <div className=" text-NEUTRAL">No songs available.</div>;
  }

  return (
    <div
      className="
        w-full
        h-full
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-2 
        lg:grid-cols-3 
        xl:grid-cols-4 
        2xl:grid-cols-5
        3xl:grid-cols-6
        4xl:grid-cols-7 
        gap-1
        sm:gap-2
        md:gap-3
        lg:gap-4 
      "
    >
      {songs.map((song) => (
        <SongItem
          //  onClick={(id: string) => onPlay(id)}
          key={song.id}
          song={song}
        />
      ))}
    </div>
  );
};

export default PageContent;
