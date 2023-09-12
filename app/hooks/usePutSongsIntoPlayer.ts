import usePlayer from "./usePlayer";
/* import useSubscribeModal from "./useSubscribeModal"; */
import useAuthModal from "./useAuthModal";

import { Song } from "../../types_incl_stripe";
import { useUser } from "@supabase/auth-helpers-react";

const usePutSongsIntoPlayer = (songs: Song[]) => {
  const player = usePlayer();
  /* const subscribeModal = useSubscribeModal(); */
  const authModal = useAuthModal();
  const user = useUser();

  const putSongIntoPlayer = (song: Song) => {
    if (!user) {
      return authModal.openModal();
    }

    /*   if (!subscription) {
      return subscribeModal.onOpen();
    } */

    player.setSong(song);
    player.setSongs(songs);
  };

  return putSongIntoPlayer;
};

export default usePutSongsIntoPlayer;
