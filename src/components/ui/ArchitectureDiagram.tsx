"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCornerDownRight, FiInfo } from "react-icons/fi";
import { EASE_OUT } from "@/lib/motion";
import type { ArchNode, Architecture } from "@/data/portfolio";

/** Per-kind tinting so the layers read at a glance. */
const KIND_STYLE: Record<ArchNode["kind"], string> = {
  client: "text-sky-700 dark:text-sky-300",
  web: "text-accent-700 dark:text-accent-300",
  domain: "text-emerald-700 dark:text-emerald-300",
  data: "text-violet-700 dark:text-violet-300",
  external: "text-amber-700 dark:text-amber-300",
};

const KIND_LABEL: Record<ArchNode["kind"], string> = {
  client: "Client",
  web: "Web layer",
  domain: "Domain",
  data: "Data",
  external: "External",
};

type Props = {
  architecture: Architecture;
  /** Used to scope element ids when several diagrams exist on one page. */
  idPrefix: string;
};

/**
 * Layered architecture diagram.
 *
 * Built from HTML buttons rather than raw SVG so every node is natively
 * focusable, announceable and responsive. Lanes are columns on desktop and
 * stack into labelled rows on mobile. Selecting a node reveals what that piece
 * is responsible for; arrow keys move between nodes.
 */
export default function ArchitectureDiagram({ architecture, idPrefix }: Props) {
  const { caption, laneLabels, nodes, notes } = architecture;
  const [selected, setSelected] = useState<string | null>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  /** Nodes bucketed by lane, preserving their declared order. */
  const lanes = useMemo(
    () =>
      laneLabels.map((label, i) => ({
        label,
        items: nodes.filter((n) => n.lane === i),
      })),
    [laneLabels, nodes]
  );

  const active = nodes.find((n) => n.id === selected) ?? null;
  const panelId = `${idPrefix}-arch-panel`;

  /** Flat traversal order for arrow-key movement. */
  const order = useMemo(
    () => lanes.flatMap((l) => l.items.map((n) => n.id)),
    [lanes]
  );

  const move = (from: string, delta: number) => {
    const i = order.indexOf(from);
    if (i === -1) return;
    const next = order[(i + delta + order.length) % order.length];
    nodeRefs.current[next]?.focus();
    setSelected(next);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, id: string) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        move(id, 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        move(id, -1);
        break;
      case "Escape":
        if (selected) {
          e.preventDefault();
          setSelected(null);
        }
        break;
    }
  };

  return (
    <div className="glass rounded-3xl p-4 sm:p-6">
      {/* Caption doubles as the diagram's accessible description */}
      <p id={`${idPrefix}-arch-caption`} className="sr-only">
        {caption}
      </p>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="annot-accent">Request flow</p>
          <p className="pretty mt-1.5 max-w-lg text-[12.5px] leading-relaxed text-ink-600">
            {caption}
          </p>
        </div>
        <span className="annot hidden shrink-0 sm:block">Fig. 02</span>
      </div>

      {/* ------------------------------- lanes ------------------------------- */}
      <div
        role="group"
        aria-labelledby={`${idPrefix}-arch-caption`}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {lanes.map((lane, li) => (
          <div key={lane.label} className="relative">
            <div className="rule-b mb-2.5 flex items-baseline justify-between pb-1.5">
              <span className="annot">{lane.label}</span>
              <span className="annot text-ink-400">
                {String(li + 1).padStart(2, "0")}
              </span>
            </div>

            <ul className="space-y-2">
              {lane.items.map((node) => {
                const isActive = selected === node.id;
                return (
                  <li key={node.id} className="relative">
                    <button
                      ref={(el) => {
                        nodeRefs.current[node.id] = el;
                      }}
                      type="button"
                      onClick={() => setSelected(isActive ? null : node.id)}
                      onKeyDown={(e) => onKeyDown(e, node.id)}
                      aria-pressed={isActive}
                      aria-controls={panelId}
                      className="arch-node"
                    >
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-semibold text-ink-900">
                          {node.label}
                        </span>
                        <span
                          className={`shrink-0 font-mono text-[9.5px] uppercase tracking-wider ${
                            KIND_STYLE[node.kind]
                          }`}
                        >
                          {KIND_LABEL[node.kind]}
                        </span>
                      </span>
                      {node.tech && (
                        <span className="mt-0.5 block font-mono text-[10.5px] text-ink-500">
                          {node.tech}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Flow connector to the next lane (desktop only) */}
            {li < lanes.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-[11px] top-[42px] hidden text-ink-300 lg:block"
              >
                <FiCornerDownRight size={13} />
              </span>
            )}
          </div>
        ))}
      </div>

      {/* --------------------------- responsibility -------------------------- */}
      <div
        id={panelId}
        aria-live="polite"
        className="mt-4 min-h-[4.5rem] rounded-2xl border border-pearl-400 bg-surface/55 p-4"
      >
        <AnimatePresence mode="wait" initial={false}>
          {active ? (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
            >
              <p className="flex items-center gap-2 font-display text-[13px] font-bold text-ink-900">
                <span className={KIND_STYLE[active.kind]}>
                  <FiInfo size={13} aria-hidden="true" />
                </span>
                {active.label}
                <span className="annot font-normal">
                  {KIND_LABEL[active.kind]}
                </span>
              </p>
              <p className="pretty mt-1.5 text-[13px] leading-relaxed text-ink-600">
                {active.responsibility}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="text-[13px] leading-relaxed text-ink-500"
            >
              Select any box above to read what that part of the system is
              responsible for. Arrow keys move between them.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {notes.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {notes.map((note, i) => (
            <li
              key={i}
              className="pretty flex gap-2 text-[12px] leading-relaxed text-ink-500"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-ink-400" />
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
