"use client";

import { useRef, useState, type ReactNode } from "react";

import { FlowText } from "@/components/motion/FlowText";
import { LogoMark } from "@/components/ui/Logo";
import { Accent, Container, Tag, cn } from "@/components/ui/primitives";
import { DEMO } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

const N = DEMO.steps.length;

/**
 * Product walkthrough on a Telegram-style phone. The section pins and scroll drives the steps:
 * on desktop beside the step list, on phones with a compact caption above the phone.
 * Reduced motion leaves the steps to the list (desktop) or the step buttons (phones).
 */
export function Demo() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const pinned = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, (ctx) => {
        const { desktop } = ctx.conditions as Record<keyof typeof MQ, boolean>;
        pinned.current = ScrollTrigger.create({
          trigger: el.querySelector("[data-stage]"),
          start: "top top",
          end: `+=${N * (desktop ? 70 : 60)}%`,
          pin: true,
          onUpdate: (self) => setStep(Math.min(N - 1, Math.floor(self.progress * N))),
        });
        return () => {
          pinned.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const pick = (i: number) => {
    const st = pinned.current;
    if (!st) return setStep(i);
    window.scrollTo({ top: st.start + ((i + 0.5) / N) * (st.end - st.start), behavior: "smooth" });
  };

  const current = DEMO.steps[step];

  return (
    <section
      ref={ref}
      id="demo"
      className="bg-deep relative z-20 -mt-10 overflow-x-clip rounded-[2.5rem] text-ink-foreground sm:rounded-[3.5rem]">
      <div
        data-stage=""
        className="flex h-svh flex-col pt-[5.25rem] pb-5 lg:h-auto lg:min-h-svh lg:flex-row lg:items-center lg:py-0">
        <Container className="flex min-h-0 flex-1 flex-col gap-4 lg:grid lg:flex-none lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20">
          <div className="shrink-0">
            <Tag
              tone="ink"
              className="hidden lg:inline-flex">
              {DEMO.tag}
            </Tag>
            <FlowText className="t-h2 max-w-[16ch] max-lg:text-[1.7rem] lg:mt-5">
              {DEMO.titleBefore} <Accent tone="sky">{DEMO.titleAccent}</Accent>
            </FlowText>

            {/* Phones: a compact caption that follows the scroll */}
            <div className="mt-4 lg:hidden">
              <div className="flex gap-1.5">
                {DEMO.steps.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => pick(i)}
                    aria-label={`Step ${i + 1}: ${s.title}`}
                    aria-current={step === i ? "step" : undefined}
                    className="group flex h-6 flex-1 items-center">
                    <span className={cn("block h-1 w-full rounded-full transition-colors duration-500", i <= step ? "bg-brand-sky" : "bg-white/20")} />
                  </button>
                ))}
              </div>
              <div
                key={step}
                className="hero-readout mt-2 min-h-[4.6rem]"
                aria-live="polite">
                <p className="flex items-baseline gap-2.5">
                  <span className="text-sm font-semibold text-brand-sky tabular-nums">0{step + 1}</span>
                  <span className="text-[1.05rem] font-semibold tracking-[-0.01em]">{current.title}</span>
                </p>
                <p className="mt-1 line-clamp-2 text-[0.9rem] leading-snug text-ink-muted">{current.body}</p>
              </div>
            </div>

            {/* Desktop: the full step list */}
            <ol className="mt-10 hidden space-y-1.5 lg:block">
              {DEMO.steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-current={step === i ? "step" : undefined}
                    className={cn(
                      "group relative w-full overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors duration-500",
                      step === i ? "bg-white/[0.08]" : "hover:bg-white/[0.04]",
                    )}>
                    <span className="flex items-baseline gap-4">
                      <span className={cn("text-sm font-semibold tabular-nums transition-colors", step === i ? "text-brand-sky" : "text-ink-muted/60")}>
                        0{i + 1}
                      </span>
                      <span>
                        <span className={cn("block text-[1.1rem] font-semibold tracking-[-0.01em] transition-colors", step === i ? "text-white" : "text-white/55")}>
                          {s.title}
                        </span>
                        <span
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]",
                            step === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}>
                          <span className="overflow-hidden">
                            <span className="block pt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">{s.body}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                    {step === i && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-5 h-0.5 w-12 rounded-full bg-brand-sky"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mx-auto flex min-h-0 flex-1 flex-col items-center lg:block lg:flex-none">
            <p
              key={step < 2 ? "you" : "viewer"}
              className="hero-readout mb-2 text-center text-[0.72rem] font-semibold tracking-[0.18em] text-ink-muted uppercase lg:mb-4 lg:text-[0.78rem]">
              {step < 2 ? "Your phone" : "Your viewer's phone"}
            </p>
            <Phone
              step={step}
              className="min-h-0 flex-1 max-lg:h-auto max-lg:w-[min(19rem,78vw)] max-lg:rounded-[2.4rem] max-lg:border-[7px]"
            />
            <EarningsToast show={step === N - 1} />
          </div>
        </Container>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Phone({ step, className }: { step: number; className?: string }) {
  const viewer = step >= 2;
  return (
    <div
      className={cn(
        "relative h-[min(41rem,78svh)] w-[min(21rem,86vw)] overflow-hidden rounded-[2.9rem] border-[9px] border-black bg-black shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/15",
        className,
      )}>
      <div className="absolute top-2 left-1/2 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="tg-wallpaper relative flex h-full flex-col overflow-hidden rounded-[2.2rem] text-[0.82rem] text-neutral-900">
        <ChatHeader viewer={viewer} />
        <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden px-3 pb-3">
          {viewer ? <ViewerChat step={step} /> : <CreatorChat step={step} />}
        </div>
        <div className="flex items-center gap-2 border-t border-black/5 bg-white px-3 py-2.5">
          <span className="h-8 flex-1 rounded-full bg-neutral-100 px-3 py-1.5 text-neutral-400">Message</span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#0396fb] text-white">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden="true">
              <path d="M3 20.5 21 12 3 3.5v6.6L15 12 3 13.9z" />
            </svg>
          </span>
        </div>
        <MiniApp open={step === 3} />
      </div>
    </div>
  );
}

function ChatHeader({ viewer }: { viewer: boolean }) {
  return (
    <div className="flex items-center gap-3 bg-white/95 px-4 pt-9 pb-2.5 shadow-[0_1px_0_rgb(0_0_0/0.06)] backdrop-blur">
      <span className="text-[#0396fb]">‹</span>
      <LogoMark className="h-9 w-9 rounded-full" />
      <span className="leading-tight">
        <span className="block font-semibold">Monitizee</span>
        <span className="text-[0.72rem] text-neutral-500">{viewer ? "bot · opened from @goldenhourclub" : "bot"}</span>
      </span>
    </div>
  );
}

function Bubble({ out, children, className }: { out?: boolean; children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bubble-in max-w-[85%] rounded-2xl px-3 py-2 leading-snug shadow-[0_1px_1px_rgb(0_0_0/0.08)]",
        out ? "self-end rounded-br-md bg-[#d9eefe]" : "self-start rounded-bl-md bg-white",
        className,
      )}>
      {children}
    </div>
  );
}

