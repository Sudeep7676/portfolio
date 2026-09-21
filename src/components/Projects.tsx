"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiGithub,
  FiGrid,
  FiImage,
  FiLock,
} from "react-icons/fi";
import { accentMap, EASE_OUT, viewportOnce } from "@/lib/motion";
import { profile, projects, type Project } from "@/data/portfolio";
import ProjectShot from "@/components/ui/ProjectShot";
import TiltCard from "@/components/ui/TiltCard";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";

type View = "interface" | "architecture";

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const tone = accentMap[project.accent];
  const [view, setView] = useState<View>("interface");
  const [open, setOpen] = useState(false);

  const uid = useId();
  const tabsRef = useRef<Record<View, HTMLButtonElement | null>>({
    interface: null,
    architecture: null,
  });

  const panelId = `${uid}-panel`;
  const detailsId = `${uid}-details`;
  const detailsBtnId = `${uid}-details-btn`;

  /* Alternate which side the visual sits on (desktop only). */
  const flipped = index % 2 === 1;

  const TABS: { id: View; label: string; icon: typeof FiImage }[] = [
    { id: "interface", label: "Interface", icon: FiImage },
    { id: "architecture", label: "Architecture", icon: FiGrid },
  ];

  /** Roving tab focus, per the WAI-ARIA tabs pattern. */
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next: View = view === "interface" ? "architecture" : "interface";
    setView(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.34, ease: EASE_OUT }}
      className="group"
    >
      {/* ----------------------------- case header ---------------------------- */}
      <div className="rule-b mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-4">
        <div className="min-w-0">
          <p className="annot-accent mb-2">
            Case {String(index + 1).padStart(2, "0")} · {project.period}
          </p>
          <h3 className="display-lg text-ink-900">{project.title}</h3>
          <p className={`mt-1.5 text-[14px] font-semibold ${tone.softText}`}>
            {project.subtitle}
          </p>
        </div>

        {/* Interface / Architecture toggle */}
        <div
          role="tablist"
          aria-label={`${project.title} view`}
          className="seg shrink-0"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabsRef.current[tab.id] = el;
              }}
              role="tab"
              id={`${uid}-tab-${tab.id}`}
              aria-selected={view === tab.id}
              aria-controls={panelId}
              tabIndex={view === tab.id ? 0 : -1}
              onClick={() => setView(tab.id)}
              onKeyDown={onTabKeyDown}
              className="seg-btn"
            >
              {view === tab.id && (
                <motion.span
                  layoutId={`${uid}-seg`}
                  className="absolute inset-0 rounded-[9px] bg-surface shadow-glass-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <tab.icon size={13} aria-hidden="true" />
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* ------------------------------- visual ------------------------------ */}
        <div className={`lg:col-span-7 ${flipped ? "lg:order-2" : "lg:order-1"}`}>
          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${view}`}
            tabIndex={0}
            className="rounded-3xl focus-visible:outline-2"
          >
            <AnimatePresence mode="wait" initial={false}>
              {view === "interface" ? (
                <motion.div
                  key="interface"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                >
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className={`ambient -left-8 -top-8 h-36 w-36 ${
                        project.accent === "emerald"
                          ? "bg-emerald-200/60"
                          : "bg-accent-200/60"
                      }`}
                    />
                    <TiltCard max={3} className="relative">
                      <ProjectShot
                        src={project.shot}
                        fallback={project.fallback}
                        alt={`${project.title} — ${project.subtitle}`}
                        label={project.displayUrl}
                        priority={index === 0}
                      />
                    </TiltCard>
                  </div>

                  <dl className="glass mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="px-3 py-4 text-center">
                        <dd
                          className={`font-display text-lg font-extrabold sm:text-xl ${tone.text}`}
                        >
                          {m.value}
                        </dd>
                        <dt className="annot mt-0.5">{m.label}</dt>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              ) : (
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                >
                  <ArchitectureDiagram
                    architecture={project.architecture}
                    idPrefix={project.slug}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ------------------------------ narrative ---------------------------- */}
        <div className={`lg:col-span-5 ${flipped ? "lg:order-1" : "lg:order-2"}`}>
          <section>
            <p className="annot mb-2">The problem</p>
            <p className="pretty text-[14px] leading-relaxed text-ink-600">
              {project.problem}
            </p>
          </section>

          <section className="mt-6">
            <p className="annot mb-2">My contribution</p>
            <p className="pretty text-[14px] leading-relaxed text-ink-600">
              {project.contribution}
            </p>
          </section>

          <section className="mt-6">
            <p className="annot mb-2.5">Outcomes</p>
            <ul className="space-y-2">
              {project.results.map((r, i) => (
                <li
                  key={i}
                  className="pretty flex gap-2.5 text-[13.5px] leading-relaxed text-ink-700"
                >
                  <span
                    className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`}
                    aria-hidden="true"
                  />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>

          {/* ------------------------------ actions ---------------------------- */}
          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Live Demo
                <FiArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : (
              <span
                className="inline-flex cursor-default items-center gap-2 rounded-xl border border-pearl-500 bg-surface/60 px-4 py-3 text-[13px] font-medium text-ink-500"
                title="Runs on a local Tomcat 10 server, so there is no public demo"
              >
                <FiLock size={14} aria-hidden="true" />
                Self-hosted · Tomcat 10
              </span>
            )}

            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <FiGithub size={15} aria-hidden="true" />
              Source
            </a>
          </div>

          {/* -------------------------- behind the build ----------------------- */}
          <div className="mt-6">
            <button
              id={detailsBtnId}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={detailsId}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-pearl-500 bg-surface/60 px-4 py-3 text-left transition-colors duration-200 hover:border-accent-500/40"
            >
              <span>
                <span className="block text-[13px] font-semibold text-ink-900">
                  Behind the Build
                </span>
                <span className="annot mt-0.5 block">
                  Architecture &amp; technical decisions
                </span>
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
                className="shrink-0 text-ink-500"
              >
                <FiChevronDown size={16} aria-hidden="true" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={detailsId}
                  role="region"
                  aria-labelledby={detailsBtnId}
                  key="d"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 space-y-4 rounded-2xl border border-pearl-400 bg-surface/55 p-5">
                    {project.behindTheBuild.map((item) => (
                      <section key={item.heading}>
                        <h4 className="font-display text-[13px] font-bold text-ink-900">
                          {item.heading}
                        </h4>
                        <p className="pretty mt-1.5 text-[13px] leading-relaxed text-ink-600">
                          {item.body}
                        </p>
                      </section>
                    ))}

                    <section className="rule-t pt-4">
                      <p className="annot mb-2">Key features</p>
                      <ul className="space-y-1.5">
                        {project.features.map((f, i) => (
                          <li
                            key={i}
                            className="pretty flex gap-2.5 text-[12.5px] leading-relaxed text-ink-600"
                          >
                            <span
                              className={`mt-[6px] h-1 w-1 shrink-0 rounded-full ${tone.dot}`}
                              aria-hidden="true"
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-shell relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Editorial section opener */}
        <div className="mb-14 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="annot-accent mb-4">02 — Selected work</p>
            <h2 className="display-lg text-ink-900">
              Two products,
              <br />
              <span className="text-gradient">built end to end.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-14">
            <p className="pretty text-[15px] leading-relaxed text-ink-600">
              Both shipped during my 2026 internships — one deliberately
              framework-free to prove the fundamentals, one AI-native to explore
              what modern tooling makes possible. Switch any case study between
              its interface and its architecture.
            </p>
          </div>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {projects.map((project, i) => (
            <CaseStudy key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="rule-t mt-20 flex justify-center pt-10">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <FiGithub size={15} aria-hidden="true" />
            More on {profile.githubHandle}
          </a>
        </div>
      </div>
    </section>
  );
}
