"use client";

import { useRef, type ReactNode } from "react";

import { FlowText } from "@/components/motion/FlowText";
import { Accent, Container, Tag, cn } from "@/components/ui/primitives";
import { FEATURES } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

/**
 * Bento of feature cards. Each card carries its own small looping animation,
 * which only runs while the card is on screen.
 */
const C = FEATURES.cards;

/** Round geometry so server and client render identical numbers. */
const r2 = (n: number) => Math.round(n * 100) / 100;

export function Features() {
  return (
    <section
      id="features"
      className="relative bg-background pt-28 pb-24 sm:pt-36 sm:pb-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Tag>{FEATURES.tag}</Tag>
            <FlowText className="t-h2 mt-5">
              {FEATURES.titleBefore} <Accent>{FEATURES.titleAccent}</Accent>
            </FlowText>
          </div>
          <p className="max-w-md text-muted-foreground">{FEATURES.lead}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card
            tone="ink"
            className="md:col-span-2 lg:col-span-4"
            {...C.anything}>
            <OrbitVisual />
          </Card>
          <Card
            className="lg:col-span-2"
            {...C.perView}>
            <CounterVisual />
          </Card>
          <Card
            className="lg:col-span-2"
            {...C.hidden}>
            <ForwardVisual />
          </Card>
          <Card
            className="lg:col-span-2"
            {...C.stats}>
            <StatsVisual />
          </Card>
          <Card
            className="lg:col-span-2"
            {...C.payouts}>
            <WalletVisual />
          </Card>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Card({
  title,
  body,
  children,
  className,
  tone = "light",
}: {
  title: string;
  body: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "ink" | "blue";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ, (ctx) => {
        const { reduced, desktop } = ctx.conditions as Record<keyof typeof MQ, boolean>;
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: reduced ? 0 : 60, rotateX: desktop ? 8 : 0, transformPerspective: 900, transformOrigin: "50% 100%" },
          { autoAlpha: 1, y: 0, rotateX: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } },
        );
        if (!desktop) return;
        // Cursor spotlight + a little tilt.
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          el.style.setProperty("--mx", `${x * 100}%`);
          el.style.setProperty("--my", `${y * 100}%`);
          ry((x - 0.5) * 5);
          rx(-(y - 0.5) * 5);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const tones = {
    light: "border-border bg-white text-foreground",
    ink: "bg-deep border-ink-border text-ink-foreground",
    blue: "border-transparent bg-accent-soft text-foreground",
  }[tone];

  return (
    <article
      ref={ref}
      data-reveal=""
      className={cn(
        "group relative flex min-h-[23rem] flex-col overflow-hidden rounded-[1.75rem] border shadow-soft [transform-style:preserve-3d]",
        tones,
        className,
      )}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            tone === "ink"
              ? "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(159 216 251 / 0.2), transparent 60%)"
              : "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(3 150 251 / 0.12), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="relative min-h-0 flex-1">
        {children}
      </div>
      <div className="relative p-6 pt-0 sm:p-7 sm:pt-0">
        <h3 className="text-[1.2rem] font-semibold tracking-[-0.015em]">{title}</h3>
        <p className={cn("mt-1.5 text-[0.95rem] leading-relaxed", tone === "ink" ? "text-ink-muted" : "text-muted-foreground")}>{body}</p>
      </div>
    </article>
  );
}

/** Runs `build` while the element is on screen; pauses otherwise. */
function useLoop(build: (q: (s: string) => Element[]) => gsap.core.Timeline | gsap.core.Tween | void) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        const anim = build(gsap.utils.selector(el));
        if (!anim) return;
        anim.pause();
        ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onToggle: (s) => (s.isActive ? anim.play() : anim.pause()) });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return ref;
}

/* ---------- 1. Anything: content types orbit a lock that keeps opening ---------- */
const INNER = ["📷 Photo", "🎬 Video", "📄 PDF", "🔗 Link"];
const OUTER = ["🗜️ ZIP", "💬 Text", "🎞️ GIF", "🎵 Audio", "🖼️ Wallpaper", "📚 Notes"];

