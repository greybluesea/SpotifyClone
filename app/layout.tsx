import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SideBar from "@/components/SideBar";
import SupabaseProvider from "./providers/SupabaseProvider";
import Header from "./components/Header";
import { UserContextProvider } from "./providers/UserContextProvider";
import ModalProvider from "./providers/ModalProvider";
import ToasterProvider from "./providers/ToastProvider";
import getSongsByUserId from "./actions/getSongsByUserId";
import Player from "./components/Player";
import supabaseServerComponentClient from "./actions/supabaseServerComponentClient";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpotifyClone",
  description: "Supabase + PostgreSQL + Stripe, learned from Antonio",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songs = await getSongsByUserId();
  /*   const {
    data: { user },
  } = await supabaseServerComponentClient.auth.getUser(); */

  return (
    <html lang="en">
      <body className={figtree.className + "h-[100dvh] w-full"}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserContextProvider>
            <ModalProvider />
            <div className="flex w-full">
              <SideBar songs={songs} />

              <section
                className=" bg-BGCOLOR rounded-lg w-full m-2 overflow-hidden
    overflow-y-auto "
              >
                <Header />
                {children}
              </section>
            </div>
            <Player />
          </UserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
