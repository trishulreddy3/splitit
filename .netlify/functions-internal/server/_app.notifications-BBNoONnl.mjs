import { c as notificationService } from "./_ssr/services-hSe0tyCa.mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { M as Bell } from "./_libs/lucide-react.mjs";
import { i as PageHeader, o as Skeleton, r as PageContainer, t as EmptyState } from "./_ssr/primitives-BeN511sB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.notifications-BBNoONnl.js
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const qc = useQueryClient();
	const list = useQuery({
		queryKey: ["notifications"],
		queryFn: notificationService.list
	});
	const read = useMutation({
		mutationFn: (id) => notificationService.read(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Notifications" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-lg border border-border bg-card",
		children: list.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "m-4 h-40" }) : list.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			className: "border-0",
			icon: Bell,
			title: "Couldn't load",
			description: list.error.message
		}) : !list.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			className: "border-0",
			icon: Bell,
			title: "You're all caught up",
			description: "New friend requests, group invites, and settlements will appear here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border",
			children: list.data.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				onClick: () => !n.read && read.mutate(n._id),
				className: cn("flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-accent/40", !n.read && "bg-muted/30"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", n.read ? "bg-muted" : "bg-foreground") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: n.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground",
							children: n.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-[11px] text-muted-foreground",
							children: new Date(n.createdAt).toLocaleString()
						})
					]
				})]
			}, n._id))
		})
	}) })] });
}
//#endregion
export { NotificationsPage as component };
