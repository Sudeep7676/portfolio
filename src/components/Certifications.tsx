"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiCalendar,
  FiDownload,
  FiHash,
  FiMaximize2,
} from "react-icons/fi";
import { accentMap, EASE_OUT, viewportOnce } from "@/lib/motion";
import { certifications } from "@/data/portfolio";
import Lightbox from "@/components/ui/Lightbox";

export default function Certifications() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /** Cards that opened the lightbox, so focus can be handed back. */
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastTrigger = useRef<number | null>(null);

  const open = useCallback((i: number) => {
    lastTrigger.current = i;
    setOpenIndex(i);
  }, []);

  /* Return focus to the card that opened the viewer. */
  const close = useCallback(() => {
    const returnTo = lastTrigger.current;
    setOpenIndex(null);
    requestAnimationFrame(() => {
      if (returnTo !== null) triggerRefs.current[returnTo]?.focus();
    });
  }, []);

  return (
    <section id="certifications" className="section-shell relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="annot-accent mb-4">04 — Documents</p>
            <h2 className="display-lg text-ink-900">
              Verified credentials,
              <br />
              <span className="text-gradient">original documents.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="pretty text-[15px] leading-relaxed text-ink-600">
              The actual certificates issued to me, reproduced without cropping.
              Select any document to view it full size, zoom in, or download the
              original file.
            </p>
          </div>
        </div>

        {/*
          Two certificates with very different aspect ratios (one landscape,
          one portrait), so each preview uses a fixed 4:3 stage with
          object-fit: contain — the artwork is never cropped.
        */}
        <div className="grid gap-5 md:grid-cols-2">
          {certifications.map((cert, i) => {
            const tone = accentMap[cert.accent];
            const isInternship = cert.kind === "Internship";

            return (
              <motion.div
                key={cert.slug}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
              >
                <article className="glass glass-hover group flex h-full flex-col overflow-hidden rounded-3xl">
                  {/* ---------------------------- preview --------------------------- */}
                  <button
                    ref={(el) => {
                      triggerRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => open(i)}
                    aria-haspopup="dialog"
                    className="relative block w-full overflow-hidden rounded-t-3xl text-left"
                  >
                    {/* Ambient wash behind the translucent preview stage */}
                    <div
                      aria-hidden="true"
                      className={`ambient -left-10 -top-10 h-40 w-40 ${
                        isInternship ? "bg-lavender-200/80" : "bg-accent-200/80"
                      }`}
                    />

                    <div className="relative aspect-[4/3] w-full bg-surface/55 p-3 backdrop-blur-sm sm:p-4">
                      <Image
                        src={cert.image}
                        alt={`${cert.title} — issued by ${cert.issuer}`}
                        width={cert.width}
                        height={cert.height}
                        loading="lazy"
                        sizes="(min-width: 768px) 560px, 92vw"
                        className="cert-fit h-full w-full rounded-lg shadow-glass-sm transition-transform duration-500 ease-expo-out group-hover:scale-[1.02]"
                      />

                      {/* Hover / focus affordance */}
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/85 px-4 py-2 text-[12px] font-semibold text-white backdrop-blur-sm">
                          <FiMaximize2 size={13} aria-hidden="true" />
                          View full certificate
                        </span>
                      </span>
                    </div>

                    <span className="sr-only">
                      Open {cert.title} in a full-size viewer
                    </span>
                  </button>

                  {/* ----------------------------- meta ---------------------------- */}
                  <div className="flex flex-1 flex-col border-t border-[rgb(var(--glass-border))] p-5 sm:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${tone.border} ${tone.bg} ${tone.text}`}
                      >
                        <FiAward size={10} aria-hidden="true" />
                        {cert.kind}
                      </span>
                      {cert.date && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-ink-500">
                          <FiCalendar size={11} aria-hidden="true" />
                          {cert.date}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-[15px] font-bold leading-snug text-ink-900">
                      {cert.title}
                    </h3>
                    <p className={`mt-1 text-[13px] font-semibold ${tone.text}`}>
                      {cert.issuer}
                    </p>

                    <ul className="mt-4 flex-1 space-y-1.5">
                      {cert.details.map((detail, di) => (
                        <li
                          key={di}
                          className="pretty flex gap-2.5 text-[12.5px] leading-relaxed text-ink-600"
                        >
                          <span
                            className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`}
                            aria-hidden="true"
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-pearl-400 pt-4">
                      {cert.credentialId ? (
                        <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-ink-400">
                          <FiHash size={10} aria-hidden="true" />
                          {cert.credentialId}
                        </span>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => open(i)}
                          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent-700 dark:text-accent-300 transition-colors hover:text-accent-800 dark:text-accent-200"
                        >
                          <FiMaximize2 size={13} aria-hidden="true" />
                          View
                        </button>
                        <a
                          href={cert.image}
                          download
                          className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-500 transition-colors hover:text-accent-700 dark:text-accent-300"
                        >
                          <FiDownload size={13} aria-hidden="true" />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Lightbox
        items={certifications}
        index={openIndex}
        onClose={close}
        onNavigate={setOpenIndex}
      />
    </section>
  );
}
