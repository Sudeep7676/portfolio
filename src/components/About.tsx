"use client";

import { motion } from "framer-motion";
import { FiCode, FiLayers, FiShield } from "react-icons/fi";
import { EASE_OUT, viewportOnce } from "@/lib/motion";
import { profile } from "@/data/portfolio";

/** Three traits, each grounded in something the resume actually evidences. */
const pillars = [
  {
    icon: FiLayers,
    title: "Layered by habit",
    body: "I separate DAO, service and controller concerns even when no framework enforces it — Foodly is 106 classes organised exactly that way.",
    tone: "text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
  },
  {
    icon: FiShield,
    title: "Security-minded",
    body: "Roles assigned server-side, partner approval gates, session-scoped queries, and payment signatures verified before confirmation — not after.",
    tone: "text-accent-700 dark:text-accent-300 bg-accent-500/10 border-accent-500/25",
  },
  {
    icon: FiCode,
    title: "Full stack, genuinely",
    body: "Java, Spring and Hibernate on the server; HTML, CSS, JavaScript and React on the client; MySQL underneath it all.",
    tone: "text-violet-700 dark:text-violet-300 bg-violet-500/10 border-violet-500/25",
  },
];

export default function About() {
  return (
    <section id="about" className="section-shell relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Oversized statement, offset into the grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="annot-accent mb-4">00 — Profile</p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.34, ease: EASE_OUT }}
              className="display-lg text-ink-900"
            >
              Engineer first,
              <br />
              <span className="text-gradient">framework second.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.34, delay: 0.08, ease: EASE_OUT }}
              className="pretty mt-7 max-w-xl text-[15px] leading-relaxed text-ink-600"
            >
              {profile.objective}
            </motion.p>

            <dl className="rule-t mt-8 grid grid-cols-2 gap-x-6 gap-y-5 pt-6 sm:grid-cols-4">
              {[
                { k: "Degree", v: "B.E. CSE" },
                { k: "Graduating", v: "2026" },
                { k: "Focus", v: "Java · Spring" },
                { k: "Base", v: "Karnataka" },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="annot">{item.k}</dt>
                  <dd className="mt-1 text-[14px] font-semibold text-ink-900">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Pillars in the narrow column */}
          <div className="lg:col-span-5 lg:pt-16">
            <ul className="space-y-px overflow-hidden rounded-3xl border border-pearl-400 bg-surface/45">
              {pillars.map((pillar, i) => (
                <motion.li
                  key={pillar.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.06,
                    ease: EASE_OUT,
                  }}
                  className="flex gap-4 border-b border-pearl-400 p-5 last:border-b-0"
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${pillar.tone}`}
                  >
                    <pillar.icon size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-[14px] font-bold text-ink-900">
                      {pillar.title}
                    </h3>
                    <p className="pretty mt-1.5 text-[13px] leading-relaxed text-ink-600">
                      {pillar.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pull quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.34, ease: EASE_OUT }}
          className="rule-t mt-16 pt-10"
        >
          <p className="balance mx-auto max-w-3xl text-center font-display text-[clamp(1.1rem,2.6vw,1.7rem)] font-semibold leading-snug tracking-tightest text-ink-800">
            &ldquo;Build it so a forged request, a tampered URL or a missing check
            can&apos;t quietly become someone else&apos;s data.&rdquo;
          </p>
          <footer className="annot mt-4 text-center">
            How I approached Foodly&apos;s access model
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
