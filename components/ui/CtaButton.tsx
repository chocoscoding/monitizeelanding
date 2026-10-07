"use client";

import { useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { NoiseBackground } from "./noise-background";

type CtaButtonProps = {
  href: string;
  children: ReactNode;
  /** `ink` (azure) on light backgrounds, `light` (white) on blue ones. */
  tone?: "ink" | "light";
  icon?: "telegram" | "arrow" | "none";
  size?: "md" | "lg";
  /** Stretch to the width of its container. */
  full?: boolean;
  className?: string;
};

/** The logo's sky and azure drifting through the frame. */
const FRAME = ["rgb(96, 191, 239)", "rgb(3, 150, 251)", "rgb(190, 228, 255)"];

/**
 * Pill call-to-action inside a softly moving, grainy brand-gradient frame.
 * On hover the label rolls over, the paper plane takes off (or the arrow slides) and a fill sweeps in.
 * External links (the Telegram bot) open in a new tab.
 */
export function CtaButton({ href, children, tone = "ink", icon = "telegram", size = "lg", full, className }: CtaButtonProps) {
  const reduced = useReducedMotion();
  const ink = tone === "ink";
  const external = /^https?:\/\//.test(href);

  const inner = (
    <>
      {/* fill that sweeps in from the icon side */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:scale-x-100",
          ink ? "bg-brand-blue-deep" : "bg-brand-sky-soft",
        )}
      />

      {icon !== "none" && (
        <span
          className={cn(
            "relative grid shrink-0 place-items-center overflow-hidden rounded-full",
            size === "lg" ? "h-9 w-9" : "h-8 w-8",
            ink ? "bg-white text-brand-blue" : "bg-brand-blue text-white",
          )}>
          {icon === "telegram" ? (
            <TelegramIcon className="cta-fly h-4 w-4 -translate-x-px" />
          ) : (
            <>
              <ArrowIcon className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-6" />
              <ArrowIcon className="absolute h-4 w-4 -translate-x-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-0" />
            </>
          )}
        </span>
      )}

      {/* label rolls up and a fresh copy rolls in */}
      <span className="relative block overflow-hidden leading-[1.3]">
        <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:-translate-y-full">{children}</span>
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-y-0">
          {children}
        </span>
      </span>
    </>
  );

  const classes = cn(
    "group/cta relative isolate flex items-center gap-3 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-transform duration-150 active:scale-98",
    size === "lg" ? "h-12 text-[1rem]" : "h-10 text-[0.92rem]",
    icon === "none" ? "px-5" : size === "lg" ? "pr-5 pl-1.5" : "pr-4 pl-1",
    full && "justify-center",
    ink
      ? "bg-linear-to-b from-brand-sky-top to-brand-blue text-white shadow-[inset_0_1px_0_0_rgb(255_255_255_/_0.35)]"
      : "bg-linear-to-r from-neutral-100 via-neutral-100 to-white text-ink shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)]",
  );

  return (
    <NoiseBackground
      containerClassName={cn(
        "rounded-full",
        size === "lg" ? "p-1" : "p-[3px]",
        ink ? "bg-white/70" : "bg-white/25 shadow-none",
        full ? "w-full" : "w-fit",
        className,
      )}
      gradientColors={FRAME}
      noiseIntensity={0.25}
      speed={0.08}
      animating={!reduced}>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className={classes}>
          {inner}
        </a>
      ) : (
        <Link
          href={href}
          className={classes}>
          {inner}
        </Link>
      )}
    </NoiseBackground>
  );
}

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true">
      <path d="M21.4 4.2 18.3 19c-.2 1-.9 1.3-1.8.8l-4.6-3.4-2.2 2.1c-.2.2-.5.4-.9.4l.3-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L6.5 12.9 2 11.5c-1-.3-1-1 .2-1.5l17.8-6.9c.8-.3 1.6.2 1.4 1.1z" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true">
      <path
        d="M3 8h10m0 0L8.5 3.5M13 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
