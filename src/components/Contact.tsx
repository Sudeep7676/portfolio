"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  FiCheck,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiLoader,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { EASE_OUT, fadeUp, viewportOnce } from "@/lib/motion";
import { profile } from "@/data/portfolio";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** idle → sending → sent (delivered) | failed | fallback (mail client opened) */
type Status = "idle" | "sending" | "sent" | "failed" | "fallback";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email.trim()))
      next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "A little more detail helps — at least 10 characters.";
    return next;
  };

  /** Opens the visitor's mail client with the message pre-filled. */
  const openMailClient = () => {
    const subject = `Portfolio enquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  /**
   * Posts to /api/contact, which sends the message for real.
   *
   * "Message sent" is only ever shown on a 2xx from the API. If delivery is not
   * configured on the deployment (503) we fall back to the visitor's mail client
   * and say so plainly rather than implying the message went through.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first invalid field for keyboard/AT users.
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setStatus("sending");
    setNotice("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.ok) {
        setStatus("sent");
        setNotice("Message sent. I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
        return;
      }

      if (res.status === 422 && data?.errors) {
        setErrors(data.errors);
        setStatus("idle");
        return;
      }

      // Delivery not configured on this deployment — hand off to the mail client.
      if (res.status === 503 || data?.configured === false) {
        setStatus("fallback");
        setNotice(
          "Opening your email app instead — direct sending isn't set up on this deployment."
        );
        openMailClient();
        return;
      }

      setStatus("failed");
      setNotice(
        data?.error ?? "The message could not be sent. Please email me directly."
      );
    } catch {
      setStatus("failed");
      setNotice(
        "Network error, so nothing was sent. Please email me directly instead."
      );
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked — the address is visible on screen anyway. */
    }
  };

  return (
    <section id="contact" className="section-shell relative">
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="annot-accent mb-4">06 — Contact</p>
            <h2 className="display-lg text-ink-900">
              Let&apos;s build
              <br />
              <span className="text-gradient">something solid.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pt-12">
            <p className="pretty text-[15px] leading-relaxed text-ink-600">
              I&apos;m actively looking for a Java Full Stack Developer role. If
              you&apos;re hiring, or just want to talk through an architecture
              problem, I&apos;d love to hear from you.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-12">
          {/* ----------------------------- details ----------------------------- */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-4 lg:col-span-5"
          >
            <div className="glass relative overflow-hidden rounded-3xl p-6">
              <div
                aria-hidden="true"
                className="ambient -right-10 -top-10 h-40 w-40 bg-accent-200/70"
              />
              <div className="relative">
                <p className="eyebrow mb-4">Direct</p>

                <div className="flex items-start gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-accent-500/25 bg-accent-500/10 text-accent-700 dark:text-accent-300">
                    <FiMail size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                      Email
                    </p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="block break-all text-[13.5px] font-semibold text-ink-900 transition-colors hover:text-accent-700 dark:text-accent-300"
                    >
                      {profile.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-label="Copy email address"
                    className="icon-btn h-9 w-9 shrink-0"
                  >
                    {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                  </button>
                  {/* Announced to screen readers when the copy succeeds */}
                  <span aria-live="polite" className="sr-only">
                    {copied ? "Email address copied to clipboard" : ""}
                  </span>
                </div>

                <div className="mt-5 flex items-start gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-300">
                    <FiPhone size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                      Phone
                    </p>
                    <a
                      href={profile.phoneHref}
                      className="block text-[13.5px] font-semibold text-ink-900 transition-colors hover:text-accent-700 dark:text-accent-300"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3.5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                    <FiMapPin size={17} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-400">
                      Location
                    </p>
                    <p className="text-[13.5px] font-semibold text-ink-900">
                      {profile.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <p className="eyebrow mb-4">Elsewhere</p>
              <div className="flex flex-col gap-2.5">
                {[
                  {
                    icon: FiGithub,
                    href: profile.github,
                    label: "GitHub",
                    handle: profile.githubHandle,
                  },
                  {
                    icon: FiLinkedin,
                    href: profile.linkedin,
                    label: "LinkedIn",
                    handle: profile.linkedinHandle,
                  },
                ].map(({ icon: Icon, href, label, handle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-pearl-400 bg-surface/60 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-500/40"
                  >
                    <Icon
                      size={16}
                      className="text-ink-500 transition-colors group-hover:text-accent-700 dark:text-accent-300"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-semibold text-ink-900">
                        {label}
                      </span>
                      <span className="block truncate font-mono text-[11px] text-ink-400">
                        {handle}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass flex items-center gap-3 rounded-3xl border-emerald-500/25/80 p-5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-[13px] text-ink-700">
                <span className="font-semibold text-emerald-700 dark:text-emerald-300">Available</span>{" "}
                for full-time roles
              </p>
            </div>
          </motion.div>

          {/* ------------------------------ form ------------------------------- */}
          <motion.div
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass flex flex-col gap-5 rounded-3xl p-6 sm:p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-[12.5px] font-semibold text-ink-700"
                >
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`field ${errors.name ? "field-err" : "field-ok"}`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-[12px] text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[12.5px] font-semibold text-ink-700"
                >
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@company.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`field ${errors.email ? "field-err" : "field-ok"}`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-[12px] text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[12.5px] font-semibold text-ink-700"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Hi Sudeep — we're hiring a Java developer and your Foodly project caught my eye..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`field resize-none ${
                    errors.message ? "field-err" : "field-ok"
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1.5 text-[12px] text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary w-full"
              >
                {status === "sending" ? (
                  <>
                    <FiLoader size={15} aria-hidden="true" className="animate-spin" />
                    Sending…
                  </>
                ) : status === "sent" ? (
                  <>
                    <FiCheck size={16} aria-hidden="true" />
                    Message sent
                  </>
                ) : (
                  <>
                    <FiSend size={15} aria-hidden="true" />
                    Send message
                  </>
                )}
              </button>

              {/* Status is announced; "sent" only ever follows a successful send. */}
              <p
                role="status"
                aria-live="polite"
                className={`min-h-[1.25rem] text-center text-[12.5px] leading-relaxed ${
                  status === "sent"
                    ? "font-semibold text-emerald-600 dark:text-emerald-300"
                    : status === "failed"
                    ? "font-semibold text-red-600 dark:text-red-400"
                    : "text-ink-500"
                }`}
              >
                {notice}
              </p>

              {(status === "failed" || status === "fallback") && (
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-secondary w-full !py-2.5 text-[13px]"
                >
                  <FiMail size={14} aria-hidden="true" />
                  Email me directly
                </a>
              )}
            </form>
          </motion.div>
        </div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="glass-strong relative mt-6 overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12"
        >
          <div className="dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="ambient -left-16 top-0 h-52 w-52 bg-lavender-200/70"
          />
          <div
            aria-hidden="true"
            className="ambient -right-16 bottom-0 h-52 w-52 bg-accent-200/70"
          />
          <div className="relative">
            <p className="eyebrow justify-center">Ready when you are</p>
            <h3 className="balance mx-auto mt-4 max-w-2xl font-display text-[clamp(1.4rem,3.6vw,2.25rem)] font-extrabold leading-tight text-ink-900">
              Let&apos;s talk about your{" "}
              <span className="text-gradient text-gradient-animate">
                backend problems.
              </span>
            </h3>
            <a
              href={`mailto:${profile.email}`}
              className="btn-primary mt-7 max-w-full"
            >
              <FiMail size={16} aria-hidden="true" />
              <span className="truncate">{profile.email}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
