import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

/* export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {} */

const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", /*  disabled, */ ...restOfProps }, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        `
        w-full 
        rounded-md 
        bg-BGCOLOR
        placeholder:text-NEUTRAL 

        border
        border-transparent
        px-3 
        py-3 
        
        file:border-0 
        file:bg-transparent 
        file:text-PRIMARY

        disabled:cursor-not-allowed 
        disabled:opacity-50
        focus:outline-none
      `,
        //   disabled && "opacity-75",
        className
      )}
      //   disabled={disabled}
      ref={ref}
      {...restOfProps}
    />
  );
});

Input.displayName = "Input";

export default Input;
