"use client";

import { useEffect, useState, useRef } from "react";
import {
  Shield,
  FileText,
  ChevronRight,
  Terminal,
  Globe,
  Scale,
  AlertOctagon,
  HelpCircle,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SECTIONS = [
  { id: "general-scope", title: "1. Agreement & General Scope" },
  { id: "sla-separation", title: "2. Separation of Enterprise SLAs" },
  { id: "intellectual-property", title: "3. Intellectual Property Rights" },
  { id: "acceptable-use", title: "4. Intake Form & Acceptable Use" },
  { id: "liability-limits", title: "5. Limitations of Liability" },
  { id: "disruption-maintenance", title: "6. Site Disruption & Maintenance" },
  { id: "governing-law", title: "7. Governing Law & Jurisdiction" },
  { id: "legal-contact", title: "8. Corporate Contacts" },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        sectionRefs.current[sec.id] = el;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-oz-black text-oz-bg pt-32 pb-24">
      {/* Visual Tech Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-oz-orange via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Cyberpunk Hero Block */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12 border-b border-white/5 pb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl border border-oz-orange/30 flex items-center justify-center bg-oz-orange/5">
                  <Scale className="text-oz-orange" size={20} />
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-oz-orange">
                  SYSTEM.TERMS_DISCLOSURE
                </p>
              </div>
              <h1 className="text-display font-space mb-6 leading-tight">Terms of Service</h1>
              <p className="text-lg text-oz-warmgray max-w-xl font-body">
                Last updated & audited: May 2026. General terms governing public platform access,
                acceptable system usage, and SLA limitations.
              </p>
            </div>

            {/* Terminal Metadata Panel */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 font-mono text-[11px] text-oz-warmgray/80 min-w-[280px] lg:w-96 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-oz-orange/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                <Terminal className="text-oz-orange" size={14} />
                <span className="text-white font-bold">SYS.REGISTRY_METRICS</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>DOC_ID:</span>
                  <span className="text-white">OZINFRA-TRM-2026-V1</span>
                </div>
                <div className="flex justify-between">
                  <span>CLASSIFICATION:</span>
                  <span className="text-white">PUBLIC ACCESS STANDARD</span>
                </div>
                <div className="flex justify-between">
                  <span>LEGAL_SCOPE:</span>
                  <span className="text-oz-orange">PLATFORM SERVICES ONLY</span>
                </div>
                <div className="flex justify-between">
                  <span>GOVERNING_LAW:</span>
                  <span className="text-white">TASMANIAN COURT ACT</span>
                </div>
                <div className="flex justify-between">
                  <span>MSA_COMPATIBLE:</span>
                  <span className="text-white">MSA MUTUAL SEPARATION</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Desktop Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 h-fit sticky top-32">
            <div className="border border-white/5 bg-white/[0.01] rounded-2xl p-8 backdrop-blur-md">
              <h4 className="text-xs font-mono font-bold text-oz-orange tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                <FileText size={14} />
                Table of Contents
              </h4>
              <nav className="space-y-2 font-mono text-xs" aria-label="Terms of service parts">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`w-full text-left flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-300 group ${
                        isActive
                          ? "bg-oz-orange/10 border border-oz-orange/30 text-white font-semibold"
                          : "border border-transparent text-oz-warmgray/60 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <ChevronRight
                        size={12}
                        className={`transition-transform duration-300 ${
                          isActive
                            ? "text-oz-orange translate-x-0.5"
                            : "text-oz-warmgray/30 group-hover:translate-x-0.5"
                        }`}
                      />
                      <span>{sec.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Sticky Mobile Selector */}
          <div className="lg:hidden sticky top-[72px] z-30 -mx-6 px-6 py-3 bg-oz-black/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-oz-orange font-bold">
                {"["}ACTIVE{"]"}
              </span>
              <span className="text-white font-medium truncate max-w-[200px]">
                {SECTIONS.find((s) => s.id === activeSection)?.title || "Section"}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xs font-mono font-bold px-3 py-1.5 border border-oz-orange/30 text-oz-orange bg-oz-orange/5 hover:bg-oz-orange hover:text-white transition-colors"
            >
              MENU
            </button>

            {/* Mobile Dropdown Panel */}
            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-oz-black border-b border-white/10 shadow-2xl p-6 space-y-2 z-40 max-h-[300px] overflow-y-auto">
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left flex items-center gap-3 py-2 text-xs font-mono ${
                      activeSection === sec.id ? "text-oz-orange font-bold" : "text-oz-warmgray/70"
                    }`}
                  >
                    <ChevronRight
                      size={12}
                      className={
                        activeSection === sec.id ? "text-oz-orange" : "text-oz-warmgray/30"
                      }
                    />
                    {sec.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detailed Content Stream */}
          <main
            className="lg:col-span-8 space-y-16 font-body text-oz-warmgray/90 leading-relaxed text-lg"
            id="main-content"
          >
            {/* Section 1 */}
            <section id="general-scope" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Globe className="text-oz-orange" size={22} />
                  1. Agreement & General Scope
                </h2>
                <div className="space-y-4">
                  <p>
                    By accessing, browsing, or utilizing the public-facing OzInfra web portal and
                    client-intake modules, you explicitly agree to comply with and be bound by these
                    Terms of Service.
                  </p>
                  <p>
                    These terms govern general platform navigation, informational resource
                    consumption, and lead intake communication. If you do not accept these terms,
                    you are prohibited from utilizing this website and should immediately close this
                    connection.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 2 */}
            <section id="sla-separation" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Scale className="text-oz-orange" size={22} />
                  2. Separation of Enterprise SLAs
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra provides professional enterprise infrastructure services, including
                    Linux administration, Ansible automation, Microsoft Azure setups, VMware
                    hypervisor maintenance, and around-the-clock emergency support.
                  </p>
                  <p className="border-l-2 border-oz-orange pl-4 text-white">
                    <strong>CRITICAL NOTICE:</strong> General website usage terms do NOT govern,
                    define, or authorize any professional engineering, server administration, or IT
                    maintenance services.
                  </p>
                  <p>
                    All active consultancy solutions are strictly governed by separate,
                    comprehensive bilateral contracts, including{" "}
                    <strong className="text-white">Master Services Agreements (MSAs)</strong> and
                    customized{" "}
                    <strong className="text-white">Service Level Agreements (SLAs)</strong> executed
                    formally in writing by authorized company officers prior to engineering
                    operations.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 3 */}
            <section id="intellectual-property" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Shield className="text-oz-orange" size={22} />
                  3. Intellectual Property Rights
                </h2>
                <div className="space-y-4">
                  <p>
                    This platform incorporates custom design architectures, visual cyberpunk style
                    tokens, SVG diagrams, proprietary logo layouts, and code snippets. All
                    structural and creative intellectual property is owned exclusively by OzInfra
                    and is protected by Australian and international copyright and trademark
                    statutes.
                  </p>
                  <p>
                    Users are granted a limited, non-transferable, revocable license to access the
                    content solely for general business exploration. The duplication, scraping,
                    framing, or unauthorized redistribution of our outline branding assets or visual
                    assets is strictly prohibited.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 4 */}
            <section id="acceptable-use" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <AlertOctagon className="text-oz-orange" size={22} />
                  4. Intake Form & Acceptable Use
                </h2>
                <div className="space-y-4">
                  <p>
                    To request IT support or start a project, you may access our secure contact
                    intake tunnel. In doing so, you agree to supply strictly accurate business
                    criteria.
                  </p>
                  <p>
                    You agree that you will not utilize our communications infrastructure for any
                    malicious or disruptive purposes, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      Filing automated submissions or using script robots to trigger false project
                      inquiries.
                    </li>
                    <li>
                      Submitting NoSQL brackets payload injections (`{}`), HTML tag scripting
                      (`&lt;script&gt;`), or executable system paths to disrupt serverless
                      endpoints.
                    </li>
                    <li>
                      Utilizing our contact interfaces to transmit unsolicited marketing pitches or
                      spam.
                    </li>
                    <li>
                      Probing, scanning, or testing the vulnerability of our public endpoints
                      without active, written penetration testing authorizations from our security
                      team.
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 5 */}
            <section id="liability-limits" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Scale className="text-oz-orange" size={22} />
                  5. Limitations of Liability
                </h2>
                <div className="space-y-4">
                  <p>
                    The public informational materials, technical blogs, and capability matrices
                    presented on this platform are provided strictly on an "as-is" and
                    "as-available" basis, without warranty of any kind.
                  </p>
                  <p>
                    To the maximum extent permitted by law, OzInfra, its system administrators, and
                    Tasmanian directors shall not be held liable for any direct, indirect, special,
                    incidental, or consequential damages resulting from public platform usage. This
                    includes, but is not limited to, system downtime, business interruption, or data
                    transmission failures.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 6 */}
            <section id="disruption-maintenance" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <HelpCircle className="text-oz-orange" size={22} />
                  6. Site Disruption & Maintenance
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra maintains high-availability standard practices. However, we do not
                    guarantee uninterrupted public access to this web portal. We reserve the right
                    to suspend navigation temporarily for server modifications, system testing, or
                    emergency infrastructure upgrades.
                  </p>
                  <p>
                    Official system maintenance tasks that affect client cloud subscriptions are
                    managed through structured SLA communication channels and are not governed by
                    these general public terms.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 7 */}
            <section id="governing-law" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Globe className="text-oz-orange" size={22} />
                  7. Governing Law & Jurisdiction
                </h2>
                <div className="space-y-4">
                  <p>
                    These Terms of Service, along with all associated platform communications, shall
                    be interpreted and governed exclusively in accordance with the laws of the{" "}
                    <strong className="text-white">State of Tasmania, Australia</strong>.
                  </p>
                  <p>
                    Any legal disputes, arbitrations, or complaints arising out of the use of this
                    portal shall be submitted to the exclusive jurisdiction of the state and federal
                    courts located in Hobart, Tasmania.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 8 */}
            <section id="legal-contact" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Terminal className="text-oz-orange" size={22} />
                  8. Corporate Contacts
                </h2>
                <div className="space-y-4">
                  <p>
                    If you have questions regarding these general terms, or if you wish to negotiate
                    an enterprise service agreement or request support, please reach out to our
                    legal department:
                  </p>
                  <div className="mt-6 border border-white/5 bg-white/[0.02] p-6 rounded-2xl">
                    <p className="font-semibold text-white mb-1">OzInfra Corporate Operations</p>
                    <p className="text-sm mb-4">Level 4, 110 Collins St, Hobart, TAS 7000</p>
                    <a
                      href="mailto:legal@ozinfra.com"
                      className="text-oz-orange hover:text-white transition-colors underline underline-offset-4 font-mono text-sm"
                    >
                      legal@ozinfra.com
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
