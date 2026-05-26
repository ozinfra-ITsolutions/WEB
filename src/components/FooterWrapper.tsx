"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export function FooterWrapper() {
  const pathname = usePathname();
  const known = ["/", "/about", "/services", "/contact"];
  if (!known.includes(pathname)) return null;
  return <Footer />;
}
