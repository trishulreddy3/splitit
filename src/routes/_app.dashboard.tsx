import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowDownRight, ArrowUpRight, Plus, Receipt, Users, Wallet,
  CalendarClock, TrendingUp,
} from "lucide-react";
import { dashboardService } from "@/lib/api/services";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/settle";
import { PageContainer, PageHeader, KpiCard, EmptyState, SectionTitle, Skeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/dashboard")({
  ssr: false,
  component: DashboardPage,
});

function DashboardPage() {
  const { user } = useAuth();
  const summary = useQuery({ queryKey: ["dashboard", "summary"], queryFn: dashboardService.summary });
  const activity = useQuery({ queryKey: ["dashboard", "activity"], queryFn: dashboardService.activity });

  const currency = summary.data?.currency || "INR";

  return (
    <>
      <PageHeader
        title={`Hi ${user?.fullName?.split(" ")[0] || "there"}`}
        description="Here's a snapshot of your shared spending."
        actions={
          <>
            <Button variant="outline" size="sm" asChild><Link to="/groups">New group</Link></Button>
            <Button size="sm" asChild><Link to="/expenses"><Plus className="mr-1.5 h-3.5 w-3.5" /> Add expense</Link></Button>
          </>
        }
      />

      <PageContainer className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {summary.isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[112px]" />)
          ) : summary.isError ? (
            <div className="col-span-full rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">
              Couldn't load dashboard — {summary.error.message}
            </div>
          ) : (
            <>
              <KpiCard label="You owe" value={formatCurrency(summary.data?.amountYouOwe ?? 0, currency)} icon={ArrowUpRight} tone="destructive" hint="Across all groups" />
              <KpiCard label="Owed to you" value={formatCurrency(summary.data?.amountOwedToYou ?? 0, currency)} icon={ArrowDownRight} hint="Pending settlements" />
              <KpiCard label="Active groups" value={String(summary.data?.totalGroups ?? 0)} icon={Users} hint="Trips & shared spaces" />
              <KpiCard label="This month" value={formatCurrency(summary.data?.monthlySpending ?? 0, currency)} icon={TrendingUp} hint={`${summary.data?.totalExpenses ?? 0} expenses tracked`} />
            </>
          )}
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SectionTitle action={<Link to="/activity" className="text-xs text-muted-foreground hover:text-foreground">View all</Link>}>
              Recent activity
            </SectionTitle>
            <div className="rounded-lg border border-border bg-card">
              {activity.isLoading ? (
                <div className="divide-y divide-border">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-2.5 w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : !activity.data?.length ? (
                <EmptyState
                  className="border-0"
                  icon={CalendarClock}
                  title="No activity yet"
                  description="Create a group and start adding expenses to see updates here."
                  action={<Button size="sm" asChild><Link to="/groups">Create group</Link></Button>}
                />
              ) : (
                <ul className="divide-y divide-border">
                  {activity.data.slice(0, 6).map((a) => (
                    <li key={a._id} className="flex items-start gap-3 p-4">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">
                        {a.actor?.fullName?.[0] || "?"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">{a.message}</p>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {new Date(a.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div>
            <SectionTitle action={<Link to="/settlements" className="text-xs text-muted-foreground hover:text-foreground">Open</Link>}>
              Suggested settlements
            </SectionTitle>
            <div className="rounded-lg border border-border bg-card p-4">
              <EmptyState
                className="border-0 px-0 py-8"
                icon={Wallet}
                title="Nothing to settle"
                description="Your balances are clear. We'll surface the minimal payment plan here whenever new expenses appear."
              />
            </div>

            <div className="mt-5 rounded-lg border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Quick add</span>
                <Receipt className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <p className="mt-3 text-sm">Track a one-off split or scan a receipt to skip manual entry.</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" asChild className="flex-1"><Link to="/expenses">Add expense</Link></Button>
                <Button size="sm" variant="outline" asChild className="flex-1"><Link to="/groups">New group</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
