"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

/** The design's primary CTA gradient — the website's exact ramp. */
export const GRADIENT =
  "linear-gradient(115deg, #8CF0C0 0%, #6FE0A9 24%, #4FC091 56%, #2FA189 80%, #1E8189 100%)";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Renders full-width, as the website's form submits do. */
  block?: boolean;
}

/**
 * Filled mint CTA. The website ships this as an anchor (GradientButton) and
 * repeats the same markup inline for form submits; the Studio's auth flow only
 * ever needs the button form, so this is that variant of the same treatment.
 */
export function GradientButton({
  children,
  className = "",
  block = false,
  type = "button",
  disabled,
  ...props
}: GradientButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`ndi-sweepbtn relative inline-flex h-12 cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-xl px-6 font-display text-[14.5px] font-semibold disabled:cursor-not-allowed ${
        block ? "w-full" : ""
      } ${className}`.trim()}
      /* Disabled drops the gradient entirely rather than fading it: mint at
         reduced opacity still reads as the live, pressable control. */
      style={
        disabled
          ? {
              background: "var(--surface-raised)",
              color: "var(--text-faint)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "none",
            }
          : {
              background: GRADIENT,
              color: "#08130f",
              border: "1px solid transparent",
              boxShadow: "var(--glow-sm)",
            }
      }
      {...props}
    >
      <span className="ndi-store-sweep" />
      <span className="ndi-store-glow" />
      <span className="relative z-[1] inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
}
