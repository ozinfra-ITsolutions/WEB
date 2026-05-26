"use client";

import { useEffect, useState, useRef } from "react";
import {
  Shield,
  FileText,
  ChevronRight,
  Terminal,
  Globe,
  Key,
  Database,
  RefreshCw,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SECTIONS = [
  { id: "hobart-ops", title: "1. Scope & Hobart Operations" },
  { id: "data-collection", title: "2. Information We Collect" },
  { id: "security-arch", title: "3. In-Memory Security Architecture" },
  { id: "sanitization-relay", title: "4. Input Sanitization & API Relay" },
  { id: "no-trackers", title: "5. Zero Tracker / Cookie Policy" },
  { id: "australian-app", title: "6. Australian Privacy Principles (APPs)" },
  { id: "gdpr-rights", title: "7. GDPR / Global Data Rights" },
  { id: "contact-dpo", title: "8. Data Protection Officer" },
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Focus middle of the viewport
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
      const yOffset = -100; // Account for sticky navbar
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
                  <Shield className="text-oz-orange" size={20} />
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-oz-orange">
                  SYSTEM.SECURITY_DISCLOSURE
                </p>
              </div>
              <h1 className="text-display font-space mb-6 leading-tight">Privacy Policy</h1>
              <p className="text-lg text-oz-warmgray max-w-xl font-body">
                Last updated & audited: May 2026. Explicit disclosures governing regional,
                enterprise, and cloud data protection architectures.
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
                  <span className="text-white">OZINFRA-PRV-2026-V1</span>
                </div>
                <div className="flex justify-between">
                  <span>ENCRYPTION:</span>
                  <span className="text-white">TLS_1.3 / AES-GCM-256</span>
                </div>
                <div className="flex justify-between">
                  <span>DATA_RETENTION:</span>
                  <span className="text-oz-orange">IN-MEMORY LIMITS</span>
                </div>
                <div className="flex justify-between">
                  <span>JURISDICTION:</span>
                  <span className="text-white">HOBART, TAS, AU</span>
                </div>
                <div className="flex justify-between">
                  <span>COMPLIANCE:</span>
                  <span className="text-white">GDPR / APP COMPLIANT</span>
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
              <nav className="space-y-2 font-mono text-xs" aria-label="Privacy policy parts">
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
            <section id="hobart-ops" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Globe className="text-oz-orange" size={22} />
                  1. Scope & Hobart Operations
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra is an elite enterprise-grade IT infrastructure consultancy headquartered
                    in Hobart, Tasmania, Australia. We are committed to maintaining the highest
                    standards of data security, integrity, and regulatory compliance.
                  </p>
                  <p>
                    This Privacy Policy governs the processing of personal data collected through
                    the OzInfra web portal and client-intake modules. Unlike standard web operators,
                    we strictly differentiate between general informational website activities and
                    active corporate client systems, which operate under isolated engineering
                    service contracts.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 2 */}
            <section id="data-collection" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Database className="text-oz-orange" size={22} />
                  2. Information We Collect
                </h2>
                <div className="space-y-4">
                  <p>
                    We only collect information that you explicitly submit to us via our secure
                    client-intake form or direct communications. The form requests the following
                    technical and identity metrics:
                  </p>
                  <ul className="list-disc pl-6 space-y-3 mb-4">
                    <li>
                      <strong className="text-white">Identity Details:</strong> Full name, corporate
                      email address, and direct telephone contact.
                    </li>
                    <li>
                      <strong className="text-white">Business Metrics:</strong> Company name, job
                      title, industry sector, and estimated corporate size.
                    </li>
                    <li>
                      <strong className="text-white">Project Scope:</strong> Required services
                      (e.g., Linux engineering, Azure cloud, network setups), project timelines,
                      financial budget estimates, and custom descriptions of your environment.
                    </li>
                  </ul>
                  <p>
                    For security purposes and resource protection, our serverless architecture
                    automatically records certain technical metadata during submission, including IP
                    address, user agent, and secure browser headers.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 3 */}
            <section id="security-arch" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Key className="text-oz-orange" size={22} />
                  3. In-Memory Security Architecture
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra operates on a secure serverless architecture. We do not maintain any
                    persistent marketing databases, SQL tables, or user accounts on this public
                    website. This design choice completely eliminates the risk of static database
                    hacks or password leaks.
                  </p>
                  <p>
                    To protect the client-intake tunnel, we deploy a zero-trust, in-memory
                    validation workflow:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong className="text-white">In-Memory Rate Limiting:</strong> IP-based
                      request limits (maximum 5 submissions per hour) are managed strictly in
                      serverless in-memory records that expire automatically. No persistent tracking
                      databases are involved.
                    </li>
                    <li>
                      <strong className="text-white">In-Memory Idempotency Cache:</strong>{" "}
                      Submissions require a secure unique client key. We hold success states in a
                      secure in-memory cache for a maximum Time-To-Live (TTL) of 5 minutes to
                      prevent duplicate transmissions. The cache automatically purges stale records.
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 4 */}
            <section id="sanitization-relay" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <RefreshCw className="text-oz-orange" size={22} />
                  4. Input Sanitization & API Relay
                </h2>
                <div className="space-y-4">
                  <p>
                    All form submissions undergo rigorous server-side sanitization to neutralize
                    malicious payloads and prevent cyber attacks (such as XSS, SQL injection, or
                    NoSQL curly-bracket interpolation):
                  </p>

                  {/* Styled Code Terminal for API explanation */}
                  <div className="bg-[#1e1e1e] border border-white/5 rounded-xl p-6 font-mono text-[13px] text-[#858585] mb-6 shadow-inner">
                    <div className="flex items-center gap-2 mb-3 border-b border-white/5 pb-2 text-white/40">
                      <Terminal size={12} />
                      <span>SANITIZATION_PIPELINE.sh</span>
                    </div>
                    <p className="text-[#a074c4]">
                      function <span className="text-[#5cb8a6]">serverSanitize</span>(input) {"{"}
                    </p>
                    <p className="pl-4 text-[#858585]">return input</p>
                    <p className="pl-8 text-[#f07178]">
                      <span className="text-[#c792ea]">.replace</span>(/&lt;[^&gt;]*&gt;/g,{" "}
                      <span className="text-[#c3e88d]">""</span>){" "}
                      <span className="text-white/30">// Neutralise script HTML tags</span>
                    </p>
                    <p className="pl-8 text-[#f07178]">
                      <span className="text-[#c792ea]">.replace</span>(/[{"{}"}]/g,{" "}
                      <span className="text-[#c3e88d]">""</span>){" "}
                      <span className="text-white/30">// Neutralise NoSQL interpolation</span>
                    </p>
                    <p className="pl-4 text-[#858585]">{"}"}</p>
                  </div>

                  <p>
                    Once validated and sanitized, the data is relayed server-to-server to our
                    delivery system via secure HTTPS REST requests using high-entropy environment
                    variables. Private API keys are never exposed to the client browser.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 5 */}
            <section id="no-trackers" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Shield className="text-oz-orange" size={22} />
                  5. Zero Tracker / Cookie Policy
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra respects absolute digital privacy. This portal does not deploy
                    persistent cookies, third-party analytics scripts (e.g., Google Analytics, Meta
                    Pixel), or cross-site marketing trackers.
                  </p>
                  <p>
                    We believe enterprise clients have the right to interact with our branding
                    without being tracked across the web. The only session states stored locally are
                    purely functional parameters (such as the idempotency identifiers needed for
                    form safety), which expire automatically from your local browser environment.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 6 */}
            <section id="australian-app" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <FileText className="text-oz-orange" size={22} />
                  6. Australian Privacy Principles (APPs)
                </h2>
                <div className="space-y-4">
                  <p>
                    As an Australian entity, OzInfra complies with the{" "}
                    <strong className="text-white">Privacy Act 1988 (Cth)</strong> and the{" "}
                    <strong className="text-white">Australian Privacy Principles (APPs)</strong>. We
                    adhere strictly to core guidelines including:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong className="text-white">APP 1:</strong> Transparent management of
                      personal information.
                    </li>
                    <li>
                      <strong className="text-white">APP 5:</strong> Explicit notification of data
                      collection methods and purposes.
                    </li>
                    <li>
                      <strong className="text-white">APP 6:</strong> Restrictions preventing
                      secondary uses of data without consent.
                    </li>
                    <li>
                      <strong className="text-white">APP 11:</strong> Active technical measures to
                      keep personal data secure.
                    </li>
                  </ul>
                  <p>
                    Australian users have the right to request access to their collected data,
                    request corrections, or file a complaint regarding an alleged breach of the APPs
                    by contacting our security team directly.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 7 */}
            <section id="gdpr-rights" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Globe className="text-oz-orange" size={22} />
                  7. GDPR / Global Data Rights
                </h2>
                <div className="space-y-4">
                  <p>
                    Although headquartered in Hobart, our systems engineers support global
                    enterprise environments. To accommodate international clients, our operations
                    comply with the European Union's{" "}
                    <strong className="text-white">
                      General Data Protection Regulation (GDPR)
                    </strong>
                    .
                  </p>
                  <p>
                    If you are accessing this site from the European Economic Area (EEA), you
                    possess key data rights:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong className="text-white">Right of Access & Rectification:</strong> You
                      can request a summary and copy of all personal information we hold.
                    </li>
                    <li>
                      <strong className="text-white">
                        Right to Erasure ("Right to be Forgotten"):
                      </strong>{" "}
                      You have the right to demand that we delete all your form submission history
                      and communications logs from our relays.
                    </li>
                    <li>
                      <strong className="text-white">Right to Restriction of Processing:</strong>{" "}
                      You may object to or restrict processing under certain conditions.
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 8 */}
            <section id="contact-dpo" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Shield className="text-oz-orange" size={22} />
                  8. Data Protection Officer (DPO)
                </h2>
                <div className="space-y-4">
                  <p>
                    We take security breaches and data governance seriously. We have appointed a
                    dedicated Data Protection Officer to audit our network architectures, review
                    serverless codes, and handle all legal information requests.
                  </p>
                  <p>
                    If you wish to execute your rights under GDPR or the APPs, or if you have any
                    questions regarding this security architecture, please contact our local Hobart
                    office:
                  </p>
                  <div className="mt-6 border border-white/5 bg-white/[0.02] p-6 rounded-2xl">
                    <p className="font-semibold text-white mb-1">OzInfra Security Operations</p>
                    <p className="text-sm mb-4">Level 4, 110 Collins St, Hobart, TAS 7000</p>
                    <a
                      href="mailto:privacy@ozinfra.com"
                      className="text-oz-orange hover:text-white transition-colors underline underline-offset-4 font-mono text-sm"
                    >
                      privacy@ozinfra.com
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
