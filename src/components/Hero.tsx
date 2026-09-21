"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FiArrowDown,
  FiArrowRight,
  FiDownload,
  FiFileText,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";
import { EASE_OUT } from "@/lib/motion";
import { heroFacts, profile, stackFlow } from "@/data/portfolio";

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Pointer-driven depth on the portrait frame.
 * Only enabled for fine pointers that support hover, and never under
 * prefers-reduced-motion — touch devices get a completely static frame.
 */
function usePortraitDepth() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  /**
   * Resolved in an effect, not during render: reading matchMedia while
   * rendering would make the server and client markup disagree.
   */
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const apply = () => setFinePointer(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20, mass: 0.4 };

  const rotateY = useSpring(useTransform(px, [0, 1], [-5, 5]), spring);
  const rotateX = useSpring(useTransform(py, [0, 1], [4, -4]), spring);
  const glareX = useTransform(px, [0, 1], ["25%", "75%"]);
  const glareY = useTransform(py, [0, 1], ["20%", "80%"]);

  const enabled = !reduced && finePointer;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return { ref, enabled, rotateX, rotateY, glareX, glareY, onMove, onLeave };
}

export default function Hero() {
  const depth = usePortraitDepth();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="hero"
      /*
        overflow-x-clip contains the blueprint grid and ambient blobs, which use
        negative offsets and would otherwise widen the page on narrow screens.
      */
      className="relative overflow-x-clip px-5 pb-12 pt-20 sm:pb-16 sm:pt-24 lg:pb-16 lg:pt-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* Top annotation rule */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.34, ease: EASE_OUT }}
          className="rule-b mb-6 flex flex-wrap items-center justify-between gap-2 pb-2.5"
        >
          <span className="annot-accent">Portfolio / 2026</span>
          <span className="annot">{profile.location}</span>
        </motion.div>

        {/*
          items-start keeps the portrait level with the top of the text column.
          Centring it pushed the photo down whenever the copy ran taller.
        */}
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* ------------------------------ portrait ----------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.34, delay: 0.06, ease: EASE_OUT }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <div
              ref={depth.ref}
              onMouseMove={depth.onMove}
              onMouseLeave={depth.onLeave}
              className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem] lg:ml-auto lg:mr-0 lg:max-w-[23.5rem]"
              style={{ perspective: 1100 }}
            >
              {/* Architectural grid behind the frame */}
              <div
                aria-hidden="true"
                className="blueprint absolute -inset-5 rounded-3xl opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_75%)]"
              />
              {/* Restrained blue lighting */}
              <div
                aria-hidden="true"
                className="ambient -right-6 -top-8 h-48 w-48 bg-accent-300/50"
              />
              <div
                aria-hidden="true"
                className="ambient -bottom-8 -left-6 h-44 w-44 bg-lavender-300/45"
              />

              {/* Corner registration marks */}
              {[
                "-left-2 -top-2 border-l-2 border-t-2",
                "-right-2 -top-2 border-r-2 border-t-2",
                "-left-2 -bottom-2 border-b-2 border-l-2",
                "-right-2 -bottom-2 border-b-2 border-r-2",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden="true"
                  className={`absolute z-10 h-4 w-4 border-accent-500/50 ${pos}`}
                />
              ))}

              <motion.div
                style={
                  depth.enabled
                    ? {
                        rotateX: depth.rotateX,
                        rotateY: depth.rotateY,
                        transformStyle: "preserve-3d",
                      }
                    : undefined
                }
                className="glass-strong relative rounded-[1.6rem] p-2.5 sm:p-3"
              >
                <div className="relative overflow-hidden rounded-[1.25rem] bg-pearl-300">
                  <div className="relative aspect-[4/5] w-full">
                    <Image
                      src={profile.photo}
                      alt={`${profile.name}, ${profile.title}`}
                      fill
                      priority
                      sizes="(min-width: 1024px) 420px, (min-width: 640px) 340px, 300px"
                      className="object-cover"
                      style={{ objectPosition: profile.photoFocus }}
                    />
                  </div>

                  {/* Pointer-tracked glare, desktop only */}
                  {depth.enabled && (
                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(340px circle at ${depth.glareX} ${depth.glareY}, rgba(255,255,255,0.28), transparent 62%)`,
                      }}
                    />
                  )}
                </div>
                {/*
                  Role tag straddles the bottom edge of the photo via a negative
                  margin, so it reads as attached to the portrait without
                  overlapping the name plate underneath.
                */}
                <div className="relative -mt-4 flex justify-center">
                  <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-accent-600 px-4 py-2 text-[12.5px] font-semibold text-white shadow-lift">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-white/70 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    {profile.title}
                  </span>
                </div>

                {/* Name plate */}
                <div className="flex items-baseline justify-between gap-2 px-1.5 pb-0.5 pt-3.5">
                  <span className="font-display text-[13px] font-bold text-ink-900">
                    {profile.name}
                  </span>
                  <span className="annot">Fig. 01</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* --------------------------- editorial column ------------------------ */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="annot-accent mb-3.5"
            >
              {profile.title}
            </motion.p>

            {/*
              Oversized statement type. Each clause fades in on its own, but the
              text is present and readable in the DOM from first paint.
            */}
            <h1 className="display-xl text-ink-900">
              {profile.headline.map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.34,
                    delay: 0.06 + i * 0.08,
                    ease: EASE_OUT,
                  }}
                  className="block"
                >
                  {i === 1 ? (
                    <span className="text-gradient">{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.22, ease: EASE_OUT }}
              className="pretty mt-5 max-w-xl text-[15px] leading-relaxed text-ink-600"
            >
              {profile.intro}
            </motion.p>

            {/* ------------------------ stack annotation ------------------------ */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.28, ease: EASE_OUT }}
              className="mt-6"
            >
              <p className="annot mb-2">Core stack</p>
              <div
                className="flex flex-wrap items-center gap-x-1.5 gap-y-2"
                role="group"
                aria-label="Core technology stack"
              >
                {stackFlow.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveStep(i)}
                      onFocus={() => setActiveStep(i)}
                      onClick={() => setActiveStep(i)}
                      aria-pressed={activeStep === i}
                      aria-describedby="stack-note"
                      className={`rounded-lg border px-3 py-1.5 font-mono text-[12px] font-medium transition-all duration-200 ${
                        activeStep === i
                          ? "border-accent-500 bg-accent-500/10 text-accent-700 dark:text-accent-300 shadow-glass-sm"
                          : "border-pearl-500 bg-surface/70 text-ink-600 hover:border-accent-500/40 hover:text-ink-900"
                      }`}
                    >
                      {step.label}
                    </button>
                    {i < stackFlow.length - 1 && (
                      <FiArrowRight
                        size={13}
                        className="text-ink-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
              {/* Live region so the note is announced when selection changes */}
              <p
                id="stack-note"
                aria-live="polite"
                className="mt-2.5 min-h-[1.25rem] text-[12.5px] text-ink-500"
              >
                {stackFlow[activeStep].note}
              </p>
            </motion.div>

            {/* ----------------------------- actions --------------------------- */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: 0.34, ease: EASE_OUT }}
              className="mt-7 flex flex-wrap items-center gap-2.5"
            >
              <button onClick={() => scrollTo("#projects")} className="btn-primary">
                Explore Projects
                <FiArrowRight size={15} aria-hidden="true" />
              </button>

              {/*
                Two distinct resume actions: `download` saves the PDF, while the
                plain link opens it in a new tab for a quick look.
              */}
              <a
                href={profile.resume}
                download={profile.resumeFileName}
                className="btn-secondary"
              >
                <FiDownload size={15} aria-hidden="true" />
                Download Resume
              </a>

              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <FiFileText size={15} aria-hidden="true" />
                View
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="icon-btn h-11 w-11"
                >
                  <FiGithub size={17} aria-hidden="true" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="icon-btn h-11 w-11"
                >
                  <FiLinkedin size={17} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ---------------------------- fact rule ---------------------------- */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.34, delay: 0.42, ease: EASE_OUT }}
          className="rule-t mt-10 grid grid-cols-3 gap-4 pt-5"
        >
          {heroFacts.map((fact) => (
            <div key={fact.label}>
              <dd className="font-display text-2xl font-extrabold tracking-tightest text-ink-900 sm:text-3xl">
                {fact.value}
              </dd>
              <dt className="mt-0.5 text-[12.5px] font-medium text-ink-700">
                {fact.label}
              </dt>
              <p className="annot mt-0.5">{fact.hint}</p>
            </div>
          ))}
        </motion.dl>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => scrollTo("#about")}
            className="group flex items-center gap-2 text-ink-400 transition-colors duration-200 hover:text-accent-700 dark:text-accent-300"
            aria-label="Scroll to About section"
          >
            <span className="annot group-hover:text-accent-700 dark:text-accent-300">Scroll</span>
            <FiArrowDown size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
