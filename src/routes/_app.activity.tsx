import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Activity as ActivityIcon } from "lucide-react";
import { activityService } from "@/lib/api/services";
import { PageContainer, PageHeader, EmptyState, Skeleton } from "@/components/primitives";

export const Route = createFileRoute("/_app/activity")({
  ssr: false,
  component: ActivityPage,
});

function ActivityPage() {
  const activity = useQuery({ queryKey: ["activity"], queryFn: activityService.list });

  return (
    <>
      <PageHeader title="Activity" description="Everything that's happened across your groups." />
      <PageContainer>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {activity.isLoading ? <Skeleton className="m-4 h-40" /> :
            activity.isError ? <EmptyState className="border-0" icon={ActivityIcon} title="Couldn't load activity" description={activity.error.message} /> :
            !activity.data?.length ? <EmptyState className="border-0" icon={ActivityIcon} title="No activity yet" description="Activity shows up as groups, expenses, and settlements happen." /> : (
              <ul className="divide-y divide-border">
                {activity.data.map((a) => (
                  <li key={a._id} className="flex items-start gap-3 px-4 py-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">{a.actor?.fullName?.[0] || "?"}</div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm">{a.message}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{new Date(a.createdAt).toLocaleString()}</p>
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

