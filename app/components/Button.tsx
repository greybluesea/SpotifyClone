import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

/* export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {} */

const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, type = "button", ...restOfProps }, ref) => {
  return (
    <button
      type={type}
      className={twMerge(
        `
        btn-brand-coloring

        w-full 
        rounded-md 
        
        px-3 
        py-3 
        
        disabled:cursor-not-allowed 
        disabled:bg-BRAND-SECONDARY
        disabled:opacity-50
      `,
        className
      )}
      ref={ref}
      {...restOfProps}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
