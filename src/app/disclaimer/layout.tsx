import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description:
    "OzInfra Legal Disclaimer — Disclosing the informational nature of website content, limits of technical advice, and separation from professional contractual engineering.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Legal Disclaimer | OzInfra",
    description:
      "Legal exclusions, technical advice disclaimers, and professional services scope limits at OzInfra.",
    url: "/disclaimer",
  },
};

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