function Buttons({ items, tap }: { items: string[]; tap?: number }) {
  return (
    <div className="bubble-in grid w-[85%] grid-cols-2 gap-1 self-start">
      {items.map((b, i) => (
        <span
          key={b}
          className={cn(
            "relative overflow-hidden rounded-xl bg-black/25 px-2 py-2 text-center text-[0.78rem] font-semibold text-white backdrop-blur",
            items.length === 1 && "col-span-2",
          )}>
          {b}
          {tap === i && (
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-white/50"
            />
          )}
        </span>
      ))}
    </div>
  );
}

function FileCard({ out }: { out?: boolean }) {
  return (
    <Bubble out={out}>
      <span className="flex items-center gap-2.5">
        <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full text-white", out ? "bg-[#0a6fc2]" : "bg-[#0396fb]")}>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true">
            <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
          </svg>
        </span>
        <span className="leading-tight">
          <span className="block font-semibold">{DEMO.file.name}</span>
          <span className="text-[0.72rem] text-neutral-500">{DEMO.file.size}</span>
        </span>
      </span>
    </Bubble>
  );
}

function CreatorChat({ step }: { step: number }) {
  return (
    <>
      <Bubble>👋 Welcome to Monitizee! Earn money by sharing content with ads!</Bubble>
      <Buttons
        items={["📝 Create Ad", "👤 My Account"]}
        tap={step === 0 ? 0 : undefined}
      />
      <Bubble className="[animation-delay:0.4s]">📨 Send the message you want to show when users view your ad.</Bubble>
      <div className="flex flex-col [&>*]:[animation-delay:0.9s]">
        <FileCard out />
      </div>
      {step >= 1 && (
        <Bubble>
          <span className="block font-semibold">✅ Your ad link is ready!</span>
          <span className="mt-1 block truncate font-medium text-[#0396fb] underline">{DEMO.link}</span>
          <span className="mt-1.5 block text-neutral-600">When users click this link, they&apos;ll watch an ad and then receive your message!</span>
          <span className="mt-1.5 block font-semibold">💰 You&apos;ll earn $0.001 per view!</span>
        </Bubble>
      )}
    </>
  );
}

function ViewerChat({ step }: { step: number }) {
  return (
    <>
      <Bubble out>/start</Bubble>
      {step < 4 ? (
        <>
          <Bubble>👇Click below to view content👇</Bubble>
          <Buttons
            items={["👁️ View Content", "❌ Cancel"]}
            tap={step === 2 ? 0 : undefined}
          />
        </>
      ) : (
        <>
          <span className="bubble-in self-center rounded-full bg-black/25 px-3 py-1 text-[0.72rem] font-medium text-white backdrop-blur">
            Your message is being sent now.
          </span>
          <div className="flex flex-col [&>*]:[animation-delay:0.5s]">
            <FileCard />
          </div>
          <Bubble className="[animation-delay:0.8s]">🌅 12 golden-hour presets. Enjoy!</Bubble>
        </>
      )}
    </>
  );
}

/** Mini App sheet with a short ad that counts down. */
function MiniApp({ open }: { open: boolean }) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "absolute inset-x-0 bottom-0 z-20 flex h-[78%] flex-col rounded-t-[1.6rem] bg-white shadow-[0_-20px_40px_-20px_rgb(0_0_0/0.4)] transition-transform duration-700 ease-[var(--ease-out-expo)]",
        open ? "translate-y-0" : "translate-y-full",
      )}>
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span className="text-[#0396fb]">Close</span>
        <span className="font-semibold">Monitizee</span>
        <span className="text-neutral-400">•••</span>
      </div>
      <div className="flex flex-1 flex-col items-center px-5 pt-2 text-center">
        <p className="text-[0.9rem] font-semibold">See a short ad to view the content</p>
        <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-linear-to-br from-[#ffb36b] via-[#ff6f91] to-[#845ef7] text-white">
          <span className="absolute top-2.5 left-2.5 rounded-md bg-black/35 px-1.5 py-0.5 text-[0.65rem] font-semibold">Ad</span>
          <span className="absolute inset-0 grid place-items-center text-center">
            <span>
              <span className="block text-[1.35rem] leading-tight font-bold">Your ad here</span>
              <span className="mt-1 block text-[0.75rem] opacity-80">Rewarded video · 5 s</span>
            </span>
          </span>
          <span className="absolute inset-x-3 bottom-3 h-1 overflow-hidden rounded-full bg-white/30">
            <span
              key={String(open)}
              className={cn("block h-full origin-left rounded-full bg-white", open ? "animate-[grow_3.2s_linear_forwards]" : "scale-x-0")}
            />
          </span>
        </div>
        <span className="mt-4 w-full rounded-xl bg-[#0396fb] py-2.5 text-[0.85rem] font-semibold text-white">View Ad &amp; Get Content</span>
      </div>
      <style>{`@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </div>
  );
}

function EarningsToast({ show }: { show: boolean }) {
  return (
    <div
      className={cn(
        "absolute top-1/3 -right-6 z-40 hidden w-56 rounded-2xl bg-white p-4 text-ink shadow-lift transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] sm:block lg:-right-24",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}>
      <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">Your balance</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-[1.6rem] font-semibold tracking-[-0.03em] tabular-nums">$14.383</span>
        <span className="rounded-full bg-brand-sky-soft px-2 py-0.5 text-[0.72rem] font-bold text-brand-blue-deep">+$0.001</span>
      </p>
      <p className="mt-1 text-[0.8rem] text-muted-foreground">View #14,383 · just now</p>
    </div>
  );
}
