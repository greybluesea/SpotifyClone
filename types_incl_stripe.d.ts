import Stripe from "stripe";
import { Database } from "./type_Database";

export type Song = {
  id: string;
  created_at: Date;
  user_id: string;
  author: string;
  title: string;
  song_path: string;
  image_path: string;
};

export type Product = {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
};

//  type Product = Database["public"]["Tables"]["products"]["Insert"];

export type Price = {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
};

// type Price = Database["public"]["Tables"]["prices"]["Insert"];

export type Customer = {
  id: string;
  stripe_customer_id?: string;
};

// type Customer = Database["public"]["Tables"]["customers"]["Insert"];

export type UserPublic = {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  email?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: {
    type: Stripe.PaymentMethod.Type;
  } & Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
};

export type ProductWithPrice = Product & {
  prices?: Price[];
};

export type Subscription = {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price[];
};

// type Subs = Partial<Stripe.Subscription>;

// type Subscription = Database["public"]["Tables"]["subscriptions"]["Insert"];
