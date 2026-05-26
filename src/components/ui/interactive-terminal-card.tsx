"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TerminalCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  cmd: string;
  backAction: string;
  type: "mail" | "whatsapp" | "status" | "phone";
  delay?: number;
}

export function InteractiveTerminalCard({
  icon: Icon,
  label,
  value,
  href,
  cmd,
  backAction,
  type,
  delay = 0,
}: TerminalCardProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [logs, setLogs] = useState<string[]>([cmd]);

  const executeSequence = () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setIsHovered(false); // Force flip back to front

    const sequence = getSequence(type);
    let timeAcc = 0;

    setLogs([cmd]); // reset

    sequence.forEach((step, index) => {
      timeAcc += step.delay;
      setTimeout(() => {
        setLogs((prev) => [...prev, step.text]);

        // If it's the last step, trigger action
        if (index === sequence.length - 1) {
          setTimeout(() => {
            if (href) {
              window.open(href, type === "mail" || type === "phone" ? "_self" : "_blank");
            }
            setTimeout(() => {
              setIsExecuting(false);
              setLogs([cmd]); // reset for next time after a short delay
            }, 1000);
          }, 800);
        }
      }, timeAcc);
    });
  };

  const getSequence = (type: string) => {
    switch (type) {
      case "mail":
        return [
          { text: "Connecting to mail server...", delay: 400 },
          { text: "Connection successful.", delay: 400 },
          { text: "Opening mail...", delay: 500 },
        ];
      case "phone":
        return [
          { text: "Initializing cellular bridge...", delay: 300 },
          { text: "Connecting to carrier...", delay: 300 },
          { text: "Dialing number (+61 452 113 061)...", delay: 300 },
          { text: "Ringing...", delay: 400 },
        ];
      case "whatsapp":
        return [
          { text: "Connecting to WhatsApp API...", delay: 400 },
          { text: "Connection successful.", delay: 300 },
          { text: "Opening secure chat window...", delay: 300 },
          { text: "Opening WhatsApp...", delay: 400 },
        ];
      case "status":
      default:
        return [
          { text: "Checking system status...", delay: 400 },
          { text: "Node: Hobart Timezone (AEST)", delay: 400 },
          { text: "All systems nominal.", delay: 500 },
        ];
    }
  };

  const handleActivate = () => {
    if (!isHovered) {
      setIsHovered(true);
    } else {
      executeSequence();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
    if (e.key === "Escape" && isHovered) {
      setIsHovered(false);
    }
  };

  return (
    <motion.div
      className="group relative h-40 [perspective:1000px] cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${value}. ${isHovered ? `Press Enter to ${backAction.toLowerCase()}` : "Press Enter to reveal action"}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 0.68, 0, 1] }}
      onMouseEnter={() => !isExecuting && setIsHovered(true)}
      onMouseLeave={() => !isExecuting && setIsHovered(false)}
      onFocus={() => !isExecuting && setIsHovered(true)}
      onBlur={() => !isExecuting && setIsHovered(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${
          isHovered && !isExecuting ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Face: Terminal Style */}
        <div className="absolute inset-0 w-full h-full bg-black/90 border border-white/10 rounded-2xl p-5 [backface-visibility:hidden] flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-oz-orange/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="font-mono text-xs text-oz-orange/70 flex flex-col gap-1 items-start">
            {logs.map((log, i) => (
              <div key={i} className="flex items-center gap-2">
                <span>{log}</span>
                {i === logs.length - 1 && (
                  <span className="w-1.5 h-3 bg-oz-orange/70 animate-pulse" />
                )}
              </div>
            ))}
          </div>

          {!isExecuting && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-auto pt-2">
              <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-oz-warmgray" />
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-oz-warmgray font-space mb-1">
                {label}
              </p>
              <p className="text-white font-mono text-sm">{value}</p>
            </motion.div>
          )}
        </div>

        {/* Back Face: Trigger Action */}
        <div
          className="absolute inset-0 w-full h-full bg-oz-orange border border-oz-orange rounded-2xl p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(234,88,12,0.3)]"
          onClick={(e) => {
            e.preventDefault();
            executeSequence();
          }}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 text-white">
            <Icon className="w-6 h-6" />
          </div>
          <p className="font-space font-bold text-white tracking-wider uppercase text-sm">
            {backAction}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
