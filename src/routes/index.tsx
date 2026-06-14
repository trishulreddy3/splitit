import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/")({
  ssr: false,
  component: IndexRedirect,
});

function IndexRedirect() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <div className="min-h-screen" />;
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />;
}
