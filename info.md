# OzInfra Website — Project Info

Using Node.js 20+, Tailwind CSS v4.3, and Next.js 16

Tailwind CSS has been set up with the shadcn theme via `@theme` and CSS custom properties.

## Components (40+)
  accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb,
  button-group, button, calendar, card, carousel, chart, checkbox, collapsible,
  command, context-menu, dialog, drawer, dropdown-menu, empty, field, form,
  hover-card, input-group, input-otp, input, item, kbd, label, menubar,
  navigation-menu, pagination, popover, progress, radio-group, resizable,
  scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner,
  spinner, switch, table, tabs, textarea, toggle-group, toggle, tooltip

## Usage
  import { Button } from '@/components/ui/button'
  import { Card, CardHeader, CardTitle } from '@/components/ui/card'

## Structure
  src/app/             Next.js App Router pages & layouts
  src/sections/        Homepage sections (Hero, Capabilities, etc.)
  src/components/      Shared UI components
  src/hooks/           Custom React hooks
  src/data/            Static data files (FAQs, etc.)
  src/lib/             Utilities, constants, contact form logic
  src/app/globals.css  Design system & global styles
  src/app/layout.tsx   Root layout with metadata & JSON-LD
  next.config.ts       Next.js config with security headers
  tailwind.config.js   Configures Tailwind's theme, plugins, etc.
  postcss.config.mjs   PostCSS config for Tailwind v4