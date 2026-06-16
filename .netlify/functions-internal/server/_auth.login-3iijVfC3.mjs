import { o as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./_ssr/auth-context-C_KaABU9.mjs";
import { g as Link, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { b as EyeOff, g as LoaderCircle, y as Eye } from "./_libs/lucide-react.mjs";
import { t as Button } from "./_ssr/button-Bq5vK6RO.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { a as objectType, o as stringType } from "./_libs/zod.mjs";
import { r as useForm, t as u } from "./_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_auth.login-3iijVfC3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = objectType({
	email: stringType().trim().email("Enter a valid email").max(255),
	password: stringType().min(6, "At least 6 characters").max(128)
});
function LoginPage() {
	const { login } = useAuth();
	const nav = useNavigate();
	const [showPw, setShowPw] = (0, import_react.useState)(false);
	const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
		resolver: u(schema),
		defaultValues: {
			email: "",
			password: ""
		}
	});
	const onSubmit = async (v) => {
		try {
			await login(v.email, v.password);
			toast.success("Welcome back");
			nav({ to: "/dashboard" });
		} catch (e) {
			toast.error(e.message || "Login failed");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Sign in"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-sm text-muted-foreground",
				children: "Welcome back. Enter your credentials to continue."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit(onSubmit),
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							autoComplete: "email",
							placeholder: "you@example.com",
							...register("email")
						}),
						errors.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.email.message
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "text-xs text-muted-foreground hover:text-foreground",
								children: "Forgot?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: showPw ? "text" : "password",
								autoComplete: "current-password",
								placeholder: "••••••••",
								...register("password")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setShowPw((s) => !s),
								className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
								"aria-label": "Toggle password visibility",
								children: showPw ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
							})]
						}),
						errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: errors.password.message
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					className: "w-full",
					disabled: isSubmitting,
					children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Sign in"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-6 text-center text-sm text-muted-foreground",
			children: [
				"Don't have an account?",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/signup",
					className: "font-medium text-foreground underline-offset-4 hover:underline",
					children: "Create one"
				})
			]
		})
	] });
}
//#endregion
export { LoginPage as component };
