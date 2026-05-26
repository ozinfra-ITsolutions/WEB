"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import TextReveal from "../components/TextReveal";
import { LiquidButton } from "../components/ui/LiquidButton";

export default function CTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-oz-orange section-padding"
      id="cta"
    >
      <div className="relative z-10 max-w-4xl">
        <TextReveal
          text="Ready to Build Something Unbreakable?"
          tag="h2"
          className="text-section font-space text-oz-bg mb-8"
        />
        <div
          className={`transition-all duration-1000 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-oz-bg/80 text-lg max-w-xl mb-10">
            Professional RHEL Linux administration, Azure deployments, VMware virtualisation,
            network setups, and dedicated after-hours support—built securely for businesses in
            Hobart, Tasmania. Let&apos;s discuss your requirements.
          </p>
          <div className="flex flex-wrap gap-4">
            <LiquidButton
              href="/contact#contact-form"
              variant="white-to-black"
              hoverText="Let's Go!"
            >
              Start Your Project
            </LiquidButton>
            <LiquidButton href="/services" variant="orange-outline" hoverText="Our Services">
              Explore Services
            </LiquidButton>
          </div>
        </div>
      </div>

      <div
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #FAFAFA 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-10 left-1/2 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #FAFAFA 0%, transparent 70%)" }}
      />
    </section>
  );
}
