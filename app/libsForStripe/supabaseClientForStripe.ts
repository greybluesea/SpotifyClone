import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

import { Database } from "../../type_Database";
import { Price, Product, Subscription } from "../../types_incl_stripe";

import { stripeClient } from "./stripe";
import { toDateTime } from "./helpers";

export const supabaseClientForStripe = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const upsertProductExcerpt = async (productStripe: Stripe.Product) => {
  const productExcerpt: Product = {
    id: productStripe.id,
    active: productStripe.active,
    name: productStripe.name,
    description: productStripe.description ?? undefined,
    image: productStripe.images?.[0] ?? undefined,
    metadata: productStripe.metadata,
  };

  const { error } = await supabaseClientForStripe
    .from("products")
    .upsert([productExcerpt]);
  if (error) throw error;
  console.log(`product inserted or updated: ${productStripe.id}`);
};

const upsertPriceExcerpt = async (priceStripe: Stripe.Price) => {
  const priceExcerpt: Price = {
    id: priceStripe.id,
    product_id:
      typeof priceStripe.product === "string" ? priceStripe.product : "",
    active: priceStripe.active,
    currency: priceStripe.currency,
    description: priceStripe.nickname ?? undefined,
    type: priceStripe.type,
    unit_amount: priceStripe.unit_amount ?? undefined,
    interval: priceStripe.recurring?.interval,
    interval_count: priceStripe.recurring?.interval_count,
    trial_period_days: priceStripe.recurring?.trial_period_days,
    metadata: priceStripe.metadata,
  };

  const { error } = await supabaseClientForStripe
    .from("prices")
    .upsert([priceExcerpt]);

  if (error) throw error;
  console.log(`price inserted or updated: ${priceStripe.id}`);
};

const createOrRetrieveCustomerInStripe = async (
  uuid: string,
  email?: string
) => {
  const { data: customerData, error } = await supabaseClientForStripe
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", uuid)
    .single();
  if (error || !customerData?.stripe_customer_id) {
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: {
          supabaseUUID: uuid,
        },
      };
    if (email) customerData.email = email;

    const customerInStripe = await stripeClient.customers.create(customerData);
    const { error: supabaseError } = await supabaseClientForStripe
      .from("customers")
      .insert([{ id: uuid, stripe_customer_id: customerInStripe.id }]);
    if (supabaseError) throw supabaseError;
    console.log(`New customer created(inserted) for user ${uuid}.`);
    return customerInStripe.id;
  }
  return customerData.stripe_customer_id;
};

const copyBillingDetailsAndPaymentMethodFromStripe = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customerId = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !phone || !address) return;
  //@ts-ignore
  await stripeClient.customers.update(customerId, { name, phone, address });
  const { error } = await supabaseClientForStripe
    .from("users")
    .update({
      billing_address: { ...address },
      //@ts-ignore
      payment_method: {
        type: payment_method.type,
        ...payment_method[payment_method.type],
      },
    })
    .eq("id", uuid);
  if (error) throw error;
};

const updateSubsStatusChangeFromStripe = async (
  subscriptionId: string,
  customerId: string,
  moreDetails = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: ErrorOfNoCustomer } =
    await supabaseClientForStripe
      .from("customers")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single();
  if (ErrorOfNoCustomer) throw ErrorOfNoCustomer;

  const { id: uuid } = customerData!;

  const subscriptionStripe = await stripeClient.subscriptions.retrieve(
    subscriptionId,
    {
      expand: ["default_payment_method"],
    }
  );
  // Upsert the latest status of the subscription object.
  const subscriptionExcerpt: Database["public"]["Tables"]["subscriptions"]["Insert"] =
    {
      id: subscriptionStripe.id,
      user_id: uuid,
      metadata: subscriptionStripe.metadata,
      status: subscriptionStripe.status,
      price_id: subscriptionStripe.items.data[0].price.id,
      cancel_at_period_end: subscriptionStripe.cancel_at_period_end,
      cancel_at: subscriptionStripe.cancel_at
        ? toDateTime(subscriptionStripe.cancel_at).toISOString()
        : null,
      canceled_at: subscriptionStripe.canceled_at
        ? toDateTime(subscriptionStripe.canceled_at).toISOString()
        : null,
      current_period_start: toDateTime(
        subscriptionStripe.current_period_start
      ).toISOString(),
      current_period_end: toDateTime(
        subscriptionStripe.current_period_end
      ).toISOString(),
      created: toDateTime(subscriptionStripe.created).toISOString(),
      ended_at: subscriptionStripe.ended_at
        ? toDateTime(subscriptionStripe.ended_at).toISOString()
        : null,
      trial_start: subscriptionStripe.trial_start
        ? toDateTime(subscriptionStripe.trial_start).toISOString()
        : null,
      trial_end: subscriptionStripe.trial_end
        ? toDateTime(subscriptionStripe.trial_end).toISOString()
        : null,
    };

  const { error } = await supabaseClientForStripe
    .from("subscriptions")
    .upsert([subscriptionExcerpt]);
  if (error) throw error;
  console.log(
    `Inserted/updated subscription [${subscriptionStripe.id}] for user [${uuid}]`
  );

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (moreDetails && subscriptionStripe.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsAndPaymentMethodFromStripe(
      uuid,
      subscriptionStripe.default_payment_method as Stripe.PaymentMethod
    );
};

export {
  upsertProductExcerpt,
  upsertPriceExcerpt,
  createOrRetrieveCustomerInStripe,
  updateSubsStatusChangeFromStripe,
};
