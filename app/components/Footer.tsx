import React from "react";
import Image from "next/image";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className=" w-full mb-2 flex flex-col h-full justify-end">
      <ul className="hidden  sm:flex sm:flex-col mt-auto  mx-auto  justify-end items-center bg-transparent space-y-1 px-7 py-5 rounded-xl w-full">
        <li>Supabase ( auth + PostgreSQL + storage )</li>
        <li>Stripe + webhooks (receiving events)</li>
        <li>schema change via SQL query</li>
        <li>Radix UI + useSound</li>
        <li>learned from Antonio</li>
        <li>powered by greybluesea</li>
        <li></li>
      </ul>
    </footer>
  );
};

export default Footer;
