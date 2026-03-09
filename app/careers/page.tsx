"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Clock, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
  }),
};

const openRoles = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote (India / Global)",
    type: "Full-time",
    desc: "Own end-to-end features across our Next.js frontend and FastAPI backend. Deep experience with TypeScript, Python, and cloud infrastructure required.",
  },
  {
    title: "AI / ML Engineer",
    team: "AI",
    location: "Remote",
    type: "Full-time",
    desc: "Build and improve the AI finance models that power Fixflow Insights, anomaly detection, and the AI CFO chat interface. LLM fine-tuning experience a plus.",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Remote",
    type: "Full-time",
    desc: "Shape the visual and interaction language of Fixflow. You care deeply about typography, data visualization, and making complex finance simple.",
  },
  {
    title: "Growth & Partnerships",
    team: "Business",
    location: "India",
    type: "Full-time",
    desc: "Drive Tally partner integrations, enterprise sales, and growth experiments. CPA or finance background is a strong plus.",
  },
];

const perks = [
  "Fully remote-first culture",
  "Competitive equity & salary",
  "Health insurance",
  "₹50k annual learning budget",
  "Latest hardware of your choice",
  "Async-friendly, no pointless meetings",
  "Direct access to founders",
  "Work on hard, meaningful problems",
];

export default function CareersPage() {
  return (
    <main style={{ background: "#0a1a0f", minHeight: "100vh", color: "#e8f5e9" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(10,26,15,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(74,222,128,0.1)" }}
      >
        <Link href="/" className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75" style={{ color: "#4ade80" }}>
          <ArrowLeft className="h-4 w-4" />
          Back to Fixflow
        </Link>
        <a
          href="mailto:careers@fixflow.app"
          className="rounded-full px-5 py-2 text-sm font-bold text-black transition hover:opacity-90"
          style={{ background: "#4ade80" }}
        >
          Send your CV
        </a>
      </nav>

      <div className="mx-auto max-w-3xl px-6 pb-32 pt-20">
        {/* Header */}
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "#4ade80" }}
        >
          Careers
        </motion.p>
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-6 text-[42px] font-black leading-[1.08] tracking-tight md:text-[56px]"
        >
          Help us build the<br />
          <span style={{ color: "#4ade80" }}>future of finance</span>
        </motion.h1>
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg leading-relaxed"
          style={{ color: "#6b8a6b" }}
        >
          We&apos;re a small, high-conviction team building AI-native financial intelligence for businesses. We move fast, think deeply, and care a lot about the work. If that sounds like you — read on.
        </motion.p>

        {/* Perks */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-14 rounded-3xl p-8"
          style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}
        >
          <p className="mb-6 text-lg font-bold">What we offer</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm" style={{ color: "#a8d5b5" }}>
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "rgba(74,222,128,0.2)", color: "#4ade80" }}>✓</span>
                {perk}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Open roles */}
        <motion.h2
          custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-8 mt-20 text-2xl font-bold"
        >
          Open roles
        </motion.h2>

        <div className="space-y-4">
          {openRoles.map((role, i) => (
            <motion.div
              key={role.title}
              custom={5 + i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="group cursor-pointer rounded-2xl p-6 transition-all hover:border-[rgba(74,222,128,0.3)]"
              style={{ background: "rgba(74,222,128,0.03)", border: "1px solid rgba(74,222,128,0.1)" }}
            >
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-bold">{role.title}</p>
                  <p className="text-sm" style={{ color: "#4ade80" }}>{role.team}</p>
                </div>
                <a
                  href={`mailto:careers@fixflow.app?subject=Application: ${role.title}`}
                  className="flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-black transition hover:opacity-90"
                  style={{ background: "#4ade80" }}
                >
                  Apply <ArrowRight className="h-3 w-3" />
                </a>
              </div>
              <div className="mb-3 flex flex-wrap gap-4">
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#6b8a6b" }}>
                  <MapPin className="h-3 w-3" />{role.location}
                </span>
                <span className="flex items-center gap-1.5 text-xs" style={{ color: "#6b8a6b" }}>
                  <Clock className="h-3 w-3" />{role.type}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#6b8a6b" }}>{role.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* General application */}
        <motion.div
          custom={10} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-10 rounded-3xl p-10 text-center"
          style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}
        >
          <p className="mb-2 text-xl font-black">Don&apos;t see your role?</p>
          <p className="mb-8 text-sm" style={{ color: "#6b8a6b" }}>We&apos;re always looking for exceptional people. Send us a note and tell us what you&apos;d build.</p>
          <a
            href="mailto:careers@fixflow.app"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-black transition hover:opacity-90"
            style={{ background: "#4ade80" }}
          >
            careers@fixflow.app →
          </a>
        </motion.div>
      </div>
    </main>
  );
}
