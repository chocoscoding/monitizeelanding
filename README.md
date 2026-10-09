# Monitizee landing page

Marketing site for [Monitizee](https://t.me/monitizeebot): lock any Telegram message behind a short ad and earn $0.001 per view, paid in USDT on GRAM.

Design system and motion vocabulary follow the 4points landing (Next.js 16, Tailwind v4, GSAP + ScrollTrigger/SplitText, Lenis).

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Before launch
- Canonical origin is `https://www.monitizee.xyz` (override with `NEXT_PUBLIC_SITE_URL`). It drives canonical URLs, Open Graph, sitemap, robots and JSON-LD (`lib/structured-data.ts`); `monitizee.xyz` 308-redirects to it (`next.config.ts`).
- Optional: set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` for Google Search Console.
- Confirm the bot username in `lib/site.ts` (`SITE.bot`).
- All copy lives in `lib/content.ts`; rates and payout rules in `lib/site.ts` (`RATES`).
