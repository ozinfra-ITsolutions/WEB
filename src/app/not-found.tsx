"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, WifiOff } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-oz-black flex items-center justify-center overflow-hidden">
      {/* Background animated grid */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--oz-primary) 1px, transparent 1px), linear-gradient(90deg, var(--oz-primary) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Animated gradient orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, var(--oz-primary) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [-50, 50, -50],
          y: [-30, 30, -30],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative mb-8"
        >
          <span className="text-[180px] md:text-[240px] font-space font-bold text-transparent bg-clip-text bg-gradient-to-b from-oz-orange to-oz-orange/20 leading-none select-none">
            404
          </span>
          {/* Disconnected icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-20 h-20 bg-oz-black border-2 border-oz-orange/30 flex items-center justify-center">
              <WifiOff size={32} className="text-oz-orange" />
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-card font-space text-oz-bg mb-4">Signal Lost</h1>
          <p className="text-oz-warmgray text-lg mb-10 max-w-md mx-auto leading-relaxed">
            The page you are looking for does not exist or has been moved to a different location.
            Let us get you back on track.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <LiquidButton href="/" variant="white" hoverText="Go Home" icon={<Home size={16} />}>
            Back to Home
          </LiquidButton>
          <LiquidButton
            href="/services"
            variant="white"
            hoverText="Our Work"
            icon={<Search size={16} />}
          >
            Explore Services
          </LiquidButton>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-8 text-sm"
        >
          {[
            { label: "Home", path: "/" },
            { label: "Services", path: "/services" },
            { label: "About", path: "/about" },
            { label: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="text-oz-warmgray/50 hover:text-oz-orange font-space uppercase tracking-wider transition-colors duration-300 flex items-center gap-1"
            >
              <ArrowLeft size={12} />
              {link.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
