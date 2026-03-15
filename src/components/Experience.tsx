"use client";
import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";

const experiences = [
  {
    role: "Software Development Intern",
    company: "Tap Academy",
    type: "Internship",
    period: "Feb 2026 – Jul 2026",
    description:
      "Working on full-stack web development projects using Java Spring Boot and React. Contributing to production-grade applications, participating in agile sprints, and collaborating with senior engineers.",
    tags: ["Java", "Spring Boot", "React", "MySQL", "REST APIs"],
    color: "from-cyan-400 to-blue-500",
    dotColor: "bg-cyan-400",
    iconBg: "bg-cyan-400/10 border-cyan-400/30",
    icon: "💻",
    current: true,
  },
  {
    role: "Placement Training",
    company: "Seventh Sense Talent Solutions",
    type: "Training",
    period: "Aug 2025",
    description:
      "Intensive placement preparation program covering DSA, system design, aptitude, and interview skills. Practiced 100+ coding problems and mock interviews with industry professionals.",
    tags: ["DSA", "System Design", "Problem Solving", "Interview Prep"],
    color: "from-purple-400 to-pink-500",
    dotColor: "bg-purple-400",
    iconBg: "bg-purple-400/10 border-purple-400/30",
    icon: "🎯",
    current: false,
  },
  {
    role: "Cloud Computing Workshop",
    company: "Search Creators Pvt Ltd",
    type: "Workshop",
    period: "Apr 2025",
    description:
      "Hands-on workshop covering AWS fundamentals, cloud architecture, deployment strategies, serverless computing, and DevOps practices with real-world project walkthroughs.",
    tags: ["AWS", "Cloud Architecture", "DevOps", "Serverless"],
    color: "from-amber-400 to-orange-500",
    dotColor: "bg-amber-400",
    iconBg: "bg-amber-400/10 border-amber-400/30",
    icon: "☁️",
    current: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="orb w-80 h-80 bg-cyan-500" style={{ bottom: "10%", left: "-5%", opacity: 0.07 }} />

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
            05. Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/60 via-purple-500/40 to-amber-400/30 md:-translate-x-0.5" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                    <div
                      className={`w-5 h-5 rounded-full ${exp.dotColor} border-4 border-dark-900 shadow-lg`}
                    />
                  </div>

                  {/* Content Card — offset for mobile, half-width for desktop */}
                  <div
                    className={`ml-16 md:ml-0 w-full md:w-[calc(50%-2rem)] ${
                      isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl border ${exp.iconBg} flex items-center justify-center flex-shrink-0`}
                        >
                          <span className="text-lg">{exp.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <h3 className="text-base font-bold text-white truncate">
                              {exp.role}
                            </h3>
                            {exp.current && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/30 font-mono flex-shrink-0">
                                Current
                              </span>
                            )}
                          </div>
                          <p className={`text-sm font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-3 mb-3 text-xs text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                          <MdWorkOutline size={12} />
                          {exp.type}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FiBriefcase size={12} />
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-slate-300 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
