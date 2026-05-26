"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Shield, MapPin, Sparkles } from "lucide-react";
import TextReveal from "../components/TextReveal";
import ScrollReveal from "../components/ScrollReveal";

const sellingPoints = [
  {
    icon: Clock,
    title: "After-Hours Maintenance Operations",
    badge: "Zero Daytime Disruption",
    description:
      "Critical system configuration updates, automated Ansible upgrades, and server upgrades are performed strictly after 6PM AEST or on weekends. Your Hobart business stays fully operational without daytime IT interruptions.",
    details: ["Scheduled evening patching", "Weekend system upgrades", "Ansible change automation"],
  },
  {
    icon: Shield,
    title: "Proactive Remote Management",
    badge: "24/7 Systems Protection",
    description:
      "We track vital server metrics and performance indicators remotely around the clock using systems like Nagios. By spotting disk capacity limits, load warnings, or connectivity stutters early, we fix them before they affect operations.",
    details: ["Nagios metric tracking", "Immediate alert response", "Proactive security updates"],
  },
  {
    icon: MapPin,
    title: "Weekend Hobart On-Site Deployments",
    badge: "Locally Responsive Support",
    description:
      "For office network setups, structured cabling, hardware rollouts, and physical server migrations, our engineers deploy on-site during weekends to keep standard office hours fully productive.",
    details: [
      "Structured network cabling",
      "Hardware server installation",
      "Hobart & Tasmania response",
    ],
  },
];

export default function SellingPoint() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-24 md:py-32 z-20 border-t border-black/5"
      id="selling-point"
      aria-label="Core operational selling points"
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-oz-orange font-space font-medium mb-4 flex items-center justify-center gap-2 tracking-[0.2em] uppercase text-xs">
            <Sparkles className="w-4 h-4" />
            Operations Advantage
          </span>
          <TextReveal
            text="Support Engineered Around Your Business"
            tag="h2"
            className="text-4xl md:text-5xl lg:text-6xl font-space text-oz-black mb-6"
            delay={0.1}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-oz-gray text-lg md:text-xl leading-relaxed font-body"
          >
            We manage your Linux servers, Azure clouds, and network systems when your business is
            offline. Absolute stability with zero daytime operational impact.
          </motion.p>
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sellingPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <ScrollReveal key={point.title} direction="up" delay={0.15 * index}>
                <div
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`h-full bg-oz-bg border border-black/5 rounded-[2rem] p-8 lg:p-10 relative overflow-hidden transition-all duration-500 flex flex-col justify-between ${
                    hoveredIndex === index
                      ? "shadow-[0_20px_48px_-12px_rgba(248,91,27,0.12)] border-oz-orange/20 scale-[1.01]"
                      : "shadow-[0_4px_24px_-4px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  {/* Glowing background highlights */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-700 pointer-events-none opacity-0 ${
                      hoveredIndex === index ? "opacity-100" : ""
                    }`}
                    style={{
                      background: `radial-gradient(300px circle at 50% 10%, rgba(248, 91, 27, 0.04), transparent 70%)`,
                    }}
                  />

                  <div>
                    {/* Header: Icon & Badge */}
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ease-out ${
                          hoveredIndex === index
                            ? "bg-oz-orange text-white shadow-lg shadow-oz-orange/30 scale-105"
                            : "bg-oz-orange/10 text-oz-orange"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-[9px] font-space uppercase tracking-[0.2em] px-3 py-1.5 border transition-all duration-500 font-bold ${
                          hoveredIndex === index
                            ? "border-oz-orange/30 text-oz-orange bg-oz-orange/5"
                            : "border-black/10 text-oz-gray bg-white"
                        }`}
                      >
                        {point.badge}
                      </span>
                    </div>

                    {/* Content Title & Description */}
                    <h3 className="text-xl md:text-2xl font-space font-medium text-oz-black mb-4 relative z-10">
                      {point.title}
                    </h3>
                    <p className="text-oz-gray text-[15px] leading-relaxed mb-8 relative z-10 font-body">
                      {point.description}
                    </p>
                  </div>

                  {/* Checklist detail items */}
                  <ul className="space-y-3 border-t border-black/5 pt-6 relative z-10">
                    {point.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-3 text-xs font-space text-oz-black/75"
                      >
                        <CheckIcon className="w-3.5 h-3.5 text-oz-orange shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
