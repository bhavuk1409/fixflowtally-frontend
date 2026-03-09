"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

interface KpiCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ElementType;
  iconColor?: string;
  iconBg?: string;
  subLabel?: string;
  sparkline?: { value: number }[];
  index?: number;
}

export function KpiCard({
  label, value, change, trend = "neutral",
  icon: Icon, iconColor, iconBg, subLabel, sparkline = [], index = 0,
}: KpiCardProps) {
  const trendColor =
    trend === "up"      ? "text-emerald-500 dark:text-emerald-400" :
    trend === "down"    ? "text-red-500 dark:text-red-400" :
                          "text-muted-foreground";

  const sparkColor =
    trend === "up"   ? "#22c55e" :
    trend === "down" ? "#ef4444" :
                       "#3b82f6";

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-card-hover dark:hover:shadow-card-dark-hover"
      style={{
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Subtle top-edge highlight on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">{label}</p>
        <div className={cn("flex h-7 w-7 items-center justify-center rounded-lg", iconBg ?? "bg-primary/10")}>
          <Icon className={cn("h-3.5 w-3.5", iconColor ?? "text-primary")} />
        </div>
      </div>

      {/* Value */}
      <p className="tabular text-2xl font-bold tracking-tight text-foreground">{value}</p>

      {/* Sub label */}
      {subLabel && (
        <p className="mt-0.5 text-[11px] text-muted-foreground">{subLabel}</p>
      )}

      {/* Sparkline */}
      {sparkline.length > 1 && (
        <div className="my-3 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkline} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
              <defs>
                <linearGradient id={`spark-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={sparkColor} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={sparkColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip contentStyle={{ display: "none" }} cursor={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={sparkColor}
                strokeWidth={1.5}
                fill={`url(#spark-${index})`}
                dot={false}
                activeDot={{ r: 3, fill: sparkColor }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Trend */}
      {change && (
        <div className={cn("mt-auto flex items-center gap-1 text-[12px] font-medium", trendColor)}>
          <TrendIcon className="h-3 w-3 flex-shrink-0" />
          {change}
        </div>
      )}
    </div>
  );
}

