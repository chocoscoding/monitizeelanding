/**
 * Site-wide constants. `url` is the one canonical origin every SEO signal points at
 * (metadata, canonical, sitemap, robots, JSON-LD); the bare domain redirects to it (next.config.ts).
 */
export const SITE = {
  name: "Monitizee",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.monitizee.xyz").replace(/\/$/, ""),
  /** The bare domain, permanently redirected to `url`. */
  apex: "monitizee.xyz",
  title: "Monitizee | Monetize anything you can send on Telegram",
  description:
    "Put any Telegram message, photo, video, file or link behind a short ad. Share the link anywhere and earn $0.001 for every view, paid out in USDT on TON. Free to use, no coding.",
  bot: "https://t.me/monitizeebot",
  botHandle: "@monitizeebot",
  locale: "en_US",
} as const;

/** Business rules, straight from the bot. Change them here and the whole page follows. */
export const RATES = {
  perView: 0.001,
  minPayout: 11,
  payoutWindow: "24–48 hours",
  currency: "USDT",
  network: "TON",
} as const;
