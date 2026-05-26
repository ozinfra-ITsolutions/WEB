import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About OzInfra — Reliable Infrastructure Support in Hobart, Tasmania",
  description:
    "Modern infrastructure support without enterprise overhead. Professional Linux administration, Azure cloud, virtualisation, networking, and after-hours IT support for businesses in Hobart, Tasmania.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About OzInfra | Infrastructure Support in Hobart, Tasmania",
    description:
      "Professional Linux, Azure, and networking support for businesses in Hobart, Tasmania — reliable, responsive, and built for long-term stability.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
