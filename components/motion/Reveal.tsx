"use client";

import { useRef, type ComponentPropsWithoutRef, type ElementType } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, MQ, TRAVEL } from "@/lib/motion";

type RevealProps<T extends ElementType> = {
  as?: T;
  /** Animate direct children one after another instead of the element itself. */
  stagger?: number;
  delay?: number;
  /** Start position for the ScrollTrigger. Set to false to play on mount. */
  start?: string | false;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Fade-and-rise on scroll. Desktop travels further than mobile;
 * reduced motion gets a plain opacity fade.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  stagger,
  delay = 0,
  start = "top 85%",
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = stagger ? Array.from(el.children) : [el];
      if (stagger) gsap.set(el, { autoAlpha: 1 });

      const mm = gsap.matchMedia();
      mm.add(MQ, (ctx) => {
        const { desktop, reduced } = ctx.conditions as Record<keyof typeof MQ, boolean>;
        gsap.fromTo(targets, { autoAlpha: 0, y: reduced ? 0 : desktop ? TRAVEL.desktop : TRAVEL.mobile }, {
          autoAlpha: 1,
          y: 0,
          duration: reduced ? DUR.fast : DUR.slow,
          ease: EASE.out,
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: start === false ? undefined : { trigger: el, start, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      data-reveal=""
      {...rest}>
      {children}
    </Tag>
  );
}
