"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Cable, FileText, MessageSquare, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  variant?: "default" | "compact";
}

export function EmptyState({
  icon: Icon = Cable,
  title,
  description,
  action,
  className,
  variant = "default",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/30 text-center",
        variant === "default" ? "gap-4 py-20 px-8" : "gap-3 py-12 px-6",
        className,
      )}
    >
      {/* Icon */}
      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        {/* Decoration rings */}
        <div className="pointer-events-none absolute -inset-2 rounded-3xl border border-primary/10" />
        <div className="pointer-events-none absolute -inset-4 rounded-[28px] border border-primary/5" />
      </div>

      {/* Text */}
      <div className="max-w-sm">
        <h3 className={cn("font-semibold text-foreground", variant === "default" ? "text-base" : "text-sm")}>
          {title}
        </h3>
        <p className={cn("mt-1 text-muted-foreground", variant === "default" ? "text-sm" : "text-xs")}>
          {description}
        </p>
      </div>

      {/* Action */}
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-primary transition hover:opacity-90 active:scale-95"
          >
            {action.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-primary transition hover:opacity-90 active:scale-95"
          >
            {action.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )
      )}
    </motion.div>
  );
}

// Pre-configured empty states
export const ConnectTallyEmptyState = () => (
  <EmptyState
    icon={Cable}
    title="No financial data yet"
    description="Connect your Tally accounting software to start seeing live P&L, cashflow, and receivables."
    action={{ label: "Connect Tally", href: "/app/connect" }}
  />
);

export const NoReportsEmptyState = ({ onGenerate }: { onGenerate: () => void }) => (
  <EmptyState
    icon={FileText}
    title="No reports generated"
    description="Generate your first financial report — it'll be ready in a few minutes."
    action={{ label: "Generate Report", onClick: onGenerate }}
    variant="compact"
  />
);

export const NoChatHistoryEmptyState = () => (
  <EmptyState
    icon={MessageSquare}
    title="Ask your AI CFO anything"
    description="I have live access to your Tally data. Ask me about P&L, cashflow, receivables, or anything else."
    variant="compact"
  />
);
