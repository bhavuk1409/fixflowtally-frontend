"use client";
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

const posts = [
  {
    tag: "Product",
    date: "Coming soon",
    title: "How Fixflow connects to Tally in real-time",
    desc: "A deep dive into the connector architecture, delta sync, and why we chose a local-first approach.",
    readTime: "8 min read",
  },
  {
    tag: "Finance",
    date: "Coming soon",
    title: "5 KPIs every SMB finance team should track",
    desc: "From gross margin to cash conversion cycle — the metrics that separate healthy businesses from struggling ones.",
    readTime: "6 min read",
  },
  {
    tag: "AI",
    date: "Coming soon",
    title: "Building an AI CFO: what we learned",
    desc: "The challenges of LLM hallucination in financial contexts and how we built guardrails into Fixflow's AI layer.",
    readTime: "10 min read",
  },
  {
    tag: "Engineering",
    date: "Coming soon",
    title: "From Tally XML to structured analytics",
    desc: "How we parse and normalize Tally's proprietary XML format into clean, queryable financial data.",
    readTime: "7 min read",
  },
];

const tags = ["All", "Product", "Finance", "AI", "Engineering", "Company"];

export default function BlogPage() {
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
          Blog
        </motion.p>
        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-6 text-[42px] font-black leading-[1.08] tracking-tight md:text-[56px]"
        >
          Insights on finance,<br />
          <span style={{ color: "#4ade80" }}>AI & building</span>
        </motion.h1>
        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg leading-relaxed"
          style={{ color: "#6b8a6b" }}
        >
          Thoughts from the Fixflow team on financial intelligence, AI, and building products for modern businesses.
        </motion.p>

        {/* Tags */}
        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-10 flex flex-wrap gap-2"
        >
          {tags.map((tag, i) => (
            <button
              key={tag}
              className="rounded-full px-4 py-1.5 text-xs font-semibold transition"
              style={
                i === 0
                  ? { background: "#4ade80", color: "#000" }
                  : { background: "rgba(74,222,128,0.08)", color: "#a8d5b5", border: "1px solid rgba(74,222,128,0.15)" }
              }
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Posts */}
        <div className="mt-10 space-y-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              custom={4 + i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="group rounded-2xl p-7 transition-all cursor-pointer"
              style={{ background: "rgba(74,222,128,0.03)", border: "1px solid rgba(74,222,128,0.1)" }}
            >
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}
                >
                  {post.tag}
                </span>
                <span className="text-xs" style={{ color: "#6b8a6b" }}>{post.date}</span>
                <span className="text-xs" style={{ color: "#6b8a6b" }}>· {post.readTime}</span>
              </div>
              <p className="mb-2 text-lg font-bold transition-colors group-hover:text-[#4ade80]">{post.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "#6b8a6b" }}>{post.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          custom={9} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-16 rounded-3xl p-10 text-center"
          style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }}
        >
          <p className="mb-2 text-xl font-black">Get notified when we publish</p>
          <p className="mb-8 text-sm" style={{ color: "#6b8a6b" }}>No spam. Just thoughtful pieces on finance and AI, when they&apos;re ready.</p>
          <a
            href="mailto:hello@fixflow.app?subject=Blog newsletter signup"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-black transition hover:opacity-90"
            style={{ background: "#4ade80" }}
          >
            Subscribe →
          </a>
        </motion.div>
      </div>
    </main>
  );
}
