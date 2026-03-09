"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
  }),
};

const entries = [
  {
    version: "v1.4.0",
    date: "July 2025",
    tag: "Major",
    changes: [
      { type: "new", text: "AI CFO chat now supports follow-up questions with full conversation context" },
      { type: "new", text: "Multi-company aggregation — see consolidated P&L across all connected companies" },
      { type: "improved", text: "Connector sync speed improved 3× with delta-only fetch" },
      { type: "fixed", text: "Fixed ledger mapping edge case for inter-company transfers" },
    ],
  },
  {
    version: "v1.3.0",
    date: "June 2025",
    tag: "Feature",
    changes: [
      { type: "new", text: "Scheduled reports — email any report on daily / weekly / monthly cadence" },
      { type: "new", text: "Anomaly detection alerts for unusual expense spikes" },
      { type: "improved", text: "Dashboard KPI cards now load 60% faster with server-side caching" },
      { type: "fixed", text: "Fixed time zone offset bug in date range filters" },
    ],
  },
  {
    version: "v1.2.0",
    date: "May 2025",
    tag: "Feature",
    changes: [
      { type: "new", text: "Voucher-level drill-down from any chart or table" },
      { type: "new", text: "Export to PDF with custom branding (logo, colors)" },
      { type: "improved", text: "Redesigned Insights page with category breakdown and trend lines" },
    ],
  },
  {
    version: "v1.1.0",
    date: "April 2025",
    tag: "Improvements",
    changes: [
      { type: "improved", text: "Connector installer now supports silent deployment for IT teams" },
      { type: "improved", text: "Auth redesigned with custom forms and improved error states" },
      { type: "fixed", text: "Resolved connector disconnect issue on Windows 11 22H2" },
    ],
  },
  {
    version: "v1.0.0",
    date: "March 2025",
    tag: "Launch",
    changes: [
      { type: "new", text: "Fixflow launches publicly 🎉" },
      { type: "new", text: "Real-time Tally connector for Windows" },
      { type: "new", text: "AI Insights: automated P&L analysis, cash flow, and anomaly detection" },
      { type: "new", text: "Report builder with 12 standard templates" },
    ],
  },
];

const tagColor: Record<string, React.CSSProperties> = {
  Major: { background: "rgba(74,222,128,0.2)", color: "#4ade80" },
  Feature: { background: "rgba(96,165,250,0.15)", color: "#60a5fa" },
  Improvements: { background: "rgba(251,191,36,0.15)", color: "#fbbf24" },
  Launch: { background: "rgba(244,114,182,0.15)", color: "#f472b6" },
};

const typeColor: Record<string, string> = {
  new: "#4ade80",
  improved: "#60a5fa",
  fixed: "#fbbf24",
};

export default function ChangelogPage() {
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

      <div className="mx-auto max-w-2xl px-6 pb-32 pt-20">
        {/* Header */}
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "#4ade80" }}
        >
          Changelog
        </motion.p>
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-6 text-[42px] font-black leading-[1.08] tracking-tight md:text-[52px]"
        >
          What&apos;s new in<br />
          <span style={{ color: "#4ade80" }}>Fixflow</span>
        </motion.h1>
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg leading-relaxed"
          style={{ color: "#6b8a6b" }}
        >
          Every update, improvement, and fix — in one place. We ship frequently.
        </motion.p>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line */}
          <div
            className="absolute left-[7px] top-2 h-full w-px"
            style={{ background: "linear-gradient(to bottom, rgba(74,222,128,0.3), transparent)" }}
          />

          <div className="space-y-14">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.version}
                custom={3 + i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="relative pl-8"
              >
                {/* Dot */}
                <div
                  className="absolute left-0 top-1 h-4 w-4 rounded-full border-2"
                  style={{
                    background: i === 0 ? "#4ade80" : "#0a1a0f",
                    borderColor: i === 0 ? "#4ade80" : "rgba(74,222,128,0.3)",
                  }}
                />

                {/* Version header */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <p className="text-xl font-black">{entry.version}</p>
                  <span
                    className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                    style={tagColor[entry.tag]}
                  >
                    {entry.tag}
                  </span>
                  <span className="text-sm" style={{ color: "#6b8a6b" }}>{entry.date}</span>
                </div>

                {/* Changes */}
                <div
                  className="rounded-2xl p-5"
                  style={{ background: "rgba(74,222,128,0.03)", border: "1px solid rgba(74,222,128,0.08)" }}
                >
                  <ul className="space-y-3">
                    {entry.changes.map((change, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span
                          className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase"
                          style={{ background: `${typeColor[change.type]}20`, color: typeColor[change.type] }}
                        >
                          {change.type}
                        </span>
                        <span style={{ color: "#a8d5b5" }}>{change.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
