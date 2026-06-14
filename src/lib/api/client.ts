import axios, { AxiosError } from "axios";

const TOKEN_KEY = "splittrip_token";

export const getToken = () =>
  typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY);

export const setToken = (token: string | null) => {
  if (typeof window === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
};

export const api = axios.create({
  baseURL:
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_URL) ||
    "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export class ApiError extends Error {
  status?: number;
  data?: unknown;
  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

api.interceptors.response.use(
  (r) => r,
  (error: AxiosError<any>) => {
    const msg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong";
    return Promise.reject(new ApiError(msg, error.response?.status, error.response?.data));
  },
);
