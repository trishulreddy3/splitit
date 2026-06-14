import { createFileRoute, Outlet, Navigate } from "@tanstack/react-router";
import { AppShell, AppShellSkeleton } from "@/components/app-shell";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_app")({
  ssr: false,
  component: AppLayout,
});

function AppLayout() {
  const { loading, isAuthenticated } = useAuth();
  if (loading) return <AppShellSkeleton />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
