import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabaseServerComponentClient = createServerComponentClient({
  cookies: cookies,
});

export default supabaseServerComponentClient;
