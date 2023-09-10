import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

const supabaseServerComponentClient = createServerComponentClient({
  //  headers: headers,
  cookies: cookies,
});

export default supabaseServerComponentClient;
