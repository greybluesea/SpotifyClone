import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import supabaseServerComponentClient from "./supabaseServerComponentClient";
import { Song } from "../../types_incl_stripe";

const getLikedSongs = async (): Promise<Song[]> => {
  const {
    data: { user },
  } = await supabaseServerComponentClient.auth.getUser();

  const { data: likes } = await supabaseServerComponentClient
    .from("liked_songs")
    .select("*, songs(*)")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (!likes) return [];
  // console.log(likes);

  return likes.map((like) => ({
    ...like.songs,
  }));
};

export default getLikedSongs;
