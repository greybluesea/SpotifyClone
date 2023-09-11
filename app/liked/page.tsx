import getLikedSongs from "@/actions/getLikedSongs";
import PageContent from "@/components/PageContent";
import React from "react";

const LikedSongsPage = async () => {
  const songs = await getLikedSongs();
  return (
    <div className="p-6">
      <PageContent songs={songs} />
    </div>
  );
};

export default LikedSongsPage;