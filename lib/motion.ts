/**
 * One motion vocabulary for the whole site.
 *
 * Three modes, resolved with gsap.matchMedia():
 *  - desktop: full scrollytelling, pins, mouse parallax
 *  - mobile:  same story, lighter (fewer pins, shorter travel, no mouse parallax)
 *  - reduced: no pins/parallax/scrub — content simply fades in
 */

export const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export type MotionConditions = {
  desktop: boolean;
  mobile: boolean;
  reduced: boolean;
};

export const EASE = {
  out: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
  spring: "back.out(1.6)",
} as const;

export const DUR = {
  fast: 0.35,
  base: 0.8,
  slow: 1.2,
} as const;

/** Stagger for SplitText lines/words/chars. */
export const STAGGER = {
  chars: 0.018,
  words: 0.045,
  lines: 0.09,
} as const;

/** How far elements travel on reveal, per mode. */
export const TRAVEL = {
  desktop: 48,
  mobile: 24,
} as const;
