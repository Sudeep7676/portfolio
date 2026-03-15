"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "Java", level: 90, color: "from-orange-400 to-amber-500" },
  { name: "JavaScript", level: 88, color: "from-yellow-400 to-orange-400" },
  { name: "React.js", level: 87, color: "from-cyan-400 to-blue-500" },
  { name: "Next.js", level: 82, color: "from-slate-300 to-white" },
  { name: "Spring Boot", level: 85, color: "from-green-400 to-emerald-500" },
  { name: "Node.js", level: 75, color: "from-green-500 to-teal-400" },
  { name: "HTML/CSS", level: 92, color: "from-red-400 to-orange-500" },
  { name: "Tailwind CSS", level: 88, color: "from-cyan-400 to-teal-500" },
  { name: "MySQL", level: 80, color: "from-blue-400 to-indigo-500" },
  { name: "Python", level: 78, color: "from-yellow-300 to-blue-400" },
];

const techIcons = [
  { name: "Java", emoji: "☕", bg: "from-orange-500/20 to-amber-500/20", border: "border-orange-500/30" },
  { name: "JavaScript", emoji: "⚡", bg: "from-yellow-500/20 to-amber-500/20", border: "border-yellow-500/30" },
  { name: "React", emoji: "⚛️", bg: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/30" },
  { name: "Next.js", emoji: "▲", bg: "from-slate-500/20 to-white/10", border: "border-slate-500/30" },
  { name: "Spring Boot", emoji: "🍃", bg: "from-green-500/20 to-emerald-500/20", border: "border-green-500/30" },
  { name: "Node.js", emoji: "🟢", bg: "from-green-500/20 to-teal-500/20", border: "border-green-500/30" },
  { name: "MySQL", emoji: "🗄️", bg: "from-blue-500/20 to-indigo-500/20", border: "border-blue-500/30" },
  { name: "Python", emoji: "🐍", bg: "from-yellow-500/20 to-blue-500/20", border: "border-yellow-500/30" },
  { name: "Tailwind", emoji: "💨", bg: "from-cyan-500/20 to-teal-500/20", border: "border-cyan-500/30" },
  { name: "HTML/CSS", emoji: "🎨", bg: "from-red-500/20 to-orange-500/20", border: "border-red-500/30" },
];

function SkillBar({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-cyan-400">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <motion.div
          className={`skill-fill bg-gradient-to-r ${skill.color}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.07, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-800/30 to-transparent pointer-events-none" />

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
            02. Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skill Bars */}
          <div className="glass rounded-2xl p-8 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Proficiency Levels
            </h3>
            <div className="flex flex-col gap-5">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Tech Icon Grid */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-2xl p-8 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Tech Stack
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {techIcons.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br ${tech.bg} border ${tech.border} cursor-pointer transition-all duration-300 hover:shadow-neon-cyan glass-hover`}
                  >
                    <span className="text-2xl">{tech.emoji}</span>
                    <span className="text-xs font-medium text-slate-300">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Extra Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 border border-purple-500/20"
            >
              <p className="text-slate-400 text-sm leading-relaxed">
                🚀 Currently exploring{" "}
                <span className="text-purple-400 font-medium">
                  AI/ML integration
                </span>{" "}
                and{" "}
                <span className="text-cyan-400 font-medium">
                  Cloud Infrastructure
                </span>{" "}
                to build smarter, scalable applications at the edge.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
