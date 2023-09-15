import { Json } from "../../type_Database";
import { Price } from "../../types_incl_stripe";

export const getHostURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export const callApiFromClientSide = async ({
  url,
  data,
}: {
  url: string;
  data?: { price: Price };
}) => {
  console.log("posting,", url, data);

  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error in posting data", { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (secs: number) => {
  var dateTime = new Date("1970-01-01T00:00:00Z"); // Unix epoch start.
  dateTime.setSeconds(secs);
  return dateTime;
};
