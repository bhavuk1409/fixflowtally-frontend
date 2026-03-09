"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, RefreshCw, Clock, CheckCircle2, XCircle, Loader2, Mail,
  FileText, FileBarChart2, ReceiptIndianRupee, TrendingUp, Sparkles,
  Calendar, Plus,
} from "lucide-react";
import { format } from "date-fns";
import { useAppState } from "@/lib/store";
import { useApi } from "@/lib/useApi";
import { formatDate } from "@/lib/utils";
import { Topbar } from "@/components/layout/Topbar";
import { TableSkeleton } from "@/components/ui/skeleton";
import { NoReportsEmptyState } from "@/components/ui/empty-state";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Report } from "@/lib/api";

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: Report["status"] }) {
  const map = {
    queued: { label: "Queued", className: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400", icon: Clock },
    generating: { label: "Generating", className: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400", icon: Loader2 },
    done: { label: "Done", className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400", icon: CheckCircle2 },
    failed: { label: "Failed", className: "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400", icon: XCircle },
  };
  const cfg = map[status] ?? map.queued;
  const Icon = cfg.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", cfg.className)}>
      <Icon className={cn("h-3 w-3", status === "generating" && "animate-spin")} />
      {cfg.label}
    </span>
  );
}

// ── Report type icon ──────────────────────────────────────────────────────────
function ReportTypeIcon({ type }: { type: string }) {
  const map: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    weekly: { icon: FileBarChart2, color: "text-primary", bg: "bg-primary/10" },
    pnl: { icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    cashflow: { icon: Sparkles, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10" },
    gst: { icon: ReceiptIndianRupee, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10" },
  };
  const cfg = map[type] ?? map.weekly;
  return (
    <div className={cn("flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl", cfg.bg)}>
      <cfg.icon className={cn("h-4 w-4", cfg.color)} />
    </div>
  );
}

// ── Report cards strip (type picker) ──────────────────────────────────────────
const REPORT_TYPES = [
  { id: "weekly", label: "Weekly Summary", desc: "P&L, cashflow & highlights" },
  { id: "pnl", label: "Profit & Loss", desc: "Detailed income & expense" },
  { id: "cashflow", label: "Cash Flow", desc: "Inflows, outflows, net" },
  { id: "gst", label: "GST Summary", desc: "Tax liability overview" },
];

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const { tenantId, companyId, fromIso, toIso } = useAppState();
  const api = useApi();
  const qc = useQueryClient();
  const [selectedType, setSelectedType] = useState("weekly");

  const reports = useQuery({
    queryKey: ["reports", tenantId, companyId],
    queryFn: () => api.reports.list(tenantId, companyId).then((r) => r.data),
    enabled: !!companyId,
    refetchInterval: 15_000,
  });

  const generate = useMutation({
    mutationFn: () => {
      return api.reports.generate(tenantId, companyId, fromIso, toIso, selectedType).then((r) => r.data);
    },
    onSuccess: () => {
      toast.success("Report queued! Ready in a few minutes.");
      qc.invalidateQueries({ queryKey: ["reports", tenantId, companyId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const reportList = reports.data?.reports ?? [];
  const hasReports = reportList.length > 0;

  return (
    <div className="flex flex-col">
      <Topbar title="Reports" />

      <div className="space-y-6 p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"
        >
          <div>
            <h2 className="text-xl font-bold text-foreground">Financial Reports</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Auto-generated every Monday or on demand. Download as PDF.
            </p>
          </div>
          <button
            onClick={() => generate.mutate()}
            disabled={generate.isPending || !companyId}
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow-primary transition hover:opacity-90 active:scale-95 disabled:opacity-60"
          >
            {generate.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Generate Report
          </button>
        </motion.div>

        {/* Report type selector */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {REPORT_TYPES.map((rt, i) => (
            <motion.button
              key={rt.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => setSelectedType(rt.id)}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all",
                selectedType === rt.id
                  ? "border-primary/30 bg-primary/5 shadow-glow-primary"
                  : "border-border bg-card hover:border-primary/20 hover:bg-secondary/50",
              )}
            >
              <ReportTypeIcon type={rt.id} />
              <div>
                <p className={cn("text-xs font-semibold", selectedType === rt.id ? "text-primary" : "text-foreground")}>
                  {rt.label}
                </p>
                <p className="text-2xs text-muted-foreground">{rt.desc}</p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Email notice */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-500/8"
        >
          <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-sm text-amber-700 dark:text-amber-300">
            To receive reports by email, add a recipient in{" "}
            <a href="/app/settings" className="font-semibold underline underline-offset-2 hover:no-underline">
              Settings → Report Email
            </a>
            .
          </p>
        </motion.div>

        {/* Reports table */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
        >
          {/* Table header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold text-foreground">
              Report History
              {reports.data?.total != null && (
                <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {reports.data.total}
                </span>
              )}
            </h3>
            <button
              onClick={() => reports.refetch()}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition"
            >
              <RefreshCw className={cn("h-3.5 w-3.5", reports.isFetching && "animate-spin")} />
              Refresh
            </button>
          </div>

          {reports.isLoading ? (
            <div className="p-5">
              <TableSkeleton rows={5} />
            </div>
          ) : !hasReports ? (
            <div className="p-6">
              <NoReportsEmptyState onGenerate={() => generate.mutate()} />
            </div>
          ) : (
            <div className="divide-y divide-border">
              <AnimatePresence>
                {reportList.map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex flex-col justify-between gap-3 px-5 py-4 transition-colors hover:bg-secondary/30 sm:flex-row sm:items-center"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-3">
                      <ReportTypeIcon type={report.report_type} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold capitalize">{report.report_type} Report</span>
                          <StatusBadge status={report.status} />
                        </div>
                        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(report.period_from)} – {formatDate(report.period_to)}
                        </div>
                        {report.error && (
                          <p className="mt-0.5 text-xs text-red-500">{report.error}</p>
                        )}
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-3">
                      {report.email_sent_at && (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                          <Mail className="h-3 w-3" />
                          Emailed {formatDate(report.email_sent_at)}
                        </span>
                      )}
                      {report.status === "done" && report.pdf_url && report.pdf_url !== "local" && (
                        <a
                          href={report.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download PDF
                        </a>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {report.created_at
                          ? (() => {
                              const d = new Date(report.created_at);
                              return isNaN(d.getTime()) ? "—" : format(d, "dd MMM, HH:mm");
                            })()
                          : "—"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
