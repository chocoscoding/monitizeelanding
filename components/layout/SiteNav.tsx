"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { CtaButton } from "@/components/ui/CtaButton";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/components/ui/primitives";
import { CTA, NAV_LINKS } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SITE } from "@/lib/site";

/**
 * Floating pill header. Frosted white over the page, tightens once you scroll, tucks away on
 * the way down and returns on the way up. On mobile the menu drops out of the pill as a card.
 */
export function SiteNav() {
  const header = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const y = gsap.quickTo(el, "yPercent", { duration: 0.45, ease: "power3.out" });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const top = self.scroll();
          setScrolled(top > 12);
          if (reduced) return;
          y(self.direction === 1 && top > 420 ? -130 : 0);
        },
      });
    },
    { scope: header },
  );

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-[68rem] items-center gap-6 rounded-full border bg-white/75 pr-2 pl-3 shadow-soft backdrop-blur-xl transition-[height,border-color,box-shadow] duration-500 sm:pl-4",
          scrolled ? "h-14 border-border shadow-lift" : "h-16 border-white",
        )}>
        <Link
          href="/"
          aria-label="Monitizee home"
          className="shrink-0">
          <Logo />
        </Link>

        <nav
          aria-label="Main"
          className="mx-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="relative inline-flex rounded-full px-4 py-2 text-[0.95rem] font-medium text-foreground/70 transition-colors hover:bg-accent-soft hover:text-accent-hover">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden md:block">
          <CtaButton
            href={CTA.primary.href}
            size="md">
            {CTA.primary.short}
          </CtaButton>
        </div>

        <button
          type="button"
          className="ml-auto grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-accent-hover md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}>
          <span className="relative block h-3 w-4">
            <span className={cn("absolute top-0 left-0 h-0.5 w-4 rounded-full bg-current transition-transform duration-300", open && "translate-y-[5px] rotate-45")} />
            <span className={cn("absolute bottom-0 left-0 h-0.5 w-4 rounded-full bg-current transition-transform duration-300", open && "-translate-y-[5px] -rotate-45")} />
          </span>
        </button>
      </div>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
      />
    </header>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (!open || !ref.current) return;
      gsap.fromTo(ref.current.querySelectorAll("[data-item]"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power3.out" });
    },
    { dependencies: [open], scope: ref },
  );
  return (
    <div
      ref={ref}
      id="mobile-menu"
      inert={!open}
      className={cn(
        "mx-auto mt-2 max-w-[68rem] origin-top rounded-[1.75rem] border border-border bg-white p-3 shadow-lift transition-[opacity,transform] duration-300 ease-[var(--ease-out-expo)] md:hidden",
        open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
      )}>
      <ul>
        {NAV_LINKS.map((l) => (
          <li
            key={l.label}
            data-item="">
            <Link
              href={l.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[1.15rem] font-semibold tracking-[-0.02em] hover:bg-surface">
              {l.label}
              <span className="text-brand-blue">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <div
        data-item=""
        className="mt-2 px-1 pb-1">
        <CtaButton
          href={CTA.primary.href}
          full>
          {CTA.primary.label}
        </CtaButton>
        <p className="mt-3 text-center text-sm text-muted-foreground">Free · {SITE.botHandle} · $0.001 per view</p>
      </div>
    </div>
  );
}
