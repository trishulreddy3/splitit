import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as AuthProvider } from "./auth-context-C_KaABU9.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$13 } from "../_app.expenses-BIBcHyaW.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { a as objectType, o as stringType } from "../_libs/zod.mjs";
import { t as Route$14 } from "../_app.groups._groupId-ZVdl-RHS.mjs";
import { t as Route$15 } from "../_app.groups.index-Dq9cHwsT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Ztmi11Ll.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BTeZ_Wy_.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-border px-4 py-2 text-sm",
						children: "Go home"
					})]
				})
			]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-2xl font-semibold tracking-tight",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "/",
					className: "mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
					children: "Go home"
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Splitit — Smart Group Expense Manager" },
			{
				name: "description",
				content: "Split expenses with friends across trips, vacations, flat shares, and events. Automatic settlements, debt simplification, and clean reports."
			},
			{
				property: "og:title",
				content: "Splitit — Smart Group Expense Manager"
			},
			{
				property: "og:description",
				content: "Split expenses with friends. Automatic settlements and debt simplification."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen bg-background text-foreground antialiased",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			theme: "dark",
			position: "top-right"
		})] })
	});
}
var $$splitComponentImporter$11 = () => import("../_auth-DYqbfDUl.mjs");
var Route$11 = createFileRoute("/_auth")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_app-C_zJTMnZ.mjs");
var Route$10 = createFileRoute("/_app")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./routes-BFn5WFF3.mjs");
var Route$9 = createFileRoute("/")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_auth.signup-DZIQK2HY.mjs");
var Route$8 = createFileRoute("/_auth/signup")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
objectType({
	fullName: stringType().trim().min(2, "Required").max(80),
	username: stringType().trim().min(3, "At least 3 chars").max(30).regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, underscores only"),
	email: stringType().trim().email("Enter a valid email").max(255),
	password: stringType().min(8, "At least 8 characters").max(128),
	confirm: stringType()
}).refine((d) => d.password === d.confirm, {
	message: "Passwords don't match",
	path: ["confirm"]
});
var $$splitComponentImporter$7 = () => import("../_auth.login-3iijVfC3.mjs");
var Route$7 = createFileRoute("/_auth/login")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
objectType({
	email: stringType().trim().email("Enter a valid email").max(255),
	password: stringType().min(6, "At least 6 characters").max(128)
});
var $$splitComponentImporter$6 = () => import("../_app.settlements-BCnmxzhG.mjs");
var Route$6 = createFileRoute("/_app/settlements")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_app.settings-Bg7Z18lF.mjs");
var Route$5 = createFileRoute("/_app/settings")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
objectType({
	current: stringType().min(6),
	next: stringType().min(8),
	confirm: stringType()
}).refine((d) => d.next === d.confirm, {
	message: "Passwords don't match",
	path: ["confirm"]
});
var $$splitComponentImporter$4 = () => import("../_app.profile-DDP9lXhf.mjs");
var Route$4 = createFileRoute("/_app/profile")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
objectType({
	fullName: stringType().trim().min(2).max(80),
	username: stringType().trim().min(3).max(30),
	email: stringType().email()
});
var $$splitComponentImporter$3 = () => import("../_app.notifications-BBNoONnl.mjs");
var Route$3 = createFileRoute("/_app/notifications")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.friends-C_apCIPB.mjs");
var Route$2 = createFileRoute("/_app/friends")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.dashboard-2G6n3ErL.mjs");
var Route$1 = createFileRoute("/_app/dashboard")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.activity-CWUjb-Ua.mjs");
var Route = createFileRoute("/_app/activity")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var AuthRoute = Route$11.update({
	id: "/_auth",
	getParentRoute: () => Route$12
});
var AppRoute = Route$10.update({
	id: "/_app",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var AuthSignupRoute = Route$8.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => AuthRoute
});
var AuthLoginRoute = Route$7.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AuthRoute
});
var AppSettlementsRoute = Route$6.update({
	id: "/settlements",
	path: "/settlements",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$5.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AppProfileRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AppRoute
});
var AppNotificationsRoute = Route$3.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AppRoute
});
var AppFriendsRoute = Route$2.update({
	id: "/friends",
	path: "/friends",
	getParentRoute: () => AppRoute
});
var AppExpensesRoute = Route$13.update({
	id: "/expenses",
	path: "/expenses",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$1.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppActivityRoute = Route.update({
	id: "/activity",
	path: "/activity",
	getParentRoute: () => AppRoute
});
var AppGroupsIndexRoute = Route$15.update({
	id: "/groups/",
	path: "/groups/",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppActivityRoute,
	AppDashboardRoute,
	AppExpensesRoute,
	AppFriendsRoute,
	AppNotificationsRoute,
	AppProfileRoute,
	AppSettingsRoute,
	AppSettlementsRoute,
	AppGroupsGroupIdRoute: Route$14.update({
		id: "/groups/$groupId",
		path: "/groups/$groupId",
		getParentRoute: () => AppRoute
	}),
	AppGroupsIndexRoute
};
var AppRouteWithChildren = AppRoute._addFileChildren(AppRouteChildren);
var AuthRouteChildren = {
	AuthLoginRoute,
	AuthSignupRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRouteWithChildren,
	AuthRoute: AuthRoute._addFileChildren(AuthRouteChildren)
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
