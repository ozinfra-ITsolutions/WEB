"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main
      className="relative min-h-screen bg-oz-black flex flex-col items-center justify-center overflow-hidden px-6"
      aria-label="System pre-hydration phase active"
    >
      {/* High-tech Cyber Grid */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.02] pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--oz-primary) 1px, transparent 1px), linear-gradient(90deg, var(--oz-primary) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Cybernetic ambient orange glow */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-oz-primary/5 filter blur-3xl pointer-events-none z-0 animate-pulse" />

      {/* Futuristic Mainframe Loader Graphic */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Core spinning ring wrapper */}
        <div className="relative w-28 h-28 flex items-center justify-center mb-8 select-none">
          {/* Animated decorative outer rings */}
          <motion.div
            className="absolute inset-0 border border-white/[0.04] rounded-full"
            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute -inset-2 border-t-2 border-oz-orange/20 border-r-2 border-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          <motion.div
            className="absolute -inset-4 border-b-2 border-white/[0.08] border-l-2 border-transparent rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Processor Node Icon */}
          <div className="relative w-16 h-16 bg-oz-black border border-white/[0.06] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(248,91,27,0.1)]">
            <Cpu size={24} className="text-oz-orange animate-pulse" />
          </div>
        </div>

        {/* Loader text & sub-indicators */}
        <div className="text-center font-mono space-y-2 z-10 select-none">
          <div className="flex items-center justify-center gap-2 text-oz-bg text-sm font-semibold tracking-wider uppercase">
            <Loader2 size={14} className="text-oz-orange animate-spin" />
            <span>Establishing Sync...</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-oz-warmgray/45 text-[10px] uppercase tracking-widest font-mono">
            <Terminal size={10} className="text-oz-orange/50" />
            <span>thread_alloc_active</span>
          </div>
        </div>

        {/* Real-time Loading Progress Matrix */}
        <div className="mt-10 w-64 bg-oz-black/60 border border-white/[0.04] p-3 rounded-lg flex flex-col font-mono text-[9px] text-oz-warmgray/40 text-left space-y-1 z-10 max-h-24 overflow-hidden">
          <div className="flex justify-between items-center text-oz-orange/60">
            <span>&gt; sys_init_ready</span>
            <span className="text-green-500/80">ONLINE</span>
          </div>
          <div className="flex justify-between items-center">
            <span>&gt; sec_layer_csp_verify</span>
            <span>OK</span>
          </div>
          <div className="flex justify-between items-center">
            <span>&gt; cdn_static_image_load</span>
            <span className="animate-pulse">LOAD...</span>
          </div>
        </div>
      </div>
    </main>
  );
}
