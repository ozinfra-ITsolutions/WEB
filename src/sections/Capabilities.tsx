"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Cloud, Cpu, Clock, MapPin } from "lucide-react";
import TextReveal from "../components/TextReveal";
import { LiquidButton } from "../components/ui/LiquidButton";

const capabilities = [
  {
    title: "Linux System Administration",
    description:
      "Professional Red Hat Enterprise Linux (RHEL) server configuration, Ansible automation, performance monitoring with Nagios, upgrades, and migrations.",
    icon: Cpu,
    tags: ["RHEL Linux", "Ansible Automation", "Nagios Monitoring"],
    anchor: "linux",
  },
  {
    title: "Cloud & Virtualisation",
    description:
      "Scalable Microsoft Azure cloud deployments, Infrastructure-as-Code setup via ARM/Bicep templates, and professional VMware virtualisation support.",
    icon: Cloud,
    tags: ["Azure Cloud", "VMware Virtualisation", "Bicep IaC"],
    anchor: "cloud",
  },
  {
    title: "Networking & Hardware",
    description:
      "Complete network setups for local businesses, cabling, IT hardware rollouts, server deployments, and Microsoft Exchange patching.",
    icon: MapPin,
    tags: ["Network Design", "Cabling & Hardware", "Exchange Server"],
    anchor: "networking",
  },
  {
    title: "After-Hours & Remote Support",
    description:
      "Scheduled server maintenance, proactive monitoring, and upgrades executed after 6pm AEST and during weekends to avoid daytime disruptions.",
    icon: Clock,
    tags: ["After-Hours Ops", "Remote Monitoring", "On-Site Support"],
    anchor: "afterhours",
  },
];

export default function Capabilities() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="bg-oz-bg section-padding" id="capabilities">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <TextReveal
              text="What We Engineer"
              tag="h2"
              className="text-section font-space text-oz-black mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-oz-gray text-lg mb-8 max-w-sm"
            >
              Tailored IT infrastructure engineering for Hobart, Tasmania businesses. Absolute
              system security, automation, and stability.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <LiquidButton href="/services" size="sm" hoverText="View Services">
                View All Services
              </LiquidButton>
            </motion.div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 space-y-0">
          {capabilities.map((cap, index) => (
            <Link href={`/services#${cap.anchor}`} key={cap.title} className="block">
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`border-t-2 border-oz-black/10 py-10 transition-all duration-500 ${
                  hoveredIndex === index ? "bg-oz-surface/50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <cap.icon
                        size={24}
                        className={`transition-colors duration-300 ${
                          hoveredIndex === index ? "text-oz-orange" : "text-oz-gray"
                        }`}
                      />
                      <h3 className="text-card font-space text-oz-black">{cap.title}</h3>
                    </div>
                    <p className="text-oz-gray text-base mb-4 max-w-lg">{cap.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cap.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs font-space uppercase tracking-wider px-3 py-1 border transition-colors duration-300 ${
                            hoveredIndex === index
                              ? "border-oz-orange text-oz-orange"
                              : "border-oz-gray/30 text-oz-gray"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight
                    size={28}
                    className={`mt-2 transition-all duration-300 flex-shrink-0 ${
                      hoveredIndex === index
                        ? "text-oz-orange translate-x-1 -translate-y-1"
                        : "text-oz-gray/40"
                    }`}
                  />
                </div>
              </motion.div>
            </Link>
          ))}
          <div className="border-t-2 border-oz-black/10" />
        </div>
      </div>
    </section>
  );
}
