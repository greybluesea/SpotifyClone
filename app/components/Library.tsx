"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import useUserContext from "@/hooks/useUserContext";
import React from "react";
import toast from "react-hot-toast";
import { HiPlus } from "react-icons/hi";
import { RiPlayListFill } from "react-icons/ri";

type Props = {};

const Library = (props: Props) => {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();
  const userContext = useUserContext();

  const handleClick = () => {
    if (!userContext.user) {
      toast.success("please log in to add songs");
      authModal.openModal();
    } else uploadModal.openModal();
  };

  return (
    <section
      id="Library"
      className="box-within-sidebar h-full overflow-y-auto "
    >
      <div
        id="header of library"
        className="flex items-center justify-between font-semibold  
           "
      >
        <div className="flex items-center gap-x-4 hover-text-highlight">
          <RiPlayListFill size={26} />
          <p>Your Library</p>
        </div>
        <HiPlus
          onClick={handleClick}
          size={24}
          className="
          hover-text-highlight
          "
        />
      </div>
      <div id="list of songs">List of Songs</div>
    </section>
  );
};

export default Library;
