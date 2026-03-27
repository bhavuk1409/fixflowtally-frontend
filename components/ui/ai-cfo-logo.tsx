"use client";

import { cn } from "@/lib/utils";

type AICfoLogoProps = {
  className?: string;
  tone?: "default" | "active" | "on-primary";
};

export function AICfoLogo({ className, tone = "default" }: AICfoLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(
        "h-5 w-5 flex-shrink-0 transition-colors duration-200",
        tone === "active" && "text-blue-100",
        tone === "on-primary" && "text-white",
        tone === "default" && "text-slate-300 group-hover:text-blue-200",
        className,
      )}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.5 17v-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 17v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 17v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.5 11.5 12 9l4.5-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
