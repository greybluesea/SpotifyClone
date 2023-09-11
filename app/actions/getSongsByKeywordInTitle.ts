import getSongs from "./getSongs";
import { Song } from "../../types_incl_stripe";
import supabaseServerComponentClient from "./supabaseServerComponentClient";

const getSongsByKeywordInTitle = async (keyword: string): Promise<Song[]> => {
  if (!keyword) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { data, error } = await supabaseServerComponentClient
    .from("songs")
    .select("*")
    .ilike("title", `%${keyword}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as Song[]) || [];
};

export default getSongsByKeywordInTitle;
