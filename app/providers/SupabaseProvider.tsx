"use client";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import React, { ReactNode, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../../type_Database";

type Props = {
  children: ReactNode;
};

const SupabaseProvider = ({ children }: Props) => {
  const [supabaseClient] = useState(() => createPagesBrowserClient<Database>());
  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
