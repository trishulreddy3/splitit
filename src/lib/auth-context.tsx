import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "./api/services";
import { getToken, setToken } from "./api/client";
import type { User } from "@/types";

interface AuthCtx {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (p: { fullName: string; username: string; email: string; password: string }) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const qc = useQueryClient();

  const refresh = async () => {
    if (!getToken()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const me = await authService.me();
      setUser(me);
    } catch {
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login: AuthCtx["login"] = async (email, password) => {
    const { token, user } = await authService.login({ email, password });
    setToken(token);
    setUser(user);
    return user;
  };

  const signup: AuthCtx["signup"] = async (p) => {
    const { token, user } = await authService.signup(p);
    setToken(token);
    setUser(user);
    return user;
  };

  const logout = async () => {
    try { await authService.logout(); } catch { /* ignore */ }
    setToken(null);
    setUser(null);
    qc.clear();
  };

  return (
    <Ctx.Provider value={{ user, loading, isAuthenticated: !!user, login, signup, logout, refresh }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
