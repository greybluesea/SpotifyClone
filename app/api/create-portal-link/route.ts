import { stripeClient } from "@/libsForStripe/stripe";
import { getHostURL } from "@/libsForStripe/helpers";
import { retrieveCustomerIdOrCreateInStripe } from "@/libsForStripe/supabaseClientForStripe";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const supabaseRouteHandlerClient = createRouteHandlerClient({
      cookies,
    });

    const {
      data: { user },
    } = await supabaseRouteHandlerClient.auth.getUser();

    if (!user) return new NextResponse("Unauthorized", { status: 401 });

    const customerId = await retrieveCustomerIdOrCreateInStripe(
      user.id,
      user.email || ""
    );

    if (!customerId)
      return new NextResponse(
        "Failed to retrieve the customer id or create an customer in Stripe",
        { status: 400 }
      );

    const { url } = await stripeClient.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${getHostURL()}account`,
    });

    return NextResponse.json({ url });
  } catch (err: any) {
    console.log(err);
    new NextResponse("Internal Error", { status: 500 });
  }
}
