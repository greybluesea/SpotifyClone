import { Song } from "../../types_incl_stripe";
import supabaseServerComponentClient from "./supabaseServerComponentClient";

const getSongById = async (id: string): Promise<Song> => {
  const { data, error } = await supabaseServerComponentClient
    .from("songs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || ([] as Song[]);
};

export default getSongById;
