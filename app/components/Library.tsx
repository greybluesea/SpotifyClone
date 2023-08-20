"use client";

import React from "react";
import { HiPlus } from "react-icons/hi";
import { RiPlayListFill } from "react-icons/ri";

type Props = {};

const Library = (props: Props) => {
  return (
    <section
      id="Library"
      className="box-within-sidebar h-full overflow-y-auto "
    >
      <div
        id="header of library"
        className="flex items-center justify-between font-semibold  
           "
      >
        <div className="flex items-center gap-x-5 hover-highlight">
          <RiPlayListFill size={26} />
          <p>Your Library</p>
        </div>
        <HiPlus
          // onClick={()=>{}}
          size={24}
          className="
          hover-highlight
           
          "
        />
      </div>
      <div id="list of songs">List of Songs</div>
    </section>
  );
};

export default Library;
