import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "outline";
}

const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>(
  ({ className, size = "md", variant = "primary", ...props }, ref) => {
    const sizeClasses = {
      sm: "w-10 h-10",
      md: "w-14 h-14",
      lg: "w-16 h-16",
    };

    const iconSizes = {
      sm: "w-4 h-4 ml-0.5",
      md: "w-5 h-5 ml-0.5",
      lg: "w-6 h-6 ml-1",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-full flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
          variant === "primary" &&
            "bg-[var(--sky)] text-white hover:bg-[var(--sky-dark)] hover:scale-105 focus:ring-[var(--sky)] shadow-md hover:shadow-lg",
          variant === "outline" &&
            "border-2 border-[var(--sky)] text-[var(--sky)] bg-white hover:bg-[var(--sky)] hover:text-white",
          sizeClasses[size],
          className
        )}
        aria-label="Play"
        {...props}
      >
        {/* Play triangle icon */}
        <svg
          className={iconSizes[size]}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5v14l11-7L8 5z" />
        </svg>
      </button>
    );
  }
);

PlayButton.displayName = "PlayButton";

export { PlayButton };
