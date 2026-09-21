"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Id of the element labelling the dialog. */
  labelledBy: string;
  children: ReactNode;
  /** Wrapper classes controlling where the panel sits. */
  className?: string;
  /** "sheet" slides from the right; "center" scales in place. */
  variant?: "sheet" | "center";
  /**
   * Element to focus when the dialog closes. Preferred over the previously
   * focused element, so focus return is deterministic even when the dialog was
   * opened programmatically (or by a click that did not move focus).
   */
  returnFocusTo?: React.RefObject<HTMLElement | null>;
};

/**
 * Reusable modal shell.
 *
 * Handles everything the accessible-dialog pattern needs so callers only supply
 * content: portalling out of the page's stacking context, a click-dismiss
 * scrim, Escape to close, body scroll lock, a Tab focus trap, initial focus,
 * and restoring focus to whatever was focused before opening.
 */
export default function DialogShell({
  open,
  onClose,
  labelledBy,
  children,
  className,
  variant = "center",
  returnFocusTo,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* Remember the trigger, then restore focus to it on close. */
  useEffect(() => {
    if (open) {
      restoreTo.current = document.activeElement as HTMLElement | null;
      return;
    }
    // An explicit trigger ref wins; otherwise fall back to whatever had focus.
    const el = returnFocusTo?.current ?? restoreTo.current;
    if (el && el !== document.body) {
      requestAnimationFrame(() => el.focus?.());
    }
  }, [open, returnFocusTo]);

  /* Lock page scroll while open. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Move focus into the panel. */
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const root = panelRef.current;
      if (!root) return;
      const first = root.querySelector<HTMLElement>(
        'input, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );
      (first ?? root).focus();
    }, 30);
    return () => clearTimeout(t);
  }, [open]);

  /* Escape to close, and trap Tab inside the panel. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const root = panelRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'input, button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (activeEl === first || !root.contains(activeEl))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  const isSheet = variant === "sheet";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[160]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: EASE_OUT }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-slate-950/40 dark:bg-slate-950/65 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            initial={
              isSheet ? { x: "100%" } : { opacity: 0, scale: 0.97, y: 8 }
            }
            animate={isSheet ? { x: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isSheet ? { x: "100%" } : { opacity: 0, scale: 0.98, y: 4 }}
            transition={
              isSheet
                ? { type: "spring", stiffness: 320, damping: 34 }
                : { duration: 0.22, ease: EASE_OUT }
            }
            className={className}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
