"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/*
 * HeroArcs — concentric arc bands, DeltaMemory-style
 *
 * The reference shows concentric arcs whose shared center sits
 * far off-screen to the bottom-right. From the viewer's perspective
 * they look like curved bands entering top-right, bowing leftward
 * through the right portion of the hero, then exiting bottom-right.
 *
 * Implementation:
 *   - SVG viewBox 1000 × 900, right-anchored (xMaxYMid slice)
 *   - Each band = a filled annular sector built from two arc paths
 *   - Center of all circles: (1600, 1400) — far off-screen BR
 *   - Radii step from r=1100 (outermost) to r=680 (innermost)
 *   - Band thickness ~70px, gap ~28px between bands
 *   - Fills: dark-to-bright as radius decreases (outer=dark, inner=bright)
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Arc center (off-screen bottom-right in the 1000×900 viewBox)
const CX = 1600;
const CY = 1500;

/**
 * Build a closed SVG path for a filled arc band.
 * Sweeps from angle startDeg to endDeg around (CX, CY).
 * Outer radius = r1, inner radius = r2 (r1 > r2).
 */
function arcBandPath(r1: number, r2: number, startDeg: number, endDeg: number): string {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const s = toRad(startDeg);
  const e = toRad(endDeg);

  // Outer arc: start → end  (large arc if span > 180°)
  const ox1 = CX + r1 * Math.cos(s);
  const oy1 = CY + r1 * Math.sin(s);
  const ox2 = CX + r1 * Math.cos(e);
  const oy2 = CY + r1 * Math.sin(e);

  // Inner arc: end → start (reverse)
  const ix2 = CX + r2 * Math.cos(e);
  const iy2 = CY + r2 * Math.sin(e);
  const ix1 = CX + r2 * Math.cos(s);
  const iy1 = CY + r2 * Math.sin(s);

  const span = endDeg - startDeg;
  const large = span > 180 ? 1 : 0;

  return [
    `M ${ox1} ${oy1}`,
    `A ${r1} ${r1} 0 ${large} 1 ${ox2} ${oy2}`,  // outer arc CW
    `L ${ix2} ${iy2}`,
    `A ${r2} ${r2} 0 ${large} 0 ${ix1} ${iy1}`,  // inner arc CCW
    `Z`,
  ].join(" ");
}

interface Band {
  path: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  delay: number;
}

// Sweep angle: from ~195° (upper-right) to ~255° (lower-right)
// These angles are measured from positive-x axis at (CX,CY).
// At these angles the arcs cross the visible viewport area.
const START_ANGLE = 195;
const END_ANGLE   = 252;

// Band stack: outermost (largest radius) first
// r1=outer edge, r2=inner edge, gap to next band's r1 = 28px
const RAW_BANDS: Array<{ r1: number; r2: number; fill: string; stroke: string; sw: number; delay: number }> = [
  { r1: 1340, r2: 1260, fill: "rgba(11,40,19,0.96)",  stroke: "rgba(52,180,90,0.08)",  sw: 0.8, delay: 0.00 },
  { r1: 1232, r2: 1155, fill: "rgba(13,50,23,0.97)",  stroke: "rgba(52,180,90,0.13)",  sw: 0.8, delay: 0.15 },
  { r1: 1127, r2: 1053, fill: "rgba(15,60,27,0.98)",  stroke: "rgba(74,222,128,0.20)", sw: 1.0, delay: 0.28 },
  { r1:  925, r2:  855, fill: "rgba(17,72,32,0.99)",  stroke: "rgba(74,222,128,0.32)", sw: 1.2, delay: 0.40 },
  { r1:  827, r2:  762, fill: "rgba(19,84,36,1.00)",  stroke: "rgba(74,222,128,0.52)", sw: 1.5, delay: 0.52 },
];

const BANDS: Band[] = RAW_BANDS.map((b) => ({
  path: arcBandPath(b.r1, b.r2, START_ANGLE, END_ANGLE),
  fill: b.fill,
  stroke: b.stroke,
  strokeWidth: b.sw,
  delay: b.delay,
}));

// Bright spine stroke on the innermost band's outer edge
const SPINE_PATH = `M ${CX + 762 * Math.cos((195 * Math.PI) / 180)} ${CY + 762 * Math.sin((195 * Math.PI) / 180)} A 762 762 0 0 1 ${CX + 762 * Math.cos((252 * Math.PI) / 180)} ${CY + 762 * Math.sin((252 * Math.PI) / 180)}`;

// ── Components ────────────────────────────────────────────────────────────

function BandPath({ band, reduced }: { band: Band; reduced: boolean }) {
  return (
    <motion.path
      d={band.path}
      fill={band.fill}
      stroke={band.stroke}
      strokeWidth={band.strokeWidth}
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduced ? { duration: 0 } : { delay: band.delay, duration: 1.2, ease: EASE }}
    />
  );
}

function BrightSpine({ reduced }: { reduced: boolean }) {
  return (
    <motion.path
      d={SPINE_PATH}
      fill="none"
      stroke="rgba(74,222,128,0.70)"
      strokeWidth={1.8}
      initial={reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduced ? { duration: 0 } : { delay: 0.52, duration: 1.0, ease: EASE }}
    />
  );
}

function GlowLayer({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        right: "-40px",
        top: "0px",
        width: "600px",
        height: "100%",
        background:
          "radial-gradient(ellipse at 80% 40%, rgba(34,197,94,0.14) 0%, rgba(16,64,28,0.10) 40%, transparent 68%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={reduced ? { duration: 0 } : { delay: 0.05, duration: 1.6, ease: "easeOut" }}
    />
  );
}

function BreathGroup({ reduced, children }: { reduced: boolean; children: React.ReactNode }) {
  return (
    <motion.g
      animate={reduced ? {} : { opacity: [1, 0.92, 1] }}
      transition={
        reduced
          ? {}
          : { delay: 2.5, duration: 7, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
      }
    >
      {children}
    </motion.g>
  );
}

// ── Public component ──────────────────────────────────────────────────────

export interface HeroArcsProps {
  delays?: number[];
}

export default function HeroArcs({ delays }: HeroArcsProps) {
  const reduced = useReducedMotion() ?? false;

  const bands: Band[] = delays
    ? BANDS.map((b, i) => ({ ...b, delay: delays[i] ?? b.delay }))
    : BANDS;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Green atmospheric glow behind the bands */}
      <GlowLayer reduced={reduced} />

      {/*
       * viewBox 1000×900, right-anchored.
       * The arc center (1600,1500) is off-screen BR.
       * xMaxYMid slice: scales so right edge of viewBox = right edge of hero.
       * Left side of arcs clips naturally — text stays readable.
       */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        viewBox="0 0 1000 900"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
      >
        <BreathGroup reduced={reduced}>
          {bands.map((band, i) => (
            <BandPath key={i} band={band} reduced={reduced} />
          ))}
          <BrightSpine reduced={reduced} />
        </BreathGroup>
      </svg>
    </div>
  );
}
