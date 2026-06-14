import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Receipt, Users, Wallet } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_auth")({
  ssr: false,
  component: AuthLayout,
});

function AuthLayout() {
  const { isAuthenticated, loading } = useAuth();
  if (!loading && isAuthenticated) return <Navigate to="/dashboard" />;
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden border-r border-border bg-sidebar lg:flex lg:flex-col">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" />
        <div className="relative z-10 flex h-full flex-col p-12">
          <div className="flex items-center gap-2.5">
            <div className="grid h-8 w-8 place-items-center rounded-md border border-border bg-card">
              <div className="h-3 w-3 rounded-sm bg-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">SplitTrip</span>
          </div>

          <div className="mt-24 max-w-md">
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-semibold leading-[1.05] tracking-tight"
            >
              Split anything.<br />
              <span className="text-muted-foreground">Settle in seconds.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-sm leading-relaxed text-muted-foreground"
            >
              Track shared expenses across trips, flats, and events. SplitTrip simplifies who owes whom with a minimal cash-flow algorithm — so groups settle with the fewest payments possible.
            </motion.p>
          </div>

          <div className="mt-16 grid max-w-md grid-cols-3 gap-3">
            {[
              { icon: Users, label: "Groups", value: "Unlimited" },
              { icon: Receipt, label: "Splits", value: "4 modes" },
              { icon: Wallet, label: "Currencies", value: "Multi" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-card/40 p-4">
                <s.icon className="h-4 w-4 text-muted-foreground" />
                <div className="mt-3 text-xs text-muted-foreground">{s.label}</div>
                <div className="text-sm font-medium">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-3 border-t border-border pt-6">
            <p className="text-sm text-foreground">
              "We used to spend an hour after every trip arguing about totals. Now it's 30 seconds."
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="h-6 w-6 rounded-full bg-muted" />
              <span>Aisha Patel · Travel Lead, Wanderloop</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="relative flex items-center justify-center px-6 py-12 sm:px-10">
        <a href="/" className="absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold lg:hidden">
          <div className="grid h-7 w-7 place-items-center rounded-md border border-border bg-card">
            <div className="h-2.5 w-2.5 rounded-sm bg-foreground" />
          </div>
          SplitTrip
        </a>
        <a href="https://lovable.dev" className="absolute right-6 top-6 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          Docs <ArrowUpRight className="h-3 w-3" />
        </a>
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
