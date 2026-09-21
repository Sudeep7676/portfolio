"use client";

import { useState } from "react";
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiX,
} from "react-icons/fi";
import DialogShell from "@/components/ui/DialogShell";
import {
  education,
  experiences,
  profile,
  projects,
  skillGroupMeta,
  skills,
} from "@/data/portfolio";

type Props = {
  open: boolean;
  onClose: () => void;
  /** The button that opened the panel, so focus returns there on close. */
  triggerRef?: React.RefObject<HTMLElement | null>;
};

/**
 * Recruiter Quick View — a condensed, scannable summary in a side sheet.
 * Every fact here is read from portfolio.ts, so it cannot drift from the page.
 */
export default function QuickView({ open, onClose, triggerRef }: Props) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable — the address is shown as a mailto link too. */
    }
  };

  /** Lead with the groups a hiring manager scans first. */
  const headlineSkills = skillGroupMeta
    .filter((g) => g.name === "Languages" || g.name === "Backend")
    .flatMap((g) => skills.filter((s) => s.group === g.name).map((s) => s.name));

  return (
    <DialogShell
      open={open}
      onClose={onClose}
      labelledBy="quickview-title"
      variant="sheet"
      returnFocusTo={triggerRef}
      className="absolute inset-y-0 right-0 flex w-full max-w-[30rem] flex-col bg-pearl-100 shadow-glass-lg"
    >
      {/* header */}
      <div className="rule-b flex items-start justify-between gap-4 px-6 py-5">
        <div>
          <p className="annot-accent mb-1.5">Quick View</p>
          <h2
            id="quickview-title"
            className="font-display text-xl font-extrabold tracking-tightest text-ink-900"
          >
            {profile.name}
          </h2>
          <p className="mt-0.5 text-[13px] font-semibold text-accent-700 dark:text-accent-300">
            {profile.title}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-900 text-white transition-colors hover:bg-slate-800"
        >
          <FiX size={16} aria-hidden="true" />
        </button>
      </div>

      {/* scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <section>
          <p className="annot mb-2">Summary</p>
          <p className="pretty text-[13.5px] leading-relaxed text-ink-600">
            {profile.objective}
          </p>
        </section>

        <section className="mt-7">
          <p className="annot mb-2.5">Key technical skills</p>
          <ul className="flex flex-wrap gap-1.5">
            {headlineSkills.map((name) => (
              <li key={name} className="chip">
                {name}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7">
          <p className="annot mb-2.5">Featured projects</p>
          <ul className="space-y-2.5">
            {projects.map((p) => (
              <li
                key={p.slug}
                className="rounded-2xl border border-pearl-400 bg-surface/70 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[13.5px] font-bold text-ink-900">
                      {p.title}
                    </h3>
                    <p className="mt-0.5 text-[12px] text-ink-500">
                      {p.subtitle}
                    </p>
                  </div>
                  <span className="annot shrink-0">{p.period}</span>
                </div>
                <p className="pretty mt-2 text-[12.5px] leading-relaxed text-ink-600">
                  {p.blurb}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent-700 dark:text-accent-300 hover:text-accent-800 dark:text-accent-200"
                    >
                      <FiExternalLink size={12} aria-hidden="true" />
                      Live demo
                    </a>
                  )}
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ink-500 hover:text-accent-700 dark:text-accent-300"
                  >
                    <FiGithub size={12} aria-hidden="true" />
                    Source
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7">
          <p className="annot mb-2.5">Experience</p>
          <ul className="space-y-3">
            {experiences.map((e) => (
              <li key={`${e.role}-${e.company}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-[13px] font-bold text-ink-900">
                    {e.role}
                  </h3>
                  <span className="annot">{e.period}</span>
                </div>
                <p className="text-[12.5px] text-ink-600">
                  {e.company}
                  {e.location ? ` · ${e.location}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7">
          <p className="annot mb-2.5">Education</p>
          <ul className="space-y-3">
            {education.map((ed) => (
              <li key={ed.degree}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="text-[13px] font-bold text-ink-900">
                    {ed.degree}
                  </h3>
                  <span className="annot">{ed.grade}</span>
                </div>
                <p className="text-[12.5px] text-ink-600">{ed.institution}</p>
                <p className="annot mt-0.5">{ed.period}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-7">
          <p className="annot mb-2.5">Contact</p>
          <ul className="space-y-1.5 text-[13px]">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="break-all text-ink-700 hover:text-accent-700 dark:text-accent-300"
              >
                {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.phoneHref}
                className="text-ink-700 hover:text-accent-700 dark:text-accent-300"
              >
                {profile.phone}
              </a>
            </li>
            <li className="flex gap-3 pt-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-600 hover:text-accent-700 dark:text-accent-300"
              >
                <FiGithub size={13} aria-hidden="true" />
                GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-600 hover:text-accent-700 dark:text-accent-300"
              >
                <FiLinkedin size={13} aria-hidden="true" />
                LinkedIn
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* sticky actions */}
      <div className="rule-t flex flex-wrap items-center gap-2 bg-surface/70 px-6 py-4 backdrop-blur-sm">
        <a
          href={profile.resume}
          download={profile.resumeFileName}
          className="btn-primary flex-1 !px-4 !py-2.5 text-[13px]"
        >
          <FiDownload size={14} aria-hidden="true" />
          Resume
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="btn-secondary !px-4 !py-2.5 text-[13px]"
        >
          <FiMail size={14} aria-hidden="true" />
          Email
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="btn-secondary !px-3 !py-2.5 text-[13px]"
        >
          {copied ? (
            <FiCheck size={14} aria-hidden="true" />
          ) : (
            <FiCopy size={14} aria-hidden="true" />
          )}
          <span className="sr-only">Copy email address</span>
        </button>
        <span aria-live="polite" className="sr-only">
          {copied ? "Email address copied to clipboard" : ""}
        </span>
        <a
          href="#projects"
          onClick={onClose}
          className="btn-secondary !px-4 !py-2.5 text-[13px]"
        >
          Projects
          <FiArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </DialogShell>
  );
}
