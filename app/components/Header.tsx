"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import ListItem from "./ListItem";
import useAuthModal from "@/hooks/useAuthModal";

/*
import usePlayer from "@/hooks/usePlayer";

import Button from "./Button"; */

interface Props {}

const Header = (props: Props) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const user = useUser();

  // const player = usePlayer();

  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // player.reset();

    if (error) {
      toast.error(error.message, { id: "1" });
    } else {
      toast.success("Logged out!", { id: "1" });
    }

    /*  setTimeout(() => {
      router.refresh();
    }, 2000); */
  };

  return (
    <header className="bg-gradient-to-b  from-green-700 p-6 pb-8 space-y-4 w-full ">
      <div id="buttons bar" className={"flex items-center justify-between"}>
        <section
          id="left-side btn-pair-black"
          className="hidden md:flex gap-x-2 items-center"
        >
          <button onClick={() => router.back()} className="btn-round-black">
            <RxCaretLeft className="text-PRIMARY" size={35} />
          </button>
          <button onClick={() => router.forward()} className="btn-round-black ">
            <RxCaretRight className="text-PRIMARY" size={35} />
          </button>
        </section>
        <section
          id="left-side btn-pair-white"
          className="flex md:hidden gap-x-2 items-center"
        >
          <button onClick={() => router.push("/")} className="btn-round-white">
            <HiHome className="text-BGCOLOR" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="btn-round-white"
          >
            <BiSearch className="text-BGCOLOR" size={20} />
          </button>
        </section>
        <section
          id="right-side btn-big-pair"
          className="flex gap-x-2 sm:gap-x-3 md:gap-x-4 items-center"
        >
          {user ? (
            <>
              <button onClick={handleLogout} className="btn-big ">
                Logout
              </button>
              <button
                onClick={() => router.push("/account")}
                className="btn-big p-3"
              >
                <FaUserAlt />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={authModal.openModal}
                className="btn-big bg-transparent text-PRIMARY font-extrabold hover:bg-transparent hover:text-white -mr-2 sm:-mr-1 md:mr-0"
              >
                Sign up
              </button>
              <button onClick={authModal.openModal} className="btn-big">
                Log in
              </button>
            </>
          )}
        </section>
      </div>
      <section id="welcome text">
        <h1
          className="
            text-PRIMARY 
              text-3xl 
              font-semibold
            "
        >
          {user ? (
            <>
              <span>Welcome back</span>
              <span>{user.email && ", "}</span>
              <span className="text-2xl">{user.email}</span>
            </>
          ) : (
            "Please sign in to enjoy music"
          )}
        </h1>
      </section>
    </header>
  );
};

export default Header;
