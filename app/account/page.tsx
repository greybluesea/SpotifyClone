"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useUserContext from "@/hooks/useUserContext";
import { callApiFromClientSide } from "@/libsForStripe/helpers";

const AccountContent = () => {
  const router = useRouter();
  const subscribeModal = useSubscribeModal();
  const { isLoading, subscription, user } = useUserContext();
  const [loading, setLoading] = useState(false);

  console.log(subscription);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    try {
      const { url, error } = await callApiFromClientSide({
        url: "/api/create-portal-link",
      });
      window.location.assign(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    }
    setLoading(false);
  };

  return (
    <>
      {!subscription && (
        <main className="p-6 py-4 space-y-6">
          <p className="text-2xl">No active subscription.</p>
          <Button onClick={subscribeModal.openModal} className="w-[300px]">
            Subscribe
          </Button>
        </main>
      )}
      {subscription && (
        <main className="p-6 py-4 space-y-6">
          <p className="text-2xl">
            You are currently on the
            <b> {subscription?.prices?.products?.name} </b>
            plan, which {subscription.cancel_at_period_end
              ? "renews"
              : "ends"}{" "}
            on{" "}
            {new Date(subscription?.current_period_end).toLocaleDateString(
              "en-NZ",
              { day: "numeric", month: "long", year: "numeric" }
            )}
            .
          </p>
          <Button
            disabled={loading || isLoading}
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
          >
            Open customer portal
          </Button>
        </main>
      )}
    </>
  );
};

export default AccountContent;
