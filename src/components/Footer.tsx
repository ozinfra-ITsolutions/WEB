"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  ChevronDown,
} from "lucide-react";
import { CONTACT_INFO } from "../lib/constants/contact";

const footerLinks = {
  services: [
    { label: "Linux Administration", path: "/services#linux" },
    { label: "Azure Cloud Solutions", path: "/services#cloud" },
    { label: "VMware Virtualisation", path: "/services#cloud" },
    { label: "Network Infrastructure", path: "/services#networking" },
    { label: "After Hours Support", path: "/services#afterhours" },
    { label: "Onsite IT Support", path: "/services#afterhours" },
  ],
  company: [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Services", path: "/services" },
    { label: "Contact", path: "/contact" },
  ],
  policies: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms of Service", path: "/terms" },
    { label: "Data Compliance", path: "/compliance" },
    { label: "Legal Disclaimer", path: "/disclaimer" },
    { label: "SLA Overview", path: "/sla" },
  ],
};

const AnimatedLink = ({
  href,
  children,
  isInternal = true,
}: {
  href: string;
  children: React.ReactNode;
  isInternal?: boolean;
}) => {
  const content = (
    <motion.div
      className="flex items-center gap-3 text-oz-warmgray/80 hover:text-white transition-colors duration-300 group font-body py-1"
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        variants={{
          initial: { width: 0, opacity: 0, marginRight: 0 },
          hover: { width: 16, opacity: 1, marginRight: 8 },
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1px] bg-oz-orange overflow-hidden flex items-center"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-oz-orange ml-auto" />
      </motion.div>
      <span className="relative z-10">{children}</span>
      {!isInternal && (
        <ArrowUpRight
          size={12}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-oz-orange ml-1"
        />
      )}
    </motion.div>
  );

  return isInternal ? (
    <Link href={href} className="block w-fit">
      {content}
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block w-fit">
      {content}
    </a>
  );
};

const TechCorners = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {/* Soft Premium Ambient Glow */}
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-oz-orange/5 rounded-full blur-[120px] pointer-events-none select-none" />

    {/* Rotating Premium Brand Logo Watermark */}
    <motion.div
      className="absolute -top-24 -right-24 md:-top-36 md:-right-36 pointer-events-none select-none z-0"
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 240,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <Image
        src="/images/brand-logo-outline.png"
        alt=""
        width={600}
        height={600}
        priority
        className="w-[300px] h-auto md:w-[460px] md:h-auto opacity-[0.07] select-none pointer-events-none transition-opacity duration-[1000ms] group-hover:opacity-[0.12]"
      />
    </motion.div>

    {/* Top Right Corner Tech Pattern */}
    <div className="absolute top-12 right-12 opacity-[0.03] flex flex-col items-end gap-1 font-mono text-[9px] text-white select-none z-10">
      <div className="flex gap-3">
        <span>SYS.CLK_</span>
        <span>0x8F92A</span>
      </div>
      <div className="w-20 h-[1px] bg-white mt-2" />
      <div className="w-10 h-[1px] bg-white mt-1" />
      {/* CPU Matrix Nodes */}
      <div className="grid grid-cols-5 gap-1.5 mt-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 h-1 bg-white ${i % 3 === 0 ? "opacity-20" : "opacity-100"}`}
          />
        ))}
      </div>
    </div>

    {/* Bottom Left Corner Tech Pattern */}
    <div className="absolute bottom-64 left-12 opacity-[0.03] flex flex-col items-start gap-1 font-mono text-[9px] text-white select-none hidden md:flex">
      {/* Crosshair target */}
      <div className="relative w-8 h-8 mb-4">
        <div className="absolute top-0 left-0 w-2 h-[1px] bg-white" />
        <div className="absolute top-0 left-0 h-2 w-[1px] bg-white" />
        <div className="absolute bottom-0 left-0 w-2 h-[1px] bg-white" />
        <div className="absolute bottom-0 left-0 h-2 w-[1px] bg-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white" />
      </div>
      <div className="flex gap-3">
        <span>MEM_ALLOC</span>
        <span>[NOMINAL]</span>
      </div>
      <div className="w-16 h-[1px] bg-white mt-1" />
    </div>
  </div>
);

const FooterAccordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 lg:border-none">
      {/* Mobile Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex lg:hidden w-full items-center justify-between py-4 text-xs font-space font-bold text-oz-orange tracking-[0.2em] uppercase"
      >
        {title}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Desktop Header */}
      <h4 className="hidden lg:block text-xs font-space font-bold text-oz-orange tracking-[0.2em] uppercase mb-8">
        {title}
      </h4>

      {/* Mobile Animated Content */}
      <div className="lg:hidden">
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.25, ease: "easeOut" },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.15, ease: "easeIn" },
                },
              }}
              className="overflow-hidden"
            >
              <div className="pb-6 pt-2 space-y-3">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Content */}
      <div className="hidden lg:block space-y-3">{children}</div>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-oz-black relative border-t border-white/5 group" aria-label="Site footer">
      <TechCorners />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl pt-24 md:pt-32 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-24">
          {/* Brand Col */}
          <div className="lg:col-span-4">
            <Link href="/" className="block mb-8 w-fit group" aria-label="OzInfra Home">
              {/* Brand Logo with Tagline Image */}
              <Image
                src="/images/brand-logo-tagline.png"
                alt="OzInfra — Enterprise IT Solutions"
                width={280}
                height={70}
                priority
                className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>
            <p className="text-oz-warmgray text-lg leading-relaxed max-w-md mb-10 font-body">
              Engineering the backbone of the digital era. We build unbreakable systems for
              enterprises that demand absolute precision.
            </p>
            <div className="space-y-5">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-4 text-oz-warmgray hover:text-white transition-colors duration-300 group w-fit"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-oz-orange/10 group-hover:border-oz-orange/30 transition-all">
                  <Mail size={16} className="text-oz-orange group-hover:text-oz-orange" />
                </div>
                <span className="font-space tracking-wide text-sm">{CONTACT_INFO.email}</span>
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\\D/g, "")}`}
                className="flex items-center gap-4 text-oz-warmgray hover:text-white transition-colors duration-300 group w-fit"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-oz-orange/10 group-hover:border-oz-orange/30 transition-all">
                  <Phone size={16} className="text-oz-orange group-hover:text-oz-orange" />
                </div>
                <span className="font-space tracking-wide text-sm">{CONTACT_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-4 text-oz-warmgray group w-fit">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center">
                  <MapPin size={16} className="text-oz-orange" />
                </div>
                <span className="font-space tracking-wide text-sm">{CONTACT_INFO.address}</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-10">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "#" },
                { icon: Twitter, label: "Twitter", href: "#" },
                { icon: Github, label: "GitHub", href: "#" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/5 flex items-center justify-center text-oz-warmgray hover:bg-oz-orange hover:border-oz-orange hover:text-white hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all duration-300 group"
                >
                  <social.icon
                    size={18}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-3 lg:col-start-5">
            <FooterAccordion title="Services">
              <ul className="space-y-3" aria-label="Services links">
                {footerLinks.services.map((service) => (
                  <li key={service.path + service.label}>
                    <AnimatedLink href={service.path}>{service.label}</AnimatedLink>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          <div className="lg:col-span-3">
            <FooterAccordion title="Policies">
              <ul className="space-y-3" aria-label="Policies links">
                {footerLinks.policies.map((policy) => (
                  <li key={policy.path}>
                    <AnimatedLink href={policy.path}>{policy.label}</AnimatedLink>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>

          <div className="lg:col-span-2">
            <FooterAccordion title="Company">
              <ul className="space-y-3" aria-label="Company links">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <AnimatedLink href={link.path}>{link.label}</AnimatedLink>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>
        </div>

        {/* Bottom Bar - Terminal Style */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-20 font-mono text-xs">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-oz-warmgray/60">
              <span className="text-oz-orange/70">root@ozinfra:~$</span>
              <span>sys.copyright --year {new Date().getFullYear()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 gap-y-3 justify-items-start sm:justify-end w-full md:w-auto">
            <Link
              href="/privacy"
              className="flex items-center gap-2 text-oz-warmgray/60 hover:text-white transition-colors group"
            >
              <span className="text-oz-orange/50 group-hover:text-oz-orange transition-colors font-bold">
                {">"}
              </span>{" "}
              ./privacy.sh
            </Link>
            <Link
              href="/terms"
              className="flex items-center gap-2 text-oz-warmgray/60 hover:text-white transition-colors group"
            >
              <span className="text-oz-orange/50 group-hover:text-oz-orange transition-colors font-bold">
                {">"}
              </span>{" "}
              ./terms.sh
            </Link>
            <Link
              href="/compliance"
              className="flex items-center gap-2 text-oz-warmgray/60 hover:text-white transition-colors group"
            >
              <span className="text-oz-orange/50 group-hover:text-oz-orange transition-colors font-bold">
                {">"}
              </span>{" "}
              ./compliance.sh
            </Link>
            <Link
              href="/disclaimer"
              className="flex items-center gap-2 text-oz-warmgray/60 hover:text-white transition-colors group"
            >
              <span className="text-oz-orange/50 group-hover:text-oz-orange transition-colors font-bold">
                {">"}
              </span>{" "}
              ./disclaimer.sh
            </Link>
            <Link
              href="/sla"
              className="flex items-center gap-2 text-oz-warmgray/60 hover:text-white transition-colors group"
            >
              <span className="text-oz-orange/50 group-hover:text-oz-orange transition-colors font-bold">
                {">"}
              </span>{" "}
              ./sla.sh
            </Link>
          </div>
        </div>
      </div>

      {/* Colossal Watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden flex items-end justify-center pointer-events-none select-none h-64 md:h-96 z-0">
        <div
          aria-hidden="true"
          className="text-[28vw] md:text-[18vw] font-space font-bold leading-[0.75] text-white/[0.02] translate-y-1/4"
        >
          OZINFRA
        </div>
      </div>
    </footer>
  );
}
