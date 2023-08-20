import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, type = "button", disabled, ...restOfProps }, ref) => {
    return (
      <button
        className={twMerge(
          `
        rounded-full 
        bg-BRAND
        border
        border-transparent
        p-3
        disabled:cursor-not-allowed 
        disabled:opacity-50
        text-BGCOLOR
        font-bold
        hover-opaque
      `,
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        type={type}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
