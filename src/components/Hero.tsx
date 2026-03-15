"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiDownload,
  FiChevronDown,
} from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";

const TYPING_TEXTS = [
  "Full Stack Developer",
  "Java Developer",
  "React Developer",
  "Spring Boot Engineer",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [particles, setParticles] = useState<{ left: string; animationDelay: string; animationDuration: string }[]>([]);

  useEffect(() => {
    // Generate random particles only on the client side to prevent hydration mismatches
    setParticles(
      [...Array(12)].map(() => ({
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
      }))
    );
  }, []);

  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex];
    const speed = isDeleting ? 60 : 100;
    const pause = isDeleting
      ? 300
      : displayText === currentText
      ? 2000
      : speed;

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting && displayText === currentText) {
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % TYPING_TEXTS.length);
      } else {
        setDisplayText((prev) =>
          isDeleting ? prev.slice(0, -1) : currentText.slice(0, prev.length + 1)
        );
      }
    }, pause);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, textIndex, isDeleting]);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Background Orbs */}
      <div
        className="orb w-96 h-96 bg-cyan-400"
        style={{ top: "10%", left: "5%", animationDelay: "0s" }}
      />
      <div
        className="orb w-80 h-80 bg-purple-500"
        style={{ top: "20%", right: "10%", animationDelay: "3s" }}
      />
      <div
        className="orb w-64 h-64 bg-blue-500"
        style={{ bottom: "15%", left: "40%", animationDelay: "1.5s" }}
      />

      {/* Particles */}
      {particles.map((style, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: style.left,
            bottom: 0,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-400/30 text-cyan-400 text-sm font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Available for Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 leading-tight"
        >
          <span className="text-white">Sudeep </span>
          <span className="gradient-text">Vishwakarma</span>
        </motion.h1>

        {/* Typing Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="h-12 sm:h-14 flex items-center justify-center mb-6"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-mono font-semibold text-slate-300">
            {"< "}
            <span className="gradient-text">{displayText}</span>
            <span className="text-cyan-400 animate-pulse">|</span>
            {" />"}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          CS graduate crafting elegant, high-performance web applications with
          modern technologies. Turning ideas into impactful digital experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,245,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection("#projects")}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white shadow-neon-cyan hover:shadow-neon-purple transition-all duration-300 flex items-center gap-2"
          >
            <FiExternalLink />
            View Projects
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="/resume.jpg"
            download="Sudeep_Vishwakarma_Resume.jpg"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm glass border border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 flex items-center gap-2"
          >
            <FiDownload />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            {
              href: "https://github.com/Sudeep7676",
              icon: FiGithub,
              label: "GitHub",
            },
            {
              href: "https://www.linkedin.com/in/sudeep-v7676/",
              icon: FiLinkedin,
              label: "LinkedIn",
            },
            {
              href: "mailto:sudeepvishwakarma5456@gmail.com",
              icon: HiOutlineMail,
              label: "Email",
            },
          ].map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 group"
              title={label}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("#about")}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors"
        >
          <span className="text-xs font-mono tracking-widest">SCROLL</span>
          <FiChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
