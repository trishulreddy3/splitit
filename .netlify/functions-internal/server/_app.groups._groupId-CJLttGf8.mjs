import { o as __toESM } from "./_runtime.mjs";
import { i as expenseService, m as settlementService, s as groupService } from "./_ssr/services-CA8HLDPr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-context-CPXWFpar.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { P as ArrowLeft, c as Trash2, d as Receipt, f as Plus, g as LoaderCircle, k as Calendar, m as MapPin, o as UserMinus, r as Users, t as X } from "./_libs/lucide-react.mjs";
import { i as PageHeader, n as KpiCard, o as Skeleton, r as PageContainer, s as StatusBadge, t as EmptyState } from "./_ssr/primitives-BeN511sB.mjs";
import { t as formatCurrency } from "./_ssr/settle-C_8B-gc8.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-CCJRliUM.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as ExpenseFormSheet } from "./_ssr/expense-form-sheet-DkF0D8Xk.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, s as DialogTrigger, t as Dialog } from "./_ssr/dialog-DIo89e4g.mjs";
import { t as Route } from "./_app.groups._groupId-TMoyrsqc.mjs";
import { t as Switch } from "./_ssr/switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.groups._groupId-CJLttGf8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GroupDetailPage() {
	const { groupId } = Route.useParams();
	const { user } = useAuth();
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [inviteOpen, setInviteOpen] = (0, import_react.useState)(false);
	const [inviteEmail, setInviteEmail] = (0, import_react.useState)("");
	const group = useQuery({
		queryKey: ["group", groupId],
		queryFn: () => groupService.get(groupId)
	});
	const expenses = useQuery({
		queryKey: ["expenses", { groupId }],
		queryFn: () => expenseService.list({ groupId })
	});
	const settlements = useQuery({
		queryKey: ["settlements", { groupId }],
		queryFn: () => settlementService.forGroup(groupId)
	});
	const g = group.data;
	const isOwner = user?._id === g?.owner?._id || user?._id === g?.owner;
	const invitesQuery = useQuery({
		queryKey: ["groupInvites", groupId],
		queryFn: () => groupService.groupInvites(groupId),
		enabled: !!isOwner
	});
	const invite = useMutation({
		mutationFn: () => groupService.invite(groupId, [inviteEmail]),
		onSuccess: () => {
			toast.success("Invitation sent");
			setInviteEmail("");
			setInviteOpen(false);
			qc.invalidateQueries({ queryKey: ["group", groupId] });
			qc.invalidateQueries({ queryKey: ["groupInvites", groupId] });
		},
		onError: (e) => toast.error(e.message)
	});
	const removeMember = useMutation({
		mutationFn: (mid) => groupService.removeMember(groupId, mid),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["group", groupId] });
			toast.success("Member removed");
		},
		onError: (e) => toast.error(e.message)
	});
	const deleteGroup = useMutation({
		mutationFn: () => groupService.remove(groupId),
		onSuccess: () => {
			toast.success("Group deleted");
			window.location.href = "/groups";
		},
		onError: (e) => toast.error(e.message)
	});
	const markPaid = useMutation({
		mutationFn: (id) => settlementService.markPaid(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["settlements"] });
			toast.success("Marked as paid");
		},
		onError: (e) => toast.error(e.message)
	});
	const updateGroup = useMutation({
		mutationFn: (data) => groupService.update(groupId, data),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["group", groupId] });
			toast.success("Settings updated");
		},
		onError: (e) => toast.error(e.message)
	});
	const revokeInvite = useMutation({
		mutationFn: (id) => groupService.rejectInvite(id),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["groupInvites", groupId] });
			toast.success("Invite revoked");
		},
		onError: (e) => toast.error(e.message)
	});
	if (group.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40" }) });
	if (group.isError || !group.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		icon: Users,
		title: "Group not found",
		description: group.error?.message,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/groups",
				children: "Back to groups"
			})
		})
	}) });
	const totalSpend = (expenses.data || []).reduce((a, e) => a + e.amount, 0);
	const currency = expenses.data?.[0]?.currency || "INR";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: g.name,
			description: g.description || "Group overview",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/groups",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1.5 h-3.5 w-3.5" }), " All groups"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				onClick: () => setOpen(true),
				disabled: !user,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), " Add expense"]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageContainer, {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground",
					children: [
						g.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), g.location]
						}),
						g.startDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
								new Date(g.startDate).toLocaleDateString(),
								" ",
								g.endDate && `→ ${new Date(g.endDate).toLocaleDateString()}`
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
								g.members?.length || 0,
								" members"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Total spend",
							value: formatCurrency(totalSpend, currency),
							hint: `${expenses.data?.length || 0} expenses`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Outstanding",
							value: String(settlements.data?.filter((s) => s.status !== "confirmed").length || 0),
							hint: "Open settlements"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Members",
							value: String(g.members?.length || 0),
							hint: "Including you"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "expenses",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "expenses",
								children: "Expenses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "settlements",
								children: "Settlements"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "members",
								children: "Members"
							}),
							isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "settings",
								children: "Settings"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "expenses",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-lg border border-border bg-card",
								children: expenses.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "m-4 h-24" }) : !expenses.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									className: "border-0",
									icon: Receipt,
									title: "No expenses in this group",
									action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										onClick: () => setOpen(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), "Add expense"]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y divide-border",
									children: expenses.data.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3 px-4 py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-muted text-[10px] font-medium uppercase",
												children: e.name[0]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "truncate text-sm font-medium",
													children: e.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "truncate text-xs text-muted-foreground",
													children: [
														e.contributors?.length === 1 ? `${typeof e.contributors[0].user === "object" ? e.contributors[0].user.fullName : "Someone"} paid` : `${e.contributors?.length || 0} people paid`,
														" · ",
														new Date(e.expenseDate).toLocaleDateString()
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { children: e.category }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-24 text-right text-sm font-medium tabular-nums",
												children: formatCurrency(e.amount, e.currency)
											})
										]
									}, e._id))
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "settlements",
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-lg border border-border bg-card",
								children: settlements.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "m-4 h-24" }) : !settlements.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
									className: "border-0",
									icon: Receipt,
									title: "Everyone is settled up",
									description: "When new expenses create imbalances, we'll suggest the minimum number of payments here."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "divide-y divide-border",
									children: settlements.data.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-3 px-4 py-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
												children: s.from?.fullName?.[0]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "truncate text-sm",
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
													children: s.status
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-28 text-right text-sm font-medium tabular-nums",
												children: formatCurrency(s.amount, s.currency)
											}),
											s.status !== "confirmed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "outline",
												onClick: () => markPaid.mutate(s._id),
												disabled: markPaid.isPending,
												children: "Mark paid"
											})
										]
									}, s._id))
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "members",
							className: "mt-4 space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
								defaultValue: "members-list",
								className: "w-full",
								children: [
									isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
										className: "mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "members-list",
											children: "Members"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "pending-invites",
											children: "Pending Invites"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
										value: "members-list",
										className: "space-y-4 mt-0",
										children: [(isOwner || g.membersCanInvite) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
												open: inviteOpen,
												onOpenChange: setInviteOpen,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "outline",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 h-3.5 w-3.5" }), "Invite"]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Invite by email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "They'll receive a link to join this group." })] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: inviteEmail,
														onChange: (e) => setInviteEmail(e.target.value),
														placeholder: "friend@example.com"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														onClick: () => invite.mutate(),
														disabled: !inviteEmail || invite.isPending,
														children: [invite.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Send invite"]
													}) })
												] })]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "overflow-hidden rounded-lg border border-border bg-card",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "divide-y divide-border",
												children: g.members?.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-3 px-4 py-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
															children: m.fullName?.[0]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0 flex-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "truncate text-sm font-medium",
																children: [
																	m.fullName,
																	" ",
																	m._id === g.owner?._id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "ml-1 text-[10px] uppercase text-muted-foreground",
																		children: "owner"
																	})
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "truncate text-xs text-muted-foreground",
																children: m.email
															})]
														}),
														m._id !== g.owner?._id && isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: () => removeMember.mutate(m._id),
															className: "text-muted-foreground hover:text-destructive",
															"aria-label": "Remove member",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMinus, { className: "h-4 w-4" })
														})
													]
												}, m._id))
											})
										})]
									}),
									isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "pending-invites",
										className: "mt-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "overflow-hidden rounded-lg border border-border bg-card",
											children: !invitesQuery.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
												className: "border-0",
												icon: Users,
												title: "No pending invites",
												description: "There are no pending invitations for this group."
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "divide-y divide-border",
												children: invitesQuery.data.map((inv) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-center gap-3 px-4 py-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
															children: inv.to.name?.[0] || inv.to.email?.[0] || "?"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0 flex-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "truncate text-sm font-medium",
																children: [
																	inv.to.name || inv.to.email,
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "ml-1 text-[10px] uppercase text-muted-foreground",
																		children: "invited"
																	})
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "truncate text-xs text-muted-foreground",
																children: ["by ", inv.from.name || inv.from.email]
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
															size: "sm",
															variant: "outline",
															className: "h-8 text-destructive hover:bg-destructive/10 hover:text-destructive opacity-80 hover:opacity-100",
															onClick: () => revokeInvite.mutate(inv._id),
															disabled: revokeInvite.isPending,
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-1 h-3 w-3" }), " Revoke"]
														})
													]
												}, inv._id))
											})
										})
									})
								]
							})
						}),
						isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "settings",
							className: "mt-4 space-y-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-card p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium",
									children: "Group permissions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-base",
											children: "Allow members to invite"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "If turned on, any member can invite other people to the group."
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: !!g.membersCanInvite,
										onCheckedChange: (checked) => updateGroup.mutate({ membersCanInvite: checked }),
										disabled: updateGroup.isPending
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-destructive/40 bg-destructive/5 p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-medium",
										children: "Danger zone"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "Deleting a group removes all expenses and settlement history. This can't be undone."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "destructive",
										size: "sm",
										className: "mt-4",
										onClick: () => {
											if (confirm(`Delete "${g.name}"? This is permanent.`)) deleteGroup.mutate();
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1.5 h-3.5 w-3.5" }), "Delete group"]
									})
								]
							})]
						})
					]
				})
			]
		}),
		user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseFormSheet, {
			open,
			onOpenChange: setOpen,
			group: g,
			currentUser: user,
			members: g.members || []
		})
	] });
}
//#endregion
export { GroupDetailPage as component };
