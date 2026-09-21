"use client";

import { motion } from "framer-motion";
import { FiExternalLink, FiShield } from "react-icons/fi";
import { accentMap, EASE_OUT, viewportOnce } from "@/lib/motion";
import { achievements, education } from "@/data/portfolio";

/**
 * Education is a typographic record list — oversized grades, hairline rules,
 * no cards. Achievements sit beneath it as a distinct two-column block.
 */
export default function Education() {
  return (
    <section id="education" className="section-shell relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="annot-accent mb-4">05 — Education</p>
            <h2 className="display-lg text-ink-900">
              Academic record
              <br />
              <span className="text-gradient">and applied practice.</span>
            </h2>
          </div>
        </div>

        {/* ------------------------- education records ------------------------- */}
        <ol className="rule-t">
          {education.map((edu, i) => (
            <motion.li
              key={edu.degree}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.3, delay: i * 0.06, ease: EASE_OUT }}
              className="rule-b grid gap-3 py-7 sm:grid-cols-12 sm:gap-6"
            >
              <div className="sm:col-span-2">
                <p className="annot">{edu.period}</p>
              </div>

              <div className="sm:col-span-7">
                <h3 className="font-display text-[17px] font-bold leading-snug text-ink-900 sm:text-[19px]">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-[14px] text-ink-600">
                  {edu.institution}
                </p>
                <p className="annot mt-1">{edu.location}</p>
              </div>

              <div className="sm:col-span-3 sm:text-right">
                <p className="font-display text-2xl font-extrabold tracking-tightest text-ink-900">
                  {edu.grade}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* ---------------------------- achievements --------------------------- */}
        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="annot-accent mb-3">Job simulations</p>
            <h3 className="font-display text-xl font-extrabold tracking-tightest text-ink-900">
              Completed on Forage
            </h3>
            <p className="pretty mt-3 text-[13.5px] leading-relaxed text-ink-600">
              Two virtual programmes that pushed me past application code into
              how real teams investigate incidents and control access.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid gap-4 sm:grid-cols-2">
              {achievements.map((item, i) => {
                const tone = accentMap[item.accent];
                return (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.06,
                      ease: EASE_OUT,
                    }}
                    className="glass glass-hover flex flex-col rounded-3xl p-6"
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl border ${tone.border} ${tone.bg} ${tone.text}`}
                    >
                      <FiShield size={16} aria-hidden="true" />
                    </span>

                    <h4 className="mt-4 font-display text-[15px] font-bold leading-snug text-ink-900">
                      {item.title}
                    </h4>
                    <p className={`mt-1 text-[13px] font-semibold ${tone.text}`}>
                      {item.org}
                    </p>

                    <p className="pretty mt-3 flex-1 text-[13px] leading-relaxed text-ink-600">
                      {item.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <li key={skill} className="chip">
                          {skill}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://www.theforage.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-[12.5px] font-semibold text-ink-500 transition-colors hover:text-accent-700 dark:text-accent-300"
                    >
                      <FiExternalLink size={13} aria-hidden="true" />
                      About Forage simulations
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
