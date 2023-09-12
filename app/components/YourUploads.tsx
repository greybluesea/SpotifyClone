"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import useUserContext from "@/hooks/useUserContext";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { BiSolidCloudUpload } from "react-icons/bi";
import { RiPlayListFill } from "react-icons/ri";
import { Song } from "../../types_incl_stripe";
import UploadItem from "./UploadItem";

type Props = {
  songs: Song[];
};

const YourUploads = ({ songs }: Props) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const userContext = useUserContext();
  /* const supabaseClient = useSupabaseClient();
  const [songs, setSongs] = useState([] as Song[]);

  const fetchSongsByUserId = async (id: string | undefined) => {
    if (typeof id === "undefined") return;
    const { data: songs, error } = await supabaseClient
      .from("songs")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
      return;
    }
    setSongs(songs);
    return;
  };

  useEffect(() => {
    userContext?.user ? fetchSongsByUserId(userContext.user.id) : setSongs([]);
  }, [userContext.user]); */

  const handleClick = () => {
    if (!userContext.user) {
      toast.success("please log in to add songs");
      authModal.openModal();
    } else uploadModal.openModal();
  };

  return (
    <section
      id="YourUploads"
      className="box-within-sidebar h-full overflow-y-auto "
    >
      <div
        id="header of YourUploads"
        className="flex items-center justify-between font-semibold  
           "
      >
        <div
          className={
            "flex items-center gap-x-4 " +
            (userContext?.user && " text-PRIMARY")
          }
        >
          <RiPlayListFill size={26} />
          <p>Your Uploads</p>
        </div>
        <BiSolidCloudUpload
          onClick={handleClick}
          size={34}
          className="
          hover-text-highlight
          "
        />
      </div>
      <div className="space-y-2">
        {/* {children}  */}
        {songs.map((song) => (
          <UploadItem key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
};

export default YourUploads;
