"use client";

import Link from "next/link";
import { useRef } from "react";

import { FlowText } from "@/components/motion/FlowText";
import { CtaButton } from "@/components/ui/CtaButton";
import { Accent } from "@/components/ui/primitives";
import { CTA, FINAL } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

/** Close on the logo itself: its sky-to-azure tile opens up, the big M sparks as it arrives. */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const q = gsap.utils.selector(ref);
      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          q("[data-card]"),
          { clipPath: "inset(8% 6% 8% 6% round 48px)" },
          { clipPath: "inset(0% 0% 0% 0% round 40px)", ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "top 20%", scrub: true } },
        );
        gsap.fromTo(q("[data-m]"), { yPercent: 12, rotate: -4 }, { yPercent: -6, rotate: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.6, scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play pause resume pause" } })
          .fromTo(q("[data-spark]"), { drawSVG: "0% 0%", opacity: 1 }, { drawSVG: "0% 100%", duration: 0.35, stagger: 0.07, ease: "power2.out" })
          .to(q("[data-spark]"), { drawSVG: "100% 100%", duration: 0.35, stagger: 0.07, ease: "power2.in" }, "+=0.5");
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="bg-background px-3 pb-3">
      <div
        data-card=""
        className="bg-logo relative overflow-hidden rounded-[2.5rem] text-white">
        {/* the mark, oversized */}
        <svg
          data-m=""
          viewBox="0 0 40 40"
          aria-hidden="true"
          className="pointer-events-none absolute -right-[8%] -bottom-[18%] h-[120%] w-auto opacity-95 drop-shadow-[0_40px_60px_rgb(2_80_160/0.35)] max-lg:hidden">
          <path
            d="M14.5 29.5V16.2l7 7.3 7-7.3v13.3"
            fill="none"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {["M11.4 10.6 10.8 7.6", "M10.1 11.4 7.9 9.2", "M9.3 12.7 6.3 12.1"].map((d) => (
            <path
              key={d}
              data-spark=""
              d={d}
              stroke="white"
              strokeWidth="0.9"
              strokeLinecap="round"
            />
          ))}
        </svg>

        <div className="relative flex min-h-[34rem] flex-col justify-center px-6 py-20 sm:px-12 lg:min-h-[40rem] lg:px-20">
          <FlowText className="t-display max-w-[12ch] [text-shadow:0_2px_24px_rgb(2_80_160/0.25)]">
            {FINAL.titleBefore} <Accent tone="ink">{FINAL.titleAccent}</Accent>
          </FlowText>
          <p className="t-lead mt-6 max-w-[32rem] font-medium text-white/90">{FINAL.body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <CtaButton
              href={CTA.primary.href}
              tone="light">
              {CTA.primary.label}
            </CtaButton>
            <Link
              href="/#earnings"
              className="py-2 text-[0.98rem] font-semibold text-white underline decoration-white/50 underline-offset-[6px] hover:decoration-white">
              Calculate your earnings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
