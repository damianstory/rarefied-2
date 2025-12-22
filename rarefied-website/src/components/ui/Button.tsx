import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          // Variants
          variant === "primary" &&
            "bg-[var(--sky)] text-white hover:bg-[var(--sky-dark)] focus:ring-[var(--sky)]",
          variant === "secondary" &&
            "bg-[var(--sage)] text-black hover:bg-[var(--sage-dark)] focus:ring-[var(--sage)]",
          variant === "outline" &&
            "border-2 border-[var(--sky)] text-[var(--sky)] bg-transparent hover:bg-[var(--sky)] hover:text-white",
          variant === "ghost" &&
            "text-[var(--olive)] hover:bg-[var(--sage-light)] hover:text-[var(--olive-dark)]",
          // Sizes
          size === "sm" && "px-3 py-1.5 text-sm rounded-md",
          size === "md" && "px-4 py-2 text-base rounded-lg",
          size === "lg" && "px-6 py-3 text-lg rounded-lg",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
