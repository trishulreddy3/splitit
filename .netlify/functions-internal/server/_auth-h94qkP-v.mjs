import { d as reviewService } from "./_ssr/services-CA8HLDPr.mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "./_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-context-CPXWFpar.mjs";
import { _ as Navigate, f as Outlet } from "./_libs/@tanstack/react-router+[...].mjs";
import { d as Receipt, n as Wallet, r as Users } from "./_libs/lucide-react.mjs";
import { t as motion } from "./_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_auth-h94qkP-v.js
var import_jsx_runtime = require_jsx_runtime();
function AuthLayout() {
	const { isAuthenticated, loading } = useAuth();
	const { data: randomReview } = useQuery({
		queryKey: ["random-review"],
		queryFn: () => reviewService.getRandom(),
		staleTime: Infinity
	});
	if (!loading && isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen w-full grid-cols-1 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "relative hidden overflow-hidden border-r border-border bg-sidebar lg:flex lg:flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-bg opacity-40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-32 top-40 h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex h-full flex-col p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-8 w-8 place-items-center rounded-md border border-border bg-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-3 rounded-sm bg-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold tracking-tight",
								children: "SplitTrip"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-24 max-w-md",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
								initial: {
									opacity: 0,
									y: 8
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: { duration: .5 },
								className: "text-4xl font-semibold leading-[1.05] tracking-tight",
								children: [
									"Split anything.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Settle in seconds."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
								initial: {
									opacity: 0,
									y: 8
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .5,
									delay: .1
								},
								className: "mt-5 text-sm leading-relaxed text-muted-foreground",
								children: "Track shared expenses across trips, flats, and events. SplitTrip simplifies who owes whom with a minimal cash-flow algorithm — so groups settle with the fewest payments possible."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-16 grid max-w-md grid-cols-3 gap-3",
							children: [
								{
									icon: Users,
									label: "Groups",
									value: "Unlimited"
								},
								{
									icon: Receipt,
									label: "Splits",
									value: "4 modes"
								},
								{
									icon: Wallet,
									label: "Currencies",
									value: "Multi"
								}
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-card/40 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 text-xs text-muted-foreground",
										children: s.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium",
										children: s.value
									})
								]
							}, s.label))
						}),
						randomReview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto space-y-3 border-t border-border pt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-foreground",
								children: [
									"\"",
									randomReview.text,
									"\""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-6 w-6 overflow-hidden rounded-full bg-muted",
									children: randomReview.authorAvatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: randomReview.authorAvatar,
										alt: "",
										className: "h-full w-full object-cover"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									randomReview.authorName,
									" ",
									randomReview.role ? `· ${randomReview.role}` : ""
								] })]
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "relative flex items-center justify-center px-6 py-12 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/",
				className: "absolute left-6 top-6 flex items-center gap-2 text-sm font-semibold lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-7 w-7 place-items-center rounded-md border border-border bg-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2.5 w-2.5 rounded-sm bg-foreground" })
				}), "SplitTrip"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})]
	});
}
//#endregion
export { AuthLayout as component };
