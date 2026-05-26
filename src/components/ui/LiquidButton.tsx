import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  hoverText?: string;
  icon?: React.ReactNode;
  variant?:
    | "primary"
    | "white"
    | "dark"
    | "outline"
    | "white-outline"
    | "white-to-black"
    | "orange-outline";
  size?: "sm" | "default" | "lg";
}

export const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      children,
      href,
      hoverText,
      icon,
      className,
      variant = "primary",
      size = "default",
      type = "button",
      ...props
    },
    ref
  ) => {
    const isSm = size === "sm";
    const isLg = size === "lg";

    const buttonContent = (
      <>
        <div className="text-wrapper">
          <span className="default-text">{children}</span>
          <span className="hover-text">{hoverText || children}</span>
        </div>
        {icon && <span className="icon-wrapper">{icon}</span>}
      </>
    );

    const buttonClass = cn(
      "liquid-btn",
      {
        "liquid-btn-sm": isSm,
        "liquid-btn-lg": isLg,
        "liquid-btn-primary": variant === "primary",
        "liquid-btn-white": variant === "white",
        "liquid-btn-dark": variant === "dark",
        "liquid-btn-outline": variant === "outline",
        "liquid-btn-white-outline": variant === "white-outline",
        "liquid-btn-white-to-black": variant === "white-to-black",
        "liquid-btn-orange-outline": variant === "orange-outline",
      },
      className
    );

    // If an href is provided, wrap with Next.js Link
    if (href) {
      return (
        <Link href={href} passHref className="inline-flex">
          <button ref={ref} type={type} className={buttonClass} {...props}>
            {buttonContent}
          </button>
        </Link>
      );
    }

    return (
      <button ref={ref} type={type} className={buttonClass} {...props}>
        {buttonContent}
      </button>
    );
  }
);

LiquidButton.displayName = "LiquidButton";
