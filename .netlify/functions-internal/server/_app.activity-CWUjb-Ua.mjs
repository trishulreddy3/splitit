import { t as activityService } from "./_ssr/services-hSe0tyCa.mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { L as Activity } from "./_libs/lucide-react.mjs";
import { i as PageHeader, o as Skeleton, r as PageContainer, t as EmptyState } from "./_ssr/primitives-BeN511sB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.activity-CWUjb-Ua.js
var import_jsx_runtime = require_jsx_runtime();
function ActivityPage() {
	const activity = useQuery({
		queryKey: ["activity"],
		queryFn: activityService.list
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Activity",
		description: "Everything that's happened across your groups."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-lg border border-border bg-card",
		children: activity.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "m-4 h-40" }) : activity.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			className: "border-0",
			icon: Activity,
			title: "Couldn't load activity",
			description: activity.error.message
		}) : !activity.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			className: "border-0",
			icon: Activity,
			title: "No activity yet",
			description: "Activity shows up as groups, expenses, and settlements happen."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-border",
			children: activity.data.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex items-start gap-3 px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
					children: a.actor?.fullName?.[0] || "?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: a.message
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-[11px] text-muted-foreground",
						children: new Date(a.createdAt).toLocaleString()
					})]
				})]
			}, a._id))
		})
	}) })] });
}
//#endregion
export { ActivityPage as component };
