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

  const putIntoPlayer = (id: string) => {
    if (!user) {
      return authModal.openModal();
    }

    /*   if (!subscription) {
      return subscribeModal.onOpen();
    } */

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return putIntoPlayer;
};

export default usePutSongsIntoPlayer;
