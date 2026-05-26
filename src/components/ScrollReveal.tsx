"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.8,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const controls = useAnimation();

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 60, x: 0 };
      case "down":
        return { y: -60, x: 0 };
      case "left":
        return { y: 0, x: -60 };
      case "right":
        return { y: 0, x: 60 };
      default:
        return { y: 60, x: 0 };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const initial = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={controls}
      style={{ willChange: "transform, opacity" }}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 80,
            duration,
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
