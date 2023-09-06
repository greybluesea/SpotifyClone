"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
/* import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from "react-hot-toast"; */
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import ListItem from "./ListItem";

/* import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

import Button from "./Button"; */

interface Props {}

const Header = (props: Props) => {
  const router = useRouter();
  /*   const player = usePlayer();
 
  const authModal = useAuthModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    }
  }
 */
  return (
    <header className="bg-gradient-to-b  from-green-700 p-6 pb-8 space-y-4 w-full ">
      <div id="buttons bar" className={"flex items-center justify-between"}>
        <section
          id="left-side btn-pair-black"
          className="hidden md:flex gap-x-2 items-center"
        >
          <button
            onClick={() => router.back()}
            className="
              btn-round-black 
              hover-opaque
            "
          >
            <RxCaretLeft className="text-PRIMARY" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="
              btn-round-black 
              hover-opaque 
            "
          >
            <RxCaretRight className="text-PRIMARY" size={35} />
          </button>
        </section>
        <section
          id="left-side btn-pair-white"
          className="flex md:hidden gap-x-2 items-center"
        >
          <button
            onClick={() => router.push("/")}
            className="
              btn-round-white 
              hover-opaque
            "
          >
            <HiHome className="text-BGCOLOR" size={20} />
          </button>
          <button
            onClick={() => router.push("/search")}
            className="
              btn-round-white
              hover-opaque
            "
          >
            <BiSearch className="text-BGCOLOR" size={20} />
          </button>
        </section>
        <section
          id="right-side btn-big-pair"
          className="flex gap-x-4 items-center"
        >
          {
            /* user */ true ? (
              <>
                <button
                  //   onClick={handleLogout}
                  className="btn-big bg-PRIMARY "
                >
                  Logout
                </button>
                <button
                  onClick={() => router.push("/account")}
                  className="btn-big bg-PRIMARY p-3"
                >
                  <FaUserAlt />
                </button>
              </>
            ) : (
              <>
                <button
                  //    onClick={authModal.onOpen}
                  className=" btn-big bg-transparent text-PRIMARY"
                >
                  Sign up
                </button>
                <button
                  //     onClick={authModal.onOpen}
                  className="btn-big bg-PRIMARY"
                >
                  Log in
                </button>
              </>
            )
          }
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
          Welcome back
        </h1>
      </section>
    </header>
  );
};

export default Header;
