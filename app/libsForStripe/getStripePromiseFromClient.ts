import { loadStripe, Stripe } from "@stripe/stripe-js";

/* let stripePromise: Promise<Stripe | null>; */

let stripeClientForClientSide: Stripe | null;

export const getStripeClientForClientSide = async () => {
  if (!stripeClientForClientSide) {
    stripeClientForClientSide = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    );
  }

  return stripeClientForClientSide;
};