function OrbitVisual() {
  const ref = useLoop((q) => {
    const tl = gsap.timeline();
    tl.to(q("[data-orbit='a']"), { rotation: 360, duration: 40, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, 0)
      .to(q("[data-orbit='a'] [data-chip]"), { rotation: -360, duration: 40, ease: "none", repeat: -1 }, 0)
      .to(q("[data-orbit='b']"), { rotation: -360, duration: 60, ease: "none", repeat: -1, transformOrigin: "50% 50%" }, 0)
      .to(q("[data-orbit='b'] [data-chip]"), { rotation: 360, duration: 60, ease: "none", repeat: -1 }, 0);
    const lock = gsap.timeline({ repeat: -1, repeatDelay: 1.4 });
    lock
      .to(q("[data-shackle]"), { y: -5, duration: 0.35, ease: "back.out(3)" })
      .to(q("[data-core]"), { backgroundColor: "#0a6fc2", duration: 0.3 }, "<")
      .fromTo(q("[data-burst]"), { scale: 0.6, autoAlpha: 0.8 }, { scale: 2.2, autoAlpha: 0, duration: 1, ease: "expo.out" }, "<")
      .to(q("[data-shackle]"), { y: 0, duration: 0.3, ease: "power2.in" }, "+=1.2")
      .to(q("[data-core]"), { backgroundColor: "#0396fb", duration: 0.3 }, "<");
    tl.add(lock, 0);
    return tl;
  });

  const ring = (items: string[], r: number, key: string) => (
    <div
      data-orbit={key}
      className="absolute top-1/2 left-1/2"
      style={{ width: r * 2, height: r * 2, marginLeft: -r, marginTop: -r }}>
      <span className="absolute inset-0 rounded-full border border-dashed border-white/12" />
      {items.map((label, i) => {
        const a = (i / items.length) * Math.PI * 2;
        return (
          <span
            key={label}
            className="absolute"
            style={{ left: r2(r + Math.cos(a) * r), top: r2(r + Math.sin(a) * r) }}>
            <span
              data-chip=""
              className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[0.8rem] font-medium whitespace-nowrap text-white/85 backdrop-blur">
              {label}
            </span>
          </span>
        );
      })}
    </div>
  );

  return (
    <div
      ref={ref}
      className="dot-grid-ink absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
      {ring(INNER, 78, "a")}
      {ring(OUTER, 138, "b")}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          data-burst=""
          className="absolute inset-0 rounded-3xl bg-brand-sky opacity-0"
        />
        <span
          data-core=""
          className="relative grid h-20 w-20 place-items-center rounded-3xl bg-brand-blue shadow-[0_20px_40px_-12px_rgb(3_150_251/0.7)]">
          <svg
            viewBox="0 0 24 24"
            className="h-9 w-9 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round">
            <path
              data-shackle=""
              d="M8 11V8a4 4 0 0 1 8 0v3"
            />
            <rect
              x="5"
              y="11"
              width="14"
              height="10"
              rx="2.5"
              fill="currentColor"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ---------- 2. Per view: a balance that never stops counting ---------- */
function CounterVisual() {
  const ref = useLoop((q) => {
    const out = q("[data-count]")[0] as HTMLElement;
    const state = { v: 12.407 };
    const tl = gsap.timeline({ repeat: -1 });
    tl.call(() => {
      state.v += 0.001;
      out.textContent = `$${state.v.toFixed(3)}`;
    })
      .fromTo(q("[data-plus]"), { y: 14, autoAlpha: 0 }, { y: -18, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0)
      .to(q("[data-plus]"), { autoAlpha: 0, duration: 0.4 }, 0.6)
      .fromTo(out, { scale: 1.06 }, { scale: 1, duration: 0.5, ease: "back.out(3)" }, 0)
      .to({}, { duration: 0.6 });
    return tl;
  });
  return (
    <div
      ref={ref}
      className="dot-grid absolute inset-0 grid place-items-center">
      <div className="relative text-center">
        <span
          data-plus=""
          className="absolute -top-6 left-1/2 -translate-x-1/2 rounded-full bg-brand-sky px-2.5 py-1 text-[0.8rem] font-bold text-ink opacity-0">
          +$0.001
        </span>
        <p className="text-[0.72rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">Balance</p>
        <p
          data-count=""
          className="mt-1 rounded-2xl bg-white px-5 py-2 text-[2.4rem] font-semibold tracking-[-0.04em] shadow-soft tabular-nums">
          $12.407
        </p>
      </div>
    </div>
  );
}

/* ---------- 3. Hidden sender: the "Forwarded from" line gets struck out ---------- */
function ForwardVisual() {
  const ref = useLoop((q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });
    tl.set(q("[data-strike]"), { scaleX: 0 })
      .set(q("[data-fwd]"), { height: "auto", autoAlpha: 1 })
      .set(q("[data-clean]"), { autoAlpha: 0, y: 6 })
      .to(q("[data-strike]"), { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, 0.8)
      .to(q("[data-fwd]"), { height: 0, autoAlpha: 0, duration: 0.5, ease: "power3.inOut" }, "+=0.3")
      .to(q("[data-clean]"), { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.1")
      .to({}, { duration: 1.6 });
    return tl;
  });
  return (
    <div
      ref={ref}
      className="dot-grid absolute inset-0 grid place-items-center">
      <div className="w-56">
        <div className="rounded-2xl rounded-bl-md bg-white p-3 text-[0.82rem] shadow-soft">
          <div
            data-fwd=""
            className="overflow-hidden">
            <p className="relative mb-1.5 w-fit text-[0.75rem] font-semibold text-accent-hover">
              Forwarded from @you
              <span
                data-strike=""
                className="absolute top-1/2 left-0 h-0.5 w-full origin-left bg-red-500"
              />
            </p>
          </div>
          <p className="flex items-center gap-2 font-medium">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-white">↓</span>
            exam-notes-ch4.pdf
          </p>
        </div>
        <p
          data-clean=""
          className="mt-3 text-center text-[0.75rem] font-semibold text-brand-blue-deep opacity-0">
          ✓ Delivered as a clean copy
        </p>
      </div>
    </div>
  );
}

/* ---------- 4. Stats: rows tick up like Ad Statistics ---------- */
const ROWS = [
  { id: "mf3k9q", views: 4812 },
  { id: "lq8x2k", views: 2390 },
  { id: "p0w7za", views: 1544 },
  { id: "c4n1rt", views: 873 },
];

function StatsVisual() {
  const ref = useLoop((q) => {
    const cells = q("[data-views]") as HTMLElement[];
    const earn = q("[data-earn]") as HTMLElement[];
    const counts = ROWS.map((r) => r.views);
    return gsap
      .timeline({ repeat: -1 })
      .call(() => {
        const i = Math.floor(Math.random() * 3);
        counts[i] += 1 + Math.floor(Math.random() * 4);
        cells[i].textContent = counts[i].toLocaleString("en-US");
        earn[i].textContent = `$${(counts[i] * 0.001).toFixed(3)}`;
        gsap.fromTo(cells[i].parentElement, { backgroundColor: "#e3f2fe" }, { backgroundColor: "rgba(255,255,255,0)", duration: 1 });
      })
      .to({}, { duration: 0.9 });
  });
  return (
    <div
      ref={ref}
      className="dot-grid absolute inset-0 grid place-items-center px-6">
      <div className="w-full max-w-[17rem] overflow-hidden rounded-2xl border border-border bg-white text-[0.78rem] shadow-soft">
        <p className="flex justify-between border-b border-border bg-surface px-3 py-2 font-semibold">
          📊 Ad Statistics <span className="font-normal text-muted-foreground">1/2</span>
        </p>
        {ROWS.map((r) => (
          <p
            key={r.id}
            className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-border px-3 py-2 last:border-0">
            <span className="text-muted-foreground">{r.id}</span>
            <span
              data-views=""
              className="tabular-nums">
              {r.views.toLocaleString("en-US")}
            </span>
            <span
              data-earn=""
              className="w-14 text-right font-semibold text-brand-blue-deep tabular-nums">
              ${(r.views * 0.001).toFixed(3)}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

/* ---------- 5. Wallet: withdraw, pending, completed ---------- */
function WalletVisual() {
  const ref = useLoop((q) =>
    gsap
      .timeline({ repeat: -1, repeatDelay: 0.8 })
      .set(q("[data-status]"), { textContent: "Ready to withdraw" })
      .set(q("[data-pill]"), { backgroundColor: "#eef4fe", color: "#1f6fe0" })
      .fromTo(q("[data-btn]"), { scale: 1 }, { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1 }, 1)
      .set(q("[data-status]"), { textContent: "⏳ Pending" }, ">")
      .set(q("[data-pill]"), { backgroundColor: "#fff6e0", color: "#9a6a00" }, "<")
      .set(q("[data-status]"), { textContent: "✅ Completed" }, "+=1.4")
      .set(q("[data-pill]"), { backgroundColor: "#e3f2fe", color: "#0a6fc2" }, "<")
      .fromTo(q("[data-pill]"), { scale: 1.1 }, { scale: 1, duration: 0.4, ease: "back.out(3)" }, "<")
      .to({}, { duration: 1.6 }),
  );
  return (
    <div
      ref={ref}
      className="dot-grid absolute inset-0 grid place-items-center">
      <div className="w-56 rounded-2xl border border-border bg-white p-4 shadow-soft">
        <div className="flex items-center justify-between">
          <span className="text-[0.72rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">USDT · TON</span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#26a17b] text-[0.8rem] font-bold text-white">₮</span>
        </div>
        <p className="mt-2 text-[1.8rem] font-semibold tracking-[-0.04em] tabular-nums">$11.042</p>
        <p
          data-pill=""
          className="mt-2 w-fit rounded-full px-2.5 py-1 text-[0.72rem] font-semibold">
          <span data-status="">Ready to withdraw</span>
        </p>
        <span
          data-btn=""
          className="mt-3 block rounded-xl bg-ink py-2 text-center text-[0.8rem] font-semibold text-white">
          💰 Withdraw
        </span>
      </div>
    </div>
  );
}
