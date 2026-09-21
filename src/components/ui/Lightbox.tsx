"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiMaximize2,
  FiX,
  FiZoomIn,
  FiZoomOut,
} from "react-icons/fi";
import { EASE_OUT } from "@/lib/motion";
import type { Certificate } from "@/data/portfolio";

type Props = {
  items: Certificate[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

const ZOOM_STEPS = [1, 1.5, 2, 3] as const;
const MIN_ZOOM = ZOOM_STEPS[0];
const MAX_ZOOM = ZOOM_STEPS[ZOOM_STEPS.length - 1];

/**
 * Accessible certificate lightbox.
 *
 * - `role="dialog" aria-modal` with a labelled title
 * - Escape closes; ArrowLeft/ArrowRight navigate; +/- zoom
 * - Tab is trapped inside the dialog while open
 * - Focus moves to the close button on open and is restored by the caller
 * - The image uses object-fit: contain so the artwork is never cropped
 */
export default function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const open = index !== null;
  const item = open ? items[index] : null;

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState<number>(MIN_ZOOM);

  /**
   * The page's <main> element has its own stacking context (z-10), which would
   * trap this dialog beneath the fixed navbar. Portalling to <body> lifts the
   * modal out of that context so it reliably covers the whole page.
   */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasMultiple = items.length > 1;

  /* Reset zoom whenever a different certificate is shown. */
  useEffect(() => {
    setZoom(MIN_ZOOM);
  }, [index]);

  const goPrev = useCallback(() => {
    if (index === null || !hasMultiple) return;
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, hasMultiple, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (index === null || !hasMultiple) return;
    onNavigate((index + 1) % items.length);
  }, [index, hasMultiple, items.length, onNavigate]);

  const zoomIn = useCallback(
    () => setZoom((z) => Math.min(MAX_ZOOM, Number((z + 0.5).toFixed(2)))),
    []
  );
  const zoomOut = useCallback(
    () => setZoom((z) => Math.max(MIN_ZOOM, Number((z - 0.5).toFixed(2)))),
    []
  );

  /* Lock body scroll while the dialog is open. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* Move focus into the dialog once it mounts. */
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => closeRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  /* Keyboard handling, including a Tab focus trap. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          return;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          return;
        case "ArrowRight":
          e.preventDefault();
          goNext();
          return;
        case "+":
        case "=":
          e.preventDefault();
          zoomIn();
          return;
        case "-":
        case "_":
          e.preventDefault();
          zoomOut();
          return;
        case "0":
          e.preventDefault();
          setZoom(MIN_ZOOM);
          return;
      }

      if (e.key !== "Tab") return;

      // Trap Tab within the dialog.
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, goPrev, goNext, zoomIn, zoomOut]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="lightbox"
          className="fixed inset-0 z-[150] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          {/* Scrim — click to dismiss */}
          <button
            type="button"
            aria-label="Close certificate viewer"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md"
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            className="relative flex h-full w-full flex-col p-3 sm:p-5"
          >
            {/* ------------------------------ toolbar ----------------------------- */}
            <div className="glass-strong relative z-10 flex flex-wrap items-center gap-2 rounded-2xl px-3 py-2.5 sm:px-4">
              <div className="min-w-0 flex-1">
                <h2
                  id="lightbox-title"
                  className="truncate font-display text-[13px] font-bold text-ink-900 sm:text-sm"
                >
                  {item.title}
                </h2>
                <p className="truncate font-mono text-[10.5px] text-ink-500">
                  {item.issuer}
                  {item.date ? ` · ${item.date}` : ""}
                  {hasMultiple ? ` · ${index + 1} of ${items.length}` : ""}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  aria-label="Zoom out"
                  className="icon-btn h-9 w-9 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiZoomOut size={15} aria-hidden="true" />
                </button>

                <span
                  className="min-w-[3.1rem] text-center font-mono text-[11px] font-semibold text-ink-600"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {Math.round(zoom * 100)}%
                </span>

                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  aria-label="Zoom in"
                  className="icon-btn h-9 w-9 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <FiZoomIn size={15} aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => setZoom(MIN_ZOOM)}
                  disabled={zoom === MIN_ZOOM}
                  aria-label="Reset zoom to fit"
                  className="icon-btn hidden h-9 w-9 disabled:cursor-not-allowed disabled:opacity-40 xs:grid"
                >
                  <FiMaximize2 size={14} aria-hidden="true" />
                </button>

                {/* Local file, so a real download is possible */}
                <a
                  href={item.image}
                  download
                  aria-label={`Download ${item.title}`}
                  className="icon-btn hidden h-9 w-9 sm:grid"
                >
                  <FiDownload size={15} aria-hidden="true" />
                </a>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close certificate viewer"
                  className="ml-0.5 grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-white transition-colors hover:bg-slate-800"
                >
                  <FiX size={16} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* ------------------------------- stage ------------------------------ */}
            <div className="relative mt-3 flex min-h-0 flex-1 items-center justify-center">
              {hasMultiple && (
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous certificate"
                  className="absolute left-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-[rgb(var(--glass-border))] bg-surface/85 text-ink-700 shadow-glass backdrop-blur-md transition-transform hover:scale-105 sm:left-2"
                >
                  <FiChevronLeft size={20} aria-hidden="true" />
                </button>
              )}

              {/*
                Scroll container. The inner stage is sized as a percentage of
                the viewport area, so at zoom 1 the image fits entirely (never
                cropped) and above 1 the stage grows and becomes scrollable /
                pannable. Sizing the stage rather than transform-scaling the
                image keeps the scroll area correct at every zoom level.
              */}
              <div className="h-full w-full overflow-auto px-12 sm:px-16">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: `${zoom * 100}%`,
                    height: `${zoom * 100}%`,
                    minWidth: "100%",
                    minHeight: "100%",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={`${item.title} — issued by ${item.issuer}`}
                    width={item.width}
                    height={item.height}
                    className="lightbox-img rounded-xl bg-surface shadow-glass-lg"
                    draggable={false}
                  />
                </div>
              </div>

              {hasMultiple && (
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next certificate"
                  className="absolute right-0 z-10 grid h-11 w-11 place-items-center rounded-full border border-[rgb(var(--glass-border))] bg-surface/85 text-ink-700 shadow-glass backdrop-blur-md transition-transform hover:scale-105 sm:right-2"
                >
                  <FiChevronRight size={20} aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Keyboard hints, desktop only */}
            <p className="mt-2 hidden text-center font-mono text-[10.5px] text-white/75 sm:block">
              Esc close · ← → navigate · + − zoom · 0 reset
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
