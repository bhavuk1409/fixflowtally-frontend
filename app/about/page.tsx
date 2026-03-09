"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Shield, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
  }),
};

const team = [
  { name: "Bhavuk Agrawal", role: "Founder & CEO", bio: "Building the finance layer every business deserves." },
  { name: "Engineering Team", role: "Backend & Infrastructure", bio: "Obsessed with reliability, speed, and developer experience." },
  { name: "Design Team", role: "Product & UX", bio: "Turning complexity into clarity for every user." },
];

const values = [
  { icon: Zap, title: "Move fast, build right", desc: "We ship quickly without cutting corners on security, data integrity, or user experience." },
  { icon: Shield, title: "Trust is everything", desc: "Your financial data is sacred. We treat it with enterprise-grade security and radical transparency." },
  { icon: Users, title: "Built for real businesses", desc: "Every feature is driven by real-world pain points from founders, accountants, and finance teams." },
];

export default function AboutPage() {
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
        <Link
          href="/sign-up"
          className="rounded-full px-5 py-2 text-sm font-bold text-black transition hover:opacity-90"
          style={{ background: "#4ade80" }}
        >
          Get started free
        </Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 pb-32 pt-20">
        {/* Header */}
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "#4ade80" }}
        >
          About
        </motion.p>
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-6 text-[42px] font-black leading-[1.08] tracking-tight md:text-[56px]"
        >
          Finance intelligence<br />
          <span style={{ color: "#4ade80" }}>for every business</span>
        </motion.h1>
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg leading-relaxed"
          style={{ color: "#6b8a6b" }}
        >
          Fixflow was born from a simple observation: most small and medium businesses manage their finances in spreadsheets, disconnected tools, and manual exports — while enterprise companies have full-time finance teams and expensive ERP systems.
        </motion.p>

        <motion.p
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-4 text-lg leading-relaxed"
          style={{ color: "#6b8a6b" }}
        >
          We&apos;re building the AI-native finance layer that gives every business — from a 5-person startup to a 500-person mid-market company — the same intelligence, automation, and clarity that was previously only available to the Fortune 500.
        </motion.p>

        {/* Divider */}
        <motion.hr
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="my-16"
          style={{ borderColor: "rgba(74,222,128,0.15)" }}
        />

        {/* Mission */}
        <motion.h2
          custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-4 text-2xl font-bold"
        >
          Our mission
        </motion.h2>
        <motion.p
          custom={6} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg leading-relaxed"
          style={{ color: "#6b8a6b" }}
        >
          Make financial intelligence accessible, automated, and actionable for every business — starting with Tally, India&apos;s most widely used accounting software.
        </motion.p>

        {/* Values */}
        <div className="mt-16 space-y-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              custom={7 + i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex gap-5 rounded-2xl p-6"
              style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: "rgba(74,222,128,0.12)" }}
              >
                <v.icon className="h-5 w-5" style={{ color: "#4ade80" }} />
              </div>
              <div>
                <p className="mb-1 font-bold">{v.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#6b8a6b" }}>{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team */}
        <motion.h2
          custom={10} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-8 mt-20 text-2xl font-bold"
        >
          The team
        </motion.h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              custom={11 + i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-2xl p-6 text-center"
              style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}
            >
              <div
                className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-black"
                style={{ background: "rgba(74,222,128,0.15)", color: "#4ade80" }}
              >
                {member.name[0]}
              </div>
              <p className="mb-0.5 font-bold">{member.name}</p>
              <p className="mb-3 text-xs" style={{ color: "#4ade80" }}>{member.role}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#6b8a6b" }}>{member.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          custom={14} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-20 rounded-3xl p-10 text-center"
          style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}
        >
          <p className="mb-2 text-2xl font-black">Ready to see it in action?</p>
          <p className="mb-8 text-sm" style={{ color: "#6b8a6b" }}>Connect your Tally in minutes. No credit card required.</p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-black transition hover:opacity-90"
            style={{ background: "#4ade80" }}
          >
            Get started free →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
