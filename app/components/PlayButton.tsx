import React from "react";
import { FaPlay } from "react-icons/fa";

type Props = {};

const PlayButton = (props: Props) => {
  return (
    <button
      className="
      transition 
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
    /*     <div
      className="
          absolute 
          transition 
          opacity-0 
          rounded-full 
          flex 
          items-center 
          justify-center 
          bg-BRAND 
          p-4 
          drop-shadow-md 
          right-5
          group-hover:opacity-100 
          hover:scale-110
        "
    >
      <FaPlay className="text-BGCOLOR" />
    </div> */
  );
};

export default PlayButton;
