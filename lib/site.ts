/**
 * Site-wide constants. Confirm `url` and `bot` before launch:
 * the bot username comes from the frontend's NEXT_PUBLIC_BOT_USERNAME fallback.
 */
export const SITE = {
  name: "Monitizee",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://monitizee.com").replace(/\/$/, ""),
  title: "Monitizee | Monetize Telegram content with ad-locked links",
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
