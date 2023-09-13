import getAllSongs from "@/actions/getAllSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/components/PageContent";
import Image from "next/image";

export const revalidate = 0;

export default async function Home() {
  const songs = await getAllSongs();
  /* throw new Error("something went wrong!"); */
  return (
    <main className="p-6 py-4 space-y-6">
      <p className="text-3xl">All songs</p>
      {/* <ListItem /> */}
      <PageContent songs={songs} />
    </main>
  );
}
