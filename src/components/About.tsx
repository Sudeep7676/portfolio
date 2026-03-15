"use client";
import { motion } from "framer-motion";
import { FiBook, FiAward } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

const education = [
  {
    degree: "B.E. Computer Science & Engineering",
    institution: "Government Engineering College Challakere",
    period: "2022 – 2026",
    grade: "CGPA: 8.63",
    icon: HiAcademicCap,
  },
  {
    degree: "Pre-University (PCMB)",
    institution: "BEST PU Science and Commerce College Talikoti",
    period: "2020 – 2022",
    grade: "Percentage: 85%",
    icon: FiBook,
  },
  {
    degree: "SSLC",
    institution: "SSBHS SHARAN SOMNAL",
    period: "2019 – 2020",
    grade: "Percentage: 91%",
    icon: FiAward,
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
            01. Who Am I
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Photo + Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
            className="flex flex-col items-center gap-8"
          >
            {/* Photo with glowing ring */}
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full p-1 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-neon-cyan">
                <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center overflow-hidden">
                  <img
                    src="/photo.jpg"
                    alt="Sudeep Vishwakarma"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-2 -right-2 px-4 py-2 glass border border-cyan-400/30 rounded-full"
              >
                <span className="text-sm font-semibold gradient-text">
                  CGPA: 8.63
                </span>
              </motion.div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {[
                { value: "3+", label: "Projects" },
                { value: "4+", label: "Tech Stacks" },
                { value: "2+", label: "Internships" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass glass-hover rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-black gradient-text">
                    {stat.value}
                  </p>
                  <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio + Education Timeline */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={2}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Hello, I&apos;m Sudeep 👋
              </h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                I&apos;m a passionate Full Stack Developer and Computer Science
                graduate with a CGPA of{" "}
                <span className="text-cyan-400 font-semibold">8.63</span>, skilled
                in building end-to-end web applications using modern technologies.
              </p>
              <p className="text-slate-400 leading-relaxed">
                From crafting responsive frontends with{" "}
                <span className="text-purple-400 font-medium">React & Next.js</span>{" "}
                to designing robust backends with{" "}
                <span className="text-cyan-400 font-medium">Java & Spring Boot</span>,
                I love solving real-world problems with elegant code. When I&apos;m not
                coding, I explore AI/ML and cloud technologies.
              </p>
            </motion.div>

            {/* Education Timeline */}
            <div>
              <motion.h3
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={3}
                className="text-lg font-bold text-white mb-6 flex items-center gap-2"
              >
                <HiAcademicCap className="text-cyan-400" size={22} />
                Education
              </motion.h3>
              <div className="relative pl-8 border-l border-white/10">
                {education.map((edu, i) => (
                  <motion.div
                    key={edu.degree}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    custom={4 + i}
                    className="relative mb-6 last:mb-0"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[2.35rem] top-1 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 border-2 border-dark-900 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <div className="glass glass-hover rounded-xl p-4 border border-white/10">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-white text-sm">
                          {edu.degree}
                        </h4>
                        <span className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">
                          {edu.grade}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{edu.institution}</p>
                      <p className="text-slate-500 text-xs mt-1 font-mono">
                        {edu.period}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
