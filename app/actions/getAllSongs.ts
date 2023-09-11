import { Song } from "../../types_incl_stripe";
import supabaseServerComponentClient from "./supabaseServerComponentClient";

const getAllSongs = async (): Promise<Song[]> => {
  const { data, error } = await supabaseServerComponentClient
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }
  // console.log(data);

  return (data as Song[]) || [];
};

export default getAllSongs;
