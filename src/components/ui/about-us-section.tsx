"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Server,
  Shield,
  Cloud,
  Cpu,
  Network,
  Activity,
  CheckCircle,
  Sparkles,
  Star,
  Zap,
  ArrowRight,
} from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { LiquidButton } from "./LiquidButton";

interface ServiceType {
  icon: React.ReactNode;
  secondaryIcon: React.ReactNode;
  title: string;
  description: string;
  position: string;
}

export default function AboutUsSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const services: ServiceType[] = [
    {
      icon: <Server className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-oz-warmgray" />,
      title: "Proactive Monitoring",
      description:
        "We identify and resolve infrastructure issues before they impact your operations. Continuous health checks across your Linux servers and cloud environments keep your business running smoothly.",
      position: "left",
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-oz-warmgray" />,
      title: "Planned Maintenance",
      description:
        "Infrastructure upgrades, patching, and migrations performed during evenings, weekends, and low-impact business periods — minimising disruption to your day-to-day operations.",
      position: "left",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-oz-warmgray" />,
      title: "Security-First Approach",
      description:
        "Every server deployment, network setup, and cloud configuration follows strict security best practices. We protect your data and systems from the ground up.",
      position: "left",
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-oz-warmgray" />,
      title: "Hands-On Expertise",
      description:
        "Direct access to experienced engineers specialising in RHEL Linux, Azure cloud, VMware virtualisation, and business networking. No call centres, no runarounds — real technical support.",
      position: "right",
    },
    {
      icon: <Network className="w-6 h-6" />,
      secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-oz-warmgray" />,
      title: "Operational Continuity",
      description:
        "Our infrastructure support is designed around your business requirements. We ensure smooth operations during upgrades, migrations, and system changes with structured change management.",
      position: "right",
    },
    {
      icon: <Activity className="w-6 h-6" />,
      secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-oz-warmgray" />,
      title: "Long-Term Stability",
      description:
        "Solutions built for sustained performance and future growth. Ongoing support and maintenance keep your infrastructure reliable, so you can focus on running your business.",
      position: "right",
    },
  ];

  if (!isMounted) {
    return <AboutUsMobile services={services} />;
  }

  if (isMobile) {
    return <AboutUsMobile services={services} />;
  }

  return <AboutUsSectionDesktopWrapper services={services} />;
}

function AboutUsSectionDesktopWrapper({ services }: { services: ServiceType[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 200vh Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Beat 1: Hook Animations (Fades and shrinks as user scrolls)
  const hookOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const hookScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const hookBlur = useTransform(scrollYProgress, [0, 0.3], ["blur(0px)", "blur(20px)"]);

  // Beat 2: Grid Animations (Slides up like a solid curtain)
  const gridY = useTransform(scrollYProgress, [0.1, 0.6], ["100%", "0%"]);

  // Content slides into place perfectly synced with the curtain pull
  const leftX = useTransform(scrollYProgress, [0.1, 0.6], [-100, 0]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.6], [100, 0]);
  const imageY = useTransform(scrollYProgress, [0.1, 0.6], [100, 0]);

  // Floating accent parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <AboutUsDesktop
      sectionRef={sectionRef}
      y1={y1}
      y2={y2}
      rotate1={rotate1}
      rotate2={rotate2}
      hookOpacity={hookOpacity}
      hookScale={hookScale}
      hookBlur={hookBlur}
      gridY={gridY}
      leftX={leftX}
      imageY={imageY}
      rightX={rightX}
      services={services}
    />
  );
}

