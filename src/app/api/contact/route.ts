import { NextResponse } from "next/server";

// ── In-Memory Security Registries ─────────────────────────
interface RateLimitRecord {
  count: number;
  resetTime: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // Max 5 submissions per hour per IP

interface IdempotencyRecord {
  timestamp: number;
  response: Record<string, unknown>;
}
const idempotencyCache = new Map<string, IdempotencyRecord>();
const IDEMPOTENCY_TTL_MS = 5 * 60 * 1000; // 5 minutes

// ── Server-Side Sanitization & Escaping ───────────────────
function stripEmojis(input: string): string {
  if (typeof input !== "string") return "";
  return input.replace(
    /[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g,
    ""
  );
}

function serverSanitize(input: string): string {
  if (typeof input !== "string") return "";
  const noEmojis = stripEmojis(input);
  const clean = noEmojis
    .replace(/<[^>]*>/g, "") // Strip standard HTML/XML tags
    .replace(/[{}]/g, "") // Remove NoSQL curly interpolation (keep '$' signs)
    .trim();
  return clean.slice(0, 1000);
}

function escapeHtml(str: string): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-Z\s'-]{2,80}$/;

export async function POST(request: Request) {
  try {
    // 1. IP-Based In-Memory Rate Limiting
    const ip =
      request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "anonymous";
    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip);

    if (limitRecord) {
      if (now > limitRecord.resetTime) {
        // Reset window if expired
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else if (limitRecord.count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many requests. Please try again in an hour." },
          { status: 429 }
        );
      } else {
        limitRecord.count += 1;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }

    // 2. In-Memory Idempotency Cache Verification
    const idempotencyKey = request.headers.get("x-idempotency-key") || "";
    if (idempotencyKey) {
      const cached = idempotencyCache.get(idempotencyKey);
      if (cached && now - cached.timestamp < IDEMPOTENCY_TTL_MS) {
        return NextResponse.json(cached.response, { status: 200 });
      }
    }

    const body = await request.json();
    const {
      fullName = "",
      email = "",
      phone = "",
      company = "",
      title = "",
      serviceTypes = [],
      budget = "",
      message = "",
    } = body;

    // 3. Strict Server-Side Validation
    if (!fullName.trim() || !NAME_REGEX.test(fullName)) {
      return NextResponse.json({ error: "Valid full name is required." }, { status: 400 });
    }
    if (!email.trim() || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Valid email address is required." }, { status: 400 });
    }
    if (!phone.trim()) {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 });
    }
    if (!Array.isArray(serviceTypes) || serviceTypes.length === 0) {
      return NextResponse.json(
        { error: "At least one service type is required." },
        { status: 400 }
      );
    }

    // 4. Retrieve Resend credentials
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL;

    if (!apiKey || !fromEmail || !toEmail) {
      console.error("[OzInfra Contact API] Missing Resend environment variables.");
      return NextResponse.json(
        {
          error:
            "Email service is currently unconfigured. Please contact support at ozinfraitsolutions@gmail.com.",
        },
        { status: 503 }
      );
    }

    // 5. Sanitize and HTML Escape all fields to neutralize Injection Attacks (XSS, SQL, NoSQL)
    const sFullName = escapeHtml(serverSanitize(fullName));
    const sEmail = escapeHtml(serverSanitize(email));
    const sPhone = escapeHtml(serverSanitize(phone));
    const sCompany = escapeHtml(serverSanitize(company));
    const sTitle = escapeHtml(serverSanitize(title));
    const sServiceTypes = (serviceTypes as string[])
      .map((s) => escapeHtml(serverSanitize(s)))
      .join(", ");
    const sBudget = escapeHtml(serverSanitize(budget));
    const sMessage = escapeHtml(serverSanitize(message));

    // 6. Build Premium, Structured HTML Email Template matching the simplified Form
    const emailHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Project Inquiry - OzInfra</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: #fafafa;
      color: #171717;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #fafafa;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    }
    .header {
      background-color: #171717;
      padding: 40px;
      text-align: center;
      border-bottom: 4px solid #F85B1B;
    }
    .header-logo {
      color: #ffffff;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin: 0 0 10px 0;
    }
    .header-title {
      color: #a0a0a0;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      margin: 0;
    }
    .content {
      padding: 40px;
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #F85B1B;
      margin: 30px 0 15px 0;
      font-weight: 700;
      border-bottom: 1px solid #f0f0f0;
      padding-bottom: 8px;
    }
    .section-title:first-of-type {
      margin-top: 0;
    }
    .grid {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
    .grid-row {
      display: table-row;
    }
    .grid-col-label {
      display: table-cell;
      width: 35%;
      padding: 10px 0;
      font-size: 14px;
      color: #737373;
      font-weight: 500;
    }
    .grid-col-value {
      display: table-cell;
      width: 65%;
      padding: 10px 0;
      font-size: 14px;
      color: #171717;
      font-weight: 600;
    }
    .badge-wrapper {
      margin: 20px 0;
      background-color: #fffaf7;
      border: 1px solid rgba(248, 91, 27, 0.15);
      border-radius: 8px;
      padding: 20px;
    }
    .badge-grid-row {
      display: table-row;
    }
    .badge-grid-label {
      display: table-cell;
      padding: 8px 0;
      font-size: 12px;
      color: #F85B1B;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 600;
      width: 40%;
    }
    .badge-grid-value {
      display: table-cell;
      padding: 8px 0;
      font-size: 14px;
      color: #D9450B;
      font-weight: 700;
      width: 60%;
    }
    .message-box {
      background-color: #f5f5f0;
      border-radius: 8px;
      padding: 20px;
      font-size: 15px;
      line-height: 1.6;
      color: #525252;
      border-left: 4px solid #b0a89e;
      margin-top: 15px;
    }
    .footer {
      background-color: #fcfcfc;
      padding: 30px 40px;
      border-top: 1px solid #e5e5e5;
      text-align: center;
      font-size: 11px;
      color: #a3a3a3;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="header-logo">OzInfra</h1>
        <p class="header-title">Lead Acquisition Portal</p>
      </div>
      <div class="content">
        <div class="section-title">Contact Details</div>
        <div class="grid">
          <div class="grid-row">
            <div class="grid-col-label">Lead Name:</div>
            <div class="grid-col-value">${sFullName}</div>
          </div>
          <div class="grid-row">
            <div class="grid-col-label">Email Address:</div>
            <div class="grid-col-value"><a href="mailto:${sEmail}" style="color: #F85B1B; text-decoration: none;">${sEmail}</a></div>
          </div>
          <div class="grid-row">
            <div class="grid-col-label">Phone Number:</div>
            <div class="grid-col-value">${sPhone}</div>
          </div>
        </div>

        <div class="section-title">Company Info</div>
        <div class="grid">
          <div class="grid-row">
            <div class="grid-col-label">Company Name:</div>
            <div class="grid-col-value">${sCompany || "Not provided (Optional)"}</div>
          </div>
          <div class="grid-row">
            <div class="grid-col-label">Job Title:</div>
            <div class="grid-col-value">${sTitle || "Not provided (Optional)"}</div>
          </div>
        </div>

        <div class="section-title">Project Scope</div>
        <div class="badge-wrapper">
          <div class="grid">
            <div class="badge-grid-row">
              <div class="badge-grid-label">Required Services:</div>
              <div class="badge-grid-value" style="line-height: 1.4;">${sServiceTypes}</div>
            </div>
            <div class="badge-grid-row">
              <div class="badge-grid-label">Budget Range:</div>
              <div class="badge-grid-value">${sBudget || "Flexible / Not specified"}</div>
            </div>
          </div>
        </div>

        ${
          sMessage
            ? `
          <div class="section-title">Additional Details</div>
          <div class="message-box">
            ${sMessage}
          </div>
        `
            : ""
        }
      </div>
      <div class="footer">
        <p>This inquiry request was generated securely by the OzInfra contact engine.</p>
        <p>&copy; ${new Date().getFullYear()} OzInfra Systems. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // 7. Forward request to Resend REST API
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New Project Inquiry: ${sBudget} from ${sFullName} (${sCompany || "Self"})`,
        html: emailHtml,
        reply_to: sEmail,
      }),
    });

    if (!resendResponse.ok) {
      let errorMessage = "Failed to submit form to delivery service.";
      try {
        const contentType = resendResponse.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await resendResponse.json();
          errorMessage = errorData.message || errorMessage;
        } else {
          errorMessage = await resendResponse.text();
        }
      } catch (e) {
        console.error("[OzInfra Contact API] Error parsing Resend response:", e);
      }
      console.error("[OzInfra Contact API] Resend API error:", errorMessage);
      return NextResponse.json({ error: errorMessage }, { status: resendResponse.status });
    }

    const jsonResponse = { success: true };

    // 8. Cache Idempotency Success response
    if (idempotencyKey) {
      idempotencyCache.set(idempotencyKey, {
        timestamp: now,
        response: jsonResponse,
      });
      // Clean cache of stale keys (> 5 minutes)
      for (const [k, v] of idempotencyCache.entries()) {
        if (now - v.timestamp > IDEMPOTENCY_TTL_MS) {
          idempotencyCache.delete(k);
        }
      }
    }

    return NextResponse.json(jsonResponse, { status: 200 });
  } catch (error) {
    console.error("[OzInfra Contact API] Internal server error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error occurred." },
      { status: 500 }
    );
  }
}
