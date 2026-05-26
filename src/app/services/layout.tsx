import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Enterprise Linux Administration, Azure Cloud & Networking Services in Australia | OzInfra",
  description:
    "Professional RHEL Linux administration, Microsoft Azure cloud deployments, VMware virtualisation, networking, hardware rollouts, and 24/7 after-hours support for Australian businesses. OzInfra — reliable infrastructure support across Australia.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Enterprise Linux, Azure Cloud & Networking Services | OzInfra",
    description:
      "Professional Linux administration, Azure infrastructure, networking, server deployment, and after-hours support for Australian businesses.",
    url: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
