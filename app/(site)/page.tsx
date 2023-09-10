import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import Image from "next/image";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <main className="p-5 gap-y-4">
      {/* <ListItem /> */}
      {songs.map((song) => song.title)}
    </main>
  );
}
