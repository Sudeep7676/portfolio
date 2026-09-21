"use client";

import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { navLinks, profile } from "@/data/portfolio";

const socials = [
  { icon: FiGithub, href: profile.github, label: "GitHub" },
  { icon: FiLinkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: FiMail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgb(var(--glass-border))] bg-surface/45 backdrop-blur-sm">
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-9 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-600 text-white shadow-lift">
                <span className="font-display text-[13px] font-bold">
                  {profile.initials}
                </span>
              </span>
              <span className="font-display text-[15px] font-bold text-ink-900">
                {profile.name}
              </span>
            </div>
            <p className="pretty mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-600">
              {profile.title} focused on Java, Spring and full-stack web
              development. Currently open to new roles.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="icon-btn h-9 w-9"
                >
                  <Icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav className="md:col-span-3" aria-label="Footer">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
              Sections
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-[13.5px] text-ink-600 transition-colors hover:text-accent-700 dark:text-accent-300"
                  >
                    <span className="h-1 w-1 rounded-full bg-ink-400 transition-colors group-hover:bg-accent-600" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-400">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="break-all text-[13.5px] text-ink-600 transition-colors hover:text-accent-700 dark:text-accent-300"
                >
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={profile.phoneHref}
                  className="text-[13.5px] text-ink-600 transition-colors hover:text-accent-700 dark:text-accent-300"
                >
                  {profile.phone}
                </a>
              </li>
              <li className="text-[13.5px] text-ink-500">{profile.location}</li>
            </ul>
            <a
              href={profile.resume}
              download={profile.resumeFileName}
              className="btn-secondary mt-5 !px-4 !py-2.5 text-[13px]"
            >
              Download resume
            </a>
          </div>
        </div>

        <div className="mt-11 flex flex-col-reverse items-center justify-between gap-4 border-t border-pearl-400 pt-6 sm:flex-row">
          <p className="text-center font-mono text-[11.5px] text-ink-400 sm:text-left">
            © {new Date().getFullYear()} {profile.name} · Built with Next.js,
            Tailwind CSS &amp; Framer Motion
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="icon-btn h-9 w-9"
          >
            <FiArrowUp size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
