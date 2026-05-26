import Hero from "@/sections/Hero";
import TrustBar from "@/sections/TrustBar";
import Capabilities from "@/sections/Capabilities";
import CaseStudies from "@/sections/CaseStudies";
import SellingPoint from "@/sections/SellingPoint";
import PremiumDivider from "@/components/ui/PremiumDivider";
import HowWeWork from "@/sections/HowWeWork";
import Stats from "@/sections/Stats";
import CTA from "@/sections/CTA";
import OzInfraFAQ from "@/sections/FAQ";
import { homeFAQs } from "@/data/faqData";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <div className="relative z-20">
        <TrustBar />
        <Capabilities />
        <CaseStudies />
        <SellingPoint />
        <PremiumDivider />
        <HowWeWork />
        <Stats />
        <CTA />
        <OzInfraFAQ
          faqs={homeFAQs}
          title="Common Questions"
          subtitle="Everything you need to know about OzInfra, condensed for clarity."
        />
      </div>
    </main>
  );
}
