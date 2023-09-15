import usePlayer from "./usePlayer";

import useAuthModal from "./useAuthModal";

import { Song } from "../../types_incl_stripe";
import { useUser } from "@supabase/auth-helpers-react";
import useSubscribeModal from "./useSubscribeModal";
import useUserContext from "./useUserContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const usePutSongsIntoPlayer = (songs: Song[]) => {
  const player = usePlayer();
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const user = useUser();
  const { subscription } = useUserContext();
  const router = useRouter();

  const putSongIntoPlayer = (song: Song) => {
    if (!user) {
      return authModal.openModal();
    }

    if (!subscription) {
      router.push("/account");
      toast("Subscription is needed for playing songs");
      return subscribeModal.openModal();
    }

    player.setSong(song);
    player.setSongs(songs);
  };

  return putSongIntoPlayer;
};

export default usePutSongsIntoPlayer;
