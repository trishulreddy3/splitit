import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-hSe0tyCa.js
var TOKEN_KEY = "splittrip_token";
var getToken = () => typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);
var setToken = (token) => {
	if (typeof window === "undefined") return;
	if (token) localStorage.setItem(TOKEN_KEY, token);
	else localStorage.removeItem(TOKEN_KEY);
};
var api = axios.create({
	baseURL: typeof import.meta !== "undefined" && "http://localhost:5000/api" || "/api",
	headers: { "Content-Type": "application/json" }
});
api.interceptors.request.use((config) => {
	const t = getToken();
	if (t) config.headers.Authorization = `Bearer ${t}`;
	return config;
});
var ApiError = class extends Error {
	status;
	data;
	constructor(message, status, data) {
		super(message);
		this.status = status;
		this.data = data;
	}
};
api.interceptors.response.use((r) => r, (error) => {
	const msg = error.response?.data?.message || error.response?.data?.error || error.message || "Something went wrong";
	return Promise.reject(new ApiError(msg, error.response?.status, error.response?.data));
});
var unwrap = (p) => p.then((r) => {
	const d = r.data;
	return d && typeof d === "object" && "data" in d ? d.data : d;
});
var authService = {
	signup: (payload) => unwrap(api.post("/auth/signup", payload)),
	login: (payload) => unwrap(api.post("/auth/login", payload)),
	logout: () => unwrap(api.post("/auth/logout")),
	me: () => unwrap(api.get("/auth/me"))
};
var dashboardService = {
	summary: () => unwrap(api.get("/dashboard/summary")),
	activity: () => unwrap(api.get("/dashboard/activity"))
};
var friendService = {
	list: () => unwrap(api.get("/friends")),
	requests: () => unwrap(api.get("/friends/requests")),
	sendRequest: (email) => unwrap(api.post("/friends/request", { email })),
	accept: (id) => unwrap(api.post(`/friends/accept/${id}`)),
	reject: (id) => unwrap(api.post(`/friends/reject/${id}`)),
	remove: (id) => unwrap(api.delete(`/friends/${id}`))
};
var groupService = {
	list: () => unwrap(api.get("/groups")),
	get: (id) => unwrap(api.get(`/groups/${id}`)),
	create: (payload) => unwrap(api.post("/groups", payload)),
	update: (id, payload) => unwrap(api.put(`/groups/${id}`, payload)),
	remove: (id) => unwrap(api.delete(`/groups/${id}`)),
	invite: (id, emails) => unwrap(api.post(`/groups/${id}/invite`, { emails })),
	removeMember: (id, memberId) => unwrap(api.delete(`/groups/${id}/member/${memberId}`)),
	leave: (id) => unwrap(api.post(`/groups/${id}/leave`)),
	transferOwner: (id, memberId) => unwrap(api.post(`/groups/${id}/transfer-owner`, { memberId })),
	summary: (id) => unwrap(api.get(`/groups/${id}/summary`)),
	pendingInvites: () => unwrap(api.get("/groups/invites/pending")),
	sentInvites: () => unwrap(api.get("/groups/invites/sent")),
	groupInvites: (id) => unwrap(api.get(`/groups/${id}/invites`)),
	acceptInvite: (inviteId) => unwrap(api.post(`/groups/invites/${inviteId}/accept`)),
	rejectInvite: (inviteId) => unwrap(api.post(`/groups/invites/${inviteId}/reject`))
};
var expenseService = {
	list: (params) => unwrap(api.get("/expenses", { params })),
	get: (id) => unwrap(api.get(`/expenses/${id}`)),
	create: (payload) => unwrap(api.post("/expenses", payload)),
	update: (id, payload) => unwrap(api.put(`/expenses/${id}`, payload)),
	remove: (id) => unwrap(api.delete(`/expenses/${id}`)),
	uploadReceipt: (id, file) => {
		const fd = new FormData();
		fd.append("receipt", file);
		return unwrap(api.post(`/expenses/${id}/receipt`, fd, { headers: { "Content-Type": "multipart/form-data" } }));
	}
};
var settlementService = {
	list: () => unwrap(api.get("/settlements")),
	forGroup: (groupId) => unwrap(api.get(`/groups/${groupId}/settlements`)),
	markPaid: (id) => unwrap(api.post("/settlements/mark-paid", { id }))
};
var activityService = { list: () => unwrap(api.get("/activity")) };
var notificationService = {
	list: () => unwrap(api.get("/notifications")),
	read: (id) => unwrap(api.put(`/notifications/read/${id}`))
};
var profileService = {
	get: () => unwrap(api.get("/profile")),
	update: (payload) => unwrap(api.put("/profile", payload)),
	uploadAvatar: (file) => {
		const fd = new FormData();
		fd.append("avatar", file);
		return unwrap(api.post("/profile/avatar", fd, { headers: { "Content-Type": "multipart/form-data" } }));
	}
};
var settingsService = {
	update: (payload) => unwrap(api.put("/settings", payload)),
	changePassword: (payload) => unwrap(api.post("/settings/change-password", payload)),
	deleteAccount: () => unwrap(api.delete("/account"))
};
var reportService = {
	pdf: () => api.get("/reports/pdf", { responseType: "blob" }).then((r) => r.data),
	csv: () => api.get("/reports/csv", { responseType: "blob" }).then((r) => r.data)
};
var reviewService = {
	create: (payload) => unwrap(api.post("/reviews", payload)),
	getRandom: () => unwrap(api.get("/reviews/random"))
};
var userService = { search: (q) => unwrap(api.get("/users/search", { params: { q } })) };
//#endregion
export { friendService as a, notificationService as c, reviewService as d, setToken as f, userService as h, expenseService as i, profileService as l, settlementService as m, authService as n, getToken as o, settingsService as p, dashboardService as r, groupService as s, activityService as t, reportService as u };
