"use client";

import { UserButton } from "@clerk/nextjs";
import { CalendarDays, ChevronDown, Bell, Moon, Sun } from "lucide-react";
import { format } from "date-fns";
import { useAppState } from "@/lib/store";
import { MobileSidebar } from "./Sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const PRESETS = [
  { label: "Last 7 days",  days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "This year",    days: 365 },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      aria-label="Toggle theme"
    >
      <Sun className="h-3.5 w-3.5 dark:hidden" />
      <Moon className="hidden h-3.5 w-3.5 dark:block" />
    </button>
  );
}

export function Topbar({ title }: { title?: string }) {
  const { dateRange, setDateRange } = useAppState();
  const [showPicker, setShowPicker] = useState(false);

  const from = dateRange.from instanceof Date ? dateRange.from : new Date(dateRange.from);
  const to   = dateRange.to   instanceof Date ? dateRange.to   : new Date(dateRange.to);

  return (
    <header className="sticky top-0 z-30 flex h-12 items-center justify-between border-b border-border bg-[hsl(var(--topbar-bg))]/90 px-4 backdrop-blur-xl">
      {/* Left */}
      <div className="flex items-center gap-3">
        <MobileSidebar />
        {title && (
          <h1 className="text-[13px] font-semibold text-foreground">{title}</h1>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Date picker */}
        <div className="relative">
          <button
            onClick={() => setShowPicker((p) => !p)}
            className={cn(
              "flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-[12px] font-medium text-muted-foreground shadow-sm transition-all hover:text-foreground",
              showPicker && "border-primary/30 text-foreground ring-2 ring-primary/10",
            )}
          >
            <CalendarDays className="h-3 w-3 text-primary" />
            <span className="hidden sm:inline">
              {format(from, "dd MMM")} – {format(to, "dd MMM yyyy")}
            </span>
            <span className="sm:hidden">{format(from, "MMM d")} – {format(to, "MMM d")}</span>
            <ChevronDown className={cn("h-3 w-3 transition-transform", showPicker && "rotate-180")} />
          </button>

          <AnimatePresence>
            {showPicker && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.97 }}
                transition={{ duration: 0.13 }}
                className="absolute right-0 top-full mt-1.5 z-50 w-48 overflow-hidden rounded-xl border border-border bg-card shadow-card-hover dark:shadow-card-dark-hover"
              >
                <div className="p-1">
                  <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    Date Range
                  </p>
                  {PRESETS.map((p) => {
                    const toDate   = new Date();
                    const fromDate = new Date();
                    fromDate.setDate(toDate.getDate() - p.days);
                    const isActive = format(from, "yyyy-MM-dd") === format(fromDate, "yyyy-MM-dd");
                    return (
                      <button
                        key={p.label}
                        onClick={() => { setDateRange({ from: fromDate, to: toDate }); setShowPicker(false); }}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[13px] font-medium transition-colors",
                          isActive ? "bg-primary/8 text-primary dark:bg-primary/[0.10]" : "text-foreground hover:bg-secondary",
                        )}
                      >
                        {isActive
                          ? <span className="h-1 w-1 rounded-full bg-primary" />
                          : <span className="h-1 w-1" />
                        }
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ThemeToggle />

        <button className="relative flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-primary" />
        </button>

        <div className="mx-1 h-4 w-px bg-border" />

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { avatarBox: "h-6 w-6 rounded-md" },
          }}
        />
      </div>
    </header>
  );
}
