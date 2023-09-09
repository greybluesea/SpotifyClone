"use client";

import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useOpenAuthModalStore from "@/hooks/useOpenAuthModalStore";

const AuthModal = () => {
  const { session } = useSessionContext();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { isOpen, closeModal } = useOpenAuthModalStore();

  useEffect(() => {
    if (session) {
      router.refresh();
      closeModal();
    }
  }, [session]);

  return (
    <Modal
      title="Welcome back"
      description="Login to your account."
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={["github"]}
        magicLink={true}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#15803d",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        theme="dark"
      />
    </Modal>
  );
};

export default AuthModal;