"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useSongUrl from "@/hooks/useSongUrl";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@supabase/auth-helpers-react";

/* import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";

import PlayerContent from "./PlayerContent"; */

const Player = () => {
  // const user = useUser();
  const player = usePlayer();
  if (!player.activeId) return null;
  const { song } = useGetSongById(player.activeId);

  const songUrl = useSongUrl(song!);

  if (!song || !songUrl) {
    return null;
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-BGCOLOR w-full py-2 px-4 h-[8dvh] ">
      {/*  <PlayerContent key={songUrl} song={song} songUrl={songUrl} /> */}
    </div>
  );
};

export default Player;
