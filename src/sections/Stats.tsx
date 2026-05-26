"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import TextReveal from "../components/TextReveal";

const stats = [
  { value: 100, suffix: "%", label: "Local Support (Hobart)" },
  { value: 15, suffix: "m", label: "Critical Response SLA" },
  { value: 99, suffix: ".9%", label: "Availability Target" },
  { value: 24, suffix: "/7", label: "Proactive Monitoring" },
];

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="bg-oz-black section-padding" id="stats">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <div>
          <TextReveal
            text="Numbers That Speak"
            tag="h2"
            className="text-section font-space text-oz-bg"
          />
        </div>
        <div className="flex items-end">
          <p
            className={`text-oz-warmgray text-lg transition-all duration-1000 delay-300 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            We do not just promise results. We deliver measurable impact that transforms how
            enterprises operate in the digital landscape.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-oz-warmgray/20">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`bg-oz-black p-10 lg:p-14 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
          >
            <div className="text-4xl lg:text-6xl font-space font-medium text-oz-orange mb-3">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
            </div>
            <div className="text-sm font-space uppercase tracking-wider text-oz-warmgray">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
