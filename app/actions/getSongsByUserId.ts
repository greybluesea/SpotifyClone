import { Song } from "../../types_incl_stripe";
import supabaseServerComponentClient from "./supabaseServerComponentClient";

const getSongsByUserId = async (): Promise<Song[]> => {
  const { data: sessionData, error: sessionError } =
    await supabaseServerComponentClient.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabaseServerComponentClient
    .from("songs")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  return (data as Song[]) || [];
};

export default getSongsByUserId;
