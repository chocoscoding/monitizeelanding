"use client";

import { useEffect, useRef, useState } from "react";

import Aurora from "@/components/backgrounds/Aurora";
import DotField from "@/components/backgrounds/DotField";

/**
 * Hero backdrop: a React Bits Aurora in the logo's sky and azure across the top, with a
 * DotField grid that bulges around the cursor. Both mount only while the hero is on screen,
 * and neither runs for visitors who prefer reduced motion.
 */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20">
      {live && (
        <>
          <div className="absolute inset-x-0 top-0 h-[75%] opacity-80 [mask-image:linear-gradient(to_bottom,black_35%,transparent)]">
            <Aurora
              colorStops={["#60BFEF", "#0396FB", "#9FD8FB"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
              lightMode
            />
          </div>
          <div className="absolute inset-0">
            <DotField
              dotRadius={1.5}
              dotSpacing={14}
              cursorRadius={620}
              cursorForce={0.18}
              bulgeOnly={true}
              bulgeStrength={45}
              glowRadius={280}
              sparkle={false}
              waveAmplitude={5}
              gradientFrom="rgba(3, 150, 251, 0.6)"
              gradientTo="rgba(96, 191, 239, 0.5)"
              glowColor="rgba(96, 191, 239, 0.28)"
            />
          </div>
        </>
      )}
    </div>
  );
}
