import { FlowText } from "@/components/motion/FlowText";
import { Reveal } from "@/components/motion/Reveal";
import { Accent, Container, Tag } from "@/components/ui/primitives";
import { NO_JOINS } from "@/lib/content";

/**
 * The problem in one glance: join-to-unlock gates bloat people's chat lists with betting,
 * spam and adult channels. Monitizee replaces the join with one short ad.
 */
export function NoJoins() {
  const { old, next } = NO_JOINS;
  return (
    <section
      id="why"
      className="bg-background pt-28 sm:pt-36">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Tag>{NO_JOINS.tag}</Tag>
          <FlowText className="t-h2 mt-5 text-balance">
            {NO_JOINS.titleBefore} <Accent>{NO_JOINS.titleAccent}</Accent>
          </FlowText>
          <p className="t-lead mx-auto mt-6 max-w-2xl text-muted-foreground">{NO_JOINS.lead}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-3 rounded-[2rem] bg-surface-2 p-3 md:grid-cols-2">
          {/* The old way: a join gate */}
          <div className="flex min-w-0 flex-col rounded-[1.6rem] bg-white p-5 sm:p-7">
            <span className="w-fit rounded-full bg-surface-2 px-3 py-1 text-[0.75rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{old.label}</span>
            <p className="mt-5 w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-surface px-4 py-2.5 text-[0.95rem] font-medium">{old.prompt}</p>
            <Reveal
              as="ul"
              stagger={0.12}
              className="mt-3 space-y-2">
              {old.channels.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center gap-3 rounded-2xl border border-border px-3 py-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 text-[1.05rem] grayscale-[0.3]">{c.emoji}</span>
                  <span className="min-w-0 flex-1 text-[0.92rem] leading-snug font-medium text-foreground/80">{c.name}</span>
                  <span className="rounded-full bg-surface-2 px-3 py-1 text-[0.75rem] font-semibold text-muted-foreground">Join</span>
                </li>
              ))}
            </Reveal>
            <p className="mt-auto pt-5 text-[0.9rem] font-semibold text-rose-600">
              <span className="mr-1.5 inline-block rounded-full bg-rose-50 px-2 py-0.5">⚠</span>
              {old.result}
            </p>
          </div>

          {/* With Monitizee: one ad, nothing joined */}
          <div className="bg-deep flex min-w-0 flex-col rounded-[1.6rem] p-5 text-ink-foreground sm:p-7">
            <span className="w-fit rounded-full bg-white/12 px-3 py-1 text-[0.75rem] font-semibold tracking-[0.12em] text-ink-muted uppercase">{next.label}</span>

            <ol className="mt-5 flex flex-wrap items-center gap-2 text-[0.85rem] font-semibold">
              {next.steps.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-brand-blue-deep">
                    <span className="mr-1 text-brand-blue sm:hidden">{i + 1}.</span>
                    {s}
                  </span>
                  {i < next.steps.length - 1 && <span className="hidden text-brand-sky sm:inline">→</span>}
                </li>
              ))}
            </ol>

            <Reveal
              as="ul"
              stagger={0.1}
              className="mt-7 space-y-3">
              {next.points.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-3 text-[1rem]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-brand-blue">
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true">
                      <path d="m3.5 8.5 3 3 6-7" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </Reveal>

            <p className="mt-auto flex items-baseline gap-3 pt-8">
              <span className="text-[3.6rem] leading-none font-semibold tracking-[-0.05em]">0</span>
              <span className="text-[1rem] font-medium text-ink-muted">channels joined · content delivered</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
