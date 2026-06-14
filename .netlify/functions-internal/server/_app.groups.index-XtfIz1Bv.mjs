import { o as __toESM } from "./_runtime.mjs";
import { s as groupService } from "./_ssr/services-CA8HLDPr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { N as ArrowRight, O as Check, f as Plus, g as LoaderCircle, k as Calendar, m as MapPin, r as Users, t as X } from "./_libs/lucide-react.mjs";
import { i as PageHeader, o as Skeleton, r as PageContainer, t as EmptyState } from "./_ssr/primitives-BeN511sB.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { a as SheetHeader, i as SheetFooter, n as SheetContent, o as SheetTitle, r as SheetDescription, s as SheetTrigger, t as Sheet } from "./_ssr/sheet-DWDZjAlX.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-CCJRliUM.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as objectType, o as stringType } from "./_libs/zod.mjs";
import { r as useForm, t as u } from "./_libs/@hookform/resolvers+[...].mjs";
import { t as Route } from "./_app.groups.index-BxqOcE3A.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.groups.index-XtfIz1Bv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	name: stringType().trim().min(2, "Required").max(80),
	description: stringType().max(300).optional(),
	location: stringType().max(120).optional(),
	startDate: stringType().optional(),
	endDate: stringType().optional()
});
function GroupsPage() {
	const search = Route.useSearch();
	const groups = useQuery({
		queryKey: ["groups"],
		queryFn: groupService.list
	});
	const pendingInvites = useQuery({
		queryKey: [
			"groups",
			"invites",
			"pending"
		],
		queryFn: groupService.pendingInvites
	});
	const [open, setOpen] = (0, import_react.useState)(search.new || false);
	const qc = useQueryClient();
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
		resolver: u(schema),
		defaultValues: {
			name: "",
			description: "",
			location: ""
		}
	});
	const create = useMutation({
		mutationFn: (v) => groupService.create(v),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["groups"] });
			toast.success("Group created");
			reset();
			setOpen(false);
		},
		onError: (e) => toast.error(e.message || "Failed to create group")
	});
	const accept = useMutation({
		mutationFn: (id) => groupService.acceptInvite(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["groups"] });
			qc.invalidateQueries({ queryKey: [
				"groups",
				"invites",
				"pending"
			] });
			toast.success("Invite accepted");
		},
		onError: (e) => toast.error(e.message || "Failed to accept invite")
	});
	const reject = useMutation({
		mutationFn: (id) => groupService.rejectInvite(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: [
				"groups",
				"invites",
				"pending"
			] });
			toast.success("Invite rejected");
		},
		onError: (e) => toast.error(e.message || "Failed to reject invite")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Groups",
		description: "Trips, flats, events — every shared wallet lives here.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " New group"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
				className: "w-full sm:max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Create a group" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Anyone you invite can add expenses and view balances." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit((v) => create.mutate(v)),
					className: "mt-6 space-y-4 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									placeholder: "Goa Trip 2026",
									...register("name")
								}),
								errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: errors.name.message
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "description",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "description",
								rows: 3,
								placeholder: "What is this group for?",
								...register("description")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "location",
								children: "Location"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "location",
								placeholder: "Goa, India",
								...register("location")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "startDate",
									children: "Start date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "startDate",
									type: "date",
									...register("startDate")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "endDate",
									children: "End date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "endDate",
									type: "date",
									...register("endDate")
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFooter, {
							className: "px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: isSubmitting || create.isPending,
								className: "w-full",
								children: [(isSubmitting || create.isPending) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Create group"]
							})
						})
					]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "groups",
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: "groups",
				children: "My Groups"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
				value: "pending",
				className: "relative",
				children: ["Pending Invites", pendingInvites.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground",
					children: pendingInvites.data.length
				}) : null]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "groups",
				className: "space-y-4 outline-none",
				children: groups.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-44" }, i))
				}) : groups.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Users,
					title: "Couldn't load groups",
					description: groups.error.message
				}) : !groups.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Users,
					title: "No groups yet",
					description: "Create your first group to start tracking shared expenses.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " New group"]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3",
					children: groups.data.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/groups/$groupId",
						params: { groupId: g._id },
						className: "group flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-border/80",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 place-items-center rounded-md border border-border bg-muted text-sm font-medium",
									children: g.name?.[0]?.toUpperCase() || "G"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 truncate text-sm font-medium",
								children: g.name
							}),
							g.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-xs text-muted-foreground",
								children: g.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }), g.members?.length || 0]
									}),
									g.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), g.location]
									}),
									g.startDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), new Date(g.startDate).toLocaleDateString()]
									})
								]
							})
						]
					}, g._id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "pending",
				className: "space-y-4 outline-none",
				children: pendingInvites.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-2",
					children: Array.from({ length: 2 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24" }, i))
				}) : !pendingInvites.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					icon: Users,
					title: "No pending invites",
					description: "You're all caught up."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-3 md:grid-cols-2",
					children: pendingInvites.data.map((invite) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-medium",
								children: invite.group.name?.[0]?.toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: invite.group.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Invited by ", invite.from.name]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								variant: "outline",
								className: "h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive",
								onClick: () => reject.mutate(invite._id),
								disabled: reject.isPending || accept.isPending,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon",
								className: "h-8 w-8",
								onClick: () => accept.mutate(invite._id),
								disabled: accept.isPending || reject.isPending,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
							})]
						})]
					}, invite._id))
				})
			})
		]
	}) })] });
}
//#endregion
export { GroupsPage as component };
