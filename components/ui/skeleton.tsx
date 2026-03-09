import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("skeleton animate-shimmer rounded-lg", className)}
      {...props}
    />
  );
}

export function KpiSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-7 rounded-lg" />
      </div>
      <Skeleton className="mb-1 h-7 w-32" />
      <Skeleton className="h-2.5 w-20" />
      <div className="my-3">
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-3 w-28" />
    </div>
  );
}

export function ChartSkeleton({ height = 220 }: { height?: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end gap-2" style={{ height }}>
        {[40, 65, 45, 80, 55, 70, 45, 85, 60, 75, 50, 90].map((h, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-sm"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="flex justify-between gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-2 w-8" />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center justify-between gap-4">
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-2.5 w-1/2" />
          </div>
          <Skeleton className="h-4 w-20 flex-shrink-0" />
        </div>
      ))}
    </div>
  );
}

export { Skeleton };
