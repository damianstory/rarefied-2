"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { MobileMenu, HamburgerButton } from "./MobileMenu";
import { Button } from "@/components/ui";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCloseMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <Navigation className="hidden lg:flex" />

          {/* Desktop Subscribe Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/listen">
              <Button variant="primary" size="sm">
                Subscribe
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMenu}
      />
    </header>
  );
}
