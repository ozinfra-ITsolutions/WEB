"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import TextReveal from "@/components/TextReveal";

export interface FAQItem {
  question: string;
  answer: string;
  meta?: string;
}

interface FAQ1Props {
  data: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQMonochrome({
  data,
  title = "Focus on the signal, not the noise.",
  subtitle = "Everything you need to know about partnering with our team, condensed into calm monochrome clarity.",
}: FAQ1Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const toggleQuestion = (index: number) => setActiveIndex((prev) => (prev === index ? -1 : index));

  const setCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--faq-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--faq-y", `${event.clientY - rect.top}px`);
  };

  const clearCardGlow = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.currentTarget;
    target.style.removeProperty("--faq-x");
    target.style.removeProperty("--faq-y");
  };

  return (
    <div ref={sectionRef} className="relative w-full overflow-clip bg-oz-surface">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-oz-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-oz-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-32 lg:px-12">
        {/* Split Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* LEFT SIDE: Sticky Context Panel */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-8 h-fit">
              {/* Pre-heading */}
              <motion.p
                className="text-xs uppercase tracking-[0.35em] text-oz-orange font-space font-medium"
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Questions
              </motion.p>

              {/* Title with TextReveal */}
              <TextReveal
                text={title}
                tag="h2"
                className="text-4xl md:text-5xl font-space font-semibold leading-tight text-oz-black"
                delay={0.2}
              />

              {/* Subtitle */}
              <motion.p
                className="text-lg text-oz-gray leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>

              {/* Decorative line */}
              <motion.div
                className="w-16 h-1 bg-oz-orange rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 0.68, 0, 1] }}
                style={{ transformOrigin: "left" }}
              />

              {/* Stats or counter */}
              <motion.div
                className="flex items-center gap-3 pt-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="text-3xl font-space font-bold text-oz-black">{data.length}</span>
                <span className="text-sm text-oz-gray uppercase tracking-wider font-space">
                  Common
                  <br />
                  Questions
                </span>
              </motion.div>
            </div>
          </div>

          {/* RIGHT SIDE: Accordion */}
          <div className="lg:col-span-7">
            <ul className="space-y-4">
              {data.map((item, index) => {
                const open = activeIndex === index;
                const panelId = `faq-panel-${index}`;
                const buttonId = `faq-trigger-${index}`;

                return (
                  <motion.li
                    key={item.question}
                    className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white backdrop-blur-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] transition-shadow duration-500"
                    onMouseMove={setCardGlow}
                    onMouseLeave={clearCardGlow}
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 * index,
                      ease: [0.22, 0.68, 0, 1],
                    }}
                  >
                    {/* Mouse glow */}
                    <div
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                        open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      style={{
                        background: `radial-gradient(240px circle at var(--faq-x, 50%) var(--faq-y, 50%), rgba(234, 88, 12, 0.06), transparent 70%)`,
                      }}
                    />

                    <button
                      type="button"
                      id={buttonId}
                      aria-controls={panelId}
                      aria-expanded={open}
                      onClick={() => toggleQuestion(index)}
                      className="relative flex w-full items-start gap-5 px-7 py-6 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-oz-orange/40"
                    >
                      {/* Icon circle */}
                      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-oz-surface transition-all duration-500 group-hover:scale-105 group-hover:border-oz-orange/20">
                        <span
                          className={`pointer-events-none absolute inset-0 rounded-full border border-black/10 opacity-30 ${
                            open ? "animate-ping" : ""
                          }`}
                        />
                        <svg
                          className={`relative h-4 w-4 text-oz-black transition-transform duration-500 ease-[cubic-bezier(0.22,0.68,0,1)] ${
                            open ? "rotate-45" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 5v14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5 12h14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>

                      <div className="flex flex-1 flex-col gap-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                          <h3 className="text-lg font-medium leading-tight text-oz-black font-space">
                            {item.question}
                          </h3>
                          {item.meta && (
                            <span className="inline-flex w-fit items-center rounded-full border border-black/10 bg-oz-surface px-3 py-0.5 text-[10px] uppercase tracking-[0.3em] text-oz-gray sm:ml-auto whitespace-nowrap">
                              {item.meta}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Animated answer panel - outside button container */}
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.25, delay: 0.05, ease: "easeOut" },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.15, ease: "easeOut" },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-7 pb-6 pl-[4.75rem] text-[15px] leading-relaxed text-oz-gray">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQMonochrome;
