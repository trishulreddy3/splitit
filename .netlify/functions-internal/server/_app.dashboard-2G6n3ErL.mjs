import { r as dashboardService } from "./_ssr/services-hSe0tyCa.mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-context-C_KaABU9.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { I as ArrowDownRight, N as ArrowUpRight, d as Receipt, f as Plus, j as CalendarClock, n as Wallet, r as Users, s as TrendingUp } from "./_libs/lucide-react.mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
import { a as SectionTitle, i as PageHeader, n as KpiCard, o as Skeleton, r as PageContainer, t as EmptyState } from "./_ssr/primitives-BeN511sB.mjs";
import { t as formatCurrency } from "./_ssr/settle-C_8B-gc8.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-2G6n3ErL.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	const { user } = useAuth();
	const summary = useQuery({
		queryKey: ["dashboard", "summary"],
		queryFn: dashboardService.summary
	});
	const activity = useQuery({
		queryKey: ["dashboard", "activity"],
		queryFn: dashboardService.activity
	});
	const currency = summary.data?.currency || "INR";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: `Hi ${user?.fullName?.split(" ")[0] || "there"}`,
		description: "Here's a snapshot of your shared spending.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			size: "sm",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/groups",
				search: { new: true },
				children: "New group"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/expenses",
				search: { new: true },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " Add expense"]
			})
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContainer, {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				opacity: 0,
				y: 6
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .3 },
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: summary.isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[112px]" }, i)) : summary.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "col-span-full rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground",
				children: ["Couldn't load dashboard — ", summary.error.message]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "You owe",
					value: formatCurrency(summary.data?.amountYouOwe ?? 0, currency),
					icon: ArrowUpRight,
					tone: "destructive",
					hint: "Across all groups"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Owed to you",
					value: formatCurrency(summary.data?.amountOwedToYou ?? 0, currency),
					icon: ArrowDownRight,
					hint: "Pending settlements"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "Active groups",
					value: String(summary.data?.totalGroups ?? 0),
					icon: Users,
					hint: "Trips & shared spaces"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: "This month",
					value: formatCurrency(summary.data?.monthlySpending ?? 0, currency),
					icon: TrendingUp,
					hint: `${summary.data?.totalExpenses ?? 0} expenses tracked`
				})
			] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-5 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/activity",
						className: "text-xs text-muted-foreground hover:text-foreground",
						children: "View all"
					}),
					children: "Recent activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-border bg-card",
					children: activity.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-8 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-2/3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2.5 w-1/3" })]
							})]
						}, i))
					}) : !activity.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						className: "border-0",
						icon: CalendarClock,
						title: "No activity yet",
						description: "Create a group and start adding expenses to see updates here.",
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/groups",
								search: { new: true },
								children: "Create group"
							})
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border",
						children: activity.data.slice(0, 6).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-3 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
								children: a.actor?.fullName?.[0] || "?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm",
									children: a.message
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-[11px] text-muted-foreground",
									children: new Date(a.createdAt).toLocaleString()
								})]
							})]
						}, a._id))
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/settlements",
						className: "text-xs text-muted-foreground hover:text-foreground",
						children: "Open"
					}),
					children: "Suggested settlements"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-border bg-card p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						className: "border-0 px-0 py-8",
						icon: Wallet,
						title: "Nothing to settle",
						description: "Your balances are clear. We'll surface the minimal payment plan here whenever new expenses appear."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-lg border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
								children: "Quick add"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-3.5 w-3.5 text-muted-foreground" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: "Track a one-off split or scan a receipt to skip manual entry."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								asChild: true,
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/expenses",
									search: { new: true },
									children: "Add expense"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								asChild: true,
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/groups",
									search: { new: true },
									children: "New group"
								})
							})]
						})
					]
				})
			] })]
		})]
	})] });
}
//#endregion
export { DashboardPage as component };
