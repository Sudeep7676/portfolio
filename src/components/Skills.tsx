"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiAward,
  FiBriefcase,
  FiCornerDownRight,
  FiFolder,
  FiInfo,
} from "react-icons/fi";
import { accentMap, EASE_OUT, viewportOnce } from "@/lib/motion";
import { skillGroupMeta, skills, type Skill, type SkillUsage } from "@/data/portfolio";

const KIND_ICON = {
  project: FiFolder,
  experience: FiBriefcase,
  certification: FiAward,
} as const;

const KIND_LABEL = {
  project: "Project",
  experience: "Experience",
  certification: "Certification",
} as const;

function UsageCard({ usage }: { usage: SkillUsage }) {
  const Icon = KIND_ICON[usage.kind];
  return (
    <li className="rounded-2xl border border-pearl-400 bg-surface/60 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-500/25 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-700 dark:text-accent-300">
          <Icon size={10} aria-hidden="true" />
          {KIND_LABEL[usage.kind]}
        </span>
        {usage.href ? (
          <a
            href={usage.href}
            className="text-[13px] font-semibold text-ink-900 underline decoration-accent-300 decoration-2 underline-offset-2 transition-colors hover:text-accent-700 dark:text-accent-300"
          >
            {usage.context}
          </a>
        ) : (
          <span className="text-[13px] font-semibold text-ink-900">
            {usage.context}
          </span>
        )}
      </div>
      <p className="pretty mt-2 flex gap-2 text-[13px] leading-relaxed text-ink-600">
        <FiCornerDownRight
          size={12}
          className="mt-[4px] shrink-0 text-ink-400"
          aria-hidden="true"
        />
        {usage.detail}
      </p>
    </li>
  );
}

export default function Skills() {
  /** `null` means "show all" — the default, stable state. */
  const [active, setActive] = useState<string | null>(null);

  const activeSkill: Skill | null = useMemo(
    () => skills.find((s) => s.name === active) ?? null,
    [active]
  );

  return (
    <section id="skills" className="section-shell relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Editorial opener */}
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="annot-accent mb-4">01 — Stack explorer</p>
            <h2 className="display-lg text-ink-900">
              Every technology,
              <br />
              <span className="text-gradient">traced to real work.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="pretty text-[15px] leading-relaxed text-ink-600">
              Select any technology to see exactly where I used it and what I
              built with it. Where a skill sits on my resume without a shipped
              project behind it, I say so rather than inventing a link.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          {/* ------------------------------ the stack ----------------------------- */}
          <div className="lg:col-span-7">
            <div className="rule-b mb-5 flex flex-wrap items-center justify-between gap-3 pb-3">
              <p className="annot">
                {skills.length} technologies · {skillGroupMeta.length} groups
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-pressed={active === null}
                className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-colors duration-200 ${
                  active === null
                    ? "border-accent-500 bg-accent-500/10 text-accent-700 dark:text-accent-300"
                    : "border-pearl-500 bg-surface/70 text-ink-600 hover:border-accent-500/40 hover:text-ink-900"
                }`}
              >
                Show all
              </button>
            </div>

            <div className="space-y-6">
              {skillGroupMeta.map((group, gi) => {
                const tone = accentMap[group.accent];
                const items = skills.filter((s) => s.group === group.name);

                return (
                  <motion.div
                    key={group.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{
                      duration: 0.3,
                      delay: gi * 0.04,
                      ease: EASE_OUT,
                    }}
                  >
                    <div className="mb-2.5 flex items-baseline gap-2.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${tone.dot}`}
                        aria-hidden="true"
                      />
                      <h3 className="font-display text-[14px] font-bold text-ink-900">
                        {group.name}
                      </h3>
                      <span className="annot">{group.caption}</span>
                    </div>

                    {/*
                      Buttons keep their position regardless of selection, so
                      choosing a technology never reflows the list.
                    */}
                    <ul className="flex flex-wrap gap-2">
                      {items.map((skill) => {
                        const isActive = active === skill.name;
                        const isDimmed = active !== null && !isActive;
                        return (
                          <li key={skill.name}>
                            <button
                              type="button"
                              onClick={() =>
                                setActive(isActive ? null : skill.name)
                              }
                              aria-pressed={isActive}
                              aria-controls="skill-detail"
                              className={`rounded-xl border px-3 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                                isActive
                                  ? "border-accent-500 bg-accent-500/10 text-accent-700 dark:text-accent-300 shadow-glass-sm"
                                  : isDimmed
                                  ? "border-pearl-400 bg-surface/45 text-ink-400 hover:border-accent-500/40 hover:text-ink-700"
                                  : "border-pearl-500 bg-surface/75 text-ink-700 hover:border-accent-500/40 hover:text-ink-900"
                              }`}
                            >
                              {skill.name}
                              {skill.usages.length > 0 && (
                                <span className="ml-1.5 font-mono text-[10px] text-ink-400">
                                  {skill.usages.length}
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ----------------------------- detail panel --------------------------- */}
          <div className="lg:col-span-5">
            <div
              id="skill-detail"
              aria-live="polite"
              className="glass sticky top-24 rounded-3xl p-6"
            >
              <AnimatePresence mode="wait" initial={false}>
                {activeSkill ? (
                  <motion.div
                    key={activeSkill.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                  >
                    <p className="annot-accent mb-2">
                      {activeSkill.group}
                    </p>
                    <h3 className="font-display text-xl font-extrabold tracking-tightest text-ink-900">
                      {activeSkill.name}
                    </h3>

                    {activeSkill.usages.length > 0 ? (
                      <>
                        <p className="annot mt-5 mb-2.5">
                          Where I used it · {activeSkill.usages.length}
                        </p>
                        <ul className="space-y-2.5">
                          {activeSkill.usages.map((u, i) => (
                            <UsageCard key={i} usage={u} />
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="mt-5 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4">
                        <p className="flex items-center gap-2 font-display text-[12.5px] font-bold text-amber-800 dark:text-amber-200">
                          <FiInfo size={13} aria-hidden="true" />
                          No case study yet
                        </p>
                        <p className="pretty mt-1.5 text-[13px] leading-relaxed text-amber-900/80">
                          {activeSkill.note}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="all"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                  >
                    <p className="annot-accent mb-2">Showing all</p>
                    <h3 className="font-display text-xl font-extrabold tracking-tightest text-ink-900">
                      Pick a technology
                    </h3>
                    <p className="pretty mt-3 text-[13.5px] leading-relaxed text-ink-600">
                      Each one links to the project, internship or certificate
                      that backs it. The number on a chip is how many places
                      I&apos;ve used it here.
                    </p>

                    <dl className="mt-6 space-y-2.5">
                      {skillGroupMeta.map((g) => {
                        const tone = accentMap[g.accent];
                        const count = skills.filter(
                          (s) => s.group === g.name
                        ).length;
                        return (
                          <div
                            key={g.name}
                            className="flex items-center justify-between gap-3 rounded-xl border border-pearl-400 bg-surface/55 px-4 py-2.5"
                          >
                            <dt className="flex items-center gap-2.5 text-[13px] font-medium text-ink-800">
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${tone.dot}`}
                                aria-hidden="true"
                              />
                              {g.name}
                            </dt>
                            <dd className="font-mono text-[12px] text-ink-500">
                              {count}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
