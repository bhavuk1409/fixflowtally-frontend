"use client";

import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useTheme } from "next-themes";

/* ── Theme hook ──────────────────────────────────────────────────── */
export function useChartTheme() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return {
    grid:    dark ? "hsl(213 18% 15%)" : "hsl(220 13% 91%)",
    text:    dark ? "hsl(213 12% 45%)" : "hsl(220 10% 52%)",
    tooltip: {
      bg:     dark ? "#151B23" : "#ffffff",
      border: dark ? "#232A34" : "#e5e7eb",
      color:  dark ? "#E6EDF3" : "#111827",
    },
  };
}

/* ── Cashflow Area Chart ─────────────────────────────────────────── */
interface CashflowMonth {
  month?: string;
  period?: string;
  inflow:  number;
  outflow: number;
}

export function CashflowChart({ data, height = 220 }: { data: CashflowMonth[]; height?: number }) {
  const t = useChartTheme();
  const formatted = data.map((d, i) => ({
    name:    d.month ?? d.period ?? `M${i + 1}`,
    Inflow:  d.inflow,
    Outflow: d.outflow,
    Net:     d.inflow - d.outflow,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={formatted} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="gInflow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gOutflow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fill: t.text, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tick={{ fill: t.text, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}K` : String(v)}
          width={48}
        />
        <Tooltip
          contentStyle={{
            background: t.tooltip.bg,
            border: `1px solid ${t.tooltip.border}`,
            borderRadius: 10,
            color: t.tooltip.color,
            fontSize: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
          formatter={(value: number, name: string) => [
            `₹${value.toLocaleString("en-IN")}`,
            name,
          ]}
        />
        <Legend
          iconType="circle"
          iconSize={6}
          wrapperStyle={{ fontSize: 11, color: t.text, paddingTop: 12 }}
        />
        <Area type="monotone" dataKey="Inflow"  stroke="#3b82f6" strokeWidth={2} fill="url(#gInflow)"  dot={false} activeDot={{ r: 4, fill: "#3b82f6" }} />
        <Area type="monotone" dataKey="Outflow" stroke="#ef4444" strokeWidth={2} fill="url(#gOutflow)" dot={false} activeDot={{ r: 4, fill: "#ef4444" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ── Expense Bar Chart ───────────────────────────────────────────── */
interface ExpenseBar { name: string; value: number; }

export function ExpenseBarChart({ data, height = 220 }: { data: ExpenseBar[]; height?: number }) {
  const t = useChartTheme();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={t.grid} horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: t.text, fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}K` : String(v)}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: t.text, fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          width={68}
        />
        <Tooltip
          contentStyle={{
            background: t.tooltip.bg,
            border: `1px solid ${t.tooltip.border}`,
            borderRadius: 10,
            color: t.tooltip.color,
            fontSize: 12,
          }}
          formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Amount"]}
        />
        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[0, 4, 4, 0]}
          maxBarSize={14}
          fillOpacity={0.85}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

/* ── Revenue vs Expense (grouped bar) ───────────────────────────── */
interface RevenueExpenseData { name: string; Revenue: number; Expense: number; }

export function RevenueExpenseChart({ data, height = 260 }: { data: RevenueExpenseData[]; height?: number }) {
  const t = useChartTheme();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={t.grid} vertical={false} />
        <XAxis dataKey="name" tick={{ fill: t.text, fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis
          tick={{ fill: t.text, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${(v / 1e3).toFixed(0)}K` : String(v)}
          width={48}
        />
        <Tooltip
          contentStyle={{
            background: t.tooltip.bg,
            border: `1px solid ${t.tooltip.border}`,
            borderRadius: 10,
            color: t.tooltip.color,
            fontSize: 12,
          }}
          formatter={(v: number, name: string) => [`₹${v.toLocaleString("en-IN")}`, name]}
        />
        <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 11, color: t.text, paddingTop: 12 }} />
        <Bar dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={24} fillOpacity={0.9} />
        <Bar dataKey="Expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={24} fillOpacity={0.7} />
      </BarChart>
    </ResponsiveContainer>
  );
}
