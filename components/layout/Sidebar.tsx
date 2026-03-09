"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Cable, FileBarChart2, Sparkles, Settings,
  X, Menu, ChevronRight, ChevronsLeft, PanelLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";

/* ── Logo mark SVG — rounded swoosh mark ─────────────────────────────────── */
function FixflowLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6 L26 6 Q38 6 38 18 Q38 26 28 28 L14 28 L22 20 L28 20 Q30 20 30 18 Q30 16 28 16 L2 16 Z" fill="currentColor" />
      <path d="M12 32 L30 32 Q38 32 38 26 L38 30 Q38 38 28 38 L10 38 Z" fill="currentColor" opacity="0.75" />
    </svg>
  );
}

const mainNavItems = [
  { href: "/app/dashboard", icon: LayoutDashboard, label: "Dashboard",     badge: null },
  { href: "/app/connect",   icon: Cable,           label: "Connect Tally", badge: null },
  { href: "/app/reports",   icon: FileBarChart2,   label: "Reports",       badge: null },
  { href: "/app/ask",       icon: Sparkles,        label: "AI CFO",        badge: "AI" },
];

const bottomNavItems = [
  { href: "/app/settings",  icon: Settings,        label: "Settings",      badge: null },
];

// Legacy alias kept for MobileSidebar
const navItems = [...mainNavItems, ...bottomNavItems];

function NavLink({
  href, icon: Icon, label, badge, active, collapsed, onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: string | null;
  active: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-all duration-150",
        active
          ? "bg-primary/10 text-primary dark:bg-primary/[0.12] dark:text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
        collapsed && "justify-center px-0 py-2.5",
      )}
    >
      {active && !collapsed && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 rounded-lg bg-primary/8 dark:bg-primary/[0.10]"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      <Icon
        className={cn(
          "relative z-10 h-4 w-4 flex-shrink-0 transition-colors",
          active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
        )}
      />

      {!collapsed && (
        <span className="relative z-10 flex-1 truncate">{label}</span>
      )}

      {!collapsed && badge && (
        <span className="relative z-10 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary dark:bg-primary/15">
          {badge}
        </span>
      )}

      {!collapsed && active && (
        <ChevronRight className="relative z-10 ml-auto h-3 w-3 text-primary/50" />
      )}

      {/* CSS tooltip — only visible in collapsed mode */}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-[12px] font-medium text-popover-foreground shadow-lg group-hover:block">
          {label}
          {badge && (
            <span className="ml-1.5 rounded bg-primary/15 px-1 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
              {badge}
            </span>
          )}
        </span>
      )}
    </Link>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();

  const firstName = user?.firstName ?? "";
  const lastName  = user?.lastName  ?? "";
  const email     = user?.primaryEmailAddress?.emailAddress ?? "";
  const initials  = ((firstName[0] ?? "") + (lastName[0] ?? "")).toUpperCase() || "U";

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 220 }}
      transition={{ type: "spring", stiffness: 380, damping: 35 }}
      className={cn(
        "relative flex h-full flex-shrink-0 flex-col overflow-hidden border-r border-border py-4",
        "bg-[hsl(var(--sidebar-bg))]",
        className,
      )}
    >
      {/* Logo row */}
      <div className={cn(
        "mb-5 flex items-center px-3",
        collapsed ? "justify-center" : "justify-between",
      )}>
        {!collapsed && (
          <Link href="/app/dashboard" className="flex items-center gap-2.5 group">
            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center text-primary">
              <FixflowLogo size={22} />
            </div>
            <div className="flex flex-col gap-px leading-none">
              <span className="text-[13px] font-bold tracking-tight text-foreground">Fixflow</span>
              <span className="text-[10px] text-muted-foreground/70">AI Business OS</span>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link href="/app/dashboard" className="group flex h-7 w-7 items-center justify-center text-primary">
            <FixflowLogo size={22} />
            <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-[12px] font-medium text-popover-foreground shadow-lg group-hover:block">
              Dashboard
            </span>
          </Link>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Collapse sidebar"
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="mx-auto mb-4 rounded-md p-1.5 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          aria-label="Expand sidebar"
        >
          <PanelLeft className="h-3.5 w-3.5" />
        </button>
      )}

      {!collapsed && (
        <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Menu
        </p>
      )}

      {/* Main nav */}
      <nav className={cn("flex flex-col gap-0.5 px-2", collapsed && "px-1.5")}>
        {mainNavItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={pathname.startsWith(item.href)}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="flex-1" />

      {/* Settings separator + nav */}
      <div className={cn("mb-1 border-t border-border pt-2 px-2", collapsed && "px-1.5")}>
        {!collapsed && (
          <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40">
            Account
          </p>
        )}
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            badge={item.badge}
            active={pathname.startsWith(item.href)}
            collapsed={collapsed}
          />
        ))}
      </div>

      {/* User section */}
      <div className={cn(
        "border-t border-border pt-3 px-2",
        collapsed ? "px-1.5" : "",
      )}>
        {!collapsed ? (
          <div className="group flex items-center gap-2.5 rounded-lg px-2 py-2 transition hover:bg-secondary">
            {/* Avatar / Clerk UserButton */}
            <div className="flex-shrink-0">
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-foreground leading-none">
                {firstName} {lastName}
              </p>
              <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{email}</p>
            </div>
            <button
              onClick={() => signOut({ redirectUrl: "/" })}
              title="Sign out"
              className="flex-shrink-0 rounded-md p-1 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="group relative flex items-center justify-center py-1.5">
            <div className="flex-shrink-0">
              <UserButton afterSignOutUrl="/" />
            </div>
            {/* Tooltip on collapsed user button */}
            <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-[12px] font-medium text-popover-foreground shadow-lg group-hover:block">
              {firstName} {lastName || "Account"}
            </span>
          </div>
        )}

        {/* Status pill — expanded only */}
        {!collapsed && (
          <div className="mt-2 rounded-lg border border-border bg-secondary/50 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-[12px] font-medium text-foreground">Systems online</p>
            </div>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Tally sync active</p>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-60 border-r border-border bg-[hsl(var(--sidebar-bg))] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
                <Link href="/app/dashboard" className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white">
                    <FixflowLogo size={15} />
                  </div>
                  <span className="text-[13px] font-bold tracking-tight">Fixflow</span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md p-1 text-muted-foreground hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="flex flex-col gap-0.5 p-2 pt-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    badge={item.badge}
                    active={pathname.startsWith(item.href)}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
