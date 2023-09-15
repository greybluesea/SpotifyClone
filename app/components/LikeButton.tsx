"use client";

import { useEffect, useMemo, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import useAuthModal from "@/hooks/useAuthModal";
import { IconType } from "react-icons";
import usePlayer from "@/hooks/usePlayer";

interface LikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const authModal = useAuthModal();
  const user = useUser();
  const [isLiked, setIsLiked] = useState(false);
  const activeSong = usePlayer((state) => state.activeSong);
  const currentSongIsLiked = usePlayer((state) => state.currentSongIsLiked);
  const setCurrentSongIsLiked = usePlayer(
    (state) => state.setCurrentSongIsLiked
  );
  const [isCurrentSong, setIsCurrentSong] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsLiked(false);
      setIsCurrentSong(false);
      return;
    }

    activeSong && setIsCurrentSong(songId === activeSong.id);

    const fetchLikeData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      //  if (error) toast.error(error.message);
      if (!error && data)
        isCurrentSong ? setCurrentSongIsLiked(true) : setIsLiked(true);
    };

    fetchLikeData();
  }, [songId, user, activeSong]);

  const Icon: IconType = isCurrentSong
    ? currentSongIsLiked
      ? AiFillHeart
      : AiOutlineHeart
    : isLiked
    ? AiFillHeart
    : AiOutlineHeart;

  /*   const IconDecider = isCurrentSong ? currentSongIsLiked : isLiked;

  const Icon: IconType = IconDecider ? AiFillHeart : AiOutlineHeart; */

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!user) {
      toast.success("please sign in to like songs");
      return authModal.openModal();
    }

    if (isCurrentSong ? currentSongIsLiked : isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        isCurrentSong ? setCurrentSongIsLiked(false) : setIsLiked(false);
        toast.success("unliked");
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        isCurrentSong ? setCurrentSongIsLiked(true) : setIsLiked(true);
        toast.success("liked");
      }
    }

    router.refresh();
  };

  return (
    <button className="hover-opaque" onClick={handleClick}>
      {isCurrentSong ? (
        <Icon color={currentSongIsLiked ? "red" : "white"} size={25} />
      ) : (
        <Icon color={isLiked ? "red" : "white"} size={25} />
      )}
    </button>
  );
};

export default LikeButton;
