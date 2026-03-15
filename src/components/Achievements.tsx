"use client";
import { motion, Variants } from "framer-motion";
import { FiAward, FiExternalLink } from "react-icons/fi";

const achievements = [
  {
    title: "Cybersecurity Simulation",
    org: "Tata Group",
    platform: "Forage",
    description:
      "Completed Tata Group's hands-on cybersecurity job simulation on Forage. Worked on real-world cyber threat scenarios, security analysis, and incident response workflows.",
    skills: ["Cybersecurity", "Threat Analysis", "Incident Response", "Security Auditing"],
    emoji: "🛡️",
    gradient: "from-blue-500/15 via-indigo-500/10 to-purple-500/15",
    border: "border-blue-500/25 hover:border-blue-400/50",
    badgeColor: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    forageBadge: "Tata Group",
    year: "2024",
  },
  {
    title: "Technology Analyst Simulation",
    org: "Deloitte",
    platform: "Forage",
    description:
      "Completed Deloitte's Technology Analyst virtual work simulation on Forage. Gained hands-on experience in technology consulting, data analysis, and enterprise system design.",
    skills: ["Tech Consulting", "Data Analysis", "Enterprise Systems", "Problem Solving"],
    emoji: "📊",
    gradient: "from-green-500/15 via-emerald-500/10 to-teal-500/15",
    border: "border-emerald-500/25 hover:border-emerald-400/50",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    forageBadge: "Deloitte",
    year: "2024",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding relative overflow-hidden">
      <div className="orb w-72 h-72 bg-emerald-500" style={{ top: "20%", right: "5%", opacity: 0.07 }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
            06. Recognition
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
            Achievements &amp; <span className="gradient-text">Certifications</span>
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative glass rounded-2xl border ${ach.border} overflow-hidden transition-all duration-400 cursor-pointer`}
            >
              {/* Top gradient strip */}
              <div className={`h-1 w-full bg-gradient-to-r ${ach.gradient}`} />

              {/* Inner glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${ach.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative p-7">
                {/* Icon + Badge row */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center text-3xl">
                      {ach.emoji}
                    </div>
                    <div>
                      <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${ach.badgeColor} mb-1`}>
                        <FiAward size={11} />
                        {ach.platform}
                      </div>
                      <p className="text-slate-400 text-xs font-mono">{ach.org}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
                    {ach.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {ach.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {ach.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Forage link */}
                <a
                  href="https://www.theforage.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <FiExternalLink size={13} />
                  View on Forage
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass rounded-2xl border border-white/10 p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "2", label: "Certifications", emoji: "🎓" },
              { value: "Forage", label: "Platform", emoji: "🌐" },
              { value: "Fortune 500", label: "Companies", emoji: "🏢" },
              { value: "2024", label: "Year", emoji: "📅" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl mb-1">{stat.emoji}</p>
                <p className="text-lg font-bold gradient-text">{stat.value}</p>
                <p className="text-slate-500 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
