import { FAQMonochrome } from "../components/ui/faq-monochrome";
import type { FAQItem } from "../components/ui/faq-monochrome";

interface FAQProps {
  faqs?: FAQItem[];
  data?: FAQItem[];
  title?: string;
  subtitle?: string;
  variant?: "light" | "dark";
}

export default function FAQ({ faqs, data, title, subtitle }: FAQProps) {
  const faqData = data || faqs || [];

  return <FAQMonochrome data={faqData} title={title} subtitle={subtitle} />;
}
