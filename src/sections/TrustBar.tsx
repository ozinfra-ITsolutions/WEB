"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cloud, Shield, Cpu, Server, Globe, Zap, Clock } from "lucide-react";

const techTags = [
  { name: "Red Hat Enterprise Linux (RHEL)", icon: Cpu },
  { name: "Microsoft Azure Cloud", icon: Cloud },
  { name: "VMware Virtualisation", icon: Server },
  { name: "Ansible Automation & Patching", icon: Zap },
  { name: "Nagios Systems Monitoring", icon: Shield },
  { name: "After-Hours Support Operations", icon: Clock },
  { name: "Hobart, Tasmania IT Support", icon: Globe },
  { name: "Network Setup & Cabling", icon: Cpu },
  { name: "Exchange Server Patching", icon: Server },
  { name: "Systems Migration & Upgrades", icon: Zap },
];

export default function TrustBar() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const duplicatedClients = [...techTags, ...techTags];

  return (
    <section
      ref={sectionRef}
      className="relative bg-oz-black overflow-hidden py-20 z-20 shadow-[0_-30px_60px_rgba(0,0,0,0.8)]"
      aria-label="Core infrastructure services and tech stacks"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-14 px-6"
      >
        <span className="text-oz-orange text-xs uppercase tracking-[0.35em] font-space mb-3 block">
          Enterprise Tech Stack & Services
        </span>
        <p className="text-oz-warmgray text-lg font-space max-w-lg mx-auto">
          Delivering absolute stability through proven enterprise solutions in Hobart, Tasmania.
        </p>
      </motion.div>

      {/* Marquee */}
      <div className="relative overflow-hidden w-full">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-oz-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-oz-black to-transparent z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="flex animate-marquee whitespace-nowrap w-max">
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex items-center gap-3 px-10 py-4 group"
              >
                <client.icon
                  size={22}
                  className="text-oz-warmgray/50 group-hover:text-oz-orange transition-colors duration-500 flex-shrink-0"
                />
                <span className="text-oz-warmgray/60 font-space text-base font-medium whitespace-nowrap group-hover:text-oz-bg transition-colors duration-500 tracking-wide">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
