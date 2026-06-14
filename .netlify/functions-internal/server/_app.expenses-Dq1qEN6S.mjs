import { o as __toESM } from "./_runtime.mjs";
import { a as friendService, i as expenseService, s as groupService } from "./_ssr/services-CA8HLDPr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-context-CPXWFpar.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as Trash2, d as Receipt, f as Plus, v as Funnel } from "./_libs/lucide-react.mjs";
import { i as PageHeader, o as Skeleton, r as PageContainer, s as StatusBadge, t as EmptyState } from "./_ssr/primitives-BeN511sB.mjs";
import { t as formatCurrency } from "./_ssr/settle-C_8B-gc8.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Route } from "./_app.expenses-B93C73sx.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as ExpenseFormSheet } from "./_ssr/expense-form-sheet-DkF0D8Xk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.expenses-Dq1qEN6S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExpensesPage() {
	const search = Route.useSearch();
	const { user } = useAuth();
	const [q, setQ] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(search.new || false);
	const qc = useQueryClient();
	const expenses = useQuery({
		queryKey: ["expenses"],
		queryFn: () => expenseService.list()
	});
	const groups = useQuery({
		queryKey: ["groups"],
		queryFn: groupService.list
	});
	const friends = useQuery({
		queryKey: ["friends"],
		queryFn: friendService.list
	});
	const remove = useMutation({
		mutationFn: (id) => expenseService.remove(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["expenses"] });
			toast.success("Expense deleted");
		},
		onError: (e) => toast.error(e.message)
	});
	const filtered = (expenses.data || []).filter((e) => !q || e.name.toLowerCase().includes(q.toLowerCase()));
	const members = [...user ? [user] : [], ...(friends.data || []).map((f) => f.user)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Expenses",
			description: "Every shared payment, with full split history.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-1.5 h-3.5 w-3.5" }), "Filter"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setOpen(true),
				disabled: !user,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " Add expense"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContainer, {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search expenses…",
					className: "max-w-sm"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-lg border border-border bg-card",
				children: expenses.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y divide-border",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "m-3 h-12" }, i))
				}) : expenses.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					className: "border-0",
					icon: Receipt,
					title: "Couldn't load expenses",
					description: expenses.error.message
				}) : !filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					className: "border-0",
					icon: Receipt,
					title: "No expenses yet",
					description: "Track a shared payment and we'll handle the splits.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setOpen(true),
						disabled: !user,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " Add expense"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden grid-cols-[1.5fr_1fr_0.8fr_1fr_120px_40px] gap-4 border-b border-border bg-muted/30 px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:grid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expense" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Paid by" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Category" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Date" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right",
							children: "Amount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-border",
					children: filtered.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-1 gap-3 px-4 py-3 md:grid-cols-[1.5fr_1fr_0.8fr_1fr_120px_40px] md:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/expenses",
									className: "truncate text-sm font-medium",
									children: e.name
								}), e.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: e.description
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm",
								children: e.paidBy?.fullName || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { children: e.category }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: new Date(e.expenseDate).toLocaleDateString()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-right text-sm font-medium tabular-nums",
								children: formatCurrency(e.amount, e.currency)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									if (confirm("Delete this expense?")) remove.mutate(e._id);
								},
								className: "justify-self-end text-muted-foreground transition-colors hover:text-destructive",
								"aria-label": "Delete expense",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					}, e._id))
				})] })
			})]
		}),
		user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseFormSheet, {
			open,
			onOpenChange: setOpen,
			currentUser: user,
			members,
			groups: groups.data
		})
	] });
}
//#endregion
export { ExpensesPage as component };
