"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Menu, X, ArrowRight, Phone, Mail } from "lucide-react";
import { LiquidButton } from "./ui/LiquidButton";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const menuVariants: Variants = {
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      damping: 26,
      stiffness: 170,
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      damping: 26,
      stiffness: 170,
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const linkVariants: Variants = {
  initial: {
    opacity: 0,
    x: 40,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 150,
    },
  },
  exit: {
    opacity: 0,
    x: 40,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      // Focus the first menu link when opening
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close menu on Escape and trap focus
  const handleMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
      menuToggleRef.current?.focus();
    }

    // Focus trap within the menu
    if (e.key === "Tab" && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl?.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl?.focus();
      }
    }
  }, []);

  return (
    <>
      {/* Skip nav link for accessibility */}
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-oz-border/40 shadow-xs"
            : "bg-transparent"
        }`}
        aria-label="Main navigation"
      >
        {/* Scroll progress indicator */}
        <ScrollProgress />

        <div className="flex items-center justify-between px-6 lg:px-16 py-5">
          <Link href="/" className="block group" aria-label="OzInfra Home">
            <div className="relative">
              {/* Subtle brand glow on hover */}
              <div className="absolute -inset-1.5 bg-oz-orange/10 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Brand Logo Image (Swaps automatically depending on scroll background) */}
              <Image
                src={
                  scrolled
                    ? "/images/brand-logo-dark-text.png"
                    : "/images/brand-logo-no-tagline.png"
                }
                alt="OzInfra"
                width={180}
                height={45}
                priority
                className="h-7 md:h-8 w-auto relative z-10 object-contain transition-all duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-nav font-space relative group transition-colors duration-300 ${
                  pathname === link.path
                    ? scrolled
                      ? "text-oz-orange-contrast"
                      : "text-oz-orange"
                    : scrolled
                      ? "text-oz-gray hover:text-oz-black"
                      : "text-oz-warmgray hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-0.5 bg-oz-orange transition-all duration-300 -translate-x-1/2 ${
                    pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <LiquidButton
              href="/contact#contact-form"
              size="sm"
              variant={scrolled ? "primary" : "white"}
              hoverText="Let's Go!"
            >
              Start Project
            </LiquidButton>
          </div>

          <button
            ref={menuToggleRef}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
              menuOpen
                ? "text-oz-bg"
                : scrolled
                  ? "text-oz-black hover:text-oz-orange"
                  : "text-white hover:text-oz-orange"
            }`}
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu — Full dialog with focus trap */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            onKeyDown={handleMenuKeyDown}
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 bg-oz-black flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div className="absolute top-1/4 -left-1/4 w-[250px] h-[250px] rounded-full bg-oz-orange/10 blur-[80px]" />
              <div className="absolute bottom-1/4 -right-1/4 w-[300px] h-[300px] rounded-full bg-oz-orange/5 blur-[100px]" />
            </div>

            {/* Grid Overlay */}
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none z-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Top Menu Header */}
            <div className="w-full flex items-center justify-between px-6 py-5 border-b border-white/5 bg-oz-black/85 backdrop-blur-md relative z-10 shrink-0">
              <Link href="/" onClick={() => setMenuOpen(false)} aria-label="OzInfra Home">
                <Image
                  src="/images/brand-logo-no-tagline.png"
                  alt="OzInfra"
                  width={150}
                  height={38}
                  priority
                  className="h-7 w-auto object-contain"
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-oz-warmgray hover:text-oz-orange hover:bg-white/5 transition-all duration-300 rounded-full"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Main Menu Contents */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 relative z-10">
              {/* Section 1: Core Directory */}
              <div className="space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-oz-orange font-semibold block">
                  CORE DIRECTORY
                </span>
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link, i) => (
                    <motion.div key={link.path} variants={linkVariants}>
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={link.path}
                        onClick={() => setMenuOpen(false)}
                        className={`group flex items-center justify-between font-space text-3xl font-medium tracking-tight ${
                          pathname === link.path ? "text-oz-orange" : "text-oz-bg"
                        } hover:text-oz-orange hover:translate-x-2 transition-all duration-300`}
                      >
                        <span className="flex items-center gap-2">{link.label}</span>
                        <ArrowRight
                          size={20}
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-oz-orange transition-all duration-300"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Bottom Sticky Panel (Urgent Intake & Contacts) */}
            <div className="shrink-0 bg-black/60 border-t border-white/5 relative z-10">
              {/* Section 2: Urgent Intake (Sticks to bottom) */}
              <div className="px-6 py-5 border-b border-white/5">
                <motion.div
                  variants={linkVariants}
                  className="space-y-3 bg-white/[0.01] border border-white/5 p-5 hover:border-oz-orange/20 transition-all duration-300"
                >
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-oz-orange font-semibold block">
                    URGENT SERVICE INTAKE
                  </span>
                  <p className="text-xs text-oz-warmgray font-body leading-relaxed">
                    Need immediate remote server, Linux, or cloud administration support? Access our
                    secure intake tunnel.
                  </p>
                  <LiquidButton
                    href="/contact#contact-form"
                    variant="white"
                    hoverText="ENGAGE ENGINEERS"
                    onClick={() => setMenuOpen(false)}
                    className="w-full mt-2 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Start Project / Submit Ticket
                  </LiquidButton>
                </motion.div>
              </div>

              {/* Bottom Footer Details */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-oz-warmgray font-mono">
                  <a
                    href="tel:+61452113061"
                    className="flex items-center gap-2 hover:text-oz-orange transition-colors duration-300"
                  >
                    <Phone size={12} className="text-oz-orange" />
                    +61 452 113 061
                  </a>
                  <a
                    href="mailto:root@ozinfra.com"
                    className="flex items-center gap-2 hover:text-oz-orange transition-colors duration-300"
                  >
                    <Mail size={12} className="text-oz-orange" />
                    root@ozinfra.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px]">
      <div
        className="h-full bg-oz-orange transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
