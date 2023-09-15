import { create } from "zustand";
import { Song } from "../../types_incl_stripe";

interface PlayerStore {
  activeSong: Song | null;
  currentSongIsLiked: boolean;
  songs: Song[];
  setSong: (song: Song) => void;
  setCurrentSongIsLiked: (isLiked: boolean) => void;
  setSongs: (songs: Song[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  activeSong: null,
  currentSongIsLiked: false,
  songs: [],
  setSong: (song: Song) => set({ activeSong: song }),
  setCurrentSongIsLiked: (isLiked: boolean) =>
    set({ currentSongIsLiked: isLiked }),
  setSongs: (songs: Song[]) => set({ songs }),
  reset: () => set({ songs: [], activeSong: null }),
}));

export default usePlayer;
