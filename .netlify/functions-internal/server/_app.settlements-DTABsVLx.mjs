import { m as settlementService } from "./_ssr/services-CA8HLDPr.mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { C as CircleCheck, g as LoaderCircle, n as Wallet } from "./_libs/lucide-react.mjs";
import { i as PageHeader, o as Skeleton, r as PageContainer, s as StatusBadge, t as EmptyState } from "./_ssr/primitives-BeN511sB.mjs";
import { t as formatCurrency } from "./_ssr/settle-C_8B-gc8.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.settlements-DTABsVLx.js
var import_jsx_runtime = require_jsx_runtime();
function SettlementsPage() {
	const qc = useQueryClient();
	const settlements = useQuery({
		queryKey: ["settlements"],
		queryFn: settlementService.list
	});
	const markPaid = useMutation({
		mutationFn: (id) => settlementService.markPaid(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["settlements"] });
			toast.success("Marked as paid");
		},
		onError: (e) => toast.error(e.message)
	});
	const data = settlements.data || [];
	const pending = data.filter((s) => s.status !== "confirmed");
	const settled = data.filter((s) => s.status === "confirmed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settlements",
		description: "The minimum number of payments to balance every group."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, {
		className: "space-y-6",
		children: settlements.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40" }) : settlements.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: Wallet,
			title: "Couldn't load settlements",
			description: settlements.error.message
		}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			icon: CircleCheck,
			title: "All settled",
			description: "You're clear with everyone. New expenses will surface here automatically."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "mb-3 text-sm font-medium",
			children: [
				"Pending (",
				pending.length,
				")"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-lg border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y divide-border",
				children: [pending.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
							children: s.from?.fullName?.[0]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: s.from?.fullName
									}),
									" pays ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: s.to?.fullName
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground",
								children: new Date(s.createdAt).toLocaleDateString()
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { children: s.status }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-28 text-right text-sm font-medium tabular-nums",
							children: formatCurrency(s.amount, s.currency)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => markPaid.mutate(s._id),
							disabled: markPaid.isPending,
							children: [markPaid.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-3.5 w-3.5 animate-spin" }), "Mark paid"]
						})
					]
				}, s._id)), pending.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "p-6 text-center text-xs text-muted-foreground",
					children: "Nothing pending."
				})]
			})
		})] }), settled.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-3 text-sm font-medium",
			children: "History"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-lg border border-border bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: settled.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 text-sm",
							children: [
								s.from?.fullName,
								" → ",
								s.to?.fullName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: new Date(s.createdAt).toLocaleDateString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-28 text-right text-sm tabular-nums",
							children: formatCurrency(s.amount, s.currency)
						})
					]
				}, s._id))
			})
		})] })] })
	})] });
}
//#endregion
export { SettlementsPage as component };
