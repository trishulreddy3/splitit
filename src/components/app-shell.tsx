import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Users, Receipt, Wallet, UserPlus, Activity as ActivityIcon,
  Settings, User as UserIcon, Menu, X, Bell, Search, LogOut, ChevronsLeft, Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/groups", label: "Groups", icon: Users },
  { to: "/expenses", label: "Expenses", icon: Receipt },
  { to: "/settlements", label: "Settlements", icon: Wallet },
  { to: "/friends", label: "Friends", icon: UserPlus },
  { to: "/activity", label: "Activity", icon: ActivityIcon },
] as const;

const BOTTOM = [
  { to: "/profile", label: "Profile", icon: UserIcon },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

interface Props {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}

export function AppShell({ children, title, actions }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, logout } = useAuth();

  const isActive = (to: string) =>
    pathname === to || (to !== "/dashboard" && pathname.startsWith(to));

  const initials = user?.fullName
    ? user.fullName.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()
    : "U";

  const sidebarContent = (mini: boolean) => (
    <div className="flex h-full flex-col bg-sidebar">
      <div className={cn("flex h-14 items-center border-b border-sidebar-border", mini ? "justify-center px-2" : "px-4")}>
        <Link to="/dashboard" className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border bg-card">
            <div className="h-2.5 w-2.5 rounded-sm bg-foreground" />
          </div>
          {!mini && <span className="text-sm font-semibold tracking-tight">SplitTrip</span>}
        </Link>
      </div>

      {!mini && (
        <div className="px-3 pt-3">
          <button className="flex w-full items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-sidebar-accent">
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 text-left">Search…</span>
            <kbd className="flex items-center gap-0.5 rounded border border-sidebar-border bg-sidebar px-1.5 py-0.5 text-[10px] font-medium">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </div>
      )}

      <nav className={cn("flex-1 space-y-0.5 overflow-y-auto py-3", mini ? "px-2" : "px-3")}>
        {!mini && <div className="px-2 pb-1.5 pt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Workspace</div>}
        {NAV.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
              mini && "justify-center px-0",
              isActive(item.to)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!mini && <span className="truncate">{item.label}</span>}
          </Link>
        ))}

        {!mini && <div className="px-2 pb-1.5 pt-4 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Account</div>}
        {BOTTOM.map((item) => (
          <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
            className={cn(
              "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
              mini && "justify-center px-0",
              isActive(item.to)
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!mini && <span className="truncate">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className={cn("border-t border-sidebar-border p-2", mini && "flex justify-center")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "flex w-full items-center gap-2.5 rounded-md p-1.5 text-left hover:bg-sidebar-accent/60",
              mini && "w-auto justify-center",
            )}>
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-[11px] font-medium">{initials}</div>
              {!mini && (
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-medium">{user?.fullName || "Guest"}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{user?.email || "—"}</div>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/settings">Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-3.5 w-3.5" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className={cn("hidden border-r border-sidebar-border lg:flex lg:flex-col", collapsed ? "w-[60px]" : "w-[244px]")}>
        {sidebarContent(collapsed)}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] border-r border-sidebar-border lg:hidden"
            >
              {sidebarContent(false)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
          <button onClick={() => setMobileOpen(true)} className="rounded-md p-1.5 hover:bg-accent lg:hidden">
            <Menu className="h-4 w-4" />
          </button>
          <button onClick={() => setCollapsed((c) => !c)} className="hidden rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground lg:block">
            <ChevronsLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
          <div className="min-w-0 flex-1">
            {title && <h1 className="truncate text-sm font-medium">{title}</h1>}
          </div>
          <div className="flex items-center gap-1.5">
            {actions}
            <Link to="/notifications" className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
              <Bell className="h-4 w-4" />
            </Link>
          </div>
        </header>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

export function AppShellSkeleton() {
  return <div className="min-h-screen bg-background" />;
}

export { X };
