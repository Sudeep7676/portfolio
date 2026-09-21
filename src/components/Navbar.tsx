"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCommand,
  FiDownload,
  FiMenu,
  FiSearch,
  FiUser,
  FiX,
} from "react-icons/fi";
import { EASE_OUT } from "@/lib/motion";
import { navLinks, profile } from "@/data/portfolio";
import QuickView from "@/components/ui/QuickView";
import CommandMenu from "@/components/ui/CommandMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [isMac, setIsMac] = useState(false);

  /* Trigger refs so each dialog can hand focus back deterministically. */
  const quickBtnRef = useRef<HTMLButtonElement | null>(null);
  const cmdBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform ?? navigator.userAgent));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 140) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy on whichever section owns the upper third of the viewport. */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.05, 0.2, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  /* Cmd/Ctrl + K opens the command menu. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMenuOpen(false);
        setCmdOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.34, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl px-3 transition-all duration-300 ease-expo-out sm:px-4 ${
            scrolled ? "glass py-2" : "border border-transparent py-3"
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Back to top"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-600 text-white">
              <span className="font-display text-[12px] font-bold">
                {profile.initials}
              </span>
            </span>
            <span className="hidden text-left leading-tight xs:block">
              <span className="block font-display text-[13px] font-bold text-ink-900">
                {profile.shortName}
              </span>
              <span className="annot block">Java Full Stack</span>
            </span>
          </button>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <button
                    onClick={() => go(link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-accent-700 dark:text-accent-300"
                        : "text-ink-600 hover:text-ink-900"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-accent-500/10"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            {/* Visible entry point for the command menu */}
            <button
              ref={cmdBtnRef}
              onClick={() => setCmdOpen(true)}
              aria-label="Open command menu"
              className="icon-btn hidden h-9 items-center gap-2 !px-2.5 md:inline-flex"
            >
              <FiSearch size={14} aria-hidden="true" />
              <kbd className="flex items-center gap-0.5 font-mono text-[10px] text-ink-500">
                {isMac ? <FiCommand size={9} aria-hidden="true" /> : "Ctrl"}K
              </kbd>
            </button>

            {/* Direct resume download, always one click away */}
            <a
              href={profile.resume}
              download={profile.resumeFileName}
              aria-label="Download resume as PDF"
              className="icon-btn hidden h-9 items-center gap-1.5 !px-2.5 text-[12.5px] font-semibold sm:inline-flex"
            >
              <FiDownload size={14} aria-hidden="true" />
              CV
            </a>

            <ThemeToggle className="h-9 w-9" />

            <button
              ref={quickBtnRef}
              onClick={() => setQuickOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-600 px-3.5 py-2 text-[13px] font-semibold text-white shadow-lift transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-700"
            >
              <FiUser size={14} aria-hidden="true" />
              Quick View
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="icon-btn h-10 w-10 lg:hidden"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close menu"
              tabIndex={-1}
              className="absolute inset-0 cursor-default bg-slate-950/40 dark:bg-slate-950/65 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="glass-strong absolute inset-y-0 right-0 flex w-[17.5rem] max-w-[86vw] flex-col p-6 pt-24"
            >
              <p className="annot mb-5">Navigate</p>
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i + 0.05, ease: EASE_OUT }}
                  >
                    <button
                      onClick={() => go(link.href)}
                      className={`flex w-full items-baseline gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                        active === link.href
                          ? "bg-accent-500/10 text-accent-700 dark:text-accent-300"
                          : "text-ink-700 hover:bg-surface/70"
                      }`}
                    >
                      <span className="font-mono text-[10.5px] text-accent-500">
                        {link.index}
                      </span>
                      <span className="font-display text-[15px] font-semibold">
                        {link.label}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-2">
                <a
                  href={profile.resume}
                  download={profile.resumeFileName}
                  onClick={() => setMenuOpen(false)}
                  className="btn-secondary w-full !py-2.5 text-[13px]"
                >
                  <FiDownload size={14} aria-hidden="true" />
                  Download Resume
                </a>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setCmdOpen(true);
                  }}
                  className="btn-secondary w-full !py-2.5 text-[13px]"
                >
                  <FiSearch size={14} aria-hidden="true" />
                  Command menu
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    setQuickOpen(true);
                  }}
                  className="btn-primary w-full !py-2.5 text-[13px]"
                >
                  <FiUser size={14} aria-hidden="true" />
                  Quick View
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <QuickView
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
        triggerRef={quickBtnRef}
      />
      <CommandMenu
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        triggerRef={cmdBtnRef}
      />
    </>
  );
}
