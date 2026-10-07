"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

type FlowTextProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
  /** ScrollTrigger start. `false` plays on mount. */
  start?: string | false;
  stagger?: number;
};

/**
 * Headline reveal: words drift up out of a soft blur, one after another.
 * Nothing is masked, so script ascenders/descenders are never clipped.
 */
export function FlowText({ as, className, children, delay = 0, start = "top 85%", stagger = 0.06 }: FlowTextProps) {
  const Tag = (as ?? "h2") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const trigger = start === false ? undefined : { trigger: el, start, once: true };

      const mm = gsap.matchMedia();
      mm.add(MQ, (ctx) => {
        const { reduced, desktop } = ctx.conditions as Record<keyof typeof MQ, boolean>;
        if (reduced) {
          gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, delay, scrollTrigger: trigger });
          return;
        }

        gsap.set(el, { autoAlpha: 1 });
        const split = SplitText.create(el, {
          type: "words",
          wordsClass: "flow-word",
          autoSplit: true,
          onSplit(self) {
            const tl = gsap.timeline({ delay, scrollTrigger: trigger });
            tl.from(self.words, {
              autoAlpha: 0,
              yPercent: desktop ? 55 : 35,
              filter: "blur(14px)",
              duration: 1.15,
              ease: "expo.out",
              stagger,
              clearProps: "filter",
            });
            const accents = el.querySelectorAll(".accent-script .flow-word");
            if (accents.length) {
              tl.from(accents, { rotate: -7, transformOrigin: "0% 100%", duration: 1.3, ease: "back.out(1.7)", stagger }, 0.2);
            }
            return tl;
          },
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}>
      {children}
    </Tag>
  );
}
