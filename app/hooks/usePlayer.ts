import { create } from "zustand";
import { Song } from "../../types_incl_stripe";

interface PlayerStore {
  activeSong: Song | null;
  songs: Song[];
  setSong: (song: Song) => void;
  setSongs: (songs: Song[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  activeSong: null,
  songs: [],
  setSong: (song: Song) => set({ activeSong: song }),
  setSongs: (songs: Song[]) => set({ songs }),
  reset: () => set({ songs: [], activeSong: null }),
}));

export default usePlayer;
