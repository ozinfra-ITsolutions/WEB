import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact OzInfra — After-Hours Support & IT Infrastructure in Hobart",
  description:
    "Get in touch with OzInfra for professional Linux administration, Azure deployments, and after-hours IT infrastructure support in Hobart, Tasmania. Free consultation call within 2 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact OzInfra | Hobart, Tasmania",
    description:
      "Ready to secure and modernise your IT systems? Arrange a complimentary assessment and discovery call with our Hobart engineering team.",
    url: "/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
