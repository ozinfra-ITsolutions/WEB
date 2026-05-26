import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Level Agreement (SLA) Overview",
  description:
    "OzInfra Service Level Agreement (SLA) Overview — Operational response times, incident severity classifications, system availability metrics, and ticketing workflows.",
  alternates: {
    canonical: "/sla",
  },
  openGraph: {
    title: "Service Level Agreement Overview | OzInfra",
    description:
      "Review our P1-P4 response targets, availability metrics, and corporate incident ticket workflows.",
    url: "/sla",
  },
};

export default function SLALayout({ children }: { children: React.ReactNode }) {
  return children;
}
