import { o as __toESM } from "./_runtime.mjs";
import { a as friendService } from "./_ssr/services-hSe0tyCa.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { a as UserPlus, f as Plus, g as LoaderCircle, k as Check, t as X } from "./_libs/lucide-react.mjs";
import { i as PageHeader, o as Skeleton, r as PageContainer, t as EmptyState } from "./_ssr/primitives-BeN511sB.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-CCJRliUM.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as DialogHeader, c as UserSearchCombobox, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./_ssr/user-search-combobox-DXEwMkeh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.friends-C_apCIPB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FriendsPage() {
	const qc = useQueryClient();
	const friends = useQuery({
		queryKey: ["friends"],
		queryFn: friendService.list
	});
	const requests = useQuery({
		queryKey: ["friend-requests"],
		queryFn: friendService.requests
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [q, setQ] = (0, import_react.useState)("");
	const sendReq = useMutation({
		mutationFn: () => friendService.sendRequest(email),
		onSuccess: () => {
			toast.success("Request sent");
			setEmail("");
			setOpen(false);
		},
		onError: (e) => toast.error(e.message)
	});
	const accept = useMutation({
		mutationFn: (id) => friendService.accept(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["friends"] });
			qc.invalidateQueries({ queryKey: ["friend-requests"] });
			toast.success("Friend added");
		},
		onError: (e) => toast.error(e.message)
	});
	const reject = useMutation({
		mutationFn: (id) => friendService.reject(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["friend-requests"] })
	});
	const remove = useMutation({
		mutationFn: (id) => friendService.remove(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["friends"] });
			toast.success("Friend removed");
		},
		onError: (e) => toast.error(e.message)
	});
	const filtered = (friends.data || []).filter((f) => !q || f.user.fullName.toLowerCase().includes(q.toLowerCase()) || f.user.email.toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Friends",
		description: "People you split with regularly.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), "Add friend"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Send friend request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "We'll notify them by email." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserSearchCombobox, {
					value: email,
					onChange: setEmail,
					placeholder: "Search to add friend..."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => sendReq.mutate(),
					disabled: !email || sendReq.isPending,
					children: [sendReq.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Send request"]
				}) })
			] })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "all",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: "all",
				children: "All friends"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
				value: "requests",
				children: ["Requests ", requests.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-1 rounded-full bg-muted px-1.5 text-[10px]",
					children: requests.data.length
				}) : null]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
				value: "all",
				className: "mt-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search friends…",
					className: "max-w-sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-lg border border-border bg-card",
					children: friends.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "m-4 h-24" }) : !filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						className: "border-0",
						icon: UserPlus,
						title: "No friends yet",
						description: "Add friends to invite them to groups and split expenses faster."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border",
						children: filtered.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
									children: f.user.fullName?.[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium",
										children: f.user.fullName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: f.user.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										if (confirm("Remove friend?")) remove.mutate(f._id);
									},
									className: "text-muted-foreground hover:text-destructive",
									children: "Remove"
								})
							]
						}, f._id))
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "requests",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-lg border border-border bg-card",
					children: requests.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "m-4 h-24" }) : !requests.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						className: "border-0",
						icon: UserPlus,
						title: "No pending requests"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-border",
						children: requests.data.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 px-4 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
									children: r.from?.fullName?.[0]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-sm font-medium",
										children: r.from?.fullName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: r.from?.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => accept.mutate(r._id),
									disabled: accept.isPending,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-1 h-3.5 w-3.5" }), "Accept"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => reject.mutate(r._id),
									className: "text-muted-foreground hover:text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								})
							]
						}, r._id))
					})
				})
			})
		]
	}) })] });
}
//#endregion
export { FriendsPage as component };
