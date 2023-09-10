import React from "react";
import { FaPlay } from "react-icons/fa";

type Props = {};

const PlayButton = (props: Props) => {
  return (
    <button
      className="
      transition 
      duration-200
      opacity-0 
      rounded-full 
      flex 
      items-center 
      justify-center 
      bg-BRAND 
      p-4 
      drop-shadow-md 
      group-hover:opacity-100 
      hover:scale-110
    "
    >
      <FaPlay className="text-BGCOLOR" />
    </button>
  );
};

export default PlayButton;
