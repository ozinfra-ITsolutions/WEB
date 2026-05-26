import { Shield, Clock, Server, Zap, Activity, Globe } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import ScrollReveal from "@/components/ScrollReveal";
import OzInfraFAQ from "@/sections/FAQ";
import { aboutFAQs } from "@/data/faqData";
import AboutUsSection from "@/components/ui/about-us-section";
import { LiquidButton } from "@/components/ui/LiquidButton";

const values = [
  {
    icon: Shield,
    title: "Reliable & Business Focused",
    description:
      "Infrastructure services delivered with stability, planning, and operational continuity in mind. We treat your systems with the same care as our own — every deployment and maintenance task is executed with precision.",
  },
  {
    icon: Clock,
    title: "Flexible Support",
    description:
      "Maintenance, upgrades, deployments, and operational work performed around your business requirements — reducing downtime and operational impact during critical hours.",
  },
  {
    icon: Server,
    title: "Enterprise Experience",
    description:
      "Years of hands-on experience working with Linux systems, Azure environments, virtualisation platforms, automation tools, and business infrastructure technologies.",
  },
  {
    icon: Zap,
    title: "Scalable Solutions",
    description:
      "Supporting growing businesses with infrastructure solutions designed for performance, security, and future growth — from single-server setups to complex multi-environment deployments.",
  },
  {
    icon: Activity,
    title: "Reduced Business Risk",
    description:
      "Planned maintenance windows, structured change management, and proactive health checks — all designed to minimise risk and keep your operations running without interruption.",
  },
  {
    icon: Globe,
    title: "Hobart-Based, Tasmania Trusted",
    description:
      "Locally operated from Hobart, Tasmania, providing responsive on-site support and personalised service that large national providers simply cannot match.",
  },
];

export default function About() {
  return (
    <main id="main-content">
      {/* Ultra-Premium Hero & Story Section */}
      <AboutUsSection />

      {/* Mission & Vision */}
      <section className="bg-oz-black section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <div>
              <span className="text-oz-orange text-sm uppercase tracking-widest font-space mb-4 block">
                Mission
              </span>
              <h2 className="text-card font-space text-oz-bg mb-6">
                To deliver reliable, responsive infrastructure support that keeps businesses running
                efficiently.
              </h2>
              <p className="text-oz-warmgray leading-relaxed">
                With experience across enterprise Linux systems, virtualisation, Azure cloud
                services, automation, and infrastructure deployment, our services are tailored for
                businesses that value reliability, responsiveness, and long-term operational
                stability — without the overhead of large enterprise contracts.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <span className="text-oz-orange text-sm uppercase tracking-widest font-space mb-4 block">
                Vision
              </span>
              <h2 className="text-card font-space text-oz-bg mb-6">
                Secure, stable, and scalable infrastructure for every business in Hobart and beyond.
              </h2>
              <p className="text-oz-warmgray leading-relaxed">
                We believe every business deserves enterprise-grade infrastructure support —
                regardless of team size. Our services are especially suited for planned maintenance
                windows, infrastructure upgrades, migrations, and operational work performed during
                evenings and weekends to minimise disruption to day-to-day operations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Ultra-Premium Bento Box Values Section */}
      <section className="bg-oz-surface py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <span className="text-oz-orange font-space font-medium mb-6 flex items-center justify-center gap-2 tracking-[0.2em] uppercase text-sm">
              <Zap className="w-4 h-4" />
              Why Choose Us
            </span>
            <TextReveal
              text="Why Businesses Choose Us"
              tag="h2"
              className="text-5xl md:text-7xl font-space text-oz-black mb-8"
            />
            <p className="text-oz-gray text-xl md:text-2xl leading-relaxed">
              Infrastructure services built on experience, reliability, and a genuine commitment to
              keeping your business running.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(280px,auto)]">
            {values.map((value, index) => {
              // Custom span sizes for Bento Grid layout
              const spanClasses =
                [
                  "md:col-span-2", // Precision
                  "md:col-span-1", // Transparency
                  "md:col-span-1", // Partnership
                  "md:col-span-2", // Innovation
                  "md:col-span-2", // People First
                  "md:col-span-1", // Global Scale
                ][index] || "md:col-span-1";

              return (
                <ScrollReveal
                  key={value.title}
                  direction="up"
                  delay={0.1 * index}
                  className={spanClasses}
                >
                  <div className="h-full bg-oz-white rounded-[2rem] p-8 lg:p-12 relative overflow-hidden group shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 border border-black/5 hover:border-oz-orange/20">
                    {/* Giant Watermark Icon */}
                    <value.icon className="absolute -bottom-8 -right-8 w-64 h-64 text-oz-black/[0.02] group-hover:text-oz-orange/[0.03] group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                      <div className="w-16 h-16 rounded-2xl bg-oz-orange/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-oz-orange group-hover:shadow-lg group-hover:shadow-oz-orange/30 transition-all duration-500 ease-out">
                        <value.icon className="w-8 h-8 text-oz-orange group-hover:text-white transition-colors duration-500" />
                      </div>

                      <div className="mt-auto">
                        <h3 className="text-2xl md:text-3xl font-space font-medium text-oz-black mb-4">
                          {value.title}
                        </h3>
                        <p className="text-oz-gray text-lg leading-relaxed max-w-lg">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-oz-orange section-padding">
        <div className="max-w-3xl">
          <h2 className="text-section font-space text-oz-bg mb-6">
            Let&apos;s Discuss Your Infrastructure Requirements
          </h2>
          <p className="text-oz-bg/80 text-lg mb-10 max-w-xl">
            Whether you need ongoing Linux support, a cloud migration plan, network upgrades, or
            after-hours maintenance — let&apos;s talk about your environment and find the right
            solution.
          </p>
          <LiquidButton href="/contact" variant="white-to-black" hoverText="Let's Talk">
            Start a Conversation
          </LiquidButton>
        </div>
      </section>

      <OzInfraFAQ
        faqs={aboutFAQs}
        title="About OzInfra"
        subtitle="Common questions about our infrastructure support services in Hobart, Tasmania."
        variant="dark"
      />
    </main>
  );
}
