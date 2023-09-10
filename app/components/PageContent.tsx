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
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
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
