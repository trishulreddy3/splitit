import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-context-C_KaABU9.mjs";
import { _ as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BFn5WFF3.js
var import_jsx_runtime = require_jsx_runtime();
function IndexRedirect() {
	const { loading, isAuthenticated } = useAuth();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: isAuthenticated ? "/dashboard" : "/login" });
}
//#endregion
export { IndexRedirect as component };
