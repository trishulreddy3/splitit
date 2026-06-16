import { o as __toESM } from "../_runtime.mjs";
import { f as setToken, n as authService, o as getToken } from "./services-hSe0tyCa.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-context-C_KaABU9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const qc = useQueryClient();
	const refresh = async () => {
		if (!getToken()) {
			setUser(null);
			setLoading(false);
			return;
		}
		try {
			setUser(await authService.me());
		} catch {
			setToken(null);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	const login = async (email, password) => {
		const { token, user } = await authService.login({
			email,
			password
		});
		setToken(token);
		setUser(user);
		return user;
	};
	const signup = async (p) => {
		const { token, user } = await authService.signup(p);
		setToken(token);
		setUser(user);
		return user;
	};
	const logout = async () => {
		try {
			await authService.logout();
		} catch {}
		setToken(null);
		setUser(null);
		qc.clear();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			user,
			loading,
			isAuthenticated: !!user,
			login,
			signup,
			logout,
			refresh
		},
		children
	});
}
function useAuth() {
	const v = (0, import_react.useContext)(Ctx);
	if (!v) throw new Error("useAuth must be used within AuthProvider");
	return v;
}
//#endregion
export { useAuth as n, AuthProvider as t };
