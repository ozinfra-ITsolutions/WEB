"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TextReveal from "../components/TextReveal";

const projects = [
  {
    title: "Enterprise Cloud Migration",
    category: "Cloud Architecture",
    image: "/images/project-1.webp",
    description: "Seamless migration of 200+ enterprise workloads to Azure with zero downtime.",
  },
  {
    title: "Multi-Cloud Infrastructure",
    category: "Infrastructure",
    image: "/images/project-2.webp",
    description: "Global cloud network connecting 12 data centers across 3 continents.",
  },
  {
    title: "Security Operations Center",
    category: "Cybersecurity",
    image: "/images/project-3.webp",
    description: "Real-time threat monitoring system processing 10M+ events daily.",
  },
  {
    title: "Digital Transformation",
    category: "Consulting",
    image: "/images/project-4.webp",
    description: "Complete digital overhaul for Fortune 500 manufacturing client.",
  },
];

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="bg-oz-surface section-padding" id="casestudies">
      <div className="mb-16">
        <TextReveal
          text="Case Studies"
          tag="h2"
          className="text-section font-space text-oz-black mb-4"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-oz-gray text-lg max-w-xl"
        >
          Real-world solutions engineered for enterprises that demand excellence. Every project is a
          testament to precision.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Link href="/services" key={project.title} className="block">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group cursor-pointer transition-all duration-500 ${
                hoveredIndex !== null && hoveredIndex !== index ? "opacity-50 scale-[0.98]" : ""
              } ${hoveredIndex === index ? "scale-[1.02]" : ""}`}
            >
              <div className="relative overflow-hidden bg-oz-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`w-full aspect-[4/3] object-cover transition-all duration-700 ${
                    hoveredIndex === index ? "scale-110 brightness-110" : ""
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-oz-black/80 via-transparent to-transparent transition-opacity duration-500 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 ${
                    hoveredIndex === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <p className="text-oz-bg/80 text-sm mb-2">{project.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-5">
                <div>
                  <span className="text-xs font-space uppercase tracking-wider text-oz-orange mb-1 block">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-space font-medium text-oz-black">{project.title}</h3>
                </div>
                <ArrowUpRight
                  size={24}
                  className={`transition-all duration-300 ${
                    hoveredIndex === index
                      ? "text-oz-orange translate-x-1 -translate-y-1"
                      : "text-oz-gray/40"
                  }`}
                />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
