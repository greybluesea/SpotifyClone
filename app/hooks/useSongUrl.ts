import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "../../types_incl_stripe";

const useSongUrl = (song: Song | null | undefined) => {
  const supabaseClient = useSupabaseClient();

  if (!song || !song.song_path) {
    return "";
  }

  const { data: songData } = supabaseClient.storage
    .from("songs")
    .getPublicUrl(song.song_path);

  return songData.publicUrl;
};

export default useSongUrl;
