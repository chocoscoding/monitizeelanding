import { Hero } from "@/components/hero/Hero";
import { Demo } from "@/components/sections/Demo";
import { Earnings } from "@/components/sections/Earnings";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { NoJoins } from "@/components/sections/NoJoins";
import { DEMO, FAQ } from "@/lib/content";
import { RATES, SITE } from "@/lib/site";

/** Structured data: who we are, what the product is, the FAQ and the how-to. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      url: SITE.url,
      logo: `${SITE.url}/brand/monitizee-logo.jpg`,
      sameAs: [SITE.bot],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE.url}/#app`,
      name: SITE.name,
      url: SITE.bot,
      description: SITE.description,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Content monetization",
      operatingSystem: "Telegram (iOS, Android, Desktop, Web)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: `Free to use. Creators earn $${RATES.perView} per view.` },
      featureList: [
        "Lock any Telegram message, photo, video, file or link behind a short ad",
        `Earn $${RATES.perView} per view ($1 per 1,000 views)`,
        `Withdraw in ${RATES.currency} on ${RATES.network} from $${RATES.minPayout}`,
        "Per-link view and earnings statistics",
        "No forced channel joins: viewers never join betting, spam or adult groups to unlock content",
        "No coding or setup required",
      ],
      publisher: { "@id": `${SITE.url}/#organization` },
    },
    {
      "@type": "HowTo",
      name: "How to monetize Telegram content with Monitizee",
      description: "Lock any Telegram message behind a short ad and earn for every view.",
      totalTime: "PT1M",
      estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
      step: DEMO.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Demo />
      <NoJoins />
      <Features />
      <Earnings />
      <Faq />
      <FinalCta />
    </>
  );
}
