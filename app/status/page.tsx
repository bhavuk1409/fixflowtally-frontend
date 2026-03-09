"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertCircle, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
  }),
};

type ServiceStatus = "operational" | "degraded" | "incident";

const services: { name: string; desc: string; status: ServiceStatus }[] = [
  { name: "API", desc: "REST API & authentication", status: "operational" },
  { name: "Tally Connector", desc: "Desktop connector sync service", status: "operational" },
  { name: "AI Insights", desc: "LLM inference & classification", status: "operational" },
  { name: "Report Engine", desc: "PDF generation & email delivery", status: "operational" },
  { name: "Web App", desc: "Dashboard, settings & UI", status: "operational" },
  { name: "Database", desc: "PostgreSQL primary & replica", status: "operational" },
  { name: "File Storage", desc: "S3-compatible object storage", status: "operational" },
];

const incidents: { date: string; title: string; body: string; resolved: boolean }[] = [
  {
    date: "June 18, 2025 · 14:35 IST",
    title: "Resolved: Connector sync delays",
    body: "A misconfigured rate limit on the ingest API caused some connector syncs to queue longer than expected. The limit was corrected and all queued syncs processed within 22 minutes.",
    resolved: true,
  },
  {
    date: "May 3, 2025 · 09:12 IST",
    title: "Resolved: Report delivery delay",
    body: "A third-party email provider outage caused a 45-minute delay in scheduled report delivery. All reports were sent once the provider recovered.",
    resolved: true,
  },
];

const statusConfig = {
  operational: { label: "Operational", icon: CheckCircle, color: "#4ade80", bg: "rgba(74,222,128,0.1)" },
  degraded: { label: "Degraded performance", icon: Clock, color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  incident: { label: "Incident", icon: AlertCircle, color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

const allOperational = services.every((s) => s.status === "operational");

export default function StatusPage() {
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
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: "#4ade80" }}>
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" />
          {allOperational ? "All systems operational" : "Incident in progress"}
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-6 pb-32 pt-20">
        {/* Header */}
        <motion.p
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "#4ade80" }}
        >
          Status
        </motion.p>
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-6 text-[42px] font-black leading-[1.08] tracking-tight md:text-[52px]"
        >
          System status
        </motion.h1>

        {/* Overall status banner */}
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-12 flex items-center gap-4 rounded-2xl p-6"
          style={{
            background: allOperational ? "rgba(74,222,128,0.07)" : "rgba(248,113,113,0.07)",
            border: `1px solid ${allOperational ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.2)"}`,
          }}
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ background: allOperational ? "rgba(74,222,128,0.15)" : "rgba(248,113,113,0.15)" }}
          >
            <CheckCircle className="h-5 w-5" style={{ color: allOperational ? "#4ade80" : "#f87171" }} />
          </div>
          <div>
            <p className="font-bold">{allOperational ? "All systems operational" : "Incident in progress"}</p>
            <p className="text-sm" style={{ color: "#6b8a6b" }}>Last updated: July 2025 · Updated in real time</p>
          </div>
        </motion.div>

        {/* Services */}
        <motion.h2
          custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-5 text-lg font-bold"
        >
          Services
        </motion.h2>
        <div className="space-y-3">
          {services.map((service, i) => {
            const cfg = statusConfig[service.status];
            return (
              <motion.div
                key={service.name}
                custom={4 + i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex items-center justify-between rounded-xl px-5 py-4"
                style={{ background: "rgba(74,222,128,0.03)", border: "1px solid rgba(74,222,128,0.08)" }}
              >
                <div>
                  <p className="font-semibold text-sm">{service.name}</p>
                  <p className="text-xs" style={{ color: "#6b8a6b" }}>{service.desc}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full px-3 py-1" style={{ background: cfg.bg }}>
                  <cfg.icon className="h-3.5 w-3.5" style={{ color: cfg.color }} />
                  <span className="text-xs font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Uptime */}
        <motion.div
          custom={12} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-10 grid grid-cols-3 gap-4"
        >
          {[
            { label: "30-day uptime", value: "99.97%" },
            { label: "Avg response time", value: "82 ms" },
            { label: "Incidents (30d)", value: "0" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 text-center"
              style={{ background: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.1)" }}
            >
              <p className="text-2xl font-black" style={{ color: "#4ade80" }}>{stat.value}</p>
              <p className="mt-1 text-xs" style={{ color: "#6b8a6b" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Past incidents */}
        <motion.h2
          custom={13} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-5 mt-16 text-lg font-bold"
        >
          Past incidents
        </motion.h2>
        <div className="space-y-4">
          {incidents.map((inc, i) => (
            <motion.div
              key={inc.title}
              custom={14 + i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-2xl p-6"
              style={{ background: "rgba(74,222,128,0.03)", border: "1px solid rgba(74,222,128,0.08)" }}
            >
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="text-xs" style={{ color: "#6b8a6b" }}>{inc.date}</span>
                {inc.resolved && (
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase" style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}>
                    Resolved
                  </span>
                )}
              </div>
              <p className="mb-2 font-bold">{inc.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#6b8a6b" }}>{inc.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
