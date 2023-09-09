"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#e6e6e6",
          color: "#181818",
        },
      }}
    />
  );
};

export default ToasterProvider;
