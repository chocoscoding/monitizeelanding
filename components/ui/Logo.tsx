import { useId } from "react";

import { cn } from "@/lib/utils";

/**
 * Monitizee mark: a rounded white M with a little spark, on the logo's sky-to-azure tile.
 * Drawn as SVG (from public/brand/monitizee-logo.jpg) so it stays crisp at every size.
 */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden="true">
      <defs>
        <linearGradient
          id={id}
          x1="0"
          y1="0"
          x2="0"
          y2="40"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#60BFEF" />
          <stop
            offset="1"
            stopColor="#0396FB"
          />
        </linearGradient>
      </defs>
      <rect
        width="40"
        height="40"
        rx="11"
        fill={`url(#${id})`}
      />
      <path
        d="M14.5 29.5V16.2l7 7.3 7-7.3v13.3"
        fill="none"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4 10.6 10.8 7.6M10.1 11.4 7.9 9.2M9.3 12.7 6.3 12.1"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ tone = "ink", className }: { tone?: "ink" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0 drop-shadow-[0_6px_14px_rgb(3_150_251/0.35)]" />
      <span className={cn("text-[1.25rem] font-semibold tracking-[-0.025em]", tone === "ink" ? "text-foreground" : "text-white")}>Monitizee</span>
    </span>
  );
}
