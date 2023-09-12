import getLikedSongs from "@/actions/getLikedSongs";
import PageContent from "@/components/PageContent";
import React from "react";

export const revalidate = 0;

const LikedSongsPage = async () => {
  const songs = await getLikedSongs();
  return (
    <main className="p-6 py-4 space-y-6">
      <p className="text-3xl">Liked songs</p>
      <PageContent songs={songs} />
    </main>
  );
};

export default LikedSongsPage;
