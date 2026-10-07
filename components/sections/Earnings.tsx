"use client";

import { useMemo, useState } from "react";

import { FlowText } from "@/components/motion/FlowText";
import { Reveal } from "@/components/motion/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { Accent, Container, Tag, cn } from "@/components/ui/primitives";
import { CTA, EARNINGS } from "@/lib/content";
import { RATES } from "@/lib/site";

const MIN = 100;
const MAX = 200_000;
const DAYS = 30;

// Slider runs on a log scale so 500 and 50,000 views are both easy to hit.
const toViews = (t: number) => Math.round((MIN * (MAX / MIN) ** t) / 50) * 50 || MIN;
const toT = (v: number) => Math.log(v / MIN) / Math.log(MAX / MIN);

const money = (n: number) =>
  n >= 1000 ? `$${Math.round(n).toLocaleString("en-US")}` : n >= 100 ? `$${n.toFixed(0)}` : `$${n.toFixed(2)}`;

/** Drag your daily views, read the money. A 30-day chart shows when you cross the payout line. */
export function Earnings() {
  const [views, setViews] = useState(5000);
  const [hover, setHover] = useState<number | null>(null);

  const perDay = views * RATES.perView;
  const daysToPayout = Math.ceil(RATES.minPayout / perDay);

  const bars = useMemo(() => {
    const total = perDay * DAYS;
    const top = Math.max(total, RATES.minPayout * 1.3);
    return Array.from({ length: DAYS }, (_, i) => {
      const value = perDay * (i + 1);
      return { day: i + 1, value, h: value / top, paid: value >= RATES.minPayout };
    });
  }, [perDay]);
  const lineAt = RATES.minPayout / Math.max(perDay * DAYS, RATES.minPayout * 1.3);

  const fill = `${toT(views) * 100}%`;
  const shown = hover != null ? bars[hover] : null;

  return (
    <section
      id="earnings"
      className="bg-background pb-24 sm:pb-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Tag>{EARNINGS.tag}</Tag>
            <FlowText className="t-h2 mt-5">
              {EARNINGS.titleBefore} <Accent>{EARNINGS.titleAccent}</Accent>
            </FlowText>
          </div>
          <p className="max-w-md text-muted-foreground">{EARNINGS.lead}</p>
        </div>

        <Reveal className="mt-14 grid gap-3 rounded-[2rem] bg-surface-2 p-3 lg:grid-cols-[1fr_1.25fr]">
          {/* Controls */}
          <div className="flex min-w-0 flex-col bg-deep rounded-[1.6rem] p-6 text-ink-foreground sm:p-8">
            <label
              htmlFor="views"
              className="text-[0.78rem] font-semibold tracking-[0.18em] text-ink-muted uppercase">
              Views per day
            </label>
            <p className="mt-3 text-[clamp(2.6rem,2rem+2vw,3.6rem)] leading-none font-semibold tracking-[-0.045em] tabular-nums">
              {views.toLocaleString("en-US")}
            </p>
            <input
              id="views"
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={toT(views)}
              onChange={(e) => setViews(toViews(Number(e.target.value)))}
              aria-valuetext={`${views.toLocaleString("en-US")} views per day`}
              className="range mt-8 w-full"
              style={{ ["--fill" as string]: fill }}
            />
            <div className="mt-2 flex justify-between text-xs text-ink-muted">
              <span>100</span>
              <span>200,000</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {EARNINGS.presets.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setViews(p.views)}
                  aria-pressed={views === p.views}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-[0.85rem] font-medium transition-colors",
                    views === p.views ? "border-white bg-white text-brand-blue-deep" : "border-ink-border text-white/80 hover:bg-white/10",
                  )}>
                  {p.label} · {p.views >= 1000 ? `${p.views / 1000}k` : p.views}
                </button>
              ))}
            </div>

            <p className="mt-auto pt-10 text-sm leading-relaxed text-ink-muted">
              Estimates use the flat rate of ${RATES.perView} per view. Real earnings depend on how many people open your links.
            </p>
          </div>

          {/* Results */}
          <div className="flex min-w-0 flex-col rounded-[1.6rem] bg-white p-6 sm:p-8">
            <dl className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { label: "Per day", value: perDay },
                { label: "Per month", value: perDay * 30 },
                { label: "Per year", value: perDay * 365 },
              ].map((r, i) => (
                <div key={r.label}>
                  <dt className="text-[0.68rem] font-semibold tracking-[0.08em] whitespace-nowrap text-muted-foreground uppercase sm:text-[0.78rem] sm:tracking-[0.14em]">{r.label}</dt>
                  <dd
                    className={cn(
                      "mt-2 leading-none font-semibold tracking-[-0.04em] tabular-nums",
                      i === 1 ? "text-[clamp(1.8rem,1.4rem+1.6vw,2.8rem)]" : "text-[clamp(1.4rem,1.2rem+1vw,2rem)] text-foreground/80",
                    )}>
                    {money(r.value)}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-brand-sky-soft px-3 py-1.5 text-[0.85rem] font-medium text-ink">
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
              {daysToPayout <= 1 ? "First payout unlocked on day 1" : `First $${RATES.minPayout} payout unlocked on day ${daysToPayout}`}
            </p>

            {/* 30-day balance */}
            <figure className="mt-8 flex flex-1 flex-col">
              <figcaption className="flex items-baseline justify-between text-sm">
                <span className="font-semibold">Balance over 30 days</span>
                <span
                  className="text-muted-foreground tabular-nums"
                  aria-live="polite">
                  {shown ? `Day ${shown.day} · ${money(shown.value)}` : `Day 30 · ${money(perDay * DAYS)}`}
                </span>
              </figcaption>
              <div
                className="relative mt-8 min-h-48 flex-1"
                onPointerLeave={() => setHover(null)}>
                {/* recessive grid */}
                {[0.25, 0.5, 0.75].map((g) => (
                  <span
                    key={g}
                    aria-hidden="true"
                    className="absolute inset-x-0 border-t border-dashed border-border"
                    style={{ bottom: `${g * 100}%` }}
                  />
                ))}
                <div
                  className="absolute inset-0 flex items-end gap-[2px]"
                  role="img"
                  aria-label={`Balance grows by ${money(perDay)} a day, reaching ${money(perDay * DAYS)} after 30 days. The $${RATES.minPayout} payout minimum is reached on day ${daysToPayout}.`}>
                  {bars.map((b, i) => (
                    <span
                      key={b.day}
                      onPointerEnter={() => setHover(i)}
                      className="relative flex h-full flex-1 items-end">
                      <span
                        className={cn(
                          "block w-full rounded-t-[4px] transition-[height,background-color,opacity] duration-500 ease-[var(--ease-out-expo)]",
                          b.paid ? "bg-brand-green" : "bg-brand-green-soft",
                          hover != null && hover !== i && "opacity-45",
                        )}
                        style={{ height: `${Math.max(1.5, b.h * 100)}%`, transitionDelay: `${i * 8}ms` }}
                      />
                    </span>
                  ))}
                </div>
                {/* payout threshold */}
                {lineAt <= 1 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 border-t-2 border-ink transition-[bottom] duration-500 ease-[var(--ease-out-expo)]"
                    style={{ bottom: `${lineAt * 100}%` }}>
                    <span className="absolute -top-7 left-0 rounded-md bg-ink px-2 py-0.5 text-[0.7rem] font-semibold text-white">${RATES.minPayout} payout</span>
                  </div>
                )}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Day 1</span>
                <span>Day 15</span>
                <span>Day 30</span>
              </div>
            </figure>

            <div className="mt-8">
              <CtaButton href={CTA.primary.href}>
                Start earning<span className="hidden sm:inline"> from {views.toLocaleString("en-US")} views</span>
              </CtaButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
