"use client";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    title: "AI Resume Optimizer",
    description:
      "An intelligent resume enhancement platform powered by GPT-4o. Upload your resume and job description to get AI-driven tailored suggestions, ATS optimization, and professional rewrites.",
    tech: ["Next.js", "GPT-4o", "TypeScript", "Tailwind CSS", "Vercel AI SDK"],
    liveUrl: "https://resume-optimizer-nine-swart.vercel.app",
    githubUrl: "https://github.com/Sudeep7676",
    gradient: "from-cyan-500/10 via-blue-500/10 to-purple-500/10",
    border: "border-cyan-500/20 hover:border-cyan-400/50",
    badge: "AI / LLM",
    badgeColor: "bg-cyan-400/10 text-cyan-400 border-cyan-400/30",
    emoji: "🤖",
    featured: true,
  },
  {
    title: "Laboratory Management System",
    description:
      "Full-featured lab management platform with student tracking, equipment inventory, experiment scheduling, and admin dashboard. Built with PHP MVC pattern and MySQL.",
    tech: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "Bootstrap"],
    liveUrl: null,
    githubUrl: "https://github.com/Sudeep7676",
    gradient: "from-emerald-500/10 via-teal-500/10 to-cyan-500/10",
    border: "border-emerald-500/20 hover:border-emerald-400/50",
    badge: "Full Stack",
    badgeColor: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
    emoji: "🔬",
    featured: false,
  },
  {
    title: "Hybrid Text Summarization",
    description:
      "Deep learning model combining extractive and abstractive techniques for superior document summarization. Uses BERT + T5 transformer architecture with custom fine-tuning.",
    tech: ["Python", "TensorFlow", "BERT", "T5", "Hugging Face", "Flask"],
    liveUrl: null,
    githubUrl: "https://github.com/Sudeep7676",
    gradient: "from-purple-500/10 via-violet-500/10 to-pink-500/10",
    border: "border-purple-500/20 hover:border-purple-400/50",
    badge: "Deep Learning",
    badgeColor: "bg-purple-400/10 text-purple-400 border-purple-400/30",
    emoji: "🧠",
    featured: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Projects() {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="orb w-96 h-96 bg-purple-600" style={{ top: "20%", right: "-10%", opacity: 0.08 }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
            03. Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`group relative glass rounded-2xl border ${project.border} overflow-hidden transition-all duration-300 cursor-pointer`}
            >
              {/* Gradient top bar */}
              <div
                className={`h-1 w-full bg-gradient-to-r ${project.gradient.replace("/10", "")} opacity-70`}
              />

              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative p-6 flex flex-col h-full">
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{project.emoji}</span>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${project.badgeColor}`}>
                      {project.badge}
                    </span>
                    {project.featured && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                        ⭐ Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex-1 justify-center"
                    >
                      <FiExternalLink size={13} />
                      Live Demo
                    </motion.a>
                  )}
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg glass border border-white/20 text-slate-300 hover:text-white hover:border-white/40 flex-1 justify-center"
                  >
                    <FiGithub size={13} />
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More on GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Sudeep7676"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass border border-white/20 rounded-xl text-slate-400 hover:text-white hover:border-cyan-400/40 transition-all duration-300 text-sm font-medium"
          >
            <FiGithub size={16} />
            More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
