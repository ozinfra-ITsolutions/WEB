"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertOctagon, RefreshCw, Home, Terminal, ShieldAlert } from "lucide-react";
import { LiquidButton } from "@/components/ui/LiquidButton";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error securely for diagnostic tracking
    console.error("[OzInfra Secure Diagnostics] Global runtime exception captured:", error);
  }, [error]);

  return (
    <main className="relative min-h-screen bg-oz-black flex items-center justify-center overflow-hidden px-6 py-12">
      {/* Dynamic scan line effect */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

      {/* Cybernetic Grid Overlay */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--oz-primary) 1px, transparent 1px), linear-gradient(90deg, var(--oz-primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated danger glowing orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-5 pointer-events-none filter blur-3xl"
        style={{
          background: "radial-gradient(circle, #EF4444 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.07, 0.03],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl bg-oz-black/85 border border-red-500/20 backdrop-blur-xl p-8 md:p-12 shadow-[0_0_50px_rgba(239,68,68,0.05)] text-center">
        {/* Animated Cybernetic Terminal Warning Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-8"
        >
          {/* Pulsing warning hex box */}
          <div className="relative mb-6">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 bg-red-500/10 rounded-full blur-md"
            />
            <div className="relative w-20 h-20 bg-oz-black border-2 border-red-500/40 flex items-center justify-center rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.15)]">
              <AlertOctagon size={36} className="text-red-500 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono tracking-widest uppercase">
            <ShieldAlert size={12} />
            System Fault Detected
          </div>

          <h1 className="text-card font-space text-oz-bg font-bold mt-2">
            Runtime Exception Captured
          </h1>
          <p className="text-oz-warmgray text-base mt-3 max-w-lg mx-auto leading-relaxed">
            The core engine encountered an unhandled segment error. Active monitoring has isolated
            the thread to maintain system integrity.
          </p>
        </motion.div>

        {/* Real-time Simulated Debug Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-oz-black border border-white/[0.04] p-5 font-mono text-left text-xs mb-8 rounded-lg shadow-inner overflow-hidden relative"
        >
          <div className="absolute top-2 right-3 flex items-center gap-1.5 opacity-50">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[9px] uppercase tracking-wider">fault_isolation</span>
          </div>

          <div className="flex items-center gap-2 border-b border-white/[0.05] pb-2.5 mb-3 opacity-60">
            <Terminal size={12} className="text-oz-orange" />
            <span>fault_diagnostics_report.log</span>
          </div>

          <div className="space-y-1.5 text-oz-warmgray/75 leading-relaxed overflow-x-auto select-none">
            <p className="text-red-400 font-semibold">[EXCEPTION_TYPE] CoreThreadRenderError</p>
            <p>[MODULE_TARGET] src/app/segments/hydration-engine</p>
            <p className="text-white/40">[DIGEST_HASH] {error.digest || "SYS_SEC_ISOLATION_409"}</p>
            <p className="text-white/40">[USER_AGENT] client_browser_thread_active</p>
            <p className="text-oz-orange/70 mt-1 font-semibold">
              &gt; diagnostic status: active_isolation_established
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <LiquidButton
            onClick={() => reset()}
            variant="primary"
            hoverText="System Hot-Reboot"
            icon={<RefreshCw size={16} className="animate-spin-[duration:3s]" />}
          >
            Hot-Reboot Thread
          </LiquidButton>

          <LiquidButton
            href="/"
            variant="white"
            hoverText="Return to Safe State"
            icon={<Home size={16} />}
          >
            Safe State Fallback
          </LiquidButton>
        </motion.div>

        {/* Diagnostic Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-10 pt-6 border-t border-white/[0.04] text-[10px] text-oz-warmgray/45 flex justify-between items-center font-mono"
        >
          <span>ENGINE_STATUS: CRITICAL_STANDBY</span>
          <span>FAULT_CODE: 0x8C_INTRUSION_PREVENT</span>
        </motion.div>
      </div>
    </main>
  );
}
