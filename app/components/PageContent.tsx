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
    <main
      className="
        w-full
        h-full
        grid 
        grid-cols-auto
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
    </main>
  );
};

export default PageContent;
