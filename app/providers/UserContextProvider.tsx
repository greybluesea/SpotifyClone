"use client";
import { User, useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { Subscription, UserPublic } from "../../types_incl_stripe";

export type UserContextType = {
  accessToken: string | null;
  user: User | null;
  userPublic: UserPublic | null;
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
  const [userPublic, setUserPublic] = useState<UserPublic | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserPublic = () => supabaseClient.from("users").select("*").single();
  const getSubscription = () =>
    supabaseClient
      .from("subscriptions")
      .select("*, prices(*, products(*))")
      .in("status", ["trialing", "active"])
      .single();

  useEffect(() => {
    if (user && !userPublic && !subscription && !isLoadingDetailsOrSubs) {
      setIsLoadingDetailsOrSubs(true);
      Promise.allSettled([getUserPublic(), getSubscription()]).then(
        (results) => {
          const userPublicPromiseResult = results[0];
          const subscriptionPromiseResult = results[1];

          if (userPublicPromiseResult.status === "fulfilled")
            setUserPublic(userPublicPromiseResult.value.data as UserPublic);

          if (subscriptionPromiseResult.status === "fulfilled")
            setSubscription(
              subscriptionPromiseResult.value.data as Subscription
            );

          setIsLoadingDetailsOrSubs(false);
        }
      );
    } else if (!user && !isLoadingSession && !isLoadingDetailsOrSubs) {
      setUserPublic(null);
      setSubscription(null);
    }
  }, [user, isLoadingSession]);

  const userContext: UserContextType = {
    accessToken,
    user,
    userPublic,
    isLoading: isLoadingSession || isLoadingDetailsOrSubs,
    subscription,
  };

  return (
    <UserContext.Provider value={userContext} {...props}>
      {children}
    </UserContext.Provider>
  );
};
