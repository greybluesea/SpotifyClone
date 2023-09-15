import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripeClient } from "@/libsForStripe/stripe";
import {
  deletePriceInSupabase,
  deleteProductInSupabase,
  updateSubsStatusChangeFromStripe,
  upsertPriceInSupabase,
  upsertProductInSupabase,
} from "@/libsForStripe/supabaseClientForStripe";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "product.deleted",
  "price.created",
  "price.updated",
  "price.deleted",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature");

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_LOCAL_SECRET ??
    process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) return;
    event = stripeClient.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  console.log(event.data);

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          await upsertProductInSupabase(event.data.object as Stripe.Product);
          break;
        case "product.deleted":
          await deleteProductInSupabase(event.data.object as Stripe.Product);
          break;
        case "price.created":
        case "price.updated":
          await upsertPriceInSupabase(event.data.object as Stripe.Price);
          break;
        case "price.deleted":
          await deletePriceInSupabase(event.data.object as Stripe.Price);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          const subscription = event.data.object as Stripe.Subscription;
          console.log(subscription);
          await updateSubsStatusChangeFromStripe(
            subscription.id,
            subscription.customer as string,
            event.type === "customer.subscription.created"
          );
          break;
        case "checkout.session.completed":
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription;
            const customerId = checkoutSession.customer;
            await updateSubsStatusChangeFromStripe(
              subscriptionId as string,
              customerId as string,
              true
            );
          }
          break;
        default:
          console.log(event.type);
          throw new Error("Unhandled relevant event type: " + event.type);
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(
        'Webhook error: "Webhook handler failed. View logs."',
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
