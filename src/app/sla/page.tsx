"use client";

import { useEffect, useState, useRef } from "react";
import {
  Shield,
  FileText,
  ChevronRight,
  Terminal,
  Globe,
  Clock,
  Server,
  AlertTriangle,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const SECTIONS = [
  { id: "sla-purpose", title: "1. SLA Framework & Purpose" },
  { id: "severity-targets", title: "2. Incident Severity & Targets" },
  { id: "operational-hours", title: "3. Operational Support Windows" },
  { id: "availability-metrics", title: "4. Availability Guarantees" },
  { id: "escalation-workflow", title: "5. Triage & Escalation Paths" },
  { id: "audits-penalties", title: "6. Service Credits & Auditing" },
  { id: "sla-inquiries", title: "7. Corporate SLA Inquiries" },
];

export default function SLA() {
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
                  <Clock className="text-oz-orange" size={20} />
                </div>
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-oz-orange">
                  SYSTEM.SLA_OVERVIEW
                </p>
              </div>
              <h1 className="text-display font-space mb-6 leading-tight">Service Levels</h1>
              <p className="text-lg text-oz-warmgray max-w-xl font-body">
                Last audited: May 2026. Standard operational parameters, response matrices, and
                escalation protocols for OzInfra enterprise accounts.
              </p>
            </div>

            {/* Terminal Metadata Panel */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 font-mono text-[11px] text-oz-warmgray/80 min-w-[280px] lg:w-96 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-oz-orange/5 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                <Terminal className="text-oz-orange" size={14} />
                <span className="text-white font-bold">SYS.SLA_REGISTRY</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>SLA_ID:</span>
                  <span className="text-white">OZINFRA-SLA-2026-V1</span>
                </div>
                <div className="flex justify-between">
                  <span>P1_RESPONSE:</span>
                  <span className="text-[#f85b1b] font-bold">15 MINUTES TARGET</span>
                </div>
                <div className="flex justify-between">
                  <span>SYSTEM_UPTIME:</span>
                  <span className="text-white">99.9% / 99.99% TARGETS</span>
                </div>
                <div className="flex justify-between">
                  <span>AFTER_HOURS:</span>
                  <span className="text-white">ACTIVE (365 DAYS/YEAR)</span>
                </div>
                <div className="flex justify-between">
                  <span>DISCLOSURE:</span>
                  <span className="text-white">PUBLIC ARCHITECTURE GUIDE</span>
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
              <nav className="space-y-2 font-mono text-xs" aria-label="SLA policy parts">
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
            <section id="sla-purpose" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Globe className="text-oz-orange" size={22} />
                  1. SLA Framework & Purpose
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra engineers high-availability systems for enterprise organizations that
                    require operational stability. Our Service Level Agreements (SLAs) are designed
                    to provide clear, measurable, and reliable support structures.
                  </p>
                  <p>
                    This document outlines our standard response and resolution targets. It serves
                    as an informational framework for public understanding. Active corporate
                    operations are governed by customized, bilateral contracts executed between
                    OzInfra and the client.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 2 */}
            <section id="severity-targets" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="text-oz-orange" size={22} />
                  2. Incident Severity & Targets
                </h2>
                <div className="space-y-6">
                  <p>
                    We classify technical incidents into four distinct severity tiers, each
                    associated with specific, audited response and resolution targets:
                  </p>

                  {/* Responsive severity cards grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* P1 */}
                    <div className="border border-[#F85B1B]/20 bg-[#F85B1B]/5 rounded-xl p-5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-oz-orange/10 rounded-full blur-md" />
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-[#F85B1B] font-bold">
                          SEVERITY 1 [P1]
                        </span>
                        <span className="text-[10px] bg-[#F85B1B]/20 text-white px-2 py-0.5 rounded font-mono">
                          CRITICAL
                        </span>
                      </div>
                      <h4 className="text-white font-space text-base font-semibold mb-2">
                        Total System Outage
                      </h4>
                      <p className="text-xs text-oz-warmgray/80 mb-4">
                        Entire enterprise organization or primary cloud network offline. Active
                        disaster recovery required.
                      </p>
                      <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 font-mono text-[11px]">
                        <div>
                          <span className="text-[#858585] block">RESPONSE:</span>
                          <span className="text-[#F85B1B] font-bold">&le; 15 mins</span>
                        </div>
                        <div>
                          <span className="text-[#858585] block">RESOLUTION:</span>
                          <span className="text-[#F85B1B] font-bold">&le; 2 hours</span>
                        </div>
                      </div>
                    </div>

                    {/* P2 */}
                    <div className="border border-white/10 bg-white/[0.02] rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-white font-bold">
                          SEVERITY 2 [P2]
                        </span>
                        <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded font-mono">
                          HIGH IMPACT
                        </span>
                      </div>
                      <h4 className="text-white font-space text-base font-semibold mb-2">
                        Significant Degradation
                      </h4>
                      <p className="text-xs text-oz-warmgray/80 mb-4">
                        Core backup systems failing, partial database cluster offline, or
                        significant performance loss.
                      </p>
                      <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 font-mono text-[11px]">
                        <div>
                          <span className="text-[#858585] block">RESPONSE:</span>
                          <span className="text-white font-bold">&le; 1 hour</span>
                        </div>
                        <div>
                          <span className="text-[#858585] block">RESOLUTION:</span>
                          <span className="text-white font-bold">&le; 8 hours</span>
                        </div>
                      </div>
                    </div>

                    {/* P3 */}
                    <div className="border border-white/10 bg-white/[0.02] rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-white font-bold">
                          SEVERITY 3 [P3]
                        </span>
                        <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded font-mono">
                          NORMAL
                        </span>
                      </div>
                      <h4 className="text-white font-space text-base font-semibold mb-2">
                        Minor Disturbance
                      </h4>
                      <p className="text-xs text-oz-warmgray/80 mb-4">
                        Non-disruptive system errors, minor configuration updates, or standard
                        administrative tasks.
                      </p>
                      <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 font-mono text-[11px]">
                        <div>
                          <span className="text-[#858585] block">RESPONSE:</span>
                          <span className="text-white font-bold">&le; 4 hours</span>
                        </div>
                        <div>
                          <span className="text-[#858585] block">RESOLUTION:</span>
                          <span className="text-white font-bold">&le; 24 hours</span>
                        </div>
                      </div>
                    </div>

                    {/* P4 */}
                    <div className="border border-white/10 bg-white/[0.02] rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-white font-bold">
                          SEVERITY 4 [P4]
                        </span>
                        <span className="text-[10px] bg-white/10 text-white px-2 py-0.5 rounded font-mono">
                          LOW
                        </span>
                      </div>
                      <h4 className="text-white font-space text-base font-semibold mb-2">
                        General Inquiry
                      </h4>
                      <p className="text-xs text-oz-warmgray/80 mb-4">
                        Future deployment planning, minor upgrades, documentation requests, or
                        billing queries.
                      </p>
                      <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 font-mono text-[11px]">
                        <div>
                          <span className="text-[#858585] block">RESPONSE:</span>
                          <span className="text-white font-bold">Next Bus. Day</span>
                        </div>
                        <div>
                          <span className="text-[#858585] block">RESOLUTION:</span>
                          <span className="text-white font-bold">Planned Window</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 3 */}
            <section id="operational-hours" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Clock className="text-oz-orange" size={22} />
                  3. Operational Support Windows
                </h2>
                <div className="space-y-4">
                  <p>
                    OzInfra is built specifically to suit the after-hours maintenance requirements
                    of local businesses. We divide our service availability into two operational
                    regimes:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong className="text-white">Standard Business Hours:</strong> 9:00 AM to
                      6:00 PM Australian Eastern Standard Time (AEST) / Hobart local time, Monday
                      through Friday.
                    </li>
                    <li>
                      <strong className="text-white">Active After-Hours Support:</strong> 6:00 PM to
                      9:00 AM Hobart local time on weekdays, 24 hours on weekends, and all official
                      Tasmanian public holidays.
                    </li>
                  </ul>
                  <p>
                    This operational schedule ensures that heavy server upgrades, database
                    migrations, kernel tuning, and network hardware rollouts can be planned and
                    executed during after-hours windows to prevent day-to-day business disruptions.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 4 */}
            <section id="availability-metrics" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Server className="text-oz-orange" size={22} />
                  4. Availability Guarantees
                </h2>
                <div className="space-y-4">
                  <p>
                    For infrastructure environments designed and maintained solely by OzInfra, we
                    target specific monthly availability (uptime) parameters depending on the
                    deployment tier:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong className="text-white">Hybrid Linux Server Nodes:</strong> 99.9%
                      monthly availability (allowing &le; 43.8 minutes of unplanned service downtime
                      per month).
                    </li>
                    <li>
                      <strong className="text-white">
                        High-Availability Cloud Architectures (Microsoft Azure Active-Active
                        clusters):
                      </strong>{" "}
                      99.99% monthly availability (allowing &le; 4.38 minutes of unplanned service
                      downtime per month).
                    </li>
                  </ul>
                  <p>
                    These metrics apply strictly to environments operating under an active, signed
                    contract with proactive monitoring networks enabled (e.g., using Nagios or Azure
                    Monitor dashboards).
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 5 */}
            <section id="escalation-workflow" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Terminal className="text-oz-orange" size={22} />
                  5. Triage & Escalation Paths
                </h2>
                <div className="space-y-4">
                  <p>
                    When a support request is filed, our systems automatically trigger a structured
                    triage and escalation workflow:
                  </p>
                  <ol className="list-decimal pl-6 space-y-3">
                    <li>
                      <strong className="text-white">Intake:</strong> Ticket submitted via phone,
                      client portal, or custom email alerts.
                    </li>
                    <li>
                      <strong className="text-white">Triage (Within 10 Mins):</strong> Automated
                      classification of severity. P1 incidents immediately notify our on-duty
                      engineer's physical pager.
                    </li>
                    <li>
                      <strong className="text-white">Triage Status Update:</strong> Client notified
                      of active engineer assignment.
                    </li>
                    <li>
                      <strong className="text-white">Incident Management (Continuous):</strong> For
                      P1 events, our team provides hourly technical progress reports until complete
                      system restoration is achieved.
                    </li>
                  </ol>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 6 */}
            <section id="audits-penalties" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Shield className="text-oz-orange" size={22} />
                  6. Service Credits & Auditing
                </h2>
                <div className="space-y-4">
                  <p>
                    If OzInfra fails to meet target availability guarantees or P1 response times
                    during a billing cycle, clients operating under active enterprise contracts may
                    be eligible for Service Credits.
                  </p>
                  <p>
                    SLA audits are calculated monthly using automated uptime tracking reports. Any
                    service credits are applied as direct offsets against the subsequent monthly
                    billing cycle, ensuring complete transparency and operational accountability.
                  </p>
                </div>
              </ScrollReveal>
            </section>

            {/* Section 7 */}
            <section id="sla-inquiries" className="scroll-mt-32">
              <ScrollReveal direction="up">
                <h2 className="text-2xl font-space text-white mb-6 flex items-center gap-3">
                  <Terminal className="text-oz-orange" size={22} />
                  7. Corporate SLA Inquiries
                </h2>
                <div className="space-y-4">
                  <p>
                    If you are a prospective corporate client based in Hobart or operating globally,
                    and require custom severity responses (e.g., dedicated 10-minute P1 pager
                    alerts), please contact our operations team to negotiate a formal contract
                    structure:
                  </p>
                  <div className="mt-6 border border-white/5 bg-white/[0.02] p-6 rounded-2xl">
                    <p className="font-semibold text-white mb-1">OzInfra Operations Desk</p>
                    <p className="text-sm mb-4">Level 4, 110 Collins St, Hobart, TAS 7000</p>
                    <a
                      href="mailto:sla@ozinfra.com"
                      className="text-oz-orange hover:text-white transition-colors underline underline-offset-4 font-mono text-sm"
                    >
                      sla@ozinfra.com
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
