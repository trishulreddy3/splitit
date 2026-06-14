import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Loader2, Wallet } from "lucide-react";
import { toast } from "sonner";
import { settlementService } from "@/lib/api/services";
import { PageContainer, PageHeader, EmptyState, Skeleton, StatusBadge } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/settle";

export const Route = createFileRoute("/_app/settlements")({
  ssr: false,
  component: SettlementsPage,
});

function SettlementsPage() {
  const qc = useQueryClient();
  const settlements = useQuery({ queryKey: ["settlements"], queryFn: settlementService.list });

  const markPaid = useMutation({
    mutationFn: (id: string) => settlementService.markPaid(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["settlements"] }); toast.success("Marked as paid"); },
    onError: (e: any) => toast.error(e.message),
  });

  const data = settlements.data || [];
  const pending = data.filter((s) => s.status !== "confirmed");
  const settled = data.filter((s) => s.status === "confirmed");

  return (
    <>
      <PageHeader title="Settlements" description="The minimum number of payments to balance every group." />
      <PageContainer className="space-y-6">
        {settlements.isLoading ? (
          <Skeleton className="h-40" />
        ) : settlements.isError ? (
          <EmptyState icon={Wallet} title="Couldn't load settlements" description={settlements.error.message} />
        ) : data.length === 0 ? (
          <EmptyState icon={CheckCircle2} title="All settled" description="You're clear with everyone. New expenses will surface here automatically." />
        ) : (
          <>
            <section>
              <h2 className="mb-3 text-sm font-medium">Pending ({pending.length})</h2>
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <ul className="divide-y divide-border">
                  {pending.map((s) => (
                    <li key={s._id} className="flex flex-wrap items-center gap-3 px-4 py-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">{s.from?.fullName?.[0]}</div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm"><span className="font-medium">{s.from?.fullName}</span> pays <span className="font-medium">{s.to?.fullName}</span></div>
                        <div className="text-[11px] text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</div>
                      </div>
                      <StatusBadge>{s.status}</StatusBadge>
                      <div className="w-28 text-right text-sm font-medium tabular-nums">{formatCurrency(s.amount, s.currency)}</div>
                      <Button size="sm" variant="outline" onClick={() => markPaid.mutate(s._id)} disabled={markPaid.isPending}>
                        {markPaid.isPending && <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />}Mark paid
                      </Button>
                    </li>
                  ))}
                  {pending.length === 0 && <li className="p-6 text-center text-xs text-muted-foreground">Nothing pending.</li>}
                </ul>
              </div>
            </section>

            {settled.length > 0 && (
              <section>
                <h2 className="mb-3 text-sm font-medium">History</h2>
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                  <ul className="divide-y divide-border">
                    {settled.map((s) => (
                      <li key={s._id} className="flex items-center gap-3 px-4 py-3">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        <div className="min-w-0 flex-1 text-sm">
                          {s.from?.fullName} → {s.to?.fullName}
                        </div>
                        <div className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleDateString()}</div>
                        <div className="w-28 text-right text-sm tabular-nums">{formatCurrency(s.amount, s.currency)}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </>
        )}
      </PageContainer>
    </>
  );
}
