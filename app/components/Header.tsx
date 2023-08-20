"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
/* import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from "react-hot-toast"; */
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

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
    <header
      className={
        "bg-gradient-to-b  from-green-700 p-6 w-full h-[100px] flex items-center justify-between"
      }
    >
      <div id="btn-pair-black" className="hidden md:flex gap-x-2 items-center">
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
      </div>
      <div id="btn-pair-white" className="flex md:hidden gap-x-2 items-center">
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
      </div>
      {/* <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button 
                onClick={handleLogout} 
                className="bg-white px-6 py-2"
              >
                Logout
              </Button>
              <Button 
                onClick={() => router.push('/account')} 
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button 
                  onClick={authModal.onOpen} 
                  className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button 
                  onClick={authModal.onOpen} 
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div> */}
    </header>
  );
};

export default Header;
