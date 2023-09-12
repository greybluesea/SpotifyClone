"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useSongUrl from "@/hooks/useSongUrl";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@supabase/auth-helpers-react";

import PlayerContent from "./PlayerContent";
import toast from "react-hot-toast";

const Player = () => {
  // const user = useUser();
  const player = usePlayer();
  const songUrl = useSongUrl(player.activeSong!);

  player.activeSong && !songUrl && toast.error("failed to fetch song url");
  if (!songUrl || !player.activeSong) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-BGCOLOR w-full py-2 px-4 h-[8dvh] ">
      <PlayerContent key={songUrl} song={player.activeSong} songUrl={songUrl} />
    </div>
  );
};

export default Player;
