"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface AuthShellProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
  mode?: "sign-in" | "sign-up";
}

export function AuthShell({ children, footer, mode = "sign-in" }: AuthShellProps) {
  return (
    <div className="flex min-h-screen" style={{ background: "#0a1a0f" }}>

      {/* ── Left panel — branding ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative hidden flex-col justify-between overflow-hidden px-12 py-10 lg:flex lg:w-[45%]"
        style={{ background: "#0a1a0f" }}
      >
        {/* Subtle green glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(74,222,128,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="relative z-10 flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none" style={{ color: "#4ade80" }}>
              <path d="M2 6 L26 6 Q38 6 38 18 Q38 26 28 28 L14 28 L22 20 L28 20 Q30 20 30 18 Q30 16 28 16 L2 16 Z" fill="currentColor" />
              <path d="M12 32 L30 32 Q38 32 38 26 L38 30 Q38 38 28 38 L10 38 Z" fill="currentColor" opacity="0.75" />
            </svg>
            <span className="text-[15px] font-bold text-white">Fixflow</span>
          </Link>
        </motion.div>

        {/* Hero copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h1 className="text-[40px] font-extrabold leading-[1.1] tracking-tight text-white">
            {mode === "sign-in"
              ? <>Financial clarity<br />scales with your<br /><span style={{ color: "#4ade80" }}>ambition.</span></>
              : <>Connect Tally.<br />Get instant<br /><span style={{ color: "#4ade80" }}>AI-powered clarity.</span></>
            }
          </h1>
          <p className="mt-4 max-w-[320px] text-[14px] leading-relaxed" style={{ color: "#6b8a6b" }}>
            {mode === "sign-in"
              ? "Build intelligent financial visibility with live P&L, cashflow, and an AI analyst that knows your books."
              : "Join businesses already using Fixflow to understand their Tally data in real time."}
          </p>
        </motion.div>

        {/* Bottom label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative z-10 text-[12px]"
          style={{ color: "#3a5a3a" }}
        >
          Fixflow
        </motion.p>
      </motion.div>

      {/* ── Right panel — form ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-1 flex-col items-center justify-center px-8 py-12 lg:px-16"
        style={{ background: "#0d1f12" }}
      >
        {/* Mobile logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/" className="mb-10 flex items-center gap-2 lg:hidden">
            <svg width="22" height="22" viewBox="0 0 40 40" fill="none" style={{ color: "#4ade80" }}>
              <path d="M2 6 L26 6 Q38 6 38 18 Q38 26 28 28 L14 28 L22 20 L28 20 Q30 20 30 18 Q30 16 28 16 L2 16 Z" fill="currentColor" />
              <path d="M12 32 L30 32 Q38 32 38 26 L38 30 Q38 38 28 38 L10 38 Z" fill="currentColor" opacity="0.75" />
            </svg>
            <span className="text-[14px] font-bold text-white">Fixflow</span>
          </Link>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[440px]"
        >
          {children}
        </motion.div>

        {/* Footer */}
        {footer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-6 text-[13px]"
            style={{ color: "#6b8a6b" }}
          >
            {footer}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
