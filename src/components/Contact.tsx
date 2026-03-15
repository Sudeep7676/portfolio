"use client";
import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiSend, FiUser, FiMessageSquare, FiCheck, FiLoader } from "react-icons/fi";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    // Simulate submission
    await new Promise((res) => setTimeout(res, 1800));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "sudeepvishwakarma5456@gmail.com",
      href: "mailto:sudeepvishwakarma5456@gmail.com",
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "07676 102096",
      href: "tel:07676102096",
    },
  ];

  const socials = [
    { icon: FiGithub, href: "https://github.com/Sudeep7676", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/sudeep-v7676/", label: "LinkedIn" },
    { icon: FiMail, href: "mailto:sudeepvishwakarma5456@gmail.com", label: "Email" },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="orb w-96 h-96 bg-purple-600" style={{ top: "10%", left: "-10%", opacity: 0.08 }} />
      <div className="orb w-72 h-72 bg-cyan-500" style={{ bottom: "10%", right: "-5%", opacity: 0.07, animationDelay: "2s" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
            07. Let&apos;s Connect
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto" />
          <p className="text-slate-400 mt-6 max-w-xl mx-auto">
            Have a project in mind or just want to say hello? My inbox is always open. I&apos;ll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            {/* Contact Info Cards */}
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="group flex items-center gap-4 glass rounded-2xl border border-white/10 p-5 hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 group-hover:shadow-neon-cyan transition-all duration-300">
                  <info.icon className="text-cyan-400" size={20} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs font-mono mb-0.5">{info.label}</p>
                  <p className="text-white font-medium text-sm break-all">{info.value}</p>
                </div>
              </a>
            ))}

            {/* Socials */}
            <div className="glass rounded-2xl border border-white/10 p-6">
              <p className="text-slate-400 text-sm font-mono mb-4">Find me on</p>
              <div className="flex gap-4">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300"
                    title={label}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="glass rounded-2xl border border-green-500/20 p-5 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <p className="text-sm text-slate-300">
                <span className="text-green-400 font-semibold">Available</span> for full-time roles and freelance projects
              </p>
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl border border-white/10 p-8 flex flex-col gap-5"
            >
              {/* Name */}
              <div className="relative">
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  <FiUser className="inline mr-1.5" size={11} />
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={() => handleBlur("name")}
                  placeholder="John Doe"
                  required
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-400/60 focus:bg-white/8 focus:shadow-neon-cyan ${
                    touched.name && !form.name
                      ? "border-red-400/50"
                      : "border-white/15"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  <FiMail className="inline mr-1.5" size={11} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  placeholder="john@example.com"
                  required
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-400/60 focus:shadow-neon-cyan ${
                    touched.email && !form.email
                      ? "border-red-400/50"
                      : "border-white/15"
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">
                  <FiMessageSquare className="inline mr-1.5" size={11} />
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onBlur={() => handleBlur("message")}
                  placeholder="Hey Sudeep, I'd love to discuss a project with you..."
                  required
                  rows={5}
                  className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-300 focus:border-cyan-400/60 focus:shadow-neon-cyan resize-none ${
                    touched.message && !form.message
                      ? "border-red-400/50"
                      : "border-white/15"
                  }`}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={status === "idle" ? { scale: 1.02, boxShadow: "0 0 30px rgba(0,245,255,0.3)" } : {}}
                whileTap={status === "idle" ? { scale: 0.98 } : {}}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white"
                } disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                <AnimatePresence mode="wait">
                  {status === "loading" ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FiLoader className="animate-spin" size={16} />
                      Sending...
                    </motion.span>
                  ) : status === "success" ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FiCheck size={16} />
                      Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <FiSend size={16} />
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
