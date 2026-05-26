"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
}

export default function TextReveal({
  text,
  className = "",
  tag: Tag = "h2",
  delay = 0,
  staggerDelay = 0.04,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  } as const;

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  } as const;

  // Convert the Tag to a motion component
  const MotionTag = motion[Tag as keyof typeof motion] as React.ElementType;

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden mr-[0.25em]"
          style={{ willChange: "transform, opacity" }}
        >
          <motion.span
            variants={child}
            className="inline-block"
            style={{ willChange: "transform, opacity" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
