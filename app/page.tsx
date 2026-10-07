import { Hero } from "@/components/hero/Hero";
import { Demo } from "@/components/sections/Demo";
import { Earnings } from "@/components/sections/Earnings";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { NoJoins } from "@/components/sections/NoJoins";
import { homeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c") }}
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
