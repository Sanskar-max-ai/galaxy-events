"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LuMenu, LuX } from "react-icons/lu";
import { cn } from "@/utils/cn";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Only transparent at the very top of the home page
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for background change
      setScrolled(currentScrollY > 20);

      // Hide/Show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // Scrolling down - hide
      } else {
        setVisible(true); // Scrolling up - show
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 ease-in-out flex items-center justify-between",
        "w-full top-0 h-[56px] px-4 rounded-none border-b border-white/5",
        "md:top-4 md:w-[95%] md:max-w-7xl md:rounded-full md:px-6 md:py-2 md:h-auto md:border-none",
        "left-1/2 -translate-x-1/2",
        scrolled
          ? "glass-panel shadow-2xl translate-y-0"
          : "bg-[#111111]/90 md:bg-[#111111]/40 backdrop-blur-md md:backdrop-blur-sm border border-white/5 md:border-white/5 translate-y-0",
        !visible && !mobileMenuOpen && "-translate-y-32"
      )}
    >
      {/* Logo */}
      <Link href="/" className="z-50 relative group">
        <h1 className="text-xl md:text-2xl font-heading font-bold text-gold-gradient tracking-tighter group-hover:scale-105 transition-transform duration-500">
          GALAXY EVENTS
        </h1>
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "text-[12px] font-bold tracking-[0.3em] uppercase transition-all relative group py-2",
              pathname === link.href ? "text-[#c9a84c]" : "text-gray-400 hover:text-white"
            )}
          >
            {link.name}
            <span 
              className={cn(
                "absolute bottom-0 left-0 w-0 h-[1px] bg-[#c9a84c] transition-all duration-500 ease-out group-hover:w-full",
                pathname === link.href && "w-full shadow-[0_0_15px_#c9a84c]"
              )}
            />
          </Link>
        ))}
        <Link
          href="/contact"
          className="bg-[#c9a84c]/90 hover:bg-[#c9a84c] text-[#111111] font-bold py-2 px-6 rounded-full uppercase tracking-[0.2em] text-[12px] transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Book
        </Link>
      </nav>

      {/* Mobile Toggle */}
      {!mobileMenuOpen && (
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden z-50 text-white min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
          aria-label="Toggle Menu"
        >
          <LuMenu size={28} />
        </button>
      )}

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed top-0 left-0 w-full h-[100vh] z-[9999] flex flex-col items-center justify-center bg-[#111111] opacity-100"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-2 right-4 text-white min-w-[44px] min-h-[44px] flex items-center justify-center p-2"
              aria-label="Close Menu"
            >
              <LuX size={32} />
            </button>
            <div className="flex flex-col items-center space-y-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-center min-h-[48px] px-6 text-3xl font-heading font-bold tracking-widest uppercase transition-colors",
                      pathname === link.href ? "text-gold-gradient" : "text-gray-200"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
