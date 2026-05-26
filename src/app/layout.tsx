import type { Metadata } from "next";
import { Inter, Space_Grotesk, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { FooterWrapper } from "@/components/FooterWrapper";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ozinfra.com"),
  title: {
    default: "OzInfra | Enterprise IT Solutions — Cloud, Linux, Azure & Cybersecurity",
    template: "%s | OzInfra",
  },
  description:
    "OzInfra delivers enterprise-grade IT solutions including Azure cloud infrastructure, Linux systems, R2L services, after-hours support, and on-site technical services. Build unbreakable systems with us.",
  icons: {
    icon: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
  keywords:
    "IT solutions, Azure, Linux, R2L, cloud infrastructure, cybersecurity, enterprise IT, after hours support, on site IT services, digital transformation, OzInfra, Hobart, Australia",
  authors: [{ name: "OzInfra" }],
  robots: "index, follow",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "OzInfra | Enterprise IT Solutions",
    description:
      "Engineering the backbone of the digital era. Global cloud solutions, cybersecurity, and digital transformations for enterprises that demand absolute precision.",
    type: "website",
    url: "https://ozinfra.com",
    siteName: "OzInfra",
    images: [
      {
        url: "/images/hero-server-architecture.webp",
        width: 1200,
        height: 630,
        alt: "OzInfra Enterprise Server Architecture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OzInfra | Enterprise IT Solutions",
    description:
      "Engineering the backbone of the digital era. Cloud, Linux, Azure & cybersecurity services.",
    images: ["/images/hero-server-architecture.webp"],
  },
};

// JSON-LD Structured Data for search engines and AI answer engines
const schemaJson = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "OzInfra",
  image: "https://ozinfra.com/images/hero-server-architecture.webp",
  url: "https://ozinfra.com",
  telephone: "+61-1300-000-000", // TODO: Replace with real phone number
  email: "root@ozinfra.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Level 4, 110 Collins St",
    addressLocality: "Hobart",
    addressRegion: "TAS",
    postalCode: "7000",
    addressCountry: "AU",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  sameAs: [
    // TODO: Replace with real social URLs
    "https://linkedin.com/company/ozinfra",
    "https://twitter.com/ozinfra",
    "https://github.com/ozinfra",
  ],
  areaServed: "AU",
  serviceType: [
    "Cloud Infrastructure",
    "Cybersecurity",
    "Linux Systems Administration",
    "Azure Cloud Solutions",
    "After Hours IT Support",
    "On-Site IT Services",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${shareTechMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
