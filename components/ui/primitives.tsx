import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

export { cn };

export function Container({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[84rem] px-5 sm:px-8 lg:px-12", className)}
      {...rest}
    />
  );
}

/** Pacifico accent word inside a Roboto headline. */
export function Accent({ children, tone }: { children: ReactNode; tone?: "blue" | "sky" | "ink" }) {
  return (
    <span
      className="accent-script"
      data-tone={tone}>
      {children}
    </span>
  );
}

/** Small chip that sits above section headings. */
export function Tag({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "ink"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.8rem] font-medium tracking-wide",
        tone === "light" ? "border border-border bg-white text-foreground shadow-soft" : "border border-ink-border bg-white/5 text-ink-muted",
        className,
      )}>
      <svg
        viewBox="0 0 12 12"
        className="h-3 w-3"
        aria-hidden="true">
        <path
          d="M6 0v12M0 6h12"
          stroke="currentColor"
          strokeWidth="2.4"
          className={tone === "light" ? "text-brand-blue" : "text-brand-sky"}
        />
      </svg>
      {children}
    </span>
  );
}
