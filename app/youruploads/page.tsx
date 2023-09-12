import getSongsByUserId from "@/actions/getSongsByUserId";
import PageContent from "@/components/PageContent";
import React from "react";

export const revalidate = 0;

const YourUploadsPage = async () => {
  const songs = await getSongsByUserId();
  return (
    <main className="p-6 py-4 space-y-6">
      <p className="text-3xl">Your uploads</p>
      <PageContent songs={songs} />
    </main>
  );
};

export default YourUploadsPage;
