"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Shield, Calendar, ChevronRight, Menu, X, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../ScrollReveal";

interface TOCItem {
  id: string;
  label: string;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  tocItems: TOCItem[];
  children: React.ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  tocItems,
  children,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState(tocItems[0]?.id || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Setup IntersectionObserver to track reading progress and highlight the TOC link
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    });

    tocItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 120; // Clearance for sticky nav header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-oz-black text-oz-bg pt-32 pb-24 relative overflow-hidden">
      {/* Background Tech Mesh lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle orange ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-oz-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-oz-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Breadcrumb / Back Link */}
        <ScrollReveal direction="down" delay={0.1}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-space uppercase tracking-[0.2em] text-oz-warmgray/60 hover:text-oz-orange transition-colors mb-12 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Terminal Console
          </Link>
        </ScrollReveal>

        {/* Page Header */}
        <div className="border-b border-white/5 pb-10 mb-16">
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl border border-oz-orange/30 flex items-center justify-center bg-oz-orange/5">
                <Shield className="text-oz-orange" size={20} />
              </div>
              <p className="text-xs font-space uppercase tracking-[0.3em] text-oz-orange font-bold">
                Governance & Compliance
              </p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-space text-white mb-6 tracking-tight">
              {title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              <p className="text-lg text-oz-warmgray max-w-2xl font-body">{subtitle}</p>
              <div className="flex items-center gap-2 text-xs font-space text-oz-warmgray/50 border border-white/5 px-4 py-2 bg-white/[0.01] rounded-lg shrink-0 w-fit">
                <Calendar size={14} className="text-oz-orange" />
                <span>LAST MODIFIED: {lastUpdated}</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Mobile Sticky Navigation Toggle */}
        <div className="lg:hidden sticky top-20 z-30 mb-8 w-full">
          <div className="bg-oz-black/90 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between shadow-lg">
            <span className="text-xs font-space text-oz-warmgray/80">
              SECTION:{" "}
              <span className="text-oz-orange font-bold">
                {tocItems.find((item) => item.id === activeSection)?.label || "Menu"}
              </span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center bg-white/5 text-white active:scale-95 transition-all"
              aria-label="Toggle navigation sections"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 top-full mt-2 w-full bg-oz-black/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl z-30 overflow-hidden"
              >
                <div className="p-4 space-y-1">
                  {tocItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-space flex items-center justify-between transition-colors ${
                        activeSection === item.id
                          ? "bg-oz-orange/10 text-oz-orange"
                          : "text-oz-warmgray hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{item.label}</span>
                      {activeSection === item.id && <ChevronRight size={14} />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Table of Contents Sticky Sidebar (Desktop only) */}
          <aside className="hidden lg:block lg:col-span-4 h-fit sticky top-32">
            <div className="border border-white/5 bg-white/[0.01] rounded-[2rem] p-8 backdrop-blur-3xl">
              <h2 className="text-xs font-space uppercase tracking-[0.25em] text-white/50 mb-8 pb-4 border-b border-white/5 font-bold">
                Table of Contents
              </h2>
              <nav className="space-y-2">
                {tocItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full group text-left flex items-start gap-3 py-3 transition-colors text-sm font-space"
                  >
                    {/* Active Track indicator line */}
                    <div className="h-5 flex items-center shrink-0">
                      <motion.div
                        className="w-[2px] bg-oz-orange rounded-full"
                        animate={{
                          height: activeSection === item.id ? 20 : 0,
                          opacity: activeSection === item.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      {activeSection !== item.id && (
                        <div className="w-[2px] h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors" />
                      )}
                    </div>

                    <span
                      className={`transition-colors duration-300 leading-snug ${
                        activeSection === item.id
                          ? "text-oz-orange font-medium"
                          : "text-oz-warmgray hover:text-white"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Legal Support Box inside Sidebar */}
              <div className="mt-12 pt-8 border-t border-white/5 text-xs text-oz-warmgray/50 font-space space-y-4">
                <p>Looking for technical operations support?</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-oz-orange hover:text-white transition-colors uppercase font-bold"
                >
                  Configure Support Ticket
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Legal Document Content (Split into sections) */}
          <main className="lg:col-span-8 space-y-16 font-body text-oz-warmgray/80 leading-relaxed text-[17px] md:text-lg">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="legal-content-rich space-y-16">{children}</div>
            </ScrollReveal>
          </main>
        </div>
      </div>

      {/* Global CSS Inject for styling policy HTML tags */}
      <style jsx global>{`
        .legal-content-rich h3 {
          font-family: var(--font-space), monospace;
          color: white;
          font-size: 1.35rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .legal-content-rich p {
          margin-bottom: 1.25rem;
        }
        .legal-content-rich ul,
        .legal-content-rich ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
          list-style-type: square;
        }
        .legal-content-rich li {
          margin-bottom: 0.5rem;
          padding-left: 0.25rem;
        }
        .legal-content-rich li strong {
          color: white;
        }
        .legal-content-rich a {
          color: var(--oz-primary, #f85b1b);
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 0.2s ease;
        }
        .legal-content-rich a:hover {
          color: white;
        }
      `}</style>
    </div>
  );
}
