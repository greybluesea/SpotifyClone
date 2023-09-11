"use client";

import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

import useAuthModal from "@/hooks/useAuthModal";
import { IconType } from "react-icons";

interface LikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const authModal = useAuthModal();
  const user = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user) return setIsLiked(false);

    const fetchLikeData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();

      //  if (error) toast.error(error.message);
      if (!error && data) setIsLiked(true);
    };

    fetchLikeData();
  }, [songId, user]);

  const Icon: IconType = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleClick = async () => {
    if (!user) {
      toast.success("please sign in to like songs");
      return authModal.openModal();
    }

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
        toast.success("Unliked");
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked");
      }
    }

    router.refresh();
  };

  return (
    <button className="hover-opaque" onClick={handleClick}>
      <Icon color={isLiked ? "red" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
