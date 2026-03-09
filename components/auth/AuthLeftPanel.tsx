"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, Brain, TrendingUp, ShieldCheck } from "lucide-react";
import {
  ParticleCanvas,
  WaveContours,
  LeftPanelOrbs,
  LightSweep,
} from "./AnimatedAuthBackground";

const features = [
  { icon: BarChart3, label: "Live P&L", desc: "Real-time profit & loss from Tally" },
  { icon: Brain, label: "AI CFO", desc: "Ask anything in plain English" },
  { icon: TrendingUp, label: "Cashflow", desc: "30-day forecasts, always current" },
  { icon: ShieldCheck, label: "Secure", desc: "Bank-grade encryption, always" },
];

export function AuthLeftPanel() {
  return (
    <div
      className="relative hidden lg:flex w-1/2 flex-col overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #05070A 0%, #0B1220 55%, #060C18 100%)",
        minHeight: "100vh",
      }}
    >
      {/* ── Animation layers ───────────────────────────────────────────── */}
      <LeftPanelOrbs />
      <WaveContours />
      <LightSweep />
      <ParticleCanvas />

      {/* ── Vignette overlay ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 45%, rgba(5,7,10,0.65) 100%)",
        }}
      />

      {/* ── Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col justify-between px-12 py-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <svg
              width="30"
              height="30"
              viewBox="0 0 100 100"
              fill="none"
              className="text-[#4DA3FF] transition-colors group-hover:text-[#3B82F6]"
            >
              <path
                d="M5 5 L95 5 L95 22 L55 22 L20 55 L5 55 Z"
                fill="currentColor"
              />
              <path
                d="M45 63 L80 63 L95 45 L95 95 L5 95 L5 78 Z"
                fill="currentColor"
              />
            </svg>
            <span
              className="text-[17px] font-semibold tracking-tight"
              style={{ color: "#E8EEF7" }}
            >
              Fixflow
            </span>
          </Link>
        </motion.div>

        {/* Hero copy */}
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-[2.6rem] leading-[1.15] font-extrabold tracking-tight"
              style={{ color: "#F3F6FB" }}
            >
              Financial clarity
              <br />
              <span style={{ color: "#4DA3FF" }}>for ambitious</span>
              <br />
              businesses.
            </h1>
            <p
              className="mt-5 text-[15px] leading-relaxed max-w-[340px]"
              style={{ color: "#6B7E96" }}
            >
              Connect Tally, track cashflow, monitor receivables, and ask your
              AI CFO anything — all in one place.
            </p>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3.5">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(59,130,246,0.18)",
                  }}
                >
                  <Icon size={14} className="text-[#4DA3FF]" />
                </div>
                <div>
                  <span
                    className="text-[13px] font-semibold"
                    style={{ color: "#C8D6E5" }}
                  >
                    {label}
                  </span>
                  <span
                    className="ml-2 text-[12px]"
                    style={{ color: "#4A5D72" }}
                  >
                    {desc}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Social proof footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-3"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {["#2A4A6B", "#1E3A5C", "#274569"].map((bg, i) => (
              <div
                key={i}
                className="h-7 w-7 rounded-full border-[1.5px]"
                style={{
                  background: bg,
                  borderColor: "#0A0D12",
                }}
              />
            ))}
          </div>
          <p className="text-[12px]" style={{ color: "#4A5D72" }}>
            Trusted by{" "}
            <span style={{ color: "#6B7E96" }} className="font-medium">
              500+ Indian SMEs
            </span>{" "}
            for financial clarity
          </p>
        </motion.div>
      </div>
    </div>
  );
}
