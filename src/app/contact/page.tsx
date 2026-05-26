"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  User,
  Briefcase,
  AlertCircle,
  MessageSquare,
  Cpu,
} from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants/contact";
import TextReveal from "@/components/TextReveal";
import { InteractiveTerminalCard } from "@/components/ui/interactive-terminal-card";
import OzInfraFAQ from "@/sections/FAQ";
import { contactFAQs } from "@/data/faqData";
import { LiquidButton } from "@/components/ui/LiquidButton";
import PixelDissolveButton from "@/components/ui/pixel-dissolve-button";
import { getAssetPath } from "@/lib/utils";
import {
  type FormData,
  type ValidationErrors,
  validateStep,
  sanitize,
  checkRateLimit,
  recordSubmission,
  generateIdempotencyKey,
  isDuplicateSubmission,
  recordIdempotencyKey,
  sendEmail,
} from "@/lib/contactUtils";

const steps = [
  {
    id: "contact",
    title: "Contact Details",
    description: "Introduce yourself and your business",
    icon: User,
  },
  {
    id: "project",
    title: "Services & Requirements",
    description: "Select what services your business needs",
    icon: Briefcase,
  },
  {
    id: "review",
    title: "Review & Submit",
    description: "Verify your request details before sending",
    icon: Check,
  },
];

const serviceCategories = [
  {
    category: "Linux Administration",
    subservices: [
      "RHEL Server Configuration & Admin",
      "RHEL 7 / 8 / 9 Administration",
      "Red Hat Enterprise Linux Administration",
      "Ansible Automation & Patching",
      "Systems Migration & Upgrades",
      "Performance & Nagios Monitoring",
      "Server Deployment & Troubleshooting",
      "After-Hours Maintenance Operations",
    ],
  },
  {
    category: "Cloud & Virtualisation",
    subservices: [
      "Microsoft Azure Services",
      "Azure VM Deployments & Automation",
      "Infrastructure-as-Code (ARM/Bicep)",
      "VMware Support & Virtualisation",
      "Hybrid Infrastructure Integration",
    ],
  },
  {
    category: "Networking & Hardware",
    subservices: [
      "Network Design & Cabling",
      "Network Setups for Small Businesses",
      "Hardware Rollouts & Deployments",
      "IT Infrastructure Deployment",
      "Exchange Server Support & Patching",
      "Basic Business Networking Support",
    ],
  },
  {
    category: "After-Hours & Support",
    subservices: [
      "Scheduled & After-Hours Patching",
      "Remote Systems Monitoring",
      "On-Site Technical Support",
      "Emergency Incident Response",
      "Proactive System Health Checks",
    ],
  },
  {
    category: "Custom Request",
    subservices: ["Not Listed Here (Custom Setup)"],
  },
];

