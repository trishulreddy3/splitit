import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn("grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-b border-border px-4 py-6 sm:px-6 lg:px-8 lg:py-8", className)}>
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

interface KpiCardProps {
  label: string;
  value: string;
  delta?: string;
  icon?: LucideIcon;
  tone?: "default" | "destructive";
  hint?: string;
}

export function KpiCard({ label, value, delta, icon: Icon, tone = "default", hint }: KpiCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card p-5 transition-colors hover:border-border/80">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
      </div>
      <div className={cn(
        "mt-3 text-2xl font-semibold tracking-tight tabular-nums",
        tone === "destructive" && "text-destructive",
      )}>
        {value}
      </div>
      {(delta || hint) && (
        <div className="mt-1 text-xs text-muted-foreground tabular-nums">{delta || hint}</div>
      )}
    </div>
  );
}

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card/40 px-6 py-16 text-center",
      className,
    )}>
      {Icon && (
        <div className="mb-5 grid h-11 w-11 place-items-center rounded-md border border-border bg-card">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-sm font-medium">{title}</h3>
      {description && <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("px-4 py-6 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function SectionTitle({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-sm font-medium">{children}</h2>
      {action}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted/60", className)} />;
}

export function StatusBadge({ tone = "muted", children }: { tone?: "muted" | "success" | "warn" | "destructive"; children: React.ReactNode }) {
  const map = {
    muted: "border-border bg-muted text-muted-foreground",
    success: "border-border bg-card text-foreground",
    warn: "border-border bg-card text-foreground",
    destructive: "border-destructive/40 bg-destructive/10 text-destructive",
  } as const;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider", map[tone])}>
      {children}
    </span>
  );
}
