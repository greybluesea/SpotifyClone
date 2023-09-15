"use client";

import { useEffect, useState } from "react";
import { ProductWithPrices } from "../../types_incl_stripe";
import Modal from "@/components/Modal";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";

interface ModalProviderProps {
  products?: ProductWithPrices[];
}

const ModalProvider = ({ products = [] }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <SubscribeModal products={products} />
      <UploadModal />
    </>
  );
};

export default ModalProvider;
