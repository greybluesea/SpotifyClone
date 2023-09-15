import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabaseRouteHandlerClient = createRouteHandlerClient({
  cookies,
});

export default supabaseRouteHandlerClient;
