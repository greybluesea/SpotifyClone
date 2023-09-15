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
import PlayerBar from "./components/PlayerBar";
import getActiveProductsWithPrices from "./actions/getActiveProductsWithPrices";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpotifyClone - (Supabase + Stripe + webhooks + useSound)",
  description:
    "Supabase client(auth + PostgreSQL + storage ) + Stripe + webhooks(receiving events) + SQL query + useSound + Radix, learned from Antonio",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={figtree.className + "h-[100dvh] w-full"}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserContextProvider>
            <ModalProvider products={products} />
            <div className="flex w-full">
              <SideBar songs={songs} />

              <section className="bg-BGCOLOR rounded-lg w-full md:m-2">
                <Header />
                {children}
              </section>
            </div>
            <PlayerBar />
          </UserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
