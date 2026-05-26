"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Cloud, Cpu, Clock, Server, Check, ArrowRight, Plus } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import OzInfraFAQ from "@/sections/FAQ";
import { servicesFAQs } from "@/data/faqData";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
import { LiquidButton } from "@/components/ui/LiquidButton";

const services = [
  {
    id: "linux",
    icon: Server,
    title: "Linux System Administration Services",
    subtitle: "Red Hat Enterprise Linux",
    description:
      "Professional RHEL Linux server configuration, deployment, and ongoing administration for Australian businesses. From RHEL 7 through 9, we handle performance tuning with Nagios monitoring, Ansible automation patching, server upgrades, modernisation, and complete system migrations — keeping your infrastructure secure, stable, and optimised.",
    features: [
      "RHEL Linux Server Configuration",
      "RHEL 7 / 8 / 9 Administration",
      "Server Deployment & Troubleshooting",
      "Performance Tuning & Nagios Monitoring",
      "Ansible Automation & After-Hours Patching",
      "Server Upgrades & Modernisation",
      "Red Hat Enterprise Linux Administration",
      "System Migration",
    ],
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud & Virtualisation Services",
    subtitle: "Azure & VMware Solutions",
    description:
      "End-to-end Microsoft Azure cloud services and VMware virtualisation support for scalable, cost-effective infrastructure. We deploy and automate Azure VMs, build Infrastructure-as-Code with ARM and Bicep templates, and manage VMware environments — helping Australian businesses modernise their IT with confidence.",
    features: [
      "Microsoft Azure Services",
      "Azure VM Deployments & Automation",
      "Infrastructure-as-Code (ARM/Bicep)",
      "VMware Virtualisation & Support",
    ],
  },
  {
    id: "networking",
    icon: Cpu,
    title: "Networking & Hardware Services",
    subtitle: "Business IT Infrastructure",
    description:
      "Complete networking and hardware solutions for small and medium Australian businesses. We design and deploy networks, manage cabling, execute hardware rollouts, and provide ongoing IT infrastructure support — including Exchange Server patching and day-to-day business networking assistance.",
    features: [
      "Network Setups for Small Businesses",
      "Network Design & Cabling",
      "Hardware Rollouts",
      "IT Infrastructure Deployment",
      "Basic Business Networking Support",
      "Exchange Server Patching",
    ],
  },
  {
    id: "afterhours",
    icon: Clock,
    title: "After Hours, Remote & Onsite Support",
    subtitle: "24/7 Infrastructure Support",
    description:
      "Scheduled and after-hours patching support with remote monitoring and on-site deployment across Australia. Whether it\u2019s an emergency patch at midnight or a planned maintenance window, our team ensures your Linux servers, Azure environments, and network infrastructure stay operational around the clock.",
    features: [
      "Scheduled & After-Hours Patching",
      "Remote Infrastructure Monitoring",
      "On-Site Technical Deployment",
      "Emergency Incident Response",
      "Proactive Maintenance & Health Checks",
      "SLA-Backed Response Times",
    ],
  },
];

