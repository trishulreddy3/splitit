import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { notificationService } from "@/lib/api/services";
import { PageContainer, PageHeader, EmptyState, Skeleton } from "@/components/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/notifications")({
  ssr: false,
  component: NotificationsPage,
});

function NotificationsPage() {
  const qc = useQueryClient();
  const list = useQuery({ queryKey: ["notifications"], queryFn: notificationService.list });
  const read = useMutation({
    mutationFn: (id: string) => notificationService.read(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  return (
    <>
      <PageHeader title="Notifications" />
      <PageContainer>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {list.isLoading ? <Skeleton className="m-4 h-40" /> :
            list.isError ? <EmptyState className="border-0" icon={Bell} title="Couldn't load" description={list.error.message} /> :
            !list.data?.length ? <EmptyState className="border-0" icon={Bell} title="You're all caught up" description="New friend requests, group invites, and settlements will appear here." /> : (
              <ul className="divide-y divide-border">
                {list.data.map((n) => (
                  <li key={n._id}
                      onClick={() => !n.read && read.mutate(n._id)}
                      className={cn("flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-accent/40", !n.read && "bg-muted/30")}>
                    <div className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", n.read ? "bg-muted" : "bg-foreground")} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-xs text-muted-foreground">{n.message}</div>
                      <div className="mt-0.5 text-[11px] text-muted-foreground">{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
        </div>
      </PageContainer>
    </>
  );
}
