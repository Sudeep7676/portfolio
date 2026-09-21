"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { FiAward, FiMapPin } from "react-icons/fi";
import { accentMap, EASE_OUT, viewportOnce } from "@/lib/motion";
import { experiences } from "@/data/portfolio";

/**
 * Editorial timeline: dates in the left margin, role and practical work in the
 * main column, with a hairline rail that fills as the section scrolls.
 */
export default function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="section-shell relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="annot-accent mb-4">03 — Experience</p>
            <h2 className="display-lg text-ink-900">
              Two internships,
              <br />
              <span className="text-gradient">both in 2026.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="pretty text-[15px] leading-relaxed text-ink-600">
              From writing servlets by hand at Tap Academy to shipping an AI
              product on the cloud with SuprMentr. Each role links to the
              certificate that documents it.
            </p>
          </div>
        </div>

        <div ref={trackRef} className="relative">
          {/* Rail sits on the column boundary on desktop */}
          <div
            className="absolute left-0 top-2 bottom-2 hidden w-px bg-ink-900/10 sm:block"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="h-full w-full bg-gradient-to-b from-accent-500 to-violet-500"
            />
          </div>

          <ol>
            {experiences.map((exp, i) => {
              const tone = accentMap[exp.accent];
              return (
                <motion.li
                  key={`${exp.role}-${exp.company}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.34, delay: i * 0.06, ease: EASE_OUT }}
                  className="rule-b grid gap-4 py-8 sm:grid-cols-12 sm:gap-6 sm:pl-8 first:pt-0"
                >
                  {/* Date margin */}
                  <div className="sm:col-span-3">
                    <p className="annot-accent">{exp.period}</p>
                    <p className="annot mt-1.5">{exp.type}</p>
                    {exp.location && (
                      <p className="annot mt-1.5 flex items-center gap-1">
                        <FiMapPin size={9} aria-hidden="true" />
                        {exp.location}
                      </p>
                    )}
                  </div>

                  {/* Main column */}
                  <div className="sm:col-span-9">
                    <h3 className="font-display text-[19px] font-bold leading-snug text-ink-900 sm:text-[21px]">
                      {exp.role}
                    </h3>
                    <p className={`mt-1 text-[14px] font-semibold ${tone.text}`}>
                      {exp.company}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {exp.points.map((point, pi) => (
                        <li
                          key={pi}
                          className="pretty flex gap-3 text-[13.5px] leading-relaxed text-ink-600"
                        >
                          <span
                            className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`}
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {exp.certificateSlug && (
                      <a
                        href="#certifications"
                        className="mt-5 inline-flex items-center gap-2 text-[12.5px] font-semibold text-accent-700 dark:text-accent-300 transition-colors hover:text-accent-800 dark:text-accent-200"
                      >
                        <FiAward size={13} aria-hidden="true" />
                        View completion certificate
                      </a>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
