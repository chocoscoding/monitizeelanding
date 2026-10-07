/**
 * All site copy and data in one place.
 * Every number and behaviour here matches the bot (see RATES in lib/site.ts).
 */

import { RATES, SITE } from "./site";

export const CTA = {
  primary: { label: "Start earning on Telegram", short: "Start earning", href: SITE.bot },
  secondary: { label: "See how it works", href: "/#demo" },
};

export const NAV_LINKS = [
  { label: "How it works", href: "/#demo" },
  { label: "Features", href: "/#features" },
  { label: "Earnings", href: "/#earnings" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const HERO = {
  headlineBefore: "Every Telegram message,",
  headlineAccent: "monetized.",
  lead: "Monitizee puts your message, photo, video, file or link behind one short ad. Share the link anywhere and get paid for every view, in USDT on TON.",
  proof: ["$0.001 per view", "Works with any message", "USDT payouts on TON", "Free, no coding"],
};

/** The scroll-driven product walkthrough. Bot strings are quoted from the real bot. */
export const DEMO = {
  tag: "See it in action",
  titleBefore: "From message to money in",
  titleAccent: "five taps.",
  steps: [
    {
      title: "Send your content to the bot",
      body: "Tap “Create Ad” in @monitizeebot and send anything: a photo, a video, a file, a link or plain text.",
    },
    {
      title: "Get your share link",
      body: "The bot instantly hands back a unique t.me link. That link is your product now.",
    },
    {
      title: "Your audience taps it",
      body: "Post it in your channel, group, DMs or bio. Anyone who opens it lands on a “View Content” button.",
    },
    {
      title: "They watch one short ad",
      body: "A quick rewarded ad plays inside a Telegram Mini App. No sign-up, no payment, no leaving Telegram.",
    },
    {
      title: "Content delivered, you get paid",
      body: "The bot drops your content straight into their chat and $0.001 lands in your balance.",
    },
  ],
  link: "t.me/monitizeebot?start=mf3k9q2xa7",
  file: { name: "Golden-Hour-Presets.zip", size: "12 presets · 4.2 MB" },
};

/** The problem Monitizee replaces: join-to-unlock gates that push people into channels they never wanted. */
export const NO_JOINS = {
  tag: "Why it matters",
  titleBefore: "No more “join 5 channels to",
  titleAccent: "unlock.”",
  lead: "Join-to-unlock gates push people into betting, spam and adult groups they never wanted. Monitizee swaps the forced join for one short ad.",
  old: {
    label: "The old way",
    prompt: "Join all channels below to unlock 👇",
    channels: [
      { emoji: "🎰", name: "Daily Betting Tips VIP" },
      { emoji: "📢", name: "Promo Blast 24/7" },
      { emoji: "💸", name: "Earn $500/day Signals" },
      { emoji: "🔞", name: "18+ Lounge" },
      { emoji: "🚀", name: "Crypto Pump Alerts" },
    ],
    result: "+5 channels in your chat list, forever",
  },
  next: {
    label: "With Monitizee",
    steps: ["Tap the link", "Watch 1 ad", "Get the content"],
    points: [
      "No forced joins, ever",
      "No betting, spam or adult groups",
      "A chat list that stays clean",
      "Creators paid transparently and immediately",
    ],
  },
};

export const EARNINGS = {
  tag: "Earnings calculator",
  titleBefore: "See what your audience is",
  titleAccent: "worth.",
  lead: `Monitizee pays a flat $${RATES.perView} per view, which is $1 for every 1,000 views. Slide to your daily views and see the maths.`,
  presets: [
    { label: "Small group", views: 500 },
    { label: "Growing channel", views: 5000 },
    { label: "Big channel", views: 25000 },
    { label: "Viral drop", views: 100000 },
  ],
};

export const FEATURES = {
  tag: "Features",
  titleBefore: "Everything you need to",
  titleAccent: "earn per view.",
  lead: "No website, no storefront, no payment setup for your fans. Just a Telegram bot that turns your posts into income.",
  cards: {
    anything: {
      title: "Lock anything you can send",
      body: "Photos, videos, GIFs, documents, files, links and text. If you can send it on Telegram, you can monetize it.",
    },
    perView: {
      title: "Paid on every single view",
      body: `A flat $${RATES.perView} for each view, added to your balance the moment the content is delivered.`,
    },
    hidden: {
      title: "Your name stays off it",
      body: "Content is delivered as a clean copy, with no “Forwarded from” label pointing back to your account.",
    },
    stats: {
      title: "Stats for every link",
      body: "Ad Statistics shows views and earnings for each link, so you know which drops pay best.",
    },
    payouts: {
      title: "USDT payouts on TON",
      body: `Withdraw to any ${RATES.currency} wallet on the ${RATES.network} network once you reach $${RATES.minPayout}.`,
    },
  },
};

export const FAQ = [
  {
    q: "What is Monitizee?",
    a: "Monitizee is a Telegram bot that lets you monetize any message. You send content to @monitizeebot, get a share link, and anyone who opens it watches one short ad before the bot delivers your content. You earn for every view.",
  },
  {
    q: "How much do I earn per view?",
    a: `A flat $${RATES.perView} per view, which is $1 for every 1,000 views. There are no tiers or hidden cuts. The number you see in your balance is what you can withdraw.`,
  },
  {
    q: "What kind of content can I lock?",
    a: "Anything you can send on Telegram: photos, videos, GIFs, documents and files, links and plain text. Presets, notes, wallpapers, beat packs and full video cuts all work.",
  },
  {
    q: "Do my viewers have to pay?",
    a: "No. Viewers never pay or sign up for anything. They tap your link, watch one short ad in a Telegram Mini App, and the content lands in their chat.",
  },
  {
    q: "How and when do I get paid?",
    a: `Set a ${RATES.currency} wallet address on the ${RATES.network} network in My Account. Once your balance reaches $${RATES.minPayout}, tap Withdraw. Requests are processed within ${RATES.payoutWindow}, and you can follow each one in Withdrawal History.`,
  },
  {
    q: "Will viewers see who sent the content?",
    a: "The bot delivers your content as a clean copy, so there's no “Forwarded from” label pointing back to your account.",
  },
  {
    q: "Where can I share my link?",
    a: "Anywhere people can tap a link: your Telegram channel or group, DMs, link-in-bio pages, X, Instagram stories or your website. It opens straight into Telegram.",
  },
  {
    q: "How is this different from “join these channels to unlock”?",
    a: "Join-to-unlock gates make people join channels before they get the content, and those channels are often betting, spam or adult groups. People end up with a bloated chat list full of channels they never wanted. With Monitizee nobody joins anything: they watch one short ad and the content is delivered. You still get paid, at a flat, visible $0.001 per view, the moment it's delivered.",
  },
  {
    q: "Does Monitizee cost anything?",
    a: "No. Creating links and earning is free. There's no subscription and no setup fee.",
  },
  {
    q: "What happens if no ad is available?",
    a: "Monitizee tries Monetag first, then Adsgram. If neither has an ad ready, a backup link opens instead and the view still counts toward your earnings.",
  },
  {
    q: "Can I see how each link performs?",
    a: "Yes. Ad Statistics in the bot lists every link you've created with its views and earnings, so you can see which drops perform best.",
  },
];

export const FINAL = {
  titleBefore: "Your next post could",
  titleAccent: "pay you.",
  body: "Open the bot, send a message, share the link. It takes less than a minute, and it's free.",
};

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#demo" },
      { label: "Features", href: "/#features" },
      { label: "Earnings calculator", href: "/#earnings" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Open the bot", href: SITE.bot },
      { label: "FAQ", href: "/#faq" },
    ],
  },
];
