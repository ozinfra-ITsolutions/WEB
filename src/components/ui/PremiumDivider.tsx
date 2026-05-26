"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function PremiumDivider() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: Date.now(),
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);
  };

  return (
    <div className="relative w-full h-28 overflow-visible z-20 flex flex-col justify-center">
      {/* Background Split: Upper is white (SellingPoint), Lower is light gray (HowWeWork) */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-white pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-oz-bg pointer-events-none" />

      {/* Outer Technical Grid Accents */}
      <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none select-none opacity-40">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-oz-orange/40" />
          <div className="w-12 h-[1px] bg-oz-orange/20 self-center" />
        </div>
        <div className="flex gap-1.5">
          <div className="w-12 h-[1px] bg-oz-orange/20 self-center" />
          <div className="w-1.5 h-1.5 rounded-full bg-oz-orange/40" />
        </div>
      </div>

      {/* Main Horizontal Gradient Line */}
      <div className="relative w-full flex items-center justify-center pointer-events-none">
        <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-oz-orange/40 to-transparent" />

        {/* Subtle secondary parallel dashed lines for a tech blueprints look */}
        <div className="absolute w-[80%] h-[1px] border-t border-dashed border-oz-orange/10 -top-3 left-1/2 -translate-x-1/2" />
        <div className="absolute w-[80%] h-[1px] border-t border-dashed border-oz-orange/10 top-3 left-1/2 -translate-x-1/2" />
      </div>

      {/* Perfectly Centered Interactive Brand Logo Container */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative flex items-center justify-center">
          {/* Animated Tech Orbit Ring (Slow rotating blueprint indicator) */}
          <motion.svg
            className="absolute w-[100px] h-[100px] pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#f85b1b"
              strokeWidth="0.75"
              strokeDasharray="4 8"
              fill="none"
              className="opacity-30"
            />
            {/* Tiny accent dot on the orbit ring */}
            <circle cx="50" cy="6" r="2" fill="#f85b1b" className="opacity-60" />
          </motion.svg>

          {/* Outer expansion rings on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.25, opacity: 0.15 }}
                  exit={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  className="absolute w-20 h-20 rounded-full border border-oz-orange pointer-events-none"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 0.08 }}
                  exit={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1.5, delay: 0.3, repeat: Infinity, ease: "easeOut" }}
                  className="absolute w-20 h-20 rounded-full border border-oz-orange pointer-events-none"
                />
              </>
            )}
          </AnimatePresence>

          {/* Active Pulsing Orange Ambient Glow */}
          <motion.div
            className="absolute w-16 h-16 rounded-full bg-oz-orange/10 blur-md pointer-events-none"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
              opacity: isHovered ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Core Logo Container */}
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            className="relative w-16 h-16 rounded-full bg-white border-[1.5px] border-oz-orange/30 shadow-[0_8px_32px_rgba(248,91,27,0.12)] hover:border-oz-orange/60 hover:shadow-[0_12px_40px_rgba(248,91,27,0.22)] transition-all duration-500 cursor-pointer flex items-center justify-center overflow-hidden select-none active:scale-95"
            whileHover={{ scale: 1.05 }}
          >
            {/* Ripple Effects rendering */}
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute bg-oz-orange/15 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: 120,
                  height: 120,
                }}
              />
            ))}

            {/* Inner Circular Tech Border */}
            <div className="absolute inset-1.5 rounded-full border border-black/[0.03] pointer-events-none" />

            {/* Brand Logo Icon */}
            <div className="relative w-9 h-9 z-10 transition-transform duration-500 group-hover:scale-110">
              <Image
                src="/images/logo-icon.png"
                alt="OzInfra logo icon"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Embedded CSS for Ripple Wave Animation */}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
