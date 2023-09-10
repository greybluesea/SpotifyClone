"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { ReactNode, useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "../../type_Database";

type Props = {
  children: ReactNode;
};

const SupabaseProvider = ({ children }: Props) => {
  const [supabaseClientComponentClient] = useState(() =>
    createClientComponentClient<Database>()
  );
  return (
    <SessionContextProvider supabaseClient={supabaseClientComponentClient}>
      {children}
    </SessionContextProvider>
  );
};

export default SupabaseProvider;
