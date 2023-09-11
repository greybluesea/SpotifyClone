import { create } from "zustand";

interface PlayerStore {
  activeId: string | null;
  ids: string[];
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  activeId: null,
  ids: [],
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: null }),
}));

export default usePlayer;
