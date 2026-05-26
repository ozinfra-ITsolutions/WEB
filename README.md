# OzInfra — Enterprise IT Solutions Website

An enterprise-grade marketing and contact website for OzInfra, built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **TypeScript**.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Framer Motion, GSAP, Three.js
- **Styling:** Tailwind CSS v4, CSS custom properties design system
- **Components:** Radix UI primitives, shadcn/ui
- **Forms:** React Hook Form, Zod, EmailJS
- **Language:** TypeScript 5.9

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

The dev server starts at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/             # Next.js App Router pages & layouts
│   ├── about/       # About page
│   ├── contact/     # Contact page with multi-step form
│   ├── privacy/     # Privacy policy
│   ├── services/    # Services page
│   ├── terms/       # Terms of service
│   ├── layout.tsx   # Root layout with metadata & JSON-LD
│   ├── page.tsx     # Homepage
│   ├── robots.ts    # Generated robots.txt
│   ├── sitemap.ts   # Generated sitemap.xml
│   └── globals.css  # Design system & global styles
├── components/      # Shared React components
│   ├── ui/          # shadcn/ui & custom UI components
│   ├── Navbar.tsx   # Responsive navigation with mobile menu
│   ├── Footer.tsx   # Footer with data stream animation
│   └── ...
├── sections/        # Homepage sections (Hero, Capabilities, etc.)
├── data/            # Static data (FAQs, etc.)
├── hooks/           # Custom React hooks
└── lib/             # Utilities, constants, contact form logic
```

## Key Features

- **Enterprise Design System** — HSL color tokens, typography scale, and component styles in `globals.css`
- **SEO Optimized** — Per-page metadata, JSON-LD schema, sitemap, robots.txt
- **Security Hardened** — CSP, HSTS, X-Frame-Options, and other security headers in `next.config.ts`
- **Accessible** — Skip navigation, ARIA attributes, keyboard navigation, reduced motion support
- **Multi-step Contact Form** — Client-side validation, rate limiting, and EmailJS integration
- **Premium Animations** — Framer Motion, WebGL particle fields, scroll-driven reveals

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```
