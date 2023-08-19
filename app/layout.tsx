import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpotifyClone",
  description:
    "Supabase + PostgreSQL + Stripe + NextAuth email signin, learned from Antonio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className + ""}>{children}</body>
    </html>
  );
}
