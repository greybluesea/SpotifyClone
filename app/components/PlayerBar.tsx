"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useSongUrl from "@/hooks/useSongUrl";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@supabase/auth-helpers-react";

import CurrentSongInPlayer from "./CurrentSongInPlayer";
import toast from "react-hot-toast";

const PlayerBar = () => {
  /*  const user = useUser(); */
  const activeSong = usePlayer((state) => state.activeSong);
  const songUrl = useSongUrl(activeSong);

  !activeSong
    ? console.log("activeSong empty")
    : !songUrl && toast.error("failed to fetch song url");

  if (!activeSong || !songUrl) return null;

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-BGCOLOR w-full py-2 px-4 h-[8dvh] overflow-hidden">
      <CurrentSongInPlayer key={songUrl} song={activeSong} songUrl={songUrl} />
    </div>
  );
};

export default PlayerBar;
