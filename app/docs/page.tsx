"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Zap, Terminal, Plug } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
  }),
};

const sections = [
  {
    icon: Zap,
    title: "Quick Start",
    desc: "Get your Tally connected and your first insight in under 5 minutes.",
    links: [
      { label: "Install the Tally Connector", href: "#" },
      { label: "Connect your first company", href: "#" },
      { label: "Run your first report", href: "#" },
    ],
  },
  {
    icon: Terminal,
    title: "API Reference",
    desc: "Full REST API for integrating Fixflow data into your own applications.",
    links: [
      { label: "Authentication & API keys", href: "#" },
      { label: "Financial data endpoints", href: "#" },
      { label: "Webhooks", href: "#" },
    ],
  },
  {
    icon: Plug,
    title: "Tally Connector",
    desc: "Everything about the desktop connector that bridges Tally and Fixflow.",
    links: [
      { label: "System requirements", href: "#" },
      { label: "Installation guide (Windows)", href: "#" },
      { label: "Troubleshooting & FAQ", href: "#" },
    ],
  },
  {
    icon: BookOpen,
    title: "Guides & Tutorials",
    desc: "In-depth walkthroughs for every major feature.",
    links: [
      { label: "Setting up AI Insights", href: "#" },
      { label: "Automating reports", href: "#" },
      { label: "Multi-company management", href: "#" },
    ],
  },
];

export default function DocsPage() {
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
          Documentation
        </motion.p>
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-6 text-[42px] font-black leading-[1.08] tracking-tight md:text-[56px]"
        >
          Everything you need<br />
          <span style={{ color: "#4ade80" }}>to build with Fixflow</span>
        </motion.h1>
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg leading-relaxed"
          style={{ color: "#6b8a6b" }}
        >
          Our documentation covers everything from initial setup to advanced API integrations. Start with the Quick Start guide or jump directly to what you need.
        </motion.p>

        {/* Search */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-10 flex items-center gap-3 rounded-2xl px-5 py-4"
          style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}
        >
          <svg className="h-4 w-4 shrink-0" style={{ color: "#4ade80" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm" style={{ color: "#6b8a6b" }}>Search documentation… (coming soon)</span>
        </motion.div>

        {/* Sections */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              custom={4 + i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: "rgba(74,222,128,0.12)" }}
                >
                  <section.icon className="h-4 w-4" style={{ color: "#4ade80" }} />
                </div>
                <p className="font-bold">{section.title}</p>
              </div>
              <p className="mb-5 text-sm leading-relaxed" style={{ color: "#6b8a6b" }}>{section.desc}</p>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 text-sm transition-colors hover:text-[#4ade80]"
                      style={{ color: "#a8d5b5" }}
                    >
                      <span className="text-xs" style={{ color: "#4ade80" }}>→</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Coming soon notice */}
        <motion.div
          custom={9} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-12 rounded-2xl p-6 text-center"
          style={{ background: "rgba(74,222,128,0.03)", border: "1px dashed rgba(74,222,128,0.2)" }}
        >
          <p className="mb-2 font-bold">Full docs coming soon</p>
          <p className="text-sm" style={{ color: "#6b8a6b" }}>
            We&apos;re writing comprehensive documentation. In the meantime, reach us at{" "}
            <a href="mailto:hello@fixflow.app" className="underline" style={{ color: "#4ade80" }}>hello@fixflow.app</a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
