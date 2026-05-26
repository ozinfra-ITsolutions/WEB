"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import TextReveal from "../components/TextReveal";
import ParticleField from "../components/ParticleField";

export default function TechStack() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

  return (
    <section
      ref={sectionRef}
      id="techstack"
      className="relative w-full overflow-hidden bg-oz-bg"
      style={{ height: "100vh" }}
    >
      <ParticleField />

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-6">
          <TextReveal
            text="GLOBAL REACH"
            tag="h2"
            className="text-display font-space text-oz-black mb-6"
          />
          <div
            className={`transition-all duration-1000 delay-500 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-oz-gray text-lg max-w-xl mx-auto mb-10">
              Our infrastructure spans continents, delivering seamless IT solutions across the
              globe. From cloud deployments to on-site support, we are everywhere you need us to be.
            </p>
            <div className="flex items-center justify-center gap-16 text-oz-black">
              <div className="text-center">
                <div className="text-4xl font-space font-medium text-oz-orange">50+</div>
                <div className="text-sm text-oz-gray uppercase tracking-wider mt-1">Countries</div>
              </div>
              <div className="w-px h-12 bg-oz-gray/20" />
              <div className="text-center">
                <div className="text-4xl font-space font-medium text-oz-orange">99.9%</div>
                <div className="text-sm text-oz-gray uppercase tracking-wider mt-1">Uptime SLA</div>
              </div>
              <div className="w-px h-12 bg-oz-gray/20" />
              <div className="text-center">
                <div className="text-4xl font-space font-medium text-oz-orange">24/7</div>
                <div className="text-sm text-oz-gray uppercase tracking-wider mt-1">Operations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
