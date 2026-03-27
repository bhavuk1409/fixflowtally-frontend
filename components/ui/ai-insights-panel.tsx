"use client";

import { motion } from "framer-motion";
import { Brain, TrendingUp, AlertTriangle, Info, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  type: "positive" | "warning" | "info";
  title: string;
  description: string;
}

interface AiInsightsPanelProps {
  insights?: Insight[];
  isLoading?: boolean;
  onAskMore?: (query?: string) => void;
}

const typeConfig = {
  positive: {
    icon: TrendingUp,
    bg: "bg-card",
    border: "border-emerald-500/25",
    icon_color: "text-emerald-500",
    icon_chip: "bg-emerald-500/12",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-card",
    border: "border-amber-500/25",
    icon_color: "text-amber-500",
    icon_chip: "bg-amber-500/12",
  },
  info: {
    icon: Info,
    bg: "bg-card",
    border: "border-blue-500/25",
    icon_color: "text-blue-500",
    icon_chip: "bg-blue-500/12",
  },
};

const QUICK_ASKS = [
  "What's my runway this month?",
  "Who owes me the most?",
  "How is profit trending?",
];

const DEFAULT_INSIGHTS: Insight[] = [
  {
    type: "info",
    title: "Connect Tally to unlock insights",
    description: "Once connected, your AI CFO will analyse P&L, cashflow, and receivables automatically.",
  },
];

export function AiInsightsPanel({ insights, isLoading, onAskMore }: AiInsightsPanelProps) {
  const items = insights ?? DEFAULT_INSIGHTS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="flex flex-col rounded-xl border border-border bg-card shadow-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
          <Brain className="h-3.5 w-3.5 text-primary" />
        </div>
        <h3 className="text-[13px] font-semibold text-foreground">AI Insights</h3>
        {/* Animated live dot */}
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">Live</span>
        </div>
      </div>

      {/* Insight cards */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {isLoading ? (
          <div className="space-y-2.5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 skeleton rounded-lg" />
            ))}
          </div>
        ) : (
          items.map((insight, i) => {
            const cfg = typeConfig[insight.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className={cn("flex gap-3 rounded-lg border p-3", cfg.bg, cfg.border)}
              >
                <div className={cn("mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md", cfg.icon_chip)}>
                  <Icon className={cn("h-3.5 w-3.5", cfg.icon_color)} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-foreground leading-tight">{insight.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{insight.description}</p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Quick asks */}
      <div className="border-t border-border px-4 py-3">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Quick asks
        </p>
        <div className="flex flex-col gap-1.5">
          {QUICK_ASKS.map((q) => (
            <button
              key={q}
              onClick={() => onAskMore?.(q)}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              <span className="truncate text-left">{q}</span>
              <ArrowRight className="ml-2 h-3 w-3 flex-shrink-0 opacity-50" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
