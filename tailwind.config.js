/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        oz: {
          primary: "var(--oz-primary)",
          "primary-hover": "var(--oz-primary-hover)",
          "primary-light": "var(--oz-primary-light)",
          bg: "var(--oz-bg)",
          surface: "var(--oz-surface)",
          black: "var(--oz-black)",
          white: "var(--oz-white)",
          text: "var(--oz-text)",
          "text-secondary": "var(--oz-text-secondary)",
          muted: "var(--oz-text-muted)",
          warmgray: "var(--oz-text-warmgray)",
          border: "var(--oz-border)",
          "border-light": "var(--oz-border-light)",
        },
        // Keep legacy oz-orange/oz-gray refs working → point to same vars
        "oz-orange": "var(--oz-primary)",
        "oz-bg": "var(--oz-bg)",
        "oz-surface": "var(--oz-surface)",
        "oz-black": "var(--oz-black)",
        "oz-gray": "var(--oz-text-secondary)",
        "oz-warmgray": "var(--oz-text-warmgray)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        space: ['"Space Grotesk"', "sans-serif"],
        body: ['"Inter"', '"Space Grotesk"', "sans-serif"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 30s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
