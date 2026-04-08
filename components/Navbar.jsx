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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out w-[95%] max-w-7xl rounded-full px-6 py-2 flex items-center justify-between",
        scrolled
          ? "glass-panel shadow-2xl translate-y-0"
          : "bg-[#111111]/40 backdrop-blur-sm border border-white/5 translate-y-0",
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
              "text-[10px] font-bold tracking-[0.3em] uppercase transition-all relative group py-2",
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
          className="bg-[#c9a84c]/90 hover:bg-[#c9a84c] text-[#111111] font-bold py-2 px-6 rounded-full uppercase tracking-[0.2em] text-[10px] transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Book
        </Link>
      </nav>

      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden z-50 text-white p-2"
        aria-label="Toggle Menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={cn("w-full h-0.5 bg-white transition-all transform duration-300", mobileMenuOpen && "translate-y-2.5 rotate-45")} />
          <span className={cn("w-full h-0.5 bg-white transition-all duration-300", mobileMenuOpen && "opacity-0")} />
          <span className={cn("w-full h-0.5 bg-white transition-all transform duration-300", mobileMenuOpen && "-translate-y-2 -rotate-45")} />
        </div>
      </button>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 w-full h-screen z-40 flex flex-col items-center justify-center glass-panel rounded-none border-none"
          >
            <div className="flex flex-col items-center space-y-10">
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
                      "text-4xl font-heading font-bold tracking-widest uppercase transition-colors",
                      pathname === link.href ? "text-gold-gradient" : "text-gray-500"
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
