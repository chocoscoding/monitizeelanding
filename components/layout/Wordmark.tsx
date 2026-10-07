"use client";

import { useRef } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

/** Giant Monitizee wordmark at the foot of the page; letters rise in one after another. */
export function Wordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        const split = SplitText.create(el, { type: "chars", mask: "chars" });
        gsap.fromTo(split.chars, { yPercent: 100 }, {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <p
      ref={ref}
      aria-hidden="true"
      className="mt-20 text-center text-[clamp(3.6rem,16vw,15.5rem)] leading-[0.9] font-semibold tracking-[-0.06em] select-none">
      <span className="text-white">Moniti</span>
      <span className="text-brand-sky">zee</span>
    </p>
  );
}
