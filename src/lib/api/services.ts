import { api } from "./client";
import type {
  Activity, DashboardSummary, Expense, Friend, FriendRequest,
  Group, Notification, Settlement, User,
} from "@/types";

const unwrap = <T,>(p: Promise<{ data: T | { data: T } }>): Promise<T> =>
  p.then((r) => {
    const d: any = r.data;
    return d && typeof d === "object" && "data" in d ? d.data : d;
  });

// Auth
export const authService = {
  signup: (payload: { fullName: string; username: string; email: string; password: string }) =>
    unwrap<{ token: string; user: User }>(api.post("/auth/signup", payload)),
  login: (payload: { email: string; password: string }) =>
    unwrap<{ token: string; user: User }>(api.post("/auth/login", payload)),
  logout: () => unwrap<void>(api.post("/auth/logout")),
  me: () => unwrap<User>(api.get("/auth/me")),
};

// Dashboard
export const dashboardService = {
  summary: () => unwrap<DashboardSummary>(api.get("/dashboard/summary")),
  activity: () => unwrap<Activity[]>(api.get("/dashboard/activity")),
};

// Friends
export const friendService = {
  list: () => unwrap<Friend[]>(api.get("/friends")),
  requests: () => unwrap<FriendRequest[]>(api.get("/friends/requests")),
  sendRequest: (email: string) => unwrap<void>(api.post("/friends/request", { email })),
  accept: (id: string) => unwrap<void>(api.post(`/friends/accept/${id}`)),
  reject: (id: string) => unwrap<void>(api.post(`/friends/reject/${id}`)),
  remove: (id: string) => unwrap<void>(api.delete(`/friends/${id}`)),
};

// Groups
export const groupService = {
  list: () => unwrap<Group[]>(api.get("/groups")),
  get: (id: string) => unwrap<Group>(api.get(`/groups/${id}`)),
  create: (payload: Partial<Group>) => unwrap<Group>(api.post("/groups", payload)),
  update: (id: string, payload: Partial<Group>) => unwrap<Group>(api.put(`/groups/${id}`, payload)),
  remove: (id: string) => unwrap<void>(api.delete(`/groups/${id}`)),
  invite: (id: string, emails: string[]) =>
    unwrap<void>(api.post(`/groups/${id}/invite`, { emails })),
  removeMember: (id: string, memberId: string) =>
    unwrap<void>(api.delete(`/groups/${id}/member/${memberId}`)),
  leave: (id: string) => unwrap<void>(api.post(`/groups/${id}/leave`)),
  transferOwner: (id: string, memberId: string) =>
    unwrap<void>(api.post(`/groups/${id}/transfer-owner`, { memberId })),
  summary: (id: string) => unwrap<any>(api.get(`/groups/${id}/summary`)),
};

// Expenses
export const expenseService = {
  list: (params?: { groupId?: string }) =>
    unwrap<Expense[]>(api.get("/expenses", { params })),
  get: (id: string) => unwrap<Expense>(api.get(`/expenses/${id}`)),
  create: (payload: Partial<Expense>) => unwrap<Expense>(api.post("/expenses", payload)),
  update: (id: string, payload: Partial<Expense>) =>
    unwrap<Expense>(api.put(`/expenses/${id}`, payload)),
  remove: (id: string) => unwrap<void>(api.delete(`/expenses/${id}`)),
  uploadReceipt: (id: string, file: File) => {
    const fd = new FormData();
    fd.append("receipt", file);
    return unwrap<{ url: string }>(
      api.post(`/expenses/${id}/receipt`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    );
  },
};

// Settlements
export const settlementService = {
  list: () => unwrap<Settlement[]>(api.get("/settlements")),
  forGroup: (groupId: string) =>
    unwrap<Settlement[]>(api.get(`/groups/${groupId}/settlements`)),
  markPaid: (id: string) =>
    unwrap<Settlement>(api.post("/settlements/mark-paid", { id })),
};

// Activity
export const activityService = {
  list: () => unwrap<Activity[]>(api.get("/activity")),
};

// Notifications
export const notificationService = {
  list: () => unwrap<Notification[]>(api.get("/notifications")),
  read: (id: string) => unwrap<void>(api.put(`/notifications/read/${id}`)),
};

// Profile / Settings
export const profileService = {
  get: () => unwrap<User>(api.get("/profile")),
  update: (payload: Partial<User>) => unwrap<User>(api.put("/profile", payload)),
  uploadAvatar: (file: File) => {
    const fd = new FormData();
    fd.append("avatar", file);
    return unwrap<{ url: string }>(
      api.post("/profile/avatar", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    );
  },
};

export const settingsService = {
  update: (payload: Record<string, unknown>) => unwrap<void>(api.put("/settings", payload)),
  changePassword: (payload: { current: string; next: string }) =>
    unwrap<void>(api.post("/settings/change-password", payload)),
  deleteAccount: () => unwrap<void>(api.delete("/account")),
};

// Reports
export const reportService = {
  pdf: () => api.get("/reports/pdf", { responseType: "blob" }).then((r) => r.data as Blob),
  csv: () => api.get("/reports/csv", { responseType: "blob" }).then((r) => r.data as Blob),
};

// Search
export const searchService = {
  global: (q: string) =>
    unwrap<{ groups: Group[]; expenses: Expense[]; friends: Friend[] }>(
      api.get("/search", { params: { q } }),
    ),
};
