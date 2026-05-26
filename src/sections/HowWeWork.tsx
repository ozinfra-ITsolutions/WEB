"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, Lightbulb, Rocket, HeadphonesIcon } from "lucide-react";
import TextReveal from "../components/TextReveal";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Audit & Discover",
    description:
      "We perform a meticulous audit of your current Red Hat Enterprise Linux servers, Azure virtual environments, or business networks in Hobart to identify system vulnerabilities.",
    details: [
      "Hobart Infrastructure Audit",
      "RHEL & Azure Performance Check",
      "Network Cabling Diagnostics",
    ],
    accent: "from-oz-orange/20 to-transparent",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Architect & Schedule",
    description:
      "Our engineers design custom Azure Bicep IaC templates, VMware blueprints, or Ansible patching playbooks—complete with dedicated after-hours maintenance windows.",
    details: [
      "Bicep & ARM Cloud blueprints",
      "Ansible Automation Playbooks",
      "After-Hours Change Management",
    ],
    accent: "from-oz-orange/15 to-transparent",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Configure & Deploy",
    description:
      "Precision deployment with zero operational impact. All server configuration upgrades, hardware rollouts, or cabling installations are executed during scheduled maintenance periods.",
    details: [
      "Weekend Cable & Server Installs",
      "Zero Daytime Business Downtime",
      "Automated Configuration Checks",
    ],
    accent: "from-oz-orange/10 to-transparent",
  },
  {
    number: "04",
    icon: HeadphonesIcon,
    title: "Monitor & Support",
    description:
      "Continuous system protection. We monitor server metrics remotely via systems like Nagios and stand ready with responsive on-site and remote technical support.",
    details: [
      "Nagios Remote Monitoring",
      "Hobart On-Site Intervention",
      "Proactive Support Schedules",
    ],
    accent: "from-oz-orange/5 to-transparent",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-oz-bg overflow-hidden"
      aria-label="How We Work"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          <div>
            <span className="text-oz-orange text-xs uppercase tracking-[0.35em] font-space mb-4 block">
              Our Process
            </span>
            <TextReveal
              text="How We Engineer Excellence"
              tag="h2"
              className="text-section font-space text-oz-black"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-end"
          >
            <p className="text-oz-gray text-lg max-w-md">
              A proven four-phase methodology that transforms complexity into clarity. Every
              engagement follows this battle-tested framework.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[29px] top-0 bottom-0 w-px bg-gradient-to-b from-oz-orange via-oz-orange/30 to-transparent hidden lg:block" />

          <div className="space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + index * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative border-b border-oz-border-light py-8 md:py-12"
              >
                <div className="flex flex-col md:grid md:grid-cols-[60px_1fr] gap-6 md:gap-10 items-start relative overflow-hidden group-hover:bg-gradient-to-r group-hover:from-oz-orange/5 group-hover:to-transparent transition-all duration-700 px-4 md:px-10">
                  {/* Step number watermark */}
                  <div className="absolute top-4 right-6 text-7xl md:text-8xl font-space font-bold text-oz-black/[0.03] select-none pointer-events-none">
                    {step.number}
                  </div>

                  {/* Icon & Title Row for Mobile, Left Col for Desktop */}
                  <div className="flex items-center md:items-start gap-4 md:gap-0 md:flex-col relative z-10 w-full md:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-oz-black flex items-center justify-center relative group-hover:bg-oz-orange transition-colors duration-500 flex-shrink-0"
                    >
                      <step.icon size={20} className="text-oz-bg relative z-10 md:hidden" />
                      <step.icon size={24} className="text-oz-bg relative z-10 hidden md:block" />
                      {/* Pulse ring on hover */}
                      <div className="absolute inset-0 border-2 border-oz-orange opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
                    </motion.div>

                    {/* On mobile, show phase & title next to icon */}
                    <div className="md:hidden">
                      <span className="text-[10px] font-space uppercase tracking-[0.25em] text-oz-orange font-medium block mb-0.5">
                        Phase {step.number}
                      </span>
                      <h3 className="text-xl font-space text-oz-black font-semibold">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content card (Desktop has title here, Mobile only has description & details) */}
                  <div className="relative z-10 w-full md:pt-1">
                    {/* Desktop Title Header */}
                    <div className="hidden md:block">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-space uppercase tracking-[0.35em] text-oz-orange font-medium">
                          Phase {step.number}
                        </span>
                        <div className="h-px flex-1 bg-oz-border-light max-w-[100px]" />
                      </div>
                      <h3 className="text-card font-space text-oz-black mb-4">{step.title}</h3>
                    </div>

                    <p className="text-oz-gray text-base mb-6 max-w-2xl leading-relaxed">
                      {step.description}
                    </p>

                    {/* Detail pills */}
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {step.details.map((detail) => (
                        <motion.span
                          key={detail}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.5,
                            delay: 0.4 + index * 0.15,
                          }}
                          className="text-xs font-space uppercase tracking-wider px-3 py-1.5 md:px-4 md:py-2 border border-oz-border-light text-oz-gray group-hover:border-oz-orange/30 group-hover:text-oz-orange transition-all duration-500"
                        >
                          {detail}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
