"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface CpuArchitectureSvgProps {
  className?: string;
  width?: string;
  height?: string;
  text?: string;
  showCpuConnections?: boolean;
  lineMarkerSize?: number;
  animateText?: boolean;
  animateLines?: boolean;
  animateMarkers?: boolean;
}

const CpuArchitecture = ({
  className,
  width = "100%",
  height = "100%",
  text = "CPU",
  showCpuConnections = true,
  animateText = true,
  lineMarkerSize = 18,
  animateLines = true,
  animateMarkers = true,
}: CpuArchitectureSvgProps) => {
  // All 8 path definitions in one place for reuse
  const paths = [
    { d: "M 10 20 h 79.5 q 5 0 5 5 v 30", dur: "3s", delay: "0s" },
    { d: "M 180 10 h -69.7 q -5 0 -5 5 v 30", dur: "2.8s", delay: "1.5s" },
    { d: "M 130 20 v 21.8 q 0 5 -5 5 h -10", dur: "2s", delay: "0.8s" },
    { d: "M 170 80 v -21.8 q 0 -5 -5 -5 h -50", dur: "2.5s", delay: "2s" },
    {
      d: "M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20",
      dur: "3.5s",
      delay: "0.5s",
    },
    { d: "M 94.8 95 v -36", dur: "2s", delay: "3s" },
    {
      d: "M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14",
      dur: "3s",
      delay: "1s",
    },
    { d: "M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20", dur: "2.2s", delay: "2.5s" },
  ];

  return (
    <svg
      className={cn("text-muted", className)}
      width={width}
      height={height}
      viewBox="0 0 200 100"
    >
      {/* ── Base Circuit Lines (static traces) ─────────────── */}
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="0.3"
        strokeDasharray="100 100"
        pathLength="100"
        markerStart="url(#cpu-circle-marker)"
      >
        {paths.map((p, i) => (
          <path key={`base-${i}`} d={p.d} strokeDasharray="100 100" pathLength="100" />
        ))}
        {animateLines && (
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        )}
      </g>

      {/* ── Flowing Data Pulses (gradient dashes traveling through lines) ── */}
      <g fill="none" filter="url(#cpu-flow-glow)">
        {paths.map((p, i) => (
          <path
            key={`flow-${i}`}
            d={p.d}
            stroke="url(#cpu-flow-gradient)"
            strokeWidth="1"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="12 88"
            strokeDashoffset="100"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur={p.dur}
              begin={p.delay}
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.25,0.1,0.25,1"
              keyTimes="0; 1"
            />
            <animate
              attributeName="opacity"
              values="0; 1; 1; 0"
              keyTimes="0; 0.1; 0.8; 1"
              dur={p.dur}
              begin={p.delay}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </g>

      {/* ── Secondary Dim Pulses (staggered, different speed for depth) ── */}
      <g fill="none" opacity="0.4" filter="url(#cpu-flow-glow-soft)">
        {paths.map((p, i) => {
          const dur2 = parseFloat(p.dur) * 0.6 + "s";
          const delay2 = parseFloat(p.delay) + parseFloat(p.dur) * 0.5 + "s";
          return (
            <path
              key={`flow2-${i}`}
              d={p.d}
              stroke="url(#cpu-flow-gradient-warm)"
              strokeWidth="0.6"
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray="8 92"
              strokeDashoffset="100"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="100"
                to="0"
                dur={dur2}
                begin={delay2}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4,0,0.2,1"
                keyTimes="0; 1"
              />
              <animate
                attributeName="opacity"
                values="0; 0.5; 0.5; 0"
                keyTimes="0; 0.15; 0.75; 1"
                dur={dur2}
                begin={delay2}
                repeatCount="indefinite"
              />
            </path>
          );
        })}
      </g>

      {/* ── Primary Glow Nodes (large, slow) ────────────── */}
      <g mask="url(#cpu-mask-1)">
        <circle
          className="cpu-architecture cpu-line-1"
          cx="0"
          cy="0"
          r="8"
          fill="url(#cpu-blue-grad)"
        />
      </g>
      <g mask="url(#cpu-mask-2)">
        <circle
          className="cpu-architecture cpu-line-2"
          cx="0"
          cy="0"
          r="8"
          fill="url(#cpu-yellow-grad)"
        />
      </g>
      <g mask="url(#cpu-mask-3)">
        <circle
          className="cpu-architecture cpu-line-3"
          cx="0"
          cy="0"
          r="8"
          fill="url(#cpu-pinkish-grad)"
        />
      </g>
      <g mask="url(#cpu-mask-4)">
        <circle
          className="cpu-architecture cpu-line-4"
          cx="0"
          cy="0"
          r="8"
          fill="url(#cpu-white-grad)"
        />
      </g>
      <g mask="url(#cpu-mask-5)">
        <circle
          className="cpu-architecture cpu-line-5"
          cx="0"
          cy="0"
          r="8"
          fill="url(#cpu-green-grad)"
        />
      </g>
      <g mask="url(#cpu-mask-6)">
        <circle
          className="cpu-architecture cpu-line-6"
          cx="0"
          cy="0"
          r="8"
          fill="url(#cpu-orange-grad)"
        />
      </g>
      <g mask="url(#cpu-mask-7)">
        <circle
          className="cpu-architecture cpu-line-7"
          cx="0"
          cy="0"
          r="8"
          fill="url(#cpu-cyan-grad)"
        />
      </g>
      <g mask="url(#cpu-mask-8)">
        <circle
          className="cpu-architecture cpu-line-8"
          cx="0"
          cy="0"
          r="8"
          fill="url(#cpu-rose-grad)"
        />
      </g>

      {/* ── Secondary Data Packets (small, fast, staggered) ──── */}
      <g mask="url(#cpu-mask-1)">
        <circle
          className="cpu-data-packet cpu-data-1"
          cx="0"
          cy="0"
          r="4"
          fill="url(#cpu-blue-grad)"
          opacity="0.6"
        />
      </g>
      <g mask="url(#cpu-mask-2)">
        <circle
          className="cpu-data-packet cpu-data-2"
          cx="0"
          cy="0"
          r="4"
          fill="url(#cpu-yellow-grad)"
          opacity="0.6"
        />
      </g>
      <g mask="url(#cpu-mask-4)">
        <circle
          className="cpu-data-packet cpu-data-4"
          cx="0"
          cy="0"
          r="3"
          fill="url(#cpu-white-grad)"
          opacity="0.5"
        />
      </g>
      <g mask="url(#cpu-mask-5)">
        <circle
          className="cpu-data-packet cpu-data-5"
          cx="0"
          cy="0"
          r="4"
          fill="url(#cpu-green-grad)"
          opacity="0.6"
        />
      </g>
      <g mask="url(#cpu-mask-7)">
        <circle
          className="cpu-data-packet cpu-data-7"
          cx="0"
          cy="0"
          r="3"
          fill="url(#cpu-cyan-grad)"
          opacity="0.5"
        />
      </g>
      <g mask="url(#cpu-mask-8)">
        <circle
          className="cpu-data-packet cpu-data-8"
          cx="0"
          cy="0"
          r="4"
          fill="url(#cpu-rose-grad)"
          opacity="0.6"
        />
      </g>
      {/* CPU Box */}
      <g>
        {/* Cpu connections */}
        {showCpuConnections && (
          <g fill="url(#cpu-connection-gradient)">
            <rect x="93" y="37" width="2.5" height="5" rx="0.7" />
            <rect x="104" y="37" width="2.5" height="5" rx="0.7" />
            <rect
              x="116.3"
              y="44"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(90 116.25 45.5)"
            />
            <rect
              x="122.8"
              y="44"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(90 116.25 45.5)"
            />
            <rect
              x="104"
              y="16"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(180 105.25 39.5)"
            />
            <rect
              x="114.5"
              y="16"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(180 105.25 39.5)"
            />
            <rect
              x="80"
              y="-13.6"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(270 115.25 19.5)"
            />
            <rect
              x="87"
              y="-13.6"
              width="2.5"
              height="5"
              rx="0.7"
              transform="rotate(270 115.25 19.5)"
            />
          </g>
        )}
        {/* Main CPU Rectangle — slightly larger for OZINFRA */}
        <rect
          x="83"
          y="39"
          width="34"
          height="22"
          rx="2"
          fill="#181818"
          filter="url(#cpu-light-shadow)"
        />
        {/* Inner chip border glow */}
        <rect
          x="83.5"
          y="39.5"
          width="33"
          height="21"
          rx="1.5"
          fill="none"
          stroke="#333"
          strokeWidth="0.3"
        />
        {/* CPU Text — OZINFRA in tech monospace */}
        <text
          x="100"
          y="52"
          fontSize="4.2"
          fill={animateText ? "url(#cpu-text-gradient)" : "white"}
          fontWeight="700"
          letterSpacing="0.18em"
          textAnchor="middle"
          fontFamily="var(--font-mono), 'Share Tech Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace"
        >
          {text}
        </text>
      </g>
      {/* Masks */}
      <defs>
        <mask id="cpu-mask-1">
          <path d="M 10 20 h 79.5 q 5 0 5 5 v 24" strokeWidth="0.5" stroke="white" />
        </mask>
        <mask id="cpu-mask-2">
          <path d="M 180 10 h -69.7 q -5 0 -5 5 v 24" strokeWidth="0.5" stroke="white" />
        </mask>
        <mask id="cpu-mask-3">
          <path d="M 130 20 v 21.8 q 0 5 -5 5 h -10" strokeWidth="0.5" stroke="white" />
        </mask>
        <mask id="cpu-mask-4">
          <path d="M 170 80 v -21.8 q 0 -5 -5 -5 h -50" strokeWidth="0.5" stroke="white" />
        </mask>
        <mask id="cpu-mask-5">
          <path
            d="M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-6">
          <path d="M 94.8 95 v -36" strokeWidth="0.5" stroke="white" />
        </mask>
        <mask id="cpu-mask-7">
          <path
            d="M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14"
            strokeWidth="0.5"
            stroke="white"
          />
        </mask>
        <mask id="cpu-mask-8">
          <path d="M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20" strokeWidth="0.5" stroke="white" />
        </mask>
        {/* Gradients */}
        <radialGradient id="cpu-blue-grad" fx="1">
          <stop offset="0%" stopColor="#00E8ED" />
          <stop offset="50%" stopColor="#08F" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-yellow-grad" fx="1">
          <stop offset="0%" stopColor="#FFD800" />
          <stop offset="50%" stopColor="#FFD800" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-pinkish-grad" fx="1">
          <stop offset="0%" stopColor="#830CD1" />
          <stop offset="50%" stopColor="#FF008B" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-white-grad" fx="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-green-grad" fx="1">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-orange-grad" fx="1">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-cyan-grad" fx="1">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="cpu-rose-grad" fx="1">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <filter id="cpu-light-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="1.5" dy="1.5" stdDeviation="1" floodColor="black" floodOpacity="0.1" />
        </filter>
        <marker
          id="cpu-circle-marker"
          viewBox="0 0 10 10"
          refX="5"
          refY="5"
          markerWidth={lineMarkerSize}
          markerHeight={lineMarkerSize}
        >
          <circle
            id="innerMarkerCircle"
            cx="5"
            cy="5"
            r="2"
            fill="black"
            stroke="#232323"
            strokeWidth="0.5"
          >
            {animateMarkers && <animate attributeName="r" values="0; 3; 2" dur="0.5s" />}
          </circle>
        </marker>
        {/* Cpu connection gradient */}
        <linearGradient id="cpu-connection-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F4F4F" />
          <stop offset="60%" stopColor="#121214" />
        </linearGradient>
        {/* Add CPU Text Gradient */}
        <linearGradient id="cpu-text-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="-2; -1; 0"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="25%" stopColor="white">
            <animate
              attributeName="offset"
              values="-1; 0; 1"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
          <stop offset="50%" stopColor="#666666">
            <animate
              attributeName="offset"
              values="0; 1; 2;"
              dur="5s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
          </stop>
        </linearGradient>

        {/* Flowing Data Gradients and Filters */}
        <filter id="cpu-flow-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="cpu-flow-glow-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <linearGradient id="cpu-flow-gradient" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="30%" stopColor="#f97316" stopOpacity="1" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="cpu-flow-gradient-warm" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#ea580c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export { CpuArchitecture };