function AboutUsMobile({ services }: { services: ServiceType[] }) {
  const mobileRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mobileRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -30]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.4], ["blur(0px)", "blur(15px)"]);

  return (
    <section
      id="about-section"
      ref={mobileRef}
      className="w-full h-auto bg-oz-black text-oz-white relative pb-16 pt-12"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-oz-orange/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-oz-primary/5 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Beat 1: The Hook */}
      <motion.div
        className="relative flex flex-col items-center justify-center px-4 z-10 py-12"
        style={{ opacity: heroOpacity, y: heroY, filter: heroBlur }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center mb-6">
          <span className="text-oz-orange font-space font-medium mb-4 flex items-center gap-2 tracking-[0.2em] uppercase text-xs">
            <Zap className="w-4 h-4" />
            About OzInfra
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-space text-center text-oz-white mb-6">
            Modern Infrastructure Support Without Enterprise Overhead
          </h1>
          <div className="w-24 h-1 bg-oz-orange mb-6"></div>
        </div>

        <p className="text-center max-w-3xl mx-auto mb-12 text-oz-warmgray text-xl leading-relaxed">
          Businesses rely on stable infrastructure, secure systems, and dependable operational
          support. Whether it&apos;s maintaining Linux environments, deploying cloud infrastructure,
          or supporting business networking needs — we keep operations efficient, secure, and
          running smoothly from Hobart, Tasmania.
        </p>
      </motion.div>

      {/* Beat 2: The Grid Reveal */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 bg-oz-black pt-12 pb-12 w-full">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {/* Left Column */}
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  delay={index * 0.2}
                />
              ))}
          </motion.div>

          {/* Center Image */}
          <motion.div
            className="flex justify-center items-center order-first md:order-none mb-12 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-sm">
              <div className="rounded-xl overflow-hidden shadow-2xl relative border border-white/5">
                <img
                  src="/images/about-hero.webp"
                  alt="Modern enterprise server infrastructure in Hobart, Tasmania"
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oz-black via-oz-black/20 to-transparent flex items-end justify-center p-8">
                  <LiquidButton
                    href="/services"
                    variant="dark"
                    hoverText="Let's Go!"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Our Expertise
                  </LiquidButton>
                </div>
              </div>
              <div className="absolute inset-0 border border-oz-orange/30 rounded-xl -m-4 z-[-1]"></div>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="space-y-16"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  delay={index * 0.2}
                />
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface AboutUsDesktopProps {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  y1: MotionValue<number>;
  y2: MotionValue<number>;
  rotate1: MotionValue<number>;
  rotate2: MotionValue<number>;
  hookOpacity: MotionValue<number>;
  hookScale: MotionValue<number>;
  hookBlur: MotionValue<string>;
  gridY: MotionValue<string>;
  leftX: MotionValue<number>;
  imageY: MotionValue<number>;
  rightX: MotionValue<number>;
  services: ServiceType[];
}

