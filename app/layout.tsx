import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SideBar from "@/components/SideBar";
import SupabaseProvider from "./providers/SupabaseProvider";
import Header from "./components/Header";
import { UserContextProvider } from "./providers/UserContextProvider";
import ModalProvider from "./providers/ModalProvider";
import ToasterProvider from "./providers/ToastProvider";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpotifyClone",
  description: "Supabase + PostgreSQL + Stripe, learned from Antonio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className + " flex h-[100dvh] w-full"}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserContextProvider>
            <ModalProvider />
            <SideBar />
            <section
              className=" bg-BGCOLOR rounded-lg w-full m-2 overflow-hidden
    overflow-y-auto "
            >
              <Header />
              {children}
            </section>
          </UserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
