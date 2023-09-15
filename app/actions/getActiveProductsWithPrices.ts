import { ProductWithPrices } from "../../types_incl_stripe";
import supabaseServerComponentClient from "./supabaseServerComponentClient";

const getActiveProductsWithPrices = async (): Promise<ProductWithPrices[]> => {
  const { data, error } = await supabaseServerComponentClient
    .from("products")
    .select("*, prices(*)")
    .eq("active", true)
    .eq("prices.active", true)
    .order("metadata->index")
    .order("unit_amount", { foreignTable: "prices" });

  if (error) {
    console.log(error.message);
  }

  return (data as ProductWithPrices[]) || [];
};

export default getActiveProductsWithPrices;
