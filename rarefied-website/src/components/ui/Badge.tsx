import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "status";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variant === "default" && "bg-[var(--sage-light)] text-[var(--olive-dark)]",
        variant === "outline" &&
          "border border-[var(--sage-dark)] text-[var(--olive)] bg-transparent",
        variant === "status" && "uppercase tracking-wide",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: string;
}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const statusLower = status.toLowerCase();

    if (statusLower.includes("endangered") || statusLower.includes("critically")) {
      return "bg-red-100 text-red-800 border-red-200";
    }
    if (statusLower.includes("threatened")) {
      return "bg-orange-100 text-orange-800 border-orange-200";
    }
    if (statusLower.includes("vulnerable") || statusLower.includes("concern")) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
    if (statusLower.includes("extinct")) {
      return "bg-gray-800 text-white border-gray-900";
    }

    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wide border",
        getStatusStyles(status),
        className
      )}
      {...props}
    >
      {status}
    </span>
  );
}
