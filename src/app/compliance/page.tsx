"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, FileText, ChevronRight, Terminal, Globe, Cpu, Lock, Database } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SECTIONS = [
  { id: "australian-privacy", title: "1. Privacy Act 1988 & APPs" },
  { id: "gdpr-framework", title: "2. GDPR Architecture & Rights" },
  { id: "sanitization-pipeline", title: "3. Input Sanitization Code" },
  { id: "relay-security", title: "4. Server-to-Server Relay Safety" },
  { id: "in-memory-caching", title: "5. In-Memory Data Boundaries" },
  { id: "physical-storage", title: "6. Data Location & Sovereignty" },
  { id: "compliance-officer", title: "7. Compliance Operations Contact" },
];

export default function Compliance() {
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
                  <Database className="text-oz-orange" size={20} />
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-oz-orange">
                  SYSTEM.COMPLIANCE_DISCLOSURE
                </p>
              </div>
              <h1 className="text-display font-space mb-6 leading-tight">Data Compliance</h1>
              <p className="text-lg text-oz-warmgray max-w-xl font-body">
                Last updated & audited: May 2026. Review our operational codes, sanitization
                pipelines, and frameworks.
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
                  <span>REGISTRY_ID:</span>
                  <span className="text-white">OZINFRA-CMP-2026-V1</span>
                </div>
                <div className="flex justify-between">
                  <span>SANITIZATION:</span>
                  <span className="text-[#a074c4]">REGEX STAGE ACTIVE</span>
                </div>
                <div className="flex justify-between">
                  <span>AUDIT_STATUS:</span>
                  <span className="text-oz-orange">PASSING (100% SECURE)</span>
                </div>
                <div className="flex justify-between">
                  <span>ISO_27001:</span>
                  <span className="text-white">ALIGNMENT STANDARD</span>
                </div>
                <div className="flex justify-between">
                  <span>HOST_PROVIDER:</span>
                  <span className="text-white">LOCAL AUSTRALIAN DATACENTRES</span>
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
              <nav className="space-y-2 font-mono text-xs" aria-label="Compliance policy parts">
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
            <section id="australian-privacy" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Globe className="text-oz-orange" size={22} />
                  1. Privacy Act 1988 & APPs
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra operates strictly under the legal parameters of the{" "}
                    <strong className="text-white">Australian Privacy Act 1988 (Cth)</strong>. Our
                    systems architecture conforms to the 13 Australian Privacy Principles (APPs)
                    governing public and private entities.
                  </p>
                  <p>
                    Our data management blueprints require that no secondary transmission or reuse
                    of personal identifiers takes place without direct client authorization. Under
                    the Australian Privacy Act, we maintain clear registers of all internal storage
                    systems and execute regular data sovereignty checks.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 2 */}
            <section id="gdpr-framework" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Shield className="text-oz-orange" size={22} />
                  2. GDPR Architecture & Rights
                </h2>
                <div className="space-y-4">
                  <p>
                    For international operations, OzInfra aligns with the European Union's{" "}
                    <strong className="text-white">
                      General Data Protection Regulation (GDPR)
                    </strong>
                    . Although we are located in Hobart, Tasmania, our client engagements often
                    involve global infrastructure assets.
                  </p>
                  <p>
                    To ensure GDPR compliance, we implement standard contractual clauses (SCCs) for
                    all overseas processing, enforce absolute segregation of telemetry and user
                    logs, and maintain operational procedures allowing immediate executions of user
                    rights (Access, Portability, and Right to Erasure / Eraser Requests).
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 3 */}
            <section id="sanitization-pipeline" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Cpu className="text-oz-orange" size={22} />
                  3. Input Sanitization Code
                </h2>
                <div className="space-y-4">
                  <p>
                    To prevent malicious script execution, SQL injections, or NoSQL query hijacking
                    (often targeted at intake portals), we apply double-layered validation and
                    sanitization. All data submitted via our public portal is cleaned server-side
                    before dispatching.
                  </p>
                  <p>
                    Our API endpoint (`/api/contact/route.ts`) sanitizes incoming fields through the
                    following code framework:
                  </p>

                  {/* Styled Code Terminal showing clean sanitization code */}
                  <div className="bg-[#1e1e1e] border border-white/5 rounded-xl p-6 font-mono text-[13px] text-[#858585] mb-6 shadow-inner">
                    <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2 text-white/40">
                      <Terminal size={12} />
                      <span>api/contact/route.ts</span>
                    </div>
                    <p className="text-[#a074c4]">
                      function <span className="text-[#5cb8a6]">serverSanitize</span>(input:
                      string): string {"{"}
                    </p>
                    <p className="pl-4 text-[#a074c4]">
                      if <span className="text-white">(typeof input !== "string")</span> return "";
                    </p>
                    <p className="pl-4 text-[#858585]">const clean = input</p>
                    <p className="pl-8 text-[#f07178]">
                      .replace(/&lt;[^&gt;]*&gt;/g, ""){" "}
                      <span className="text-white/20">// Strip standard HTML tags</span>
                    </p>
                    <p className="pl-8 text-[#f07178]">
                      .replace(/[{"{}"}]/g, ""){" "}
                      <span className="text-white/20">
                        // Clear curly braces to block NoSQL interpolation
                      </span>
                    </p>
                    <p className="pl-8 text-[#f07178]">.trim();</p>
                    <p className="pl-4 text-[#858585]">return clean.slice(0, 1000);</p>
                    <p className="text-white">{"}"}</p>
                    <br />
                    <p className="text-[#a074c4]">
                      function <span className="text-[#5cb8a6]">escapeHtml</span>(str: string):
                      string {"{"}
                    </p>
                    <p className="pl-4 text-white">return str</p>
                    <p className="pl-8 text-[#f07178]">.replace(/&amp;/g, "&amp;amp;")</p>
                    <p className="pl-8 text-[#f07178]">.replace(/&lt;/g, "&amp;lt;")</p>
                    <p className="pl-8 text-[#f07178]">.replace(/&gt;/g, "&amp;gt;")</p>
                    <p className="pl-8 text-[#f07178]">.replace(/"/g, "&amp;quot;")</p>
                    <p className="pl-8 text-[#f07178]">.replace(/'/g, "&amp;#039;");</p>
                    <p className="text-white">{"}"}</p>
                  </div>

                  <p>
                    This prevents raw malicious scripts from ever reaching email delivery servers,
                    securing both our corporate infrastructure and your private information.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 4 */}
            <section id="relay-security" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Lock className="text-oz-orange" size={22} />
                  4. Server-to-Server Relay Safety
                </h2>
                <div className="space-y-4">
                  <p>
                    Most web intake forms submit data directly from the client's browser using
                    frontend API keys, which can be easily hijacked. OzInfra prevents this
                    vulnerability by using an isolated server-to-server relay model.
                  </p>
                  <p>
                    Frontend forms submit JSON payloads directly to `/api/contact`. The serverless
                    backend validates the payload, parses credentials from secure environment
                    variables, and communicates with the delivery network using encrypted HTTPS REST
                    endpoints. No API credentials or private templates are ever exposed to the
                    public browser headers.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 5 */}
            <section id="in-memory-caching" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Cpu className="text-oz-orange" size={22} />
                  5. In-Memory Data Boundaries
                </h2>
                <div className="space-y-4">
                  <p>
                    To enforce absolute data minimization, we do not write or store lead submissions
                    to static SQL databases on this public-facing server. Instead, all validation
                    checks are held strictly in memory:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong className="text-white">IP-Based Rate Limiter:</strong> Request counts
                      are tracked in an in-memory Map structure that resets automatically every
                      hour. No static logs are written.
                    </li>
                    <li>
                      <strong className="text-white">Idempotency Key Verification:</strong> Success
                      records are held in memory for a maximum of 5 minutes to prevent duplicate
                      submissions, after which they are permanently removed.
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 6 */}
            <section id="physical-storage" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Database className="text-oz-orange" size={22} />
                  6. Data Location & Sovereignty
                </h2>
                <div className="space-y-4">
                  <p>
                    All public platform serverless operations are hosted in premium,
                    enterprise-grade cloud regions located within the geographical borders of
                    Australia (e.g., Australia East).
                  </p>
                  <p>
                    This guarantees complete data sovereignty for Australian and Tasmanian business
                    entities. Corporate support data, backups, and network telemetry processed under
                    official enterprise SLAs are isolated and stored exclusively inside encrypted
                    Australian tenant nodes, matching ISO 27001 physical security guidelines.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 7 */}
            <section id="compliance-officer" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Shield className="text-oz-orange" size={22} />
                  7. Compliance Operations Contact
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra maintains an open disclosure model. If your enterprise compliance team
                    needs detailed reviews of our data processing, network topology designs, or
                    security audit logs, please submit your request to:
                  </p>
                  <div className="mt-6 border border-white/5 bg-white/[0.02] p-6 rounded-2xl">
                    <p className="font-semibold text-white mb-1">OzInfra Compliance & Governance</p>
                    <p className="text-sm mb-4">Level 4, 110 Collins St, Hobart, TAS 7000</p>
                    <a
                      href="mailto:compliance@ozinfra.com"
                      className="text-oz-orange hover:text-white transition-colors underline underline-offset-4 font-mono text-sm"
                    >
                      compliance@ozinfra.com
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
