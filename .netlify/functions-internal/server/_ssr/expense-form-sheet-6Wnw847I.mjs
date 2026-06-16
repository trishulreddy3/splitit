import { o as __toESM } from "../_runtime.mjs";
import { i as expenseService } from "./services-hSe0tyCa.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { d as Receipt, g as LoaderCircle, k as Check } from "../_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as formatCurrency } from "./settle-C_8B-gc8.mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as SheetHeader, i as SheetFooter, n as SheetContent, o as SheetTitle, r as SheetDescription, t as Sheet } from "./sheet-DWDZjAlX.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as objectType, i as enumType, n as booleanType, o as stringType, r as coerce, t as arrayType } from "../_libs/zod.mjs";
import { n as useFieldArray, r as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/expense-form-sheet-6Wnw847I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var CATEGORIES = [
	{
		value: "food",
		label: "Food"
	},
	{
		value: "travel",
		label: "Travel"
	},
	{
		value: "hotel",
		label: "Hotel"
	},
	{
		value: "shopping",
		label: "Shopping"
	},
	{
		value: "fuel",
		label: "Fuel"
	},
	{
		value: "activities",
		label: "Activities"
	},
	{
		value: "tickets",
		label: "Tickets"
	},
	{
		value: "emergency",
		label: "Emergency"
	},
	{
		value: "miscellaneous",
		label: "Miscellaneous"
	}
];
var baseSchema = objectType({
	name: stringType().trim().min(1, "Required").max(120),
	description: stringType().max(500).optional(),
	amount: coerce.number().positive("Must be greater than 0"),
	currency: stringType().min(1).max(8),
	category: stringType(),
	expenseDate: stringType().min(1),
	splitMethod: enumType([
		"equal",
		"unequal",
		"percentage",
		"shares"
	]),
	groupId: stringType().optional(),
	payerMode: enumType(["single", "multiple"]),
	paidBy: stringType().optional(),
	contributors: arrayType(objectType({
		userId: stringType(),
		selected: booleanType(),
		amount: coerce.number().min(0).optional()
	})),
	splits: arrayType(objectType({
		userId: stringType(),
		selected: booleanType(),
		amount: coerce.number().min(0).optional(),
		percentage: coerce.number().min(0).max(100).optional(),
		shares: coerce.number().min(0).optional()
	}))
});
function ExpenseFormSheet({ open, onOpenChange, group, currentUser, members, groups, onCreated }) {
	const qc = useQueryClient();
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const { register, handleSubmit, setValue, watch, control, reset, formState: { errors, isSubmitting } } = useForm({
		resolver: u(baseSchema),
		defaultValues: {
			name: "",
			description: "",
			amount: 0,
			currency: "INR",
			category: "miscellaneous",
			expenseDate: today,
			splitMethod: "equal",
			groupId: group?._id,
			payerMode: "single",
			paidBy: currentUser._id,
			contributors: members.map((m) => ({
				userId: m._id,
				selected: m._id === currentUser._id,
				amount: 0
			})),
			splits: members.map((m) => ({
				userId: m._id,
				selected: true,
				amount: 0,
				percentage: 0,
				shares: 1
			}))
		}
	});
	const { fields } = useFieldArray({
		control,
		name: "splits"
	});
	const { fields: contributorFields } = useFieldArray({
		control,
		name: "contributors"
	});
	const amount = Number(watch("amount") || 0);
	const method = watch("splitMethod");
	const splits = watch("splits") || [];
	const selectedIds = splits.filter((s) => s.selected).map((s) => s.userId);
	const computed = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		if (!amount || selectedIds.length === 0) return map;
		if (method === "equal") {
			const each = amount / selectedIds.length;
			selectedIds.forEach((id) => map.set(id, each));
		} else if (method === "unequal") splits.forEach((s) => {
			if (s.selected) map.set(s.userId, Number(s.amount || 0));
		});
		else if (method === "percentage") splits.forEach((s) => {
			if (s.selected) map.set(s.userId, Number(s.percentage || 0) / 100 * amount);
		});
		else if (method === "shares") {
			const total = splits.filter((s) => s.selected).reduce((a, s) => a + Number(s.shares || 0), 0);
			splits.forEach((s) => {
				if (s.selected) map.set(s.userId, total ? Number(s.shares || 0) / total * amount : 0);
			});
		}
		return map;
	}, [
		amount,
		method,
		JSON.stringify(splits)
	]);
	const totalAllocated = Array.from(computed.values()).reduce((a, b) => a + b, 0);
	const remaining = amount - totalAllocated;
	const create = useMutation({
		mutationFn: async (v) => {
			const data = {
				...v,
				group: v.groupId,
				participants: v.splits.filter((s) => s.selected).map((s) => s.userId),
				contributors: v.payerMode === "single" ? [{
					user: v.paidBy,
					amount: Number(v.amount)
				}] : v.contributors.filter((c) => c.selected && Number(c.amount) > 0).map((c) => ({
					user: c.userId,
					amount: Number(c.amount)
				})),
				splits: v.splits.filter((s) => s.selected).map((s) => ({
					user: s.userId,
					amount: method === "unequal" ? Number(s.amount || 0) : Number(computed.get(s.userId)?.toFixed(2)) || 0,
					percentage: method === "percentage" ? Number(s.percentage || 0) : void 0,
					shares: method === "shares" ? Number(s.shares || 0) : void 0
				}))
			};
			if (data.contributors.length === 0) {
				toast.error("Please specify who paid.");
				return;
			}
			if (v.payerMode === "multiple") {
				const totalContributed = data.contributors.reduce((acc, c) => acc + c.amount, 0);
				if (Math.abs(totalContributed - Number(v.amount)) > .01) {
					toast.error(`Contributors total (${formatCurrency(totalContributed, v.currency)}) does not match expense amount (${formatCurrency(Number(v.amount), v.currency)}).`);
					return;
				}
			}
			return expenseService.create(data);
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["expenses"] });
			qc.invalidateQueries({ queryKey: ["dashboard"] });
			qc.invalidateQueries({ queryKey: ["settlements"] });
			toast.success("Expense added");
			onCreated?.();
			reset();
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message || "Failed to add expense")
	});
	(0, import_react.useEffect)(() => {
		if (!open) return;
		reset({
			name: "",
			description: "",
			amount: 0,
			currency: "INR",
			category: "miscellaneous",
			paidBy: currentUser._id,
			expenseDate: today,
			splitMethod: "equal",
			groupId: group?._id,
			payerMode: "single",
			contributors: members.map((m) => ({
				userId: m._id,
				selected: m._id === currentUser._id,
				amount: 0
			})),
			splits: members.map((m) => ({
				userId: m._id,
				selected: true,
				amount: 0,
				percentage: 0,
				shares: 1
			}))
		});
	}, [open]);
	const onSubmit = (v) => {
		if (selectedIds.length === 0) {
			toast.error("Pick at least one participant");
			return;
		}
		if (method !== "equal" && Math.abs(remaining) > .5) {
			toast.error(method === "percentage" ? "Percentages must total 100%" : "Splits must equal the total");
			return;
		}
		create.mutate(v);
	};
	const memberLookup = new Map(members.map((m) => [m._id, m]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "w-full overflow-y-auto sm:max-w-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Add expense" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Split a payment across the people who actually shared it." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit(onSubmit),
				className: "mt-6 space-y-6 px-4 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
								children: "Details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										children: "Description"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										placeholder: "Dinner at Olive",
										...register("name")
									}),
									errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-destructive",
										children: errors.name.message
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "amount",
											children: "Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "amount",
											type: "number",
											step: "0.01",
											inputMode: "decimal",
											...register("amount")
										}),
										errors.amount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-destructive",
											children: errors.amount.message
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "currency",
										children: "Currency"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										defaultValue: "INR",
										onValueChange: (v) => setValue("currency", v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
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
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										defaultValue: "miscellaneous",
										onValueChange: (v) => setValue("category", v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: c.value,
											children: c.label
										}, c.value)) })]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "expenseDate",
										children: "Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "expenseDate",
										type: "date",
										...register("expenseDate")
									})]
								})]
							}),
							!group && groups && groups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Group" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: (v) => setValue("groupId", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "None (personal)" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: g._id,
										children: g.name
									}, g._id)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Paid by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
										value: watch("payerMode"),
										onValueChange: (v) => setValue("payerMode", v),
										className: "h-8 w-[160px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
											className: "grid h-full w-full grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
												value: "single",
												className: "text-[11px]",
												children: "Single"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
												value: "multiple",
												className: "text-[11px]",
												children: "Multiple"
											})]
										})
									})]
								}), watch("payerMode") === "single" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									defaultValue: currentUser._id,
									onValueChange: (v) => setValue("paidBy", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: m._id,
										children: m.fullName
									}, m._id)) })]
								}), errors.paidBy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-destructive",
									children: errors.paidBy.message
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "divide-y divide-border rounded-lg border border-border bg-card max-h-48 overflow-y-auto",
									children: contributorFields.map((f, idx) => {
										const m = memberLookup.get(watch(`contributors.${idx}.userId`));
										if (!m) return null;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 p-2.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													checked: watch(`contributors.${idx}.selected`),
													onCheckedChange: (c) => setValue(`contributors.${idx}.selected`, Boolean(c))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
													children: m.fullName?.[0]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "min-w-0 flex-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "truncate text-sm",
														children: m.fullName
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "h-8 w-24 text-sm",
													type: "number",
													step: "0.01",
													placeholder: "0",
													disabled: !watch(`contributors.${idx}.selected`),
													...register(`contributors.${idx}.amount`)
												})
											]
										}, f.id);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "description",
									children: "Notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "description",
									rows: 2,
									placeholder: "Optional",
									...register("description")
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground",
								children: "Split"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
								defaultValue: "equal",
								onValueChange: (v) => setValue("splitMethod", v),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
									className: "grid w-full grid-cols-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "equal",
											children: "Equal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "unequal",
											children: "Amounts"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "percentage",
											children: "%"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "shares",
											children: "Shares"
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y divide-border rounded-lg border border-border bg-card",
								children: fields.map((f, idx) => {
									const m = memberLookup.get(splits[idx]?.userId);
									if (!m) return null;
									const computedAmt = computed.get(m._id) || 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: splits[idx]?.selected,
												onCheckedChange: (c) => setValue(`splits.${idx}.selected`, Boolean(c))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase",
												children: m.fullName?.[0]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "truncate text-sm",
													children: m.fullName
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[11px] text-muted-foreground",
													children: m.email
												})]
											}),
											method === "equal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm tabular-nums text-muted-foreground",
												children: splits[idx]?.selected ? formatCurrency(computedAmt, watch("currency")) : "—"
											}),
											method === "unequal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "w-24",
												type: "number",
												step: "0.01",
												placeholder: "0",
												disabled: !splits[idx]?.selected,
												...register(`splits.${idx}.amount`)
											}),
											method === "percentage" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													className: "w-20",
													type: "number",
													step: "0.1",
													placeholder: "0",
													disabled: !splits[idx]?.selected,
													...register(`splits.${idx}.percentage`)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: "%"
												})]
											}),
											method === "shares" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												className: "w-20",
												type: "number",
												min: 0,
												placeholder: "1",
												disabled: !splits[idx]?.selected,
												...register(`splits.${idx}.shares`)
											})
										]
									}, f.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [
										selectedIds.length,
										" ",
										selectedIds.length === 1 ? "person" : "people"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums",
									children: method === "percentage" ? `${splits.filter((s) => s.selected).reduce((a, s) => a + Number(s.percentage || 0), 0).toFixed(1)}% allocated` : `${formatCurrency(totalAllocated, watch("currency"))} of ${formatCurrency(amount || 0, watch("currency"))}`
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetFooter, {
						className: "px-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "w-full",
							disabled: isSubmitting || create.isPending,
							children: [
								(isSubmitting || create.isPending) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "mr-2 h-4 w-4" }),
								"Add expense"
							]
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { ExpenseFormSheet as t };
