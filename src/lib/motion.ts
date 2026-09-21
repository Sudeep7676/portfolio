import type { Variants, Transition } from "framer-motion";

/** Shared easing curve — a soft "expo out" used across the whole site. */
export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.6, ease: EASE_OUT },
  }),
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.07, duration: 0.7, ease: EASE_OUT },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.55, ease: EASE_OUT },
  }),
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

/** Word-by-word reveal used for headings. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "58%", rotateX: -35 },
  visible: {
    opacity: 1,
    y: "0%",
    rotateX: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

/**
 * Parent wrapper for `wordReveal`. The stagger must live on a parent
 * `variants` object — framer-motion does not orchestrate children from a
 * bare `transition` prop.
 */
export const wordRevealParent = (stagger = 0.05, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Standard viewport config so sections animate once, slightly before entry. */
export const viewportOnce = { once: true, margin: "-70px" } as const;

/**
 * Accent tokens for the light theme. Values are literal class strings so
 * Tailwind can see them (src/lib is in the content globs, plus safelisted).
 */
export const accentMap = {
  blue: {
    text: "text-accent-700 dark:text-accent-300",
    softText: "text-accent-600 dark:text-accent-300",
    border: "border-accent-500/25",
    hoverBorder: "hover:border-accent-500/40",
    bg: "bg-accent-500/10",
    ring: "ring-accent-200",
    from: "from-accent-500",
    to: "to-indigo-500",
    dot: "bg-accent-600",
  },
  violet: {
    text: "text-violet-700 dark:text-violet-300",
    softText: "text-violet-600 dark:text-violet-300",
    border: "border-violet-500/25",
    hoverBorder: "hover:border-violet-500/40",
    bg: "bg-violet-500/10",
    ring: "ring-violet-200",
    from: "from-violet-500",
    to: "to-fuchsia-500",
    dot: "bg-violet-600",
  },
  emerald: {
    text: "text-emerald-700 dark:text-emerald-300",
    softText: "text-emerald-600 dark:text-emerald-300",
    border: "border-emerald-500/25",
    hoverBorder: "hover:border-emerald-500/40",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-200",
    from: "from-emerald-500",
    to: "to-teal-500",
    dot: "bg-emerald-600",
  },
  amber: {
    text: "text-amber-700 dark:text-amber-300",
    softText: "text-amber-600 dark:text-amber-300",
    border: "border-amber-500/25",
    hoverBorder: "hover:border-amber-500/40",
    bg: "bg-amber-500/10",
    ring: "ring-amber-200",
    from: "from-amber-500",
    to: "to-orange-500",
    dot: "bg-amber-600",
  },
  sky: {
    text: "text-sky-700 dark:text-sky-300",
    softText: "text-sky-600 dark:text-sky-300",
    border: "border-sky-500/25",
    hoverBorder: "hover:border-sky-500/40",
    bg: "bg-sky-500/10",
    ring: "ring-sky-200",
    from: "from-sky-500",
    to: "to-blue-500",
    dot: "bg-sky-600",
  },
} as const;

export type Accent = keyof typeof accentMap;
