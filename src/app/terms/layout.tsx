import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "OzInfra Terms of Service — the terms and conditions governing the use of the OzInfra web platform and enterprise IT services.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | OzInfra",
    description: "Terms and conditions for using OzInfra services.",
    url: "/terms",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
