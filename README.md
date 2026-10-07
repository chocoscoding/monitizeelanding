# Monitizee landing page

Marketing site for [Monitizee](https://t.me/monitizeebot): lock any Telegram message behind a short ad and earn $0.001 per view, paid in USDT on TON.

Design system and motion vocabulary follow the 4points landing (Next.js 16, Tailwind v4, GSAP + ScrollTrigger/SplitText, Lenis).

```bash
npm run dev     # http://localhost:3000
npm run build
```

## Before launch
- Set `NEXT_PUBLIC_SITE_URL` (defaults to `https://monitizee.com`) — used for canonical URLs, sitemap, robots and JSON-LD.
- Confirm the bot username in `lib/site.ts` (`SITE.bot`).
- All copy lives in `lib/content.ts`; rates and payout rules in `lib/site.ts` (`RATES`).
