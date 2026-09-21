import type { Config } from "tailwindcss";

const config: Config = {
  /* Theme is toggled by a `.dark` class on <html>, not by media query. */
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // accentMap in src/lib holds colour class names; src/data holds content.
    "./src/lib/**/*.{js,ts,jsx,tsx}",
    "./src/data/**/*.{js,ts,jsx,tsx}",
  ],
  // Accent classes are assembled from a lookup table, so a few can slip past
  // static analysis. Keep every accent variant in the build.
  safelist: [
    { pattern: /^(from|to|via)-(blue|indigo|violet|sky|emerald|teal|amber)-(400|500|600)$/ },
    { pattern: /^text-(blue|indigo|violet|sky|emerald|teal|amber)-(600|700)$/ },
    { pattern: /^bg-(blue|indigo|violet|sky|emerald|teal|amber)-(50|100)$/ },
    { pattern: /^border-(blue|indigo|violet|sky|emerald|teal|amber)-(200|300)$/, variants: ["hover"] },
    { pattern: /^ring-(blue|indigo|violet|sky|emerald|teal|amber)-(200|300)$/ },
  ],
  theme: {
    extend: {
      colors: {
        /*
         * Both ramps read from CSS variables defined in globals.css, which the
         * `.dark` class re-points. `<alpha-value>` keeps opacity modifiers
         * (e.g. `bg-pearl-400/60`) working.
         */
        pearl: {
          50: "rgb(var(--pearl-50) / <alpha-value>)",
          100: "rgb(var(--pearl-100) / <alpha-value>)",
          200: "rgb(var(--pearl-200) / <alpha-value>)",
          300: "rgb(var(--pearl-300) / <alpha-value>)",
          400: "rgb(var(--pearl-400) / <alpha-value>)",
          500: "rgb(var(--pearl-500) / <alpha-value>)",
        },
        ink: {
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
          500: "rgb(var(--ink-500) / <alpha-value>)",
          400: "rgb(var(--ink-400) / <alpha-value>)",
        },
        /* Neutral card fill that inverts in dark mode. */
        surface: "rgb(var(--surface) / <alpha-value>)",
        accent: {
          50: "#EFF5FF",
          100: "#DBE8FE",
          200: "#BFD6FE",
          300: "#93BBFD",
          400: "#609AFA",
          500: "#3B7BF6",
          600: "#2563EB",
          700: "#1D4FD8",
          800: "#1E45AF",
        },
        lavender: {
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "Sora", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      screens: {
        xs: "400px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      backdropBlur: {
        glass: "20px",
        "glass-lg": "24px",
      },
      boxShadow: {
        // Layered, soft shadows tuned for a light background
        glass:
          "0 1px 0 0 rgba(255,255,255,0.9) inset, 0 1px 2px rgba(15,23,42,0.04), 0 8px 24px -8px rgba(15,23,42,0.10), 0 24px 48px -20px rgba(15,23,42,0.12)",
        "glass-lg":
          "0 1px 0 0 rgba(255,255,255,0.95) inset, 0 2px 4px rgba(15,23,42,0.04), 0 16px 40px -12px rgba(15,23,42,0.14), 0 40px 72px -28px rgba(15,23,42,0.16)",
        "glass-sm":
          "0 1px 0 0 rgba(255,255,255,0.85) inset, 0 1px 2px rgba(15,23,42,0.05), 0 6px 16px -6px rgba(15,23,42,0.10)",
        lift: "0 20px 44px -16px rgba(37,99,235,0.28)",
        "accent-ring": "0 0 0 1px rgba(37,99,235,0.18), 0 12px 32px -12px rgba(37,99,235,0.35)",
      },
      animation: {
        "gradient-pan": "gradient-pan 12s ease infinite",
        "spin-slow": "spin 18s linear infinite",
        drift: "drift 22s ease-in-out infinite",
        "drift-slow": "drift 32s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        caret: "caret 1.05s step-end infinite",
        "pulse-ring": "pulse-ring 2.4s ease-out infinite",
      },
      keyframes: {
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(3%, -5%, 0) scale(1.07)" },
          "66%": { transform: "translate3d(-4%, 3%, 0) scale(0.96)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        caret: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "70%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
