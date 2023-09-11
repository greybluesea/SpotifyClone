import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "../../types_incl_stripe";

const useSongById = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | null>(null);
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const usefetchSong = async () => {
      const { data: song, error } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setSong(song as Song);
      setIsLoading(false);
    };

    usefetchSong();
  }, [id]);

  return { isLoading, song };

  /* useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  ) */
};

export default useSongById;
