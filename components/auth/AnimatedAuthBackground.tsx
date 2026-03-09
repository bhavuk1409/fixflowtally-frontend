"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────────
   Canvas: sparse floating dust — left panel only
───────────────────────────────────────────────────────────────────────────── */
export function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const COUNT = 38;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.0 + 0.25,
      dx: (Math.random() - 0.5) * 0.14,
      dy: (Math.random() - 0.5) * 0.14,
      o: Math.random() * 0.22 + 0.06,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(77,163,255,${p.o})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.55 }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SVG waveform — abstract finance / data contour lines
───────────────────────────────────────────────────────────────────────────── */
export function WaveContours() {
  // Two slow animated waveform paths
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.055 }}
    >
      {/* Horizontal grid */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={i * 48}
          x2="600" y2={i * 48}
          stroke="#4DA3FF" strokeWidth="0.5"
        />
      ))}
      {/* Vertical grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 55} y1="0"
          x2={i * 55} y2="900"
          stroke="#4DA3FF" strokeWidth="0.4"
        />
      ))}
      {/* Abstract cashflow waveform */}
      <path
        d="M0 560 Q75 480 150 530 Q225 580 300 500 Q375 420 450 470 Q525 520 600 440"
        fill="none" stroke="#4DA3FF" strokeWidth="1.2"
      />
      <path
        d="M0 620 Q90 560 180 600 Q270 640 360 570 Q450 500 600 550"
        fill="none" stroke="#22D3EE" strokeWidth="0.8"
      />
      <path
        d="M0 680 Q120 640 240 660 Q360 680 480 630 Q540 605 600 620"
        fill="none" stroke="#4DA3FF" strokeWidth="0.6"
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Orbs — slow aurora blobs
───────────────────────────────────────────────────────────────────────────── */
export function LeftPanelOrbs() {
  return (
    <>
      {/* Main blue orb — top left */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 560, height: 560, top: -160, left: -140,
          background: "radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(59,130,246,0.05) 45%, transparent 68%)",
          filter: "blur(48px)",
        }}
        animate={{ x: [0, 32, 0], y: [0, 24, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Cyan accent — bottom right */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 440, height: 440, bottom: -100, right: -80,
          background: "radial-gradient(circle, rgba(34,211,238,0.10) 0%, rgba(34,211,238,0.03) 50%, transparent 70%)",
          filter: "blur(48px)",
        }}
        animate={{ x: [0, -22, 0], y: [0, -18, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
      {/* Mid blue pulse */}
      <motion.div
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 320, height: 320, top: "40%", left: "30%",
          background: "radial-gradient(circle, rgba(77,163,255,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Diagonal light sweep
───────────────────────────────────────────────────────────────────────────── */
export function LightSweep() {
  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        top: 0, bottom: 0, left: "-30%", width: "28%",
        background: "linear-gradient(105deg, transparent 0%, rgba(77,163,255,0.04) 50%, transparent 100%)",
        transform: "skewX(-12deg)",
      }}
      animate={{ left: ["-30%", "130%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear", repeatDelay: 12 }}
    />
  );
}
