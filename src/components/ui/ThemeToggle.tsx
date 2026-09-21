"use client";

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

type Theme = "light" | "dark";

/** Shared with the inline boot script in layout.tsx. */
const STORAGE_KEY = "sv:theme";

function apply(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

/**
 * Light / dark switch.
 *
 * The initial class is set by a blocking inline script in the document head, so
 * this component only needs to read the resolved state after mount — that keeps
 * the server and client markup identical and avoids a flash of the wrong theme.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  /* Follow the OS only while the visitor has not made an explicit choice. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const next: Theme = e.matches ? "dark" : "light";
      setTheme(next);
      apply(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Storage blocked — the choice just will not persist. */
    }
  };

  const label =
    mounted && theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={mounted ? theme === "dark" : undefined}
      className={`icon-btn relative overflow-hidden ${className ?? ""}`}
    >
      {/*
        Both icons render; visibility is driven by the `dark` class rather than
        React state so the correct one shows on first paint.
      */}
      <FiSun size={16} aria-hidden="true" className="block dark:hidden" />
      <FiMoon size={16} aria-hidden="true" className="hidden dark:block" />
    </button>
  );
}
