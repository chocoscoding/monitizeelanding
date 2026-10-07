"use client";

import { useRef } from "react";

import { cn } from "@/components/ui/primitives";
import { gsap, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

const DIGITS = Array.from({ length: 10 }, (_, i) => i);

/**
 * Odometer-style number: every digit is a 0–9 reel that rolls to its value
 * when it scrolls into view (or when `value` changes).
 */
export function RollingNumber({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const reels = gsap.utils.toArray<HTMLElement>("[data-reel]", el);
      const mm = gsap.matchMedia();
      mm.add(MQ, (ctx) => {
        const { reduced } = ctx.conditions as Record<keyof typeof MQ, boolean>;
        reels.forEach((reel) => {
          const target = -Number(reel.dataset.reel) * 10;
          if (reduced) {
            gsap.set(reel, { yPercent: target });
            return;
          }
          gsap.fromTo(
            reel,
            { yPercent: 0 },
            {
              yPercent: target,
              duration: 1.6,
              ease: "power4.out",
              delay: (reels.length - reels.indexOf(reel)) * 0.06,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            },
          );
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [value], revertOnUpdate: true },
  );

  return (
    <span
      ref={ref}
      className={cn("inline-flex tabular-nums", className)}
      aria-label={value}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span
            key={i}
            aria-hidden="true"
            className="relative inline-block h-[1em] overflow-hidden leading-none">
            <span
              data-reel={ch}
              className="flex flex-col">
              {DIGITS.map((d) => (
                <span
                  key={d}
                  className="block h-[1em] leading-none">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block leading-none">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
