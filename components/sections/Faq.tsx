"use client";

import { useRef, useState } from "react";

import { FlowText } from "@/components/motion/FlowText";
import { LogoMark } from "@/components/ui/Logo";
import { Accent, Container, Tag, cn } from "@/components/ui/primitives";
import { FAQ } from "@/lib/content";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MQ } from "@/lib/motion";

/**
 * Split FAQ styled as a Telegram chat: pick a question, the bot types its answer.
 * Every answer is also in the HTML (visually hidden) so search engines read the full FAQ.
 */
export function Faq() {
  const [active, setActive] = useState(0);
  const answer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = answer.current?.querySelector<HTMLElement>("[data-answer]");
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        const typing = answer.current!.querySelector("[data-typing]");
        const split = SplitText.create(el, { type: "words" });
        gsap
          .timeline()
          .fromTo(typing, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2, delay: 0.45 })
          .from(split.words, { autoAlpha: 0, y: 6, filter: "blur(4px)", duration: 0.5, stagger: 0.018, ease: "power2.out", clearProps: "filter" });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: answer, dependencies: [active], revertOnUpdate: true },
  );

  return (
    <section
      id="faq"
      className="bg-background pb-24 sm:pb-32">
      <Container>
        <div className="text-center">
          <Tag>FAQ</Tag>
          <FlowText className="t-h2 mt-5 text-balance">
            Questions creators <Accent>ask us.</Accent>
          </FlowText>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-4 rounded-[2rem] bg-surface-2 p-3 lg:grid-cols-[1fr_1.1fr]">
          <div className="bg-deep rounded-[1.6rem] p-3 text-ink-foreground">
            <p className="px-3 pt-3 pb-2 text-[0.78rem] font-semibold tracking-[0.18em] text-ink-muted uppercase">Questions</p>
            <ul role="list">
              {FAQ.map((f, i) => (
                <li key={f.q}>
                  <button
                    type="button"
                    aria-pressed={active === i}
                    onClick={() => setActive(i)}
                    className={cn(
                      "w-full rounded-2xl px-4 py-3 text-left text-[0.98rem] transition-colors duration-300",
                      active === i ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/[0.05] hover:text-white",
                    )}>
                    <span className="flex items-start justify-between gap-3">
                      {f.q}
                      <span
                        aria-hidden="true"
                        className={cn("mt-0.5 text-brand-sky transition-transform duration-300 lg:hidden", active === i && "rotate-45")}>
                        +
                      </span>
                    </span>
                  </button>
                  {active === i && (
                    <p className="bubble-in px-4 pt-1 pb-4 text-[0.95rem] leading-relaxed text-ink-muted lg:hidden">{f.a}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={answer}
            className="tg-wallpaper hidden flex-col overflow-hidden rounded-[1.6rem] lg:flex"
            aria-live="polite">
            <div className="flex items-center gap-3 bg-white/95 px-5 py-3 shadow-[0_1px_0_rgb(0_0_0/0.06)]">
              <LogoMark className="h-9 w-9" />
              <span className="leading-tight">
                <span className="block font-semibold">Monitizee</span>
                <span className="text-[0.75rem] text-muted-foreground">bot · usually replies instantly</span>
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-end gap-3 p-5 sm:p-7">
              <p
                key={`q${active}`}
                className="bubble-in max-w-[85%] self-end rounded-2xl rounded-br-md bg-[#d9eefe] px-4 py-2.5 text-[0.95rem] shadow-[0_1px_1px_rgb(0_0_0/0.08)]">
                {FAQ[active].q}
              </p>
              <div className="relative max-w-[30rem] self-start rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[1rem] leading-relaxed text-ink shadow-[0_1px_1px_rgb(0_0_0/0.08)]">
                <span
                  data-typing=""
                  className="absolute top-3 left-4 flex gap-1"
                  aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="typing-dot h-2 w-2 rounded-full bg-ink/40"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </span>
                <p
                  key={active}
                  data-answer="">
                  {FAQ[active].a}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full FAQ for readers who skim and for search engines. */}
        <dl className="sr-only">
          {FAQ.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
