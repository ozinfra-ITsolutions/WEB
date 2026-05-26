import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "OzInfra Privacy Policy — learn how we collect, use, and protect your personal data with enterprise-grade security practices.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | OzInfra",
    description: "How OzInfra protects your data with enterprise-grade security.",
    url: "/privacy",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
