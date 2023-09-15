"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { usePathname, useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import ListItem from "./ListItem";
import useAuthModal from "@/hooks/useAuthModal";
import { AiFillHeart } from "react-icons/ai";

import usePlayer from "@/hooks/usePlayer";
import useUserContext from "@/hooks/useUserContext";

/*
import Button from "./Button"; */

interface Props {}

const Header = (props: Props) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const user = useUser();
  const pathname = usePathname();
  const { subscription } = useUserContext();

  const player = usePlayer();

  const supabaseClient = useSupabaseClient();

  const handleLogout = async () => {
    player.reset();
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      toast.error(error.message, { id: "1" });
    } else {
      toast.success("Logged out!", { id: "1" });
    }

    router.refresh();
  };

  return (
    <header className="bg-gradient-to-b  from-green-700 p-6 pb-8 space-y-4 w-full  sticky top-0 md:top-2 right-0 md:rounded-t-md z-[1] backdrop-blur-md ">
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
          id="left-side btn-group-white"
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
          {user && (
            <button
              onClick={() => router.push("/likedsongs")}
              className="btn-round-white"
            >
              <AiFillHeart className="text-BGCOLOR" size={20} />
            </button>
          )}
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
                className="btn-big bg-transparent text-PRIMARY hover:bg-transparent hover:text-white -mr-2 sm:-mr-1 md:mr-0"
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
            pathname.indexOf("search") !== -1 ? (
              <p>
                Search <span className="text-xl"> by Keyword in Title</span>
              </p> /* : pathname.indexOf("likedsongs") !== -1 ? (
              <>
                <span>Liked Songs</span>
              </>
            )  */
            ) : (
              <>
                <span>Welcome back</span>
                <span className="text-xl">{user.email && ", "}</span>
                <span className="text-xl">{user.email}</span>
                {!subscription && (
                  <span className="text-lg hidden xl:inline">
                    , subscription is needed to play music
                  </span>
                )}
              </>
            )
          ) : pathname.indexOf("search") !== -1 ? (
            <p>
              Search <span className="text-xl"> by Keyword in Title</span>
            </p>
          ) : (
            <>
              <span>Please sign in</span>
              {/* <span className="text-xl">to upload, </span>
              <span>Subscribe </span>
              <span className="text-xl">to enjoy others music</span> */}
            </>
          )}
        </h1>
      </section>
    </header>
  );
};

export default Header;
