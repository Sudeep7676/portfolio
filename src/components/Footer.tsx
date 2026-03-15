"use client";
import { motion } from "framer-motion";
import { FiHeart, FiGithub, FiLinkedin, FiMail, FiArrowUp } from "react-icons/fi";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 overflow-hidden">
      {/* Gradient top fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/0 via-dark-900/80 to-dark-900 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-mono font-bold text-lg gradient-text">SV.dev</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-52">
              Full Stack Developer passionate about building impactful digital experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-mono">Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 font-mono">Contact</h4>
            <div className="flex flex-col gap-3 mb-5">
              <a
                href="mailto:sudeepvishwakarma5456@gmail.com"
                className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors"
              >
                <FiMail size={14} />
                sudeepvishwakarma5456@gmail.com
              </a>
              <a
                href="tel:07676102096"
                className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors"
              >
                <span className="text-xs">📞</span>
                07676 102096
              </a>
            </div>

            <div className="flex gap-3">
              {[
                { icon: FiGithub, href: "https://github.com/Sudeep7676", label: "GitHub" },
                { icon: FiLinkedin, href: "https://www.linkedin.com/in/sudeep-v7676/", label: "LinkedIn" },
                { icon: FiMail, href: "mailto:sudeepvishwakarma5456@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Sudeep Vishwakarma. Built with{" "}
            <span className="text-red-400 mx-0.5">
              <FiHeart className="inline" size={11} />
            </span>
            using Next.js &amp; Tailwind CSS
          </p>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-lg glass border border-white/15 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
          >
            <FiArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
