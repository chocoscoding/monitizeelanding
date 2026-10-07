"use client";

import Link from "next/link";
import { useRef } from "react";

import { CtaButton } from "@/components/ui/CtaButton";
import { Accent, Container } from "@/components/ui/primitives";
import { CTA, HERO } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";
import { RATES } from "@/lib/site";

import { HeroBackground } from "./HeroBackground";

/** Headline, the deal at a glance and the two calls to action, on the logo's sky. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gsap.fromTo(q("[data-fade]"), { autoAlpha: 0, y: reduced ? 0 : 16 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.2 });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[max(100svh,44rem)] flex-col overflow-hidden bg-background">
      {/* the logo's sky, washing down from the top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-30 h-[80%] bg-[radial-gradient(120%_90%_at_50%_0%,rgb(96_191_239/0.22),transparent_70%)]"
      />
      <HeroBackground />
      {/* keep the headline crisp over the dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[34rem] w-[min(60rem,95vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(255_255_255/0.85),transparent)]"
      />

      <Container className="relative flex flex-1 flex-col items-center justify-center pt-[calc(var(--header-h)+2rem)] pb-20 text-center sm:pb-28">
        <div className="flex flex-col items-center">
          <h1
            data-fade=""
            data-reveal=""
            className="t-display max-w-[16ch] text-balance">
            {HERO.headlineBefore} <Accent>{HERO.headlineAccent}</Accent>
          </h1>

          <div
            data-fade=""
            data-reveal=""
            className="mt-6 flex min-h-9 w-full items-center justify-center">
            <Readout views={1284} />
          </div>

          <p
            data-fade=""
            data-reveal=""
            className="t-lead mt-5 max-w-[36rem] text-foreground/75">
            {HERO.lead}
          </p>
          <div
            data-fade=""
            data-reveal=""
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <CtaButton href={CTA.primary.href}>{CTA.primary.label}</CtaButton>
            <Link
              href={CTA.secondary.href}
              className="group inline-flex items-center gap-1.5 py-2 text-[0.98rem] font-semibold underline decoration-border-strong underline-offset-[6px] transition-colors hover:decoration-foreground">
              {CTA.secondary.label}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* On phones the proof points sit in the flow, under the buttons */}
          <ul
            data-fade=""
            data-reveal=""
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-2.5 text-left text-[0.82rem] font-medium text-muted-foreground sm:hidden">
            {HERO.proof.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0 text-brand-blue-deep"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div
        data-fade=""
        data-reveal=""
        className="pointer-events-none absolute inset-x-0 bottom-14 hidden flex-col items-center gap-3 px-6 sm:flex">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[0.85rem] font-medium text-muted-foreground">
          {HERO.proof.map((p) => (
            <li
              key={p}
              className="inline-flex items-center gap-2">
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5 text-brand-blue-deep"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true">
                <path d="m3.5 8.5 3 3 6-7" />
              </svg>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** The deal at a glance, under the headline. */
function Readout({ views }: { views: number }) {
  return (
    <p className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-border bg-white/90 py-1 pr-4 pl-1 text-[0.85rem] shadow-soft backdrop-blur">
      <span className="inline-flex h-7 shrink-0 items-center rounded-full bg-brand-green px-2.5 text-[0.72rem] font-bold tracking-wide text-white">+$0.001 / view</span>
      <span className="min-w-0 truncate text-muted-foreground">
        <span className="font-semibold text-foreground tabular-nums">{views.toLocaleString("en-US")}</span> views ·{" "}
        <span className="font-semibold text-brand-blue-deep tabular-nums">${(views * RATES.perView).toFixed(3)}</span> earned
      </span>
    </p>
  );
}
