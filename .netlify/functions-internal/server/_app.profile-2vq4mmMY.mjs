import { o as __toESM } from "./_runtime.mjs";
import { l as profileService } from "./_ssr/services-CA8HLDPr.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/auth-context-CPXWFpar.mjs";
import { g as LoaderCircle } from "./_libs/lucide-react.mjs";
import { i as PageHeader, o as Skeleton, r as PageContainer } from "./_ssr/primitives-BeN511sB.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as objectType, o as stringType } from "./_libs/zod.mjs";
import { r as useForm, t as u } from "./_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.profile-2vq4mmMY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	fullName: stringType().trim().min(2).max(80),
	username: stringType().trim().min(3).max(30),
	email: stringType().email()
});
function ProfilePage() {
	const { user, refresh } = useAuth();
	const qc = useQueryClient();
	const me = useQuery({
		queryKey: ["profile"],
		queryFn: profileService.get,
		initialData: user || void 0
	});
	const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
		resolver: u(schema),
		defaultValues: {
			fullName: "",
			username: "",
			email: ""
		}
	});
	(0, import_react.useEffect)(() => {
		if (me.data) reset({
			fullName: me.data.fullName,
			username: me.data.username,
			email: me.data.email
		});
	}, [me.data, reset]);
	const save = useMutation({
		mutationFn: (v) => profileService.update(v),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["profile"] });
			refresh();
			toast.success("Profile updated");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Profile",
		description: "How you appear to friends and group members."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-lg border border-border bg-card p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-14 w-14 place-items-center rounded-full bg-muted text-base font-semibold",
						children: me.data?.fullName?.[0]?.toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-medium",
						children: me.data?.fullName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: ["@", me.data?.username]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						className: "ml-auto",
						disabled: true,
						children: "Change photo"
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			onSubmit: handleSubmit((v) => save.mutate(v)),
			className: "space-y-5 rounded-lg border border-border bg-card p-6",
			children: me.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Full name" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("fullName") }),
						errors.fullName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.fullName.message
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Username" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("username") }),
						errors.username && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.username.message
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							...register("email")
						}),
						errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.email.message
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: isSubmitting || save.isPending,
						children: [(isSubmitting || save.isPending) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Save changes"]
					})
				})
			] })
		})]
	}) })] });
}
//#endregion
export { ProfilePage as component };
