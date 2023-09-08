import { User } from "@supabase/auth-helpers-nextjs";
import { Subscription, UserDetails } from "../../types_stripe";

type UserContext = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};
