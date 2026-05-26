import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Compliance",
  description:
    "OzInfra Data Compliance Blueprint — Details on our adherence to GDPR, Australian Privacy Principles (APPs), input sanitization pipelines, and secure mail relay operations.",
  alternates: {
    canonical: "/compliance",
  },
  openGraph: {
    title: "Data Compliance | OzInfra",
    description:
      "Detailed compliance metrics, sanitization pipelines, and data protection strategies at OzInfra.",
    url: "/compliance",
  },
};

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
