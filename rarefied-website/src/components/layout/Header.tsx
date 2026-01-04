"use client";

import { useState, useCallback } from "react";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { MobileMenu, HamburgerButton } from "./MobileMenu";

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

          {/* Desktop Navigation - centered */}
          <Navigation className="hidden lg:flex" />

          {/* Right side: spacer on desktop to balance logo, hamburger on mobile */}
          <div className="hidden lg:block w-[120px]" />
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