export default function Services() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleHashCheck = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = window.location.hash.replace("#", "");
        const validIds = ["linux", "cloud", "networking", "afterhours"];
        if (validIds.includes(hash)) {
          setExpandedService(hash);
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 200);
        }
      }
    };

    // Run on initial mount
    handleHashCheck();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashCheck);
    return () => window.removeEventListener("hashchange", handleHashCheck);
  }, []);

  return (
    <main id="main-content">
      {/* Hero — Premium Split Layout */}
      <section
        ref={heroRef}
        className="relative bg-oz-black min-h-[70vh] flex items-center overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24"
      >
        {/* Subtle radial gradient background instead of image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(245, 130, 32, 0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 20% 80%, rgba(245, 130, 32, 0.04) 0%, transparent 60%)",
            }}
          />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 section-padding w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left — Text Content */}
            <motion.div
              className="flex-1 max-w-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Removed preheading badge per plan */}

              <TextReveal
                text="Enterprise Linux & Cloud Infrastructure Services"
                tag="h1"
                className="text-section font-space text-oz-bg"
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-oz-warmgray text-lg max-w-xl mt-6 mb-10 leading-relaxed"
              >
                Professional Linux administration, Azure infrastructure, networking, server
                deployment, and after-hours support for Australian businesses.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <LiquidButton
                  href="/contact"
                  variant="white"
                  hoverText="Get a Quote"
                  icon={<ArrowRight size={16} />}
                >
                  Start Your Project
                </LiquidButton>
              </motion.div>
            </motion.div>

            {/* Right — CPU Architecture Visualization */}
            <motion.div
              className="flex-1 w-full max-w-xl lg:max-w-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative">
                {/* Glow effect behind the CPU visualization */}
                <div
                  className="absolute inset-0 blur-3xl opacity-20 -z-10"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, var(--oz-primary), transparent 70%)",
                  }}
                />
                {/* CPU Architecture SVG — only render after mount to avoid SSR */}
                <div className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
                  {mounted && (
                    <CpuArchitecture text="OZINFRA" className="text-oz-warmgray/40 w-full h-auto" />
                  )}
                  {/* Subtle corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-oz-orange/20 rounded-tl-2xl" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-oz-orange/20 rounded-tr-2xl" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-oz-orange/20 rounded-bl-2xl" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-oz-orange/20 rounded-br-2xl" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-oz-bg section-padding">
        <div className="mb-16">
          <TextReveal
            text="Our Core Services"
            tag="h2"
            className="text-section font-space text-oz-black mb-4"
          />
          <p className="text-oz-gray text-lg max-w-xl">
            Reliable infrastructure support across Australia. Expand each service below to see what
            we deliver.
          </p>
        </div>
        <div className="space-y-0">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} direction="up" delay={0.1 * index}>
              <div
                id={service.id}
                className={`border-t-2 border-oz-black/10 transition-all duration-500 scroll-mt-32 ${
                  expandedService === service.id ? "bg-oz-surface/50" : ""
                }`}
              >
                <button
                  onClick={() =>
                    setExpandedService(expandedService === service.id ? null : service.id)
                  }
                  className="w-full py-8 lg:py-10 px-4 lg:px-8 flex items-start justify-between gap-4 lg:gap-6 text-left group"
                >
                  <div className="flex items-start gap-6 flex-1">
                    <service.icon
                      size={24}
                      className={`mt-1 transition-colors duration-300 flex-shrink-0 lg:w-7 lg:h-7 lg:h-7 ${
                        expandedService === service.id ? "text-oz-orange" : "text-oz-gray"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-6 mb-2">
                        <h3 className="text-xl lg:text-2xl font-space font-medium text-oz-black">
                          {service.title}
                        </h3>
                        <span className="text-xs font-space uppercase tracking-wider text-oz-orange border border-oz-orange/30 px-3 py-1 w-fit">
                          {service.subtitle}
                        </span>
                      </div>
                      <p className="text-oz-gray text-base max-w-2xl">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 mt-1 transition-all duration-300 flex items-center gap-2">
                    <span
                      className={`text-xs font-space uppercase tracking-[0.2em] font-medium transition-all duration-300 hidden md:inline-block ${
                        expandedService === service.id
                          ? "text-oz-orange"
                          : "text-oz-gray/60 group-hover:text-oz-orange"
                      }`}
                    >
                      {expandedService === service.id ? "Collapse" : "Expand"}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedService === service.id ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                        expandedService === service.id
                          ? "border-oz-orange bg-oz-orange/10 text-oz-orange"
                          : "border-oz-black/10 text-oz-gray group-hover:border-oz-orange group-hover:text-oz-orange"
                      }`}
                    >
                      <Plus size={16} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {expandedService === service.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.4, ease: [0.22, 0.68, 0, 1] },
                          opacity: { duration: 0.3, delay: 0.1, ease: "easeOut" },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.35, ease: [0.22, 0.68, 0, 1] },
                          opacity: { duration: 0.2, ease: "easeOut" },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 lg:px-8 pb-10 pl-4 sm:pl-16 lg:pl-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                          {service.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-3 py-2">
                              <Check size={16} className="text-oz-orange flex-shrink-0" />
                              <span className="text-oz-black font-space">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8">
                          <LiquidButton href="/contact" size="sm" hoverText="Fill Form">
                            Configure Solution
                          </LiquidButton>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
          <div className="border-t-2 border-oz-black/10" />
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-oz-orange section-padding">
        <div className="max-w-3xl">
          <h2 className="text-section font-space text-oz-bg mb-6">
            Need Reliable Infrastructure Support?
          </h2>
          <p className="text-oz-bg/80 text-lg mb-10 max-w-xl">
            Every Australian business deserves secure, stable, and scalable IT infrastructure. Let
            us assess your Linux, Azure, networking, or support needs and recommend the right
            solution — no obligation.
          </p>
          <LiquidButton href="/contact" variant="white-to-black" hoverText="Book Now">
            Schedule a Consultation
          </LiquidButton>
        </div>
      </section>

      <OzInfraFAQ
        faqs={servicesFAQs}
        title="Service FAQs"
        subtitle="Common questions about our Linux, Azure, networking, and after-hours support services."
        variant="dark"
      />
    </main>
  );
}
