import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/components/PageContent";
import Image from "next/image";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <main className="p-5 space-y-4">
      {/* <ListItem /> */}
      <PageContent songs={songs} />
    </main>
  );
}
