import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "../../types_incl_stripe";

const useImageUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song.image_path);

  console.log(song.image_path);
  console.log(imageData.publicUrl);

  return imageData.publicUrl;
};

export default useImageUrl;
