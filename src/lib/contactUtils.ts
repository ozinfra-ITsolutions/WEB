import DOMPurify from "dompurify";

// ── Rate Limiting ──────────────────────────────────────────
const RATE_LIMIT_KEY = "ozinfra_form_submissions";
const MAX_SUBMISSIONS = 3;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface SubmissionRecord {
  timestamps: number[];
}

export function checkRateLimit(): boolean {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    if (!raw) return true;
    const record: SubmissionRecord = JSON.parse(raw);
    const now = Date.now();
    const recent = record.timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    return recent.length < MAX_SUBMISSIONS;
  } catch {
    return true;
  }
}

export function recordSubmission(): void {
  try {
    const raw = localStorage.getItem(RATE_LIMIT_KEY);
    const record: SubmissionRecord = raw ? JSON.parse(raw) : { timestamps: [] };
    const now = Date.now();
    record.timestamps = record.timestamps.filter((t) => now - t < RATE_WINDOW_MS);
    record.timestamps.push(now);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(record));
  } catch {
    // Silent fail
  }
}

// ── Idempotency ────────────────────────────────────────────
const IDEMPOTENCY_KEY = "ozinfra_idempotency";
const IDEMPOTENCY_TTL_MS = 5 * 60 * 1000; // 5 minutes

export function generateIdempotencyKey(data: Record<string, string>): string {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `idem_${Math.abs(hash)}`;
}

export function isDuplicateSubmission(key: string): boolean {
  try {
    const raw = localStorage.getItem(IDEMPOTENCY_KEY);
    if (!raw) return false;
    const store: Record<string, number> = JSON.parse(raw);
    const ts = store[key];
    if (!ts) return false;
    return Date.now() - ts < IDEMPOTENCY_TTL_MS;
  } catch {
    return false;
  }
}

export function recordIdempotencyKey(key: string): void {
  try {
    const raw = localStorage.getItem(IDEMPOTENCY_KEY);
    const store: Record<string, number> = raw ? JSON.parse(raw) : {};
    store[key] = Date.now();
    // Clean old keys
    const now = Date.now();
    for (const k of Object.keys(store)) {
      if (now - store[k] > IDEMPOTENCY_TTL_MS) delete store[k];
    }
    localStorage.setItem(IDEMPOTENCY_KEY, JSON.stringify(store));
  } catch {
    // Silent fail
  }
}

// ── Sanitization ───────────────────────────────────────────
export function stripEmojis(input: string): string {
  if (typeof input !== "string") return "";
  // Strips standard, decorative, and technical emoji/symbol ranges
  return input.replace(
    /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
    ""
  );
}

export function sanitize(input: string): string {
  // Strip emojis first
  const noEmojis = stripEmojis(input);
  let clean = DOMPurify.sanitize(noEmojis, { ALLOWED_TAGS: [] });
  // Remove potential NoSQL interpolation patterns (curly brackets only)
  clean = clean.replace(/[{}]/g, "");
  // Limit length, but do not trim here so spaces can be typed naturally
  return clean.slice(0, 1000);
}

// ── Validation ─────────────────────────────────────────────
export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  industry: string;
  companySize: string;
  serviceTypes: string[];
  budget: string;
  timeline: string;
  message: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  company?: string;
  industry?: string;
  serviceTypes?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]?[\d\s()-]{7,20}$/;
const NAME_REGEX = /^[a-zA-Z\s'-]{2,80}$/;

export function validateStep(step: number, data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  switch (step) {
    case 0:
      if (!data.fullName.trim()) errors.fullName = "Full name is required";
      else if (!NAME_REGEX.test(data.fullName.trim()))
        errors.fullName = "Letters only, 2-80 characters";

      if (!data.email.trim()) errors.email = "Email is required";
      else if (!EMAIL_REGEX.test(data.email.trim())) errors.email = "Enter a valid email address";

      if (!data.phone.trim()) errors.phone = "Phone number is required";
      else if (!PHONE_REGEX.test(data.phone.trim())) errors.phone = "Enter a valid phone number";
      break;

    case 1:
      if (data.serviceTypes.length === 0)
        errors.serviceTypes = "Please select at least one service";
      break;
  }

  return errors;
}

// ── Secure Server API Sender ───────────────────────────────
export async function sendEmail(data: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    // If running on github.io (static hosting preview), show a graceful preview notice
    if (typeof window !== "undefined" && window.location.hostname.includes("github.io")) {
      return {
        success: false,
        error: "This is a static preview on GitHub Pages. Direct email submission is disabled here because static hosts do not support backend API routes. For live email functionality, deploy the site on Vercel or another platform with Node.js environment. You can contact us directly at ozinfraitsolutions@gmail.com!"
      };
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the response is a 404 (which indicates static hosting like GitHub Pages without server-side API support)
    if (response.status === 404) {
      return {
        success: false,
        error: "Direct email submission is disabled in this static preview environment. For full functionality including live forms, deploy this app to Vercel. Contact us directly at ozinfraitsolutions@gmail.com!"
      };
    }

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.error || "Failed to send. Please try again later." };
    }

    return { success: true };
  } catch (err) {
    console.error("[OzInfra] Contact submission error:", err);
    return { success: false, error: "Connection failed. Please try again later." };
  }
}
