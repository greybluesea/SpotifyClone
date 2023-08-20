import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className=" bg-BGCOLOR-SECONDARY rounded-lg  w-full m-2 overflow-hidden
    overflow-y-auto "
    >
      <Header />
      <main className="p-5 gap-y-4">SpotifyClone</main>
    </div>
  );
}
