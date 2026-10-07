import Link from "next/link";

import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/primitives";
import { FOOTER_COLUMNS } from "@/lib/content";
import { SITE } from "@/lib/site";

import { Wordmark } from "./Wordmark";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background px-3 pb-3">
      <div className="bg-deep rounded-[2.5rem] text-ink-foreground">
        <Container className="pt-14 pb-8 sm:pt-20">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
            <div className="max-w-sm">
              <Logo tone="light" />
              <p className="mt-6 text-ink-muted">
                The easiest way to monetize your Telegram content. Lock any message behind a short ad and earn on every view.
              </p>
              <a
                href={SITE.bot}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex items-center gap-2 py-1.5 text-lg font-semibold text-white hover:text-brand-sky">
                {SITE.botHandle} <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:justify-self-end lg:gap-24">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <h2 className="text-[0.78rem] font-semibold tracking-[0.18em] text-ink-muted uppercase">{col.title}</h2>
                  <ul className="mt-3 space-y-1">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link
                          href={l.href}
                          className="inline-block py-1.5 text-white/85 transition-colors hover:text-brand-sky">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <Wordmark />

          <div className="mt-8 flex flex-col gap-4 border-t border-ink-border pt-6 text-sm text-ink-muted sm:flex-row sm:items-start sm:justify-between">
            <p>© {new Date().getFullYear()} Monitizee. Not affiliated with Telegram FZ-LLC.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
