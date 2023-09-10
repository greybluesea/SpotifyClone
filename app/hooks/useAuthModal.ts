import { create } from "zustand";

interface OpenAuthModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useAuthModal = create<OpenAuthModalStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export default useAuthModal;