const budgetSteps = [
  { label: "$1k - $10k", value: "$1,000 - $10,000" },
  { label: "$10k - $30k", value: "$10,000 - $30,000" },
  { label: "$30k - $100k", value: "$30,000 - $100,000" },
  { label: "Flexible", value: "Not Sure / Flexible" },
];

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  title: "",
  industry: "other",
  companySize: "",
  serviceTypes: [],
  budget: "Not Sure / Flexible", // Set premium slider default value
  timeline: "flexible",
  message: "",
};

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleHashScroll = () => {
    if (window.location.hash === "#contact-form") {
      const element = document.getElementById("contact-form");
      if (element) {
        setTimeout(() => {
          const yOffset = -120; // Perfect mathematical offset to clear navbar perfectly
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 180);
      }
    }
  };

  useEffect(() => {
    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  const validateField = (field: string, value: string): string => {
    const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;
    const NAME_REGEX = /^[a-zA-Z\s'-]{2,80}$/;

    if (field === "email") {
      if (!value.trim()) return "Email is required";
      if (!EMAIL_REGEX.test(value.trim())) return "Enter a valid email address";
    }
    if (field === "fullName") {
      if (!value.trim()) return "Full name is required";
      if (!NAME_REGEX.test(value.trim())) return "Letters only, 2-80 characters";
    }
    if (field === "phone") {
      if (!value.trim()) return "Phone number is required";
      if (!PHONE_REGEX.test(value.trim())) return "Enter a valid phone number";
    }
    return "";
  };

  const updateField = (field: keyof FormData, value: string | string[]) => {
    let sanitizedValue = value;
    if (typeof value === "string") {
      sanitizedValue = sanitize(value);
      setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));

      // Instant Validation on Change
      const errorMsg = validateField(field, sanitizedValue as string);
      if (errorMsg) {
        setErrors((prev) => ({ ...prev, [field]: errorMsg }));
      } else {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field as keyof ValidationErrors];
          return next;
        });
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleBlur = (field: keyof FormData, value: string) => {
    const errorMsg = validateField(field, value);
    if (errorMsg) {
      setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof ValidationErrors];
        return next;
      });
    }
  };

  const toggleService = (option: string) => {
    setFormData((prev) => {
      const current = prev.serviceTypes;
      const next = current.includes(option)
        ? current.filter((s) => s !== option)
        : [...current, option];
      return { ...prev, serviceTypes: next };
    });
    if (errors.serviceTypes) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.serviceTypes;
        return next;
      });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = (e.target as HTMLElement).closest("form");
      if (!form) return;
      const inputs = Array.from(form.querySelectorAll<HTMLElement>("input, select, textarea"));
      const currentIndex = inputs.indexOf(e.target as HTMLElement);
      if (currentIndex >= 0 && currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      } else {
        handleNext();
      }
    }
  };

  const canProceed = () => {
    const stepErrors = validateStep(currentStep, formData);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    const stepErrors = validateStep(currentStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    setSubmitError("");

    if (!checkRateLimit()) {
      setSubmitError("Too many submissions. Please try again in an hour.");
      return;
    }

    const idemKey = generateIdempotencyKey(formData as unknown as Record<string, string>);
    if (isDuplicateSubmission(idemKey)) {
      setSubmitError("This request was already submitted.");
      return;
    }

    setSubmitting(true);
    const result = await sendEmail(formData);
    setSubmitting(false);

    if (result.success) {
      recordSubmission();
      recordIdempotencyKey(idemKey);
      setSubmitted(true);
    } else {
      setSubmitError(result.error || "Something went wrong. Please try again.");
    }
  };

  const FieldError = ({ field }: { field: keyof ValidationErrors }) =>
    errors[field] ? (
      <motion.p
        id={`error-${field}`}
        role="alert"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1 text-red-500 text-xs mt-1 font-space"
      >
        <AlertCircle size={12} /> {errors[field]}
      </motion.p>
    ) : null;

  const inputClass = (field: keyof ValidationErrors) =>
    `w-full bg-transparent border-b-2 py-3 font-space focus:outline-none transition-colors duration-300 ${
      errors[field]
        ? "border-red-500 text-red-600 focus:border-red-600"
        : "border-oz-black/20 text-oz-black focus:border-oz-orange"
    }`;

  const currentSliderVal =
    budgetSteps.findIndex((s) => s.value === formData.budget) === -1
      ? 3
      : budgetSteps.findIndex((s) => s.value === formData.budget);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-xs font-space uppercase tracking-wider text-oz-gray mb-2 block font-medium"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    const filtered = e.target.value.replace(/[^a-zA-Z\s'-]/g, "");
                    updateField("fullName", filtered);
                  }}
                  onBlur={(e) => handleBlur("fullName", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={inputClass("fullName")}
                  placeholder="John Doe"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "error-fullName" : undefined}
                />
                <FieldError field="fullName" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs font-space uppercase tracking-wider text-oz-gray mb-2 block font-medium"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={(e) => handleBlur("email", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={inputClass("email")}
                  placeholder="john@company.com"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "error-email" : undefined}
                />
                <FieldError field="email" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="text-xs font-space uppercase tracking-wider text-oz-gray mb-2 block font-medium"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const filtered = e.target.value.replace(/[^\d\s+()-]/g, "");
                    updateField("phone", filtered);
                  }}
                  onBlur={(e) => handleBlur("phone", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={inputClass("phone")}
                  placeholder="+61 452 113 061"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "error-phone" : undefined}
                />
                <FieldError field="phone" />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="text-xs font-space uppercase tracking-wider text-oz-gray mb-2 block font-medium"
                >
                  Company Name (Optional)
                </label>
                <input
                  id="company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent border-b-2 border-oz-black/20 py-3 text-oz-black font-space focus:border-oz-orange focus:outline-none transition-colors duration-300"
                  placeholder="Acme Corporation"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="jobTitle"
                className="text-xs font-space uppercase tracking-wider text-oz-gray mb-2 block font-medium"
              >
                Your Title (Optional)
              </label>
              <input
                id="jobTitle"
                type="text"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-b-2 border-oz-black/20 py-3 text-oz-black font-space focus:border-oz-orange focus:outline-none transition-colors duration-300"
                placeholder="CTO, IT Manager, Business Owner, etc."
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <label className="text-xs font-space uppercase tracking-wider text-oz-orange mb-4 block font-bold">
                Services Required * (Select all that apply)
              </label>
              <div className="space-y-6 max-h-[300px] overflow-y-auto pr-2 border-b border-oz-border/30 pb-4">
                {serviceCategories.map((cat) => (
                  <div key={cat.category} className="space-y-2">
                    <h4 className="text-[11px] font-space uppercase tracking-[0.15em] text-oz-black font-bold border-l-2 border-oz-orange pl-2">
                      {cat.category}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cat.subservices.map((sub) => (
                        <button
                          type="button"
                          key={sub}
                          onClick={() => toggleService(sub)}
                          className={`py-2 px-3 text-left font-space text-xs border transition-all duration-300 flex items-center justify-between ${
                            formData.serviceTypes.includes(sub)
                              ? "border-oz-orange bg-oz-orange text-oz-bg font-medium shadow-[0_4px_12px_rgba(248,91,27,0.15)]"
                              : "border-oz-black/10 text-oz-black hover:border-oz-orange/40 bg-white"
                          }`}
                        >
                          <span>{sub}</span>
                          {formData.serviceTypes.includes(sub) && (
                            <Check size={12} className="text-oz-bg shrink-0 ml-2" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <FieldError field="serviceTypes" />
            </div>

            <div>
              <label className="text-xs font-space uppercase tracking-wider text-oz-gray mb-3 block font-medium">
                Estimated Budget (Drag Slider)
              </label>
              <div className="relative pt-6 pb-2">
                {/* Glowing slider track background */}
                <div className="absolute top-[26px] left-0 w-full h-2 bg-oz-black/5 rounded-full border border-black/[0.03]" />

                {/* Active track bar with brand orange gradient width */}
                <div
                  className="absolute top-[26px] left-0 h-2 bg-gradient-to-r from-oz-orange to-oz-orange-contrast rounded-full shadow-[0_0_12px_rgba(248,91,27,0.3)] transition-all duration-300"
                  style={{ width: `${(currentSliderVal / (budgetSteps.length - 1)) * 100}%` }}
                />

                <input
                  type="range"
                  min="0"
                  max={budgetSteps.length - 1}
                  step="1"
                  value={currentSliderVal}
                  onChange={(e) => {
                    const idx = parseInt(e.target.value);
                    updateField("budget", budgetSteps[idx].value);
                  }}
                  className="w-full relative z-20 cursor-pointer accent-oz-orange h-2 opacity-0 hover:opacity-10 transition-opacity duration-300"
                />

                {/* Styled thumb that floats along the track */}
                <div
                  className="absolute top-[18px] w-6 h-6 rounded-full border-4 border-oz-orange bg-white shadow-md flex items-center justify-center transition-all duration-300 pointer-events-none z-30"
                  style={{
                    left: `calc(${(currentSliderVal / (budgetSteps.length - 1)) * 100}% - 12px)`,
                    boxShadow: "0 0 15px rgba(248, 91, 27, 0.4)",
                  }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-oz-orange animate-ping" />
                </div>
              </div>

              {/* Labels Grid */}
              <div className="grid grid-cols-4 text-center mt-2 relative">
                {budgetSteps.map((step, idx) => (
                  <button
                    key={step.value}
                    type="button"
                    onClick={() => updateField("budget", step.value)}
                    className={`text-xs font-space tracking-wide transition-all duration-300 ${
                      currentSliderVal === idx
                        ? "text-oz-orange font-bold scale-105"
                        : "text-oz-gray hover:text-oz-black"
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="text-xs font-space uppercase tracking-wider text-oz-gray mb-2 block font-medium"
              >
                Additional Details (Optional)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                rows={4}
                className="w-full bg-transparent border-b-2 border-oz-black/20 py-3 text-oz-black font-space focus:border-oz-orange focus:outline-none transition-colors duration-300 resize-none text-sm"
                placeholder="Briefly describe your environment (Linux versions, Azure VMs, business network setup, or maintenance constraints)..."
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Name", value: formData.fullName },
                { label: "Email", value: formData.email },
                { label: "Phone", value: formData.phone },
                { label: "Company", value: formData.company || "Not provided" },
                { label: "Job Title", value: formData.title || "Not provided" },
                { label: "Selected Services", value: formData.serviceTypes.join(", ") },
                { label: "Budget Range", value: formData.budget || "Flexible" },
              ].map((item) => (
                <div key={item.label} className="bg-oz-surface/60 p-4 border border-black/[0.03]">
                  <span className="text-[10px] font-space uppercase tracking-wider text-oz-orange mb-1 block font-bold">
                    {item.label}
                  </span>
                  <p className="text-oz-black font-space text-sm break-words">{item.value}</p>
                </div>
              ))}
            </div>
            {formData.message && (
              <div className="bg-oz-surface/60 p-4 border border-black/[0.03]">
                <span className="text-[10px] font-space uppercase tracking-wider text-oz-orange mb-1 block font-bold">
                  Additional Details
                </span>
                <p className="text-oz-black font-space text-sm whitespace-pre-wrap">
                  {formData.message}
                </p>
              </div>
            )}
            <div className="p-4 border border-oz-orange/20 bg-oz-orange/5 text-xs text-oz-orange font-space">
              * By clicking submit, you request a custom proposal and discovery assessment. We
              respect your data privacy and will never share your business details.
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <main id="main-content">
      {/* Ultra-Premium Cinematic Hero */}
      <section
        className="relative bg-oz-black min-h-[75vh] flex items-center overflow-hidden"
        aria-label="Contact hero"
      >
        {/* Next.js Optimized Preloaded Hero Background Image */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src={getAssetPath("/images/contact-hero.webp")}
            alt="Enterprise IT infrastructure"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-10"
          />
        </div>
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Ambient Orbs */}
        <motion.div
          className="absolute top-20 right-20 w-80 h-80 rounded-full bg-oz-orange/8 blur-[100px] pointer-events-none"
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-oz-primary/5 blur-[120px] pointer-events-none"
          animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-oz-black/60 via-oz-black/40 to-oz-black pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl w-full pt-36 pb-32">
          <div className="max-w-4xl">
            {/* Pre-heading */}
            <motion.div
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-oz-orange text-xs uppercase tracking-[0.3em] font-space font-medium flex items-center gap-2">
                <Send className="w-4 h-4" />
                Contact OzInfra
              </span>
            </motion.div>

            {/* Title */}
            <TextReveal
              text="Let Us Architect Your Infrastructure"
              tag="h1"
              className="text-5xl md:text-6xl lg:text-7xl font-space text-oz-white mb-8 leading-tight"
              delay={0.4}
            />

            {/* Accent Bar */}
            <motion.div
              className="w-20 h-1 bg-oz-orange rounded-full mb-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 0.68, 0, 1] }}
              style={{ transformOrigin: "left" }}
            />

            {/* Description */}
            <motion.p
              className="text-oz-warmgray text-xl md:text-2xl max-w-2xl leading-relaxed font-body mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
            >
              Ready to modernise, automate, and secure your systems? Fill out the brief request form
              below to arrange a complimentary discovery call with our Hobart-based engineers.
            </motion.p>

            {/* Contact Info Terminal Flip Cards (Grid of 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <InteractiveTerminalCard
                icon={Mail}
                label="Email Us"
                value={CONTACT_INFO.email}
                href={`mailto:${CONTACT_INFO.email}`}
                cmd="> connect --email"
                backAction="Open Mail Client"
                type="mail"
                delay={1.2}
              />
              <InteractiveTerminalCard
                icon={MessageSquare}
                label="WhatsApp"
                value="+61 452 113 061"
                href={CONTACT_INFO.whatsapp}
                cmd="> connect --whatsapp"
                backAction="Open WhatsApp Chat"
                type="whatsapp"
                delay={1.3}
              />
              <InteractiveTerminalCard
                icon={Phone}
                label="Call Us"
                value={CONTACT_INFO.phone}
                href={`tel:${CONTACT_INFO.phone}`}
                cmd="> connect --cellular"
                backAction="Start Phone Call"
                type="phone"
                delay={1.4}
              />
              <InteractiveTerminalCard
                icon={Clock}
                label="Operations Status"
                value="After-Hours & 24/7 Remote"
                href={undefined}
                cmd="> sys.time --ops"
                backAction="Engineers Online"
                type="status"
                delay={1.5}
              />
            </div>
          </div>
        </div>
      </section>

      {submitted ? (
        <section
          className="section-padding bg-oz-bg min-h-[60vh] flex items-center justify-center"
          aria-label="Submission confirmation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-lg"
          >
            <div className="w-20 h-20 bg-oz-orange flex items-center justify-center mx-auto mb-8">
              <Check size={40} className="text-oz-bg" />
            </div>
            <h2 className="text-card font-space text-oz-black mb-4">Submission Received</h2>
            <p className="text-oz-gray text-lg mb-8 font-body">
              Thank you! Your infrastructure consultation request has been successfully transmitted.
              Our Hobart-based solutions architect will review your environment parameters and get
              back to you within 2 hours.
            </p>
            <LiquidButton
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(0);
                setFormData(initialFormData);
                setErrors({});
              }}
              variant="white"
              size="sm"
            >
              Submit Another Request
            </LiquidButton>
          </motion.div>
        </section>
      ) : (
        <section id="contact-form" className="bg-oz-bg animate-fade-in" aria-label="Contact form">
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-12 border-y border-black/5">
              {/* Left Info Panel */}
              <div className="lg:col-span-4 bg-oz-orange p-10 lg:p-16 flex flex-col justify-between">
                <div>
                  <h2 className="text-card font-space text-oz-bg mb-6">
                    Ready to Build Unbreakable Systems?
                  </h2>
                  <p className="text-oz-bg/80 text-lg mb-12 font-body">
                    We plan, configuration-test, and deploy infrastructure with absolute precision.
                    Let us evaluate your requirements and secure your systems.
                  </p>
                  <div className="space-y-6">
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="flex items-center gap-4 text-oz-bg group"
                    >
                      <Mail size={20} />
                      <span className="font-space group-hover:underline text-sm">
                        {CONTACT_INFO.email}
                      </span>
                    </a>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="flex items-center gap-4 text-oz-bg group"
                    >
                      <Phone size={20} />
                      <span className="font-space group-hover:underline text-sm">
                        {CONTACT_INFO.phone}
                      </span>
                    </a>
                    <div className="flex items-start gap-4 text-oz-bg">
                      <MapPin size={20} className="mt-1 flex-shrink-0" />
                      <span className="font-space text-sm">
                        {CONTACT_INFO.address.split(", ").map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-oz-bg">
                      <Clock size={20} />
                      <span className="font-space text-sm">
                        After Business Hours Support (After 6pm & Weekends)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-oz-bg/20">
                  <p className="text-oz-bg/60 text-sm font-body">
                    Average response time: &lt; 2 hours
                  </p>
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="lg:col-span-8 p-10 lg:p-16 bg-white relative overflow-hidden">
                <AnimatePresence>
                  {submitting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-oz-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-8 text-center"
                    >
                      {/* Scanning Line Effect */}
                      <div className="absolute inset-0 pointer-events-none z-30 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                      <motion.div
                        animate={{ y: ["0%", "100%", "0%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-0 right-0 h-[2px] bg-oz-orange/40 z-20 pointer-events-none shadow-[0_0_10px_rgba(248,91,27,0.5)]"
                      />

                      <div className="relative z-10 flex flex-col items-center max-w-sm">
                        {/* High-Tech Mainframe Loader */}
                        <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                          <motion.div
                            className="absolute inset-0 border border-white/[0.04] rounded-full"
                            animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          />
                          <motion.div
                            className="absolute -inset-2 border-t-2 border-oz-orange/30 border-r-2 border-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                          <motion.div
                            className="absolute -inset-4 border-b-2 border-white/[0.08] border-l-2 border-transparent rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          />
                          <div className="relative w-14 h-14 bg-oz-black border border-white/[0.06] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(248,91,27,0.15)]">
                            <Cpu size={20} className="text-oz-orange animate-pulse" />
                          </div>
                        </div>

                        {/* Status Message */}
                        <h4 className="text-oz-bg font-space text-lg font-bold mb-2 uppercase tracking-wide">
                          Encrypting Data Packets
                        </h4>
                        <p className="text-oz-warmgray/60 text-xs mb-8 max-w-xs leading-relaxed font-body">
                          Establishing secure transmission tunnel to Resend SMTP servers.
                        </p>

                        {/* Interactive Status Log */}
                        <div className="w-64 bg-oz-black border border-white/[0.05] p-3 rounded-lg text-left font-mono text-[9px] text-oz-warmgray/50 space-y-1.5 shadow-inner">
                          <div className="flex justify-between items-center text-oz-orange">
                            <span>&gt; payload_sanitizer</span>
                            <span className="text-green-400 font-semibold">SECURE</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>&gt; rate_limiter_ver</span>
                            <span>PASS</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>&gt; secure_tunnel_handshake</span>
                            <span className="animate-pulse text-oz-orange/70">ACTIVE...</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Progress Bar */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-4">
                    {steps.map((step, index) => {
                      const StepIcon = step.icon;
                      return (
                        <div key={step.id} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{
                                backgroundColor:
                                  index <= currentStep ? "var(--oz-primary)" : "var(--oz-surface)",
                                scale: index === currentStep ? 1.1 : 1,
                              }}
                              transition={{ duration: 0.3 }}
                              className={`w-12 h-12 flex items-center justify-center font-space font-medium text-sm transition-all duration-300 ${
                                index <= currentStep
                                  ? "text-oz-bg"
                                  : "text-oz-gray border border-oz-border"
                              }`}
                            >
                              {index < currentStep ? <Check size={18} /> : <StepIcon size={18} />}
                            </motion.div>
                            <span
                              className={`text-xs font-space mt-2 hidden lg:block ${index <= currentStep ? "text-oz-black" : "text-oz-gray"}`}
                            >
                              {step.title}
                            </span>
                          </div>
                          {index < steps.length - 1 && (
                            <div className="flex-1 h-0.5 mx-4 bg-oz-border overflow-hidden">
                              <motion.div
                                animate={{ scaleX: index < currentStep ? 1 : 0 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full bg-oz-orange origin-left"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step Title */}
                <div className="mb-8">
                  <h3 className="text-card font-space text-oz-black mb-1">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-oz-gray text-sm font-body">{steps[currentStep].description}</p>
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {renderStepContent()}
                  </motion.div>
                </AnimatePresence>

                {/* Error banner */}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-red-50 border border-red-200 flex items-center gap-3 text-red-600 font-space text-sm"
                  >
                    <AlertCircle size={18} /> {submitError}
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-12 pt-8 border-t border-oz-border-light">
                  <div className="text-sm text-oz-gray font-space text-center block sm:hidden">
                    Step {currentStep + 1} of {steps.length}
                  </div>

                  <div className="flex items-center justify-between w-full gap-4">
                    <button
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      disabled={currentStep === 0}
                      className={`flex items-center gap-2 font-space text-sm uppercase tracking-wider transition-all duration-300 ${currentStep === 0 ? "text-oz-gray/30 cursor-not-allowed pointer-events-none" : "text-oz-black hover:text-oz-orange"}`}
                      type="button"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <div className="text-sm text-oz-gray font-space hidden sm:block">
                      Step {currentStep + 1} of {steps.length}
                    </div>

                    {currentStep < steps.length - 1 ? (
                      <PixelDissolveButton
                        key={`next-btn-${currentStep}`}
                        onClick={handleNext}
                        disabled={!canProceed()}
                        id="contact-next-btn"
                        minWidth={150}
                      >
                        Next <ArrowRight size={16} />
                      </PixelDissolveButton>
                    ) : (
                      <PixelDissolveButton
                        onClick={handleSubmit}
                        disabled={submitting}
                        loading={submitting}
                        id="contact-submit-btn"
                        minWidth={180}
                      >
                        {submitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send size={16} /> Submit Request
                          </>
                        )}
                      </PixelDissolveButton>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      )}

      {/* Ultra-Premium "What Happens Next" Journey Section */}
      <section className="bg-oz-black py-24 md:py-32 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-oz-orange/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-oz-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Left: Sticky Context Panel */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32 space-y-8 h-fit">
                <motion.span
                  className="text-oz-orange text-xs uppercase tracking-[0.3em] font-space font-medium flex items-center gap-2"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <ArrowRight className="w-4 h-4" />
                  The Process
                </motion.span>

                <TextReveal
                  text="Your Journey With Us"
                  tag="h2"
                  className="text-4xl md:text-5xl font-space font-semibold leading-tight text-oz-white"
                  delay={0.2}
                />

                <motion.p
                  className="text-lg text-oz-warmgray leading-relaxed max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  From the moment you transmit your specifications, our Hobart-based engineers
                  follow a rigorous timeline to construct your solution and secure operations.
                </motion.p>

                <motion.div
                  className="w-16 h-1 bg-oz-orange rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 0.68, 0, 1] }}
                  style={{ transformOrigin: "left" }}
                />

                <motion.p
                  className="text-sm text-oz-warmgray font-space pt-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  Average response window:{" "}
                  <span className="text-oz-orange font-semibold">&lt; 2 hours</span>
                </motion.p>
              </div>
            </div>

            {/* Right: Timeline Cards */}
            <div className="lg:col-span-7">
              <div className="relative space-y-8">
                {/* Connecting Line */}
                <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-oz-orange/20 via-oz-orange/10 to-transparent hidden md:block" />

                {[
                  {
                    icon: Mail,
                    step: "01",
                    title: "Specification Received",
                    description:
                      "We receive your RHEL Linux, Azure, or business networking parameters and immediately allocate a Hobart-based operations expert to audit your project guidelines.",
                  },
                  {
                    icon: Phone,
                    step: "02",
                    title: "Technical Discovery Call",
                    description:
                      "Within 24 hours, we connect to clarify system bottlenecks, after-hours support requirements, and define security parameters.",
                  },
                  {
                    icon: Briefcase,
                    step: "03",
                    title: "Infrastructure Proposal",
                    description:
                      "Our team generates a comprehensive, transparent system design blueprint outlining clear implementation milestones, SLA conditions, and support levels.",
                  },
                  {
                    icon: ArrowRight,
                    step: "04",
                    title: "Secure Kickoff & Support",
                    description:
                      "We begin configuring, automation-testing, and deploying your unbreakable infrastructure. Systems are monitored 24/7 with immediate response alerts.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    className="group relative"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 0.68, 0, 1] }}
                  >
                    <div className="relative backdrop-blur-xl bg-white/[0.02] rounded-2xl p-8 md:p-10 md:pl-24 border border-white/5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_-12px_rgba(234,88,12,0.15)] hover:border-oz-orange/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden">
                      {/* Giant Watermark Number */}
                      <span className="absolute -top-4 -right-4 text-[8rem] font-space font-bold text-white/[0.02] group-hover:text-oz-orange/[0.06] transition-colors duration-700 leading-none pointer-events-none select-none">
                        {item.step}
                      </span>

                      {/* Timeline Dot */}
                      <div className="hidden md:flex absolute left-6 top-10 w-5 h-5 rounded-full border-2 border-oz-orange/30 bg-oz-black items-center justify-center group-hover:border-oz-orange group-hover:bg-oz-orange/10 transition-all duration-500">
                        <div className="w-2 h-2 rounded-full bg-oz-orange/50 group-hover:bg-oz-orange transition-colors duration-500" />
                      </div>

                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-oz-orange/10 flex items-center justify-center shrink-0 group-hover:bg-oz-orange group-hover:shadow-lg group-hover:shadow-oz-orange/20 transition-all duration-500">
                          <item.icon className="w-6 h-6 text-oz-orange group-hover:text-white transition-colors duration-500" />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-space font-bold text-oz-orange tracking-[0.2em] uppercase">
                              Step {item.step}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-space font-medium text-oz-white mb-3">
                            {item.title}
                          </h3>
                          <p className="text-oz-warmgray text-[15px] leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OzInfraFAQ
        faqs={contactFAQs}
        title="Contact FAQs"
        subtitle="Common questions about reaching out to OzInfra's Hobart engineering team."
        variant="dark"
      />
    </main>
  );
}
