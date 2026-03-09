"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Zap, Building2, ArrowRight, HelpCircle } from "lucide-react";

/* ── Logo mark ─────────────────────────────────────────────────────────── */
function FixflowMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M2 6 L26 6 Q38 6 38 18 Q38 26 28 28 L14 28 L22 20 L28 20 Q30 20 30 18 Q30 16 28 16 L2 16 Z" fill="currentColor" />
      <path d="M12 32 L30 32 Q38 32 38 26 L38 30 Q38 38 28 38 L10 38 Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

/* ── Plans ─────────────────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    tagline: "Perfect for getting started",
    cta: "Get started free",
    ctaHref: "/sign-up",
    highlighted: false,
    features: [
      "1 Tally company",
      "Live P&L & cashflow",
      "Basic receivables & payables",
      "5 AI CFO queries / month",
      "2 reports / month",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    icon: Building2,
    monthlyPrice: 999,
    yearlyPrice: 799,
    tagline: "For growing businesses",
    cta: "Start free trial",
    ctaHref: "/sign-up",
    highlighted: true,
    badge: "Most popular",
    features: [
      "Up to 5 Tally companies",
      "Full financial intelligence suite",
      "Unlimited AI CFO queries",
      "Weekly automated reports",
      "PDF download + email delivery",
      "Receivables aging analysis",
      "Payables management view",
      "Priority support",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    icon: Building2,
    monthlyPrice: null,
    yearlyPrice: null,
    tagline: "Enterprise-grade control",
    cta: "Talk to us",
    ctaHref: "mailto:hello@fixflow.app",
    highlighted: false,
    features: [
      "Unlimited Tally companies",
      "Custom AI CFO workflows",
      "Dedicated account manager",
      "SSO & advanced security",
      "Custom report templates",
      "API access",
      "SLA guarantee",
      "Onboarding & training",
    ],
  },
];

const FAQ = [
  {
    q: "What is Tally ERP?",
    a: "Tally ERP is India's most popular accounting software, used by millions of SMEs for bookkeeping, GST filing, and financial management.",
  },
  {
    q: "Do I need to export data manually?",
    a: "No. Fixflow's desktop connector syncs your Tally data automatically in the background — no exports, no uploads.",
  },
  {
    q: "Is my financial data secure?",
    a: "Yes. All data is encrypted in transit and at rest. The connector is read-only and never modifies your Tally data.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. You can upgrade or downgrade at any time. Billing is prorated.",
  },
  {
    q: "What counts as an AI CFO query?",
    a: "Each message you send to the AI CFO counts as one query. Follow-ups in the same conversation are each counted separately.",
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6EDF3]">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#232A34] bg-[#0a1a0f]/90 backdrop-blur-xl" style={{ borderColor: "rgba(74,222,128,0.08)" }}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5" style={{ color: "#4ade80" }}>
            <FixflowMark size={24} />
            <span className="text-[14px] font-bold tracking-tight text-white">Fixflow</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <Link href="/sign-in" className="text-[13px] font-medium transition-colors hover:text-white" style={{ color: "#8fa88f" }}>
              Sign in
            </Link>
            <Link href="/sign-up" className="rounded-full px-4 py-1.5 text-[13px] font-bold text-black transition hover:opacity-90" style={{ background: "#4ade80" }}>
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-12 text-center">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#3B82F6]/[0.07] blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-2xl px-6"
        >
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/5 px-3 py-1 text-xs font-medium text-[#4DA3FF]">
            <Zap className="h-3 w-3" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            The right plan for your business
          </h1>
          <p className="mt-4 text-[16px] text-[#9BA7B4]">
            Start free. Upgrade when you're ready. No hidden fees.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-[#232A34] bg-[#151C26] p-1">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${!yearly ? "bg-[#1B2430] text-white shadow-sm" : "text-[#9BA7B4] hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium transition-all ${yearly ? "bg-[#1B2430] text-white shadow-sm" : "text-[#9BA7B4] hover:text-white"}`}
            >
              Yearly
              <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="relative mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all ${
                plan.highlighted
                  ? "border-[#3B82F6]/40 bg-[#0F1929] shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_24px_64px_rgba(0,0,0,0.6)]"
                  : "border-[#232A34] bg-[#111620] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#3B82F6] px-3 py-1 text-xs font-semibold text-white shadow-glow-primary">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2.5">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${plan.highlighted ? "bg-[#3B82F6]/15" : "bg-[#1B2430]"}`}>
                    <plan.icon className={`h-4 w-4 ${plan.highlighted ? "text-[#4DA3FF]" : "text-[#6B7E96]"}`} />
                  </div>
                  <span className="text-[15px] font-bold text-white">{plan.name}</span>
                </div>
                <p className="text-sm text-[#6B7E96]">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="mb-8">
                {plan.monthlyPrice === null ? (
                  <div>
                    <span className="text-3xl font-extrabold text-white">Custom</span>
                    <p className="mt-1 text-xs text-[#6B7E96]">Contact us for enterprise pricing</p>
                  </div>
                ) : plan.monthlyPrice === 0 ? (
                  <div>
                    <span className="text-3xl font-extrabold text-white">Free</span>
                    <p className="mt-1 text-xs text-[#6B7E96]">No credit card required</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-3xl font-extrabold text-white">
                      ₹{yearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="ml-1 text-sm text-[#6B7E96]">/mo</span>
                    {yearly && (
                      <p className="mt-1 text-xs text-emerald-400">
                        Billed annually (₹{(plan.yearlyPrice! * 12).toLocaleString()}/yr)
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`mb-8 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-[#3B82F6] text-white hover:bg-[#2563eb] shadow-[0_0_0_1px_rgba(59,130,246,0.4),0_4px_20px_rgba(59,130,246,0.2)]"
                    : "border border-[#2A3340] bg-[#1B2430] text-[#C8D6E5] hover:border-[#3B82F6]/30 hover:bg-[#1F2D3D] hover:text-white"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${plan.highlighted ? "bg-[#3B82F6]/15" : "bg-[#1B2430]"}`}>
                      <Check className={`h-2.5 w-2.5 ${plan.highlighted ? "text-[#4DA3FF]" : "text-[#6B7E96]"}`} />
                    </div>
                    <span className="text-[13px] text-[#9AA4B2]">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#1E2530] bg-[#0E1117] px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-2xl font-bold text-white">Frequently asked questions</h2>
          </motion.div>
          <div className="space-y-2">
            {FAQ.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-xl border border-[#1E2530] bg-[#111620]"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-[14px] font-medium text-[#D4DCE8]">{item.q}</span>
                  <HelpCircle className={`h-4 w-4 flex-shrink-0 transition-colors ${openFaq === i ? "text-[#3B82F6]" : "text-[#4A5D72]"}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-[#1E2530] px-5 pb-4 pt-3">
                    <p className="text-sm text-[#6B7E96] leading-relaxed">{item.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#1E2530] bg-[#0B0F14] px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          <h2 className="text-2xl font-bold text-white">Ready to take control of your finances?</h2>
          <p className="mt-3 text-sm text-[#9BA7B4]">
            Connect your Tally and get live financial intelligence in under 2 minutes.
          </p>
          <Link
            href="/sign-up"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2563eb]"
          >
            Start for free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1E2530] bg-[#0B0F14] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-[12px] text-[#4A5D72] sm:flex-row">
          <div className="flex items-center gap-2 text-[#3B82F6]">
            <FixflowMark size={16} />
            <span className="font-semibold text-white">Fixflow</span>
          </div>
          <span>© 2026 Fixflow. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
