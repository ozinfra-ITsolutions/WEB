"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Shield, Cloud, Cpu } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { LiquidButton } from "../components/ui/LiquidButton";
import { getAssetPath } from "@/lib/utils";

const PARTICLE_COUNT = 80;

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return prefersReducedMotion;
}

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.3 + 0.1,
    xOffset: Math.random() * 20 - 10,
  }));
}

export default function Hero() {
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Premium Scroll Tracking for fade out
  const { scrollY } = useScroll();

  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const contentBlur = useTransform(scrollY, [0, 450], ["blur(0px)", "blur(20px)"]);
  const contentY = useTransform(scrollY, [0, 450], [0, -60]);
  const bgOpacity = useTransform(scrollY, [0, 650], [1, 0]);
  const bgBlur = useTransform(scrollY, [0, 650], ["blur(0px)", "blur(25px)"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  // Generate particles only on the client to avoid hydration mismatch
  useEffect(() => {
    setParticles(generateParticles());
    setMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative md:sticky md:top-0 w-full min-h-screen overflow-hidden bg-oz-black flex items-center z-10"
    >
      {/* Background image with parallax-style offset */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity: bgOpacity, filter: bgBlur }}>
        <div
          className="w-full h-full relative"
          style={{
            transform: `translate(${(mousePos.x - 0.5) * -10}px, ${(mousePos.y - 0.5) * -10}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <Image
            src={getAssetPath("/images/home-hero.webp")}
            alt="Enterprise server racks in Hobart data center with glowing orange LED indicator lights"
            fill
            sizes="100vw"
            priority
            className="w-full h-full object-cover opacity-20 scale-110 pointer-events-none select-none"
          />
        </div>
      </motion.div>

      {/* Dark gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-oz-black via-oz-black/80 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-oz-black via-transparent to-oz-black/50" />

      {/* Floating particles */}
      {/* Floating particles — rendered only after mount to prevent hydration mismatch */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {mounted &&
          !prefersReducedMotion &&
          particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-oz-orange"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
                opacity: p.opacity,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, p.xOffset, 0],
                opacity: [p.opacity, p.opacity * 1.5, p.opacity],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      {/* Interactive glow following mouse */}
      <div
        className="absolute z-[3] w-[600px] h-[600px] rounded-full pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, var(--oz-primary) 0%, transparent 70%)",
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.5s ease-out, top 0.5s ease-out",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full flex flex-col justify-center min-h-screen px-6 sm:px-12 md:px-16 lg:px-20 pt-28 pb-16 md:py-20"
        style={{ opacity: contentOpacity, y: contentY, filter: contentBlur }}
      >
        <div className="max-w-5xl xl:max-w-6xl w-full">
          {/* Headline - Word by Word Reveal */}
          <motion.h1
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.4 },
              },
            }}
            className="text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.95] font-space text-oz-bg mb-6 flex flex-wrap gap-x-[0.25em] gap-y-[0.1em] tracking-[-0.03em] lg:tracking-[-0.04em] font-medium"
          >
            {["Enterprise", "IT", "Support", "&"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: "110%" },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-block overflow-hidden"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: "110%" },
                show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="inline-block overflow-hidden"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-oz-orange to-[#ff8c5a]">
                Infrastructure
              </span>
            </motion.span>
            {["in", "Hobart,", "Tasmania"].map((word, i) => (
              <motion.span
                key={`post-${i}`}
                variants={{
                  hidden: { opacity: 0, y: "110%" },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-block overflow-hidden"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <ScrollReveal delay={0.8} direction="up">
            <p className="text-base md:text-lg lg:text-xl text-oz-warmgray mb-8 max-w-2xl font-body leading-relaxed">
              Professional Linux administration, Microsoft Azure deployments, VMware support, and
              dedicated after-hours server maintenance for local businesses—engineering absolute
              system stability.
            </p>
          </ScrollReveal>

          {/* CTA buttons */}
          <ScrollReveal delay={0.2} direction="up">
            <div className="flex flex-wrap gap-4 mb-10">
              <LiquidButton
                href="/contact#contact-form"
                variant="white"
                hoverText="Let's Go!"
                icon={<ArrowRight size={16} />}
              >
                Start Your Project
              </LiquidButton>
              <LiquidButton href="/services" variant="white-outline" hoverText="Our Services">
                Explore Services
              </LiquidButton>
            </div>
          </ScrollReveal>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: Cloud, label: "Azure & Cloud" },
              { icon: Shield, label: "After-Hours Support" },
              { icon: Cpu, label: "Linux Systems" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 text-white group"
                aria-label={item.label}
              >
                <motion.div
                  className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-oz-orange/50 transition-colors duration-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                  >
                    <item.icon
                      size={18}
                      className="text-white group-hover:text-oz-orange transition-colors duration-500"
                    />
                  </motion.div>
                </motion.div>
                <span className="text-sm font-space uppercase tracking-wider text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator for desktop curtain reveal */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 pointer-events-none"
        style={{ opacity: contentOpacity }}
      >
        <span className="font-space text-[10px] tracking-[0.3em] uppercase text-white/40">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          className="w-5 h-8 border border-white/20 rounded-full flex justify-center p-1"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1.5 h-1.5 bg-oz-orange rounded-full"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
