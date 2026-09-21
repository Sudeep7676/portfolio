"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiCopy,
  FiCornerDownLeft,
  FiDownload,
  FiExternalLink,
  FiFileText,
  FiGithub,
  FiHash,
  FiLinkedin,
  FiMail,
  FiSearch,
} from "react-icons/fi";
import DialogShell from "@/components/ui/DialogShell";
import { navLinks, profile, projects } from "@/data/portfolio";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Projects" | "Actions";
  icon: typeof FiHash;
  run: () => void | Promise<void>;
  /** Keeps the menu open so feedback can be shown (e.g. copy email). */
  keepOpen?: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  /** The button that opened the menu, so focus returns there on close. */
  triggerRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Compact command menu (Cmd/Ctrl + K).
 *
 * A convenience layer only — every action here is also reachable through a
 * visible control elsewhere on the page.
 */
export default function CommandMenu({ open, onClose, triggerRef }: Props) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const go = (href: string) => {
    onClose();
    // Let the dialog unmount and release the scroll lock before scrolling.
    requestAnimationFrame(() =>
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    );
  };

  const commands: Command[] = useMemo(() => {
    const nav: Command[] = navLinks.map((l) => ({
      id: `nav-${l.href}`,
      label: l.label,
      hint: `Section ${l.index}`,
      group: "Navigate",
      icon: FiHash,
      run: () => go(l.href),
    }));

    const proj: Command[] = projects.flatMap((p) => {
      const items: Command[] = [
        {
          id: `proj-${p.slug}-src`,
          label: `${p.title} — source`,
          hint: "GitHub",
          group: "Projects",
          icon: FiGithub,
          run: () => {
            window.open(p.repoUrl, "_blank", "noopener,noreferrer");
          },
        },
      ];
      if (p.liveUrl) {
        items.unshift({
          id: `proj-${p.slug}-live`,
          label: `${p.title} — live demo`,
          hint: "Opens in a new tab",
          group: "Projects",
          icon: FiExternalLink,
          run: () => {
            window.open(p.liveUrl!, "_blank", "noopener,noreferrer");
          },
        });
      }
      return items;
    });

    const actions: Command[] = [
      {
        id: "act-resume-view",
        label: "View resume",
        hint: "Opens in a new tab",
        group: "Actions",
        icon: FiFileText,
        run: () => {
            window.open(profile.resume, "_blank", "noopener,noreferrer");
          },
      },
      {
        id: "act-resume-dl",
        label: "Download resume",
        hint: profile.resumeFileName,
        group: "Actions",
        icon: FiDownload,
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = profile.resumeFileName;
          a.click();
        },
      },
      {
        id: "act-copy-email",
        label: "Copy email address",
        hint: profile.email,
        group: "Actions",
        icon: copied ? FiCheck : FiCopy,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* Clipboard unavailable. */
          }
        },
      },
      {
        id: "act-email",
        label: "Send an email",
        hint: profile.email,
        group: "Actions",
        icon: FiMail,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "act-github",
        label: "Open GitHub profile",
        hint: profile.githubHandle,
        group: "Actions",
        icon: FiGithub,
        run: () => {
            window.open(profile.github, "_blank", "noopener,noreferrer");
          },
      },
      {
        id: "act-linkedin",
        label: "Open LinkedIn profile",
        hint: profile.linkedinHandle,
        group: "Actions",
        icon: FiLinkedin,
        run: () => {
            window.open(profile.linkedin, "_blank", "noopener,noreferrer");
          },
      },
    ];

    return [...nav, ...proj, ...actions];
    // `go` and `onClose` are stable enough for this menu's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copied]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  /* Keep the highlighted row in range as the list narrows. */
  useEffect(() => {
    setCursor(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setCursor(0);
    }
  }, [open]);

  /* Scroll the active option into view. */
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${cursor}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const runAt = (i: number) => {
    const cmd = filtered[i];
    if (!cmd) return;
    if (!cmd.keepOpen) onClose();
    void cmd.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runAt(cursor);
    }
  };

  /** Render order with group separators. */
  let lastGroup = "";

  return (
    <DialogShell
      open={open}
      onClose={onClose}
      labelledBy="cmdk-title"
      variant="center"
      returnFocusTo={triggerRef}
      className="absolute left-1/2 top-[12vh] w-[min(34rem,92vw)] -translate-x-1/2 overflow-hidden rounded-2xl bg-pearl-100 shadow-glass-lg"
    >
      <h2 id="cmdk-title" className="sr-only">
        Command menu
      </h2>

      {/* search */}
      <div className="rule-b flex items-center gap-3 px-4 py-3">
        <FiSearch size={16} className="shrink-0 text-ink-400" aria-hidden="true" />
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmdk-list"
          aria-activedescendant={
            filtered[cursor] ? `cmdk-opt-${filtered[cursor].id}` : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
          placeholder="Search sections, projects and actions…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-[14px] text-ink-900 outline-none placeholder:text-ink-400"
        />
        <kbd className="hidden shrink-0 rounded border border-pearl-500 bg-surface px-1.5 py-0.5 font-mono text-[10px] text-ink-500 sm:block">
          Esc
        </kbd>
      </div>

      {/* results */}
      <ul
        ref={listRef}
        id="cmdk-list"
        role="listbox"
        aria-label="Commands"
        className="max-h-[52vh] overflow-y-auto p-2"
      >
        {filtered.length === 0 && (
          <li className="px-3 py-6 text-center text-[13px] text-ink-500">
            No matches for &ldquo;{query}&rdquo;
          </li>
        )}

        {filtered.map((cmd, i) => {
          const showGroup = cmd.group !== lastGroup;
          lastGroup = cmd.group;
          const isActive = i === cursor;

          return (
            <li key={cmd.id}>
              {showGroup && (
                <p className="annot px-3 pb-1 pt-3 first:pt-1">{cmd.group}</p>
              )}
              <div
                id={`cmdk-opt-${cmd.id}`}
                role="option"
                aria-selected={isActive}
                data-index={i}
              >
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseMove={() => setCursor(i)}
                  onClick={() => runAt(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
                    isActive ? "bg-accent-500/10" : "hover:bg-surface/70"
                  }`}
                >
                  <cmd.icon
                    size={14}
                    className={`shrink-0 ${
                      isActive ? "text-accent-700 dark:text-accent-300" : "text-ink-400"
                    }`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-ink-900">
                      {cmd.label}
                    </span>
                    <span className="block truncate font-mono text-[11px] text-ink-500">
                      {cmd.hint}
                    </span>
                  </span>
                  {isActive && (
                    <FiCornerDownLeft
                      size={13}
                      className="shrink-0 text-accent-600 dark:text-accent-300"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* footer */}
      <div className="rule-t flex items-center justify-between gap-3 bg-surface/70 px-4 py-2.5">
        <span className="annot">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </span>
        <span className="hidden items-center gap-3 sm:flex">
          <span className="annot flex items-center gap-1">
            <FiArrowRight size={10} className="rotate-90" aria-hidden="true" />
            Navigate
          </span>
          <span className="annot flex items-center gap-1">
            <FiCornerDownLeft size={10} aria-hidden="true" />
            Select
          </span>
        </span>
      </div>

      <span aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </DialogShell>
  );
}
