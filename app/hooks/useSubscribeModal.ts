import { create } from "zustand";

interface SubscribeModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useSubscribeModal = create<SubscribeModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useSubscribeModal;
