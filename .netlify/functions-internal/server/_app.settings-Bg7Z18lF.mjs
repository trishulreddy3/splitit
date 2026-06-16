import { d as reviewService, p as settingsService, u as reportService } from "./_ssr/services-hSe0tyCa.mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-context-C_KaABU9.mjs";
import { c as Trash2, g as LoaderCircle } from "./_libs/lucide-react.mjs";
import { i as PageHeader, r as PageContainer } from "./_ssr/primitives-BeN511sB.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Textarea } from "./_ssr/textarea-kko37XEX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-Dg1urBTx.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as objectType, o as stringType } from "./_libs/zod.mjs";
import { r as useForm, t as u } from "./_libs/@hookform/resolvers+[...].mjs";
import { t as Switch } from "./_ssr/switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.settings-Bg7Z18lF.js
var import_jsx_runtime = require_jsx_runtime();
var pwSchema = objectType({
	current: stringType().min(6),
	next: stringType().min(8),
	confirm: stringType()
}).refine((d) => d.next === d.confirm, {
	message: "Passwords don't match",
	path: ["confirm"]
});
function SettingsPage() {
	const { logout } = useAuth();
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
		resolver: u(pwSchema),
		defaultValues: {
			current: "",
			next: "",
			confirm: ""
		}
	});
	const changePw = useMutation({
		mutationFn: (v) => settingsService.changePassword({
			current: v.current,
			next: v.next
		}),
		onSuccess: () => {
			toast.success("Password updated");
			reset();
		},
		onError: (e) => toast.error(e.message)
	});
	const updatePrefs = useMutation({
		mutationFn: (payload) => settingsService.update(payload),
		onSuccess: () => toast.success("Saved"),
		onError: (e) => toast.error(e.message)
	});
	const deleteAcct = useMutation({
		mutationFn: () => settingsService.deleteAccount(),
		onSuccess: () => {
			toast.success("Account deleted");
			logout();
		},
		onError: (e) => toast.error(e.message)
	});
	const submitReview = useMutation({
		mutationFn: (payload) => reviewService.create(payload),
		onSuccess: () => toast.success("Review submitted!"),
		onError: (e) => toast.error(e.message)
	});
	const downloadReport = async (format) => {
		try {
			const blob = format === "pdf" ? await reportService.pdf() : await reportService.csv();
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `splittrip-report.${format}`;
			a.click();
			URL.revokeObjectURL(url);
		} catch (e) {
			toast.error(e.message);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Settings",
		description: "Preferences, security, and account."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Preferences"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Default currency" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Used for new groups and expenses."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								defaultValue: "INR",
								onValueChange: (v) => updatePrefs.mutate({ currency: v }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-32",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
									"INR",
									"USD",
									"EUR",
									"GBP",
									"AED",
									"SGD",
									"AUD",
									"CAD"
								].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c,
									children: c
								}, c)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email notifications" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Friend requests, group invites, settlements."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								defaultChecked: true,
								onCheckedChange: (v) => updatePrefs.mutate({ emailNotifications: v })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Settlement reminders" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Weekly nudge for open balances."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								defaultChecked: true,
								onCheckedChange: (v) => updatePrefs.mutate({ settlementReminders: v })
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Export"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Download your expenses and settlements."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => downloadReport("pdf"),
							children: "Download PDF"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => downloadReport("csv"),
							children: "Download CSV"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Platform Feedback"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Submit a review to be featured on the login screen."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							submitReview.mutate({
								text: fd.get("text"),
								role: fd.get("role"),
								rating: 5
							});
							e.currentTarget.reset();
						},
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Your Role / Title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									name: "role",
									placeholder: "e.g. Travel Lead, Wanderloop",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Review" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									name: "text",
									placeholder: "We used to spend an hour...",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									size: "sm",
									disabled: submitReview.isPending,
									children: [submitReview.isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Submit review"]
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: "Change password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit((v) => changePw.mutate(v)),
					className: "mt-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Current password" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									...register("current")
								}),
								errors.current && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-destructive",
									children: errors.current.message
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "New password" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										...register("next")
									}),
									errors.next && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive",
										children: errors.next.message
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Confirm" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										...register("confirm")
									}),
									errors.confirm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive",
										children: errors.confirm.message
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								size: "sm",
								disabled: isSubmitting || changePw.isPending,
								children: [(isSubmitting || changePw.isPending) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Update password"]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg border border-destructive/40 bg-destructive/5 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: "Delete account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Permanently delete your account, groups, expenses, and settlements. This action cannot be undone."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "destructive",
						size: "sm",
						className: "mt-4",
						onClick: () => {
							if (confirm("Delete account permanently? This cannot be undone.")) deleteAcct.mutate();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1.5 h-3.5 w-3.5" }), "Delete account"]
					})
				]
			})
		]
	}) })] });
}
//#endregion
export { SettingsPage as component };
