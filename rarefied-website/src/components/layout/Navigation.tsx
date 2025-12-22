"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

export function Navigation({ className, onLinkClick }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-1", className)}>
      {NAV_LINKS.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.href !== "/" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive
                ? "bg-[var(--sage-light)] text-[var(--olive-dark)]"
                : "text-gray-700 hover:bg-gray-100 hover:text-black"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