function AboutUsDesktop({
  sectionRef,
  y1,
  y2,
  rotate1,
  rotate2,
  hookOpacity,
  hookScale,
  hookBlur,
  gridY,
  leftX,
  imageY,
  rightX,
  services,
}: AboutUsDesktopProps) {
  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full h-[200vh] bg-oz-black text-oz-white relative pb-16 md:pb-0"
    >
      {/* Sticky Checkpoint: Locks the camera while we scroll through 200vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Decorative background elements */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-oz-orange/5 blur-3xl pointer-events-none"
          style={{ y: y1, rotate: rotate1 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-oz-primary/5 blur-3xl pointer-events-none"
          style={{ y: y2, rotate: rotate2 }}
        />
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Beat 1: The Hook */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 py-12 md:py-0"
          style={{ opacity: hookOpacity, scale: hookScale, filter: hookBlur }}
        >
          <div className="flex flex-col items-center mb-6">
            <span className="text-oz-orange font-space font-medium mb-4 flex items-center gap-2 tracking-[0.2em] uppercase text-xs">
              <Zap className="w-4 h-4" />
              About OzInfra
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-space text-center text-oz-white mb-6">
              Modern Infrastructure Support Without Enterprise Overhead
            </h1>
            <div className="w-24 h-1 bg-oz-orange mb-6"></div>
          </div>

          <p className="text-center max-w-3xl mx-auto mb-12 text-oz-warmgray text-xl leading-relaxed">
            Businesses rely on stable infrastructure, secure systems, and dependable operational
            support. Whether it&apos;s maintaining Linux environments, deploying cloud
            infrastructure, or supporting business networking needs — we keep operations efficient,
            secure, and running smoothly from Hobart, Tasmania.
          </p>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 flex flex-col items-center gap-4">
            <span className="font-space text-xs tracking-[0.3em] uppercase text-oz-orange/80">
              SCROLL DOWN
            </span>
            <motion.div
              className="w-[1px] h-16 bg-gradient-to-b from-oz-orange to-transparent"
              animate={{
                y: [0, 10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Beat 2: The Grid Reveal (Slides up like a solid curtain) */}
        <motion.div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 bg-oz-black pt-12 md:pt-24 pb-12 md:pb-0 w-full"
          style={{ y: gridY }}
        >
          <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {/* Left Column */}
            <motion.div className="space-y-16" style={{ x: leftX }}>
              {services
                .filter((service) => service.position === "left")
                .map((service, index) => (
                  <ServiceItem
                    key={`left-${index}`}
                    icon={service.icon}
                    secondaryIcon={service.secondaryIcon}
                    title={service.title}
                    description={service.description}
                    delay={index * 0.2}
                  />
                ))}
            </motion.div>

            {/* Center Image */}
            <motion.div
              className="flex justify-center items-center order-first md:order-none mb-12 md:mb-0"
              style={{ y: imageY }}
            >
              <div className="relative w-full max-w-sm">
                <div className="rounded-xl overflow-hidden shadow-2xl relative border border-white/5">
                  <img
                    src="/images/about-hero.webp"
                    alt="Modern enterprise server infrastructure in Hobart, Tasmania"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-oz-black via-oz-black/20 to-transparent flex items-end justify-center p-8">
                    <LiquidButton
                      href="/services"
                      variant="dark"
                      hoverText="Let's Go!"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      Our Expertise
                    </LiquidButton>
                  </div>
                </div>
                <div className="absolute inset-0 border border-oz-orange/30 rounded-xl -m-4 z-[-1]"></div>

                {/* Floating accent elements */}
                <motion.div
                  className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-oz-orange/10 backdrop-blur-md border border-white/5"
                  style={{ y: y1 }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-oz-primary/10 backdrop-blur-md border border-white/5"
                  style={{ y: y2 }}
                />
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div className="space-y-16" style={{ x: rightX }}>
              {services
                .filter((service) => service.position === "right")
                .map((service, index) => (
                  <ServiceItem
                    key={`right-${index}`}
                    icon={service.icon}
                    secondaryIcon={service.secondaryIcon}
                    title={service.title}
                    description={service.description}
                    delay={index * 0.2}
                  />
                ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function ServiceItem({ icon, secondaryIcon, title, description, delay }: ServiceItemProps) {
  return (
    <motion.div
      className="flex flex-col group"
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.div
          className="text-oz-orange bg-oz-orange/10 border border-oz-orange/20 p-4 rounded-xl transition-all duration-300 group-hover:bg-oz-orange/20 group-hover:border-oz-orange/40 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] relative"
          whileHover={{ rotate: [0, -10, 10, -5, 0], transition: { duration: 0.5 } }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3 className="text-2xl font-space text-white group-hover:text-oz-orange transition-colors duration-300">
          {title}
        </h3>
      </div>
      <p className="text-sm text-oz-warmgray leading-relaxed pl-0 md:pl-[4.5rem]">{description}</p>
      <motion.div
        className="mt-4 pl-0 md:pl-[4.5rem] flex items-center text-oz-orange text-sm font-space uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
      >
        <span className="flex items-center gap-2">
          Learn more <ArrowRight className="w-4 h-4" />
        </span>
      </motion.div>
    </motion.div>
  );
}
