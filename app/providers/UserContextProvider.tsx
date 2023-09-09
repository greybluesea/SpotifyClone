"use client";
import { User, useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Subscription, UserDetails } from "../../types_incl_stripe";

export type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export type Props = /* Record<string, any> ;*/ {
  children: ReactNode;
  [propName: string]: any;
};

export const UserContextProvider = ({ children, ...props }: Props) => {
  const {
    session,
    isLoading: isLoadingSession,
    supabaseClient,
  } = useSessionContext();
  const user = useUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingDetailsOrSubs, setIsLoadingDetailsOrSubs] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = () =>
    supabaseClient.from("users").select("*").single();
  const getSubscription = () =>
    supabaseClient
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    if (user && !userDetails && !subscription && !isLoadingDetailsOrSubs) {
      setIsLoadingDetailsOrSubs(true);
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        (results) => {
          const userDetailsPromiseResult = results[0];
          const subscriptionPromiseResult = results[1];

          if (userDetailsPromiseResult.status === "fulfilled")
            setUserDetails(userDetailsPromiseResult.value.data as UserDetails);

          if (subscriptionPromiseResult.status === "fulfilled")
            setSubscription(
              subscriptionPromiseResult.value.data as Subscription
            );

          setIsLoadingDetailsOrSubs(false);
        }
      );
    } else if (!user && !isLoadingSession && !isLoadingDetailsOrSubs) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingSession]);

  const userContext: UserContextType = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingSession || isLoadingDetailsOrSubs,
    subscription,
  };

  return (
    <UserContext.Provider value={userContext} {...props}>
      {children}
    </UserContext.Provider>
  );
};
