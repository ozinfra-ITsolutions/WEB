"use client";

import { useEffect, useState, useRef } from "react";
import {
  Shield,
  FileText,
  ChevronRight,
  Terminal,
  Globe,
  AlertTriangle,
  Info,
  ShieldAlert,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SECTIONS = [
  { id: "informational-only", title: "1. Informational & Marketing Scope" },
  { id: "no-professional-advice", title: "2. Exclusion of Technical Advice" },
  { id: "no-relationship", title: "3. No Professional Relationship" },
  { id: "engineering-risk", title: "4. Infrastructure Engineering Risks" },
  { id: "third-party-links", title: "5. Third-Party Links & Resources" },
  { id: "platform-uptime", title: "6. Platform Uptime & Warranties" },
  { id: "legal-inquiries", title: "7. General Legal Inquiries" },
];

export default function Disclaimer() {
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
                  <AlertTriangle className="text-oz-orange" size={20} />
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-oz-orange">
                  SYSTEM.LEGAL_DISCLAIMER
                </p>
              </div>
              <h1 className="text-display font-space mb-6 leading-tight">Legal Disclaimer</h1>
              <p className="text-lg text-oz-warmgray max-w-xl font-body">
                Last updated & audited: May 2026. Important notices defining informational scope,
                advice exclusions, and engineering liabilities.
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
                  <span>DISCLAIMER_ID:</span>
                  <span className="text-white">OZINFRA-DSC-2026-V1</span>
                </div>
                <div className="flex justify-between">
                  <span>RISK_FACTOR:</span>
                  <span className="text-oz-orange">INFRASTRUCTURE DANGER</span>
                </div>
                <div className="flex justify-between">
                  <span>RELATIONSHIP:</span>
                  <span className="text-white">NONE ESTABLISHED HERE</span>
                </div>
                <div className="flex justify-between">
                  <span>ADVICE_SCOPE:</span>
                  <span className="text-white">INFORMATIONAL ONLY</span>
                </div>
                <div className="flex justify-between">
                  <span>LIABILITY_LIMIT:</span>
                  <span className="text-white">MAXIMUM ALLOWABLE BY LAW</span>
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
              <nav className="space-y-2 font-mono text-xs" aria-label="Disclaimer policy parts">
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
            <section id="informational-only" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Info className="text-oz-orange" size={22} />
                  1. Informational & Marketing Scope
                </h2>
                <div className="space-y-4">
                  <p>
                    All content, diagrams, documentation, code examples, infrastructure guides, or
                    architectural blueprints presented on the public OzInfra website are published
                    strictly for educational, informational, and general corporate marketing
                    purposes.
                  </p>
                  <p>
                    While we strive to provide accurate, high-fidelity representations of modern
                    server technology, cloud setups, and security frameworks, all site content is
                    simplified and should not be relied upon as absolute system blueprints.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 2 */}
            <section id="no-professional-advice" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <ShieldAlert className="text-oz-orange" size={22} />
                  2. Exclusion of Technical Advice
                </h2>
                <div className="space-y-4">
                  <p>
                    No materials published on this website constitute formal technical advice,
                    professional IT consultation, cybersecurity risk evaluations, or cloud cost
                    optimizations.
                  </p>
                  <p>
                    Infrastructure decisions (such as Linux kernel parameter changes, Azure active
                    directory integrations, hardware cabled configurations, or hypervisor setups)
                    are highly complex and context-dependent. They require granular diagnostic
                    exploration of your specific operational environment. Relying on general
                    informational articles is strictly at your own risk.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 3 */}
            <section id="no-relationship" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Globe className="text-oz-orange" size={22} />
                  3. No Professional Relationship
                </h2>
                <div className="space-y-4">
                  <p>
                    The navigation of this platform, the consumption of its resources, and the
                    completion of our secure contact intake tunnel do not establish a professional
                    client-consultant relationship between you and OzInfra.
                  </p>
                  <p>
                    A binding professional relationship is only established when an authorized
                    corporate officer signs a formal written bilateral contract, such as a Master
                    Services Agreement (MSA) or Statement of Work (SOW), containing explicit system
                    specifications and operational boundaries.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 4 */}
            <section id="engineering-risk" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="text-oz-orange" size={22} />
                  4. Infrastructure Engineering Risks
                </h2>
                <div className="space-y-4">
                  <p className="border-l-2 border-oz-orange pl-4 text-white font-semibold">
                    WARNING: INFRASTRUCTURE OPERATIONS POSE SIGNIFICANT OPERATIONAL DANGER.
                  </p>
                  <p>
                    The modification of operating system kernels, automated deployment of Ansible
                    playbooks, execution of hypervisor resource reallocation, or alteration of
                    business routing parameters carry significant inherent risks. These risks
                    include database corruption, total system downtime, network routing blackholes,
                    and data leakage.
                  </p>
                  <p>
                    Under no circumstances should any configuration shown or described on this
                    website be deployed in live production environments without the oversight of
                    qualified systems engineers operating under a formal, active Service Level
                    Agreement.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 5 */}
            <section id="third-party-links" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Info className="text-oz-orange" size={22} />
                  5. Third-Party Links & Resources
                </h2>
                <div className="space-y-4">
                  <p>
                    This platform may provide links or references to third-party tools, vendor
                    documentation (e.g., Microsoft Azure manuals, Red Hat Linux resource hubs), or
                    external security agencies.
                  </p>
                  <p>
                    These references are provided solely as a convenience to the user. OzInfra does
                    not monitor, control, verify, or endorse the content, safety, or accuracy of
                    third-party platforms. We assume no legal responsibility or operational
                    liability for data, tools, or configurations fetched from external resources.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 6 */}
            <section id="platform-uptime" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Terminal className="text-oz-orange" size={22} />
                  6. Platform Uptime & Warranties
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra provides this website on an "as-is" basis with no guarantees of uptime,
                    security against active malicious interception, or absolute error-free
                    rendering.
                  </p>
                  <p>
                    We do not warrant that our public communications portal will operate
                    continuously or remain secure from emerging zero-day exploits, although we apply
                    extensive server-side sanitization and validation procedures.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 7 */}
            <section id="legal-inquiries" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Shield className="text-oz-orange" size={22} />
                  7. General Legal Inquiries
                </h2>
                <div className="space-y-4">
                  <p>
                    For questions regarding this technical and legal disclaimer, or if you need
                    clarification on how OzInfra isolates informational site content from contract
                    engineering solutions, please contact our legal operations department:
                  </p>
                  <div className="mt-6 border border-white/5 bg-white/[0.02] p-6 rounded-2xl">
                    <p className="font-semibold text-white mb-1">OzInfra Legal & Compliance</p>
                    <p className="text-sm mb-4">Level 4, 110 Collins St, Hobart, TAS 7000</p>
                    <a
                      href="mailto:disclaimer@ozinfra.com"
                      className="text-oz-orange hover:text-white transition-colors underline underline-offset-4 font-mono text-sm"
                    >
                      disclaimer@ozinfra.com
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
