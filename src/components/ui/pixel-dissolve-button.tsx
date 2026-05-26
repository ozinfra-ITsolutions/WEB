"use client";

import React, { useCallback, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Config                                                            */
/* ------------------------------------------------------------------ */
const ROWS = 6;
const COLS = 16;
const WAVE_DELAY_STEP = 0.02; // seconds between each diagonal wave step

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */
interface PixelDissolveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  /** Minimum width for the button – defaults to 200 */
  minWidth?: number;
  id?: string;
  type?: "button" | "submit" | "reset";
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function PixelDissolveButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  className = "",
  minWidth = 200,
  id,
  type = "button",
}: PixelDissolveButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [dissolved, setDissolved] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // Intercept the default click behavior (CRITICAL)
      e.preventDefault();

      if (isAnimating || disabled || loading) return;

      setIsAnimating(true);
      setDissolved(true);

      // Wait 1500ms for the dissolve transition to sweep across before firing parent action
      setTimeout(() => {
        onClick?.();
      }, 1500);
    },
    [isAnimating, disabled, loading, onClick]
  );

  return (
    <button
      id={id}
      type={type}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      onClick={handleClick}
      className={`pixel-dissolve-btn ${disabled || loading ? "pixel-dissolve-btn--disabled" : ""} ${dissolved ? "pixel-dissolve-btn--dissolved" : ""} ${className}`}
      style={{ minWidth }}
    >
      {/* -------- Pixel Grid (background) -------- */}
      <div className="pixel-dissolve-btn__grid" aria-hidden="true">
        {Array.from({ length: ROWS * COLS }).map((_, idx) => {
          const row = Math.floor(idx / COLS);
          const col = idx % COLS;

          /* Percentage-based positioning to avoid any JS ResizeObserver layout recalculation issues */
          const left = `${(col * 100) / COLS}%`;
          const top = `${(row * 100) / ROWS}%`;
          const width = `${100 / COLS}%`;
          const height = `${100 / ROWS}%`;

          /* Wave delay: bottom-left (rows-1-row) to top-right (col) */
          const order = ROWS - 1 - row + col;
          const delay = order * WAVE_DELAY_STEP;

          return (
            <div
              key={idx}
              className={`pixel-dissolve-btn__pixel ${dissolved ? "pixel-dissolve-btn__pixel--dissolved" : ""}`}
              style={{
                width,
                height,
                left,
                top,
                transitionDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* -------- Label (foreground) -------- */}
      <span
        className={`pixel-dissolve-btn__label ${dissolved ? "pixel-dissolve-btn__label--hidden" : ""}`}
      >
        {loading ? <span className="pixel-dissolve-btn__spinner" /> : children}
      </span>
    </button>
  );
}
