import { DEMO, FAQ, NO_JOINS } from "./content";
import { RATES, SITE } from "./site";

/**
 * JSON-LD for the home page: one linked graph (Organization → WebSite → WebPage, with the app,
 * the how-to and the FAQ hanging off the page). Every URL is absolute on the canonical origin.
 */
const id = (frag: string) => `${SITE.url}/#${frag}`;
const ogImage = `${SITE.url}/opengraph-image`;
const logo = `${SITE.url}/brand/monitizee-logo.jpg`;

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": id("organization"),
      name: SITE.name,
      url: SITE.url,
      logo: { "@type": "ImageObject", "@id": id("logo"), url: logo, width: 640, height: 640, caption: SITE.name },
      image: { "@id": id("logo") },
      description: SITE.description,
      sameAs: [SITE.bot],
    },
    {
      "@type": "WebSite",
      "@id": id("website"),
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": id("organization") },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": id("webpage"),
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
      isPartOf: { "@id": id("website") },
      about: { "@id": id("app") },
      primaryImageOfPage: { "@type": "ImageObject", url: ogImage, width: 1200, height: 630 },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": id("app"),
      name: SITE.name,
      url: SITE.url,
      installUrl: SITE.bot,
      image: ogImage,
      description: SITE.description,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Content monetization",
      operatingSystem: "Telegram (iOS, Android, Desktop, Web)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: `Free to use. Creators earn $${RATES.perView} per view, paid in ${RATES.currency} on ${RATES.network}.`,
      },
      featureList: [
        "Lock any Telegram message, photo, video, file or link behind a short ad",
        `Earn $${RATES.perView} per view ($1 per 1,000 views)`,
        `Withdraw in ${RATES.currency} on ${RATES.network} from $${RATES.minPayout}, paid within ${RATES.payoutWindow}`,
        "Per-link view and earnings statistics",
        `No forced channel joins: ${NO_JOINS.lead}`,
        "No coding or setup required",
      ],
      publisher: { "@id": id("organization") },
    },
    {
      "@type": "HowTo",
      "@id": id("howto"),
      name: "How to monetize Telegram content with Monitizee",
      description: "Lock any Telegram message behind a short ad and earn for every view.",
      totalTime: "PT1M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
      step: DEMO.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body, url: `${SITE.url}/#demo` })),
      isPartOf: { "@id": id("webpage") },
    },
    {
      "@type": "FAQPage",
      "@id": id("faq"),
      isPartOf: { "@id": id("webpage") },
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};
