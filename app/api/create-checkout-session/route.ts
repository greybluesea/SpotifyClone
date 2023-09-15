//import supabaseRouteHandlerClient from "@/actions/supabaseRouteHandlerClient";
import { getHostURL } from "@/libsForStripe/helpers";
import { stripeClient } from "@/libsForStripe/stripe";
import { retrieveCustomerIdOrCreateInStripe } from "@/libsForStripe/supabaseClientForStripe";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const { price, quantity = 1, metadata = {} } = await request.json();

  try {
    const supabaseRouteHandlerClient = createRouteHandlerClient({
      cookies,
    });

    const {
      data: { user },
    } = await supabaseRouteHandlerClient.auth.getUser();

    if (!user) return new NextResponse("Unauthorised", { status: 401 });

    const customerId = await retrieveCustomerIdOrCreateInStripe(
      user.id,
      user?.email || ""
    );

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      billing_address_collection: "required",
      customer: customerId,
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      subscription_data: {
        //     trial_from_plan: true,
        metadata,
      },
      success_url: `${getHostURL()}account`,
      cancel_url: `${getHostURL()}`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
