import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Filter, Plus, Receipt, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { expenseService, groupService } from "@/lib/api/services";
import { PageContainer, PageHeader, EmptyState, Skeleton, StatusBadge } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpenseFormSheet } from "@/components/expense-form-sheet";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/settle";
import { friendService } from "@/lib/api/services";

export const Route = createFileRoute("/_app/expenses")({
  validateSearch: (search: Record<string, unknown>) => ({
    new: search.new === "true" || search.new === true,
  }),
  ssr: false,
  component: ExpensesPage,
});

function ExpensesPage() {
  const search = Route.useSearch();
  const { user } = useAuth();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(search.new || false);
  const qc = useQueryClient();

  const expenses = useQuery({ queryKey: ["expenses"], queryFn: () => expenseService.list() });
  const groups = useQuery({ queryKey: ["groups"], queryFn: groupService.list });
  const friends = useQuery({ queryKey: ["friends"], queryFn: friendService.list });

  const remove = useMutation({
    mutationFn: (id: string) => expenseService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
      toast.success("Expense deleted");
    },
    onError: (e: any) => toast.error(e.message),
  });

  const filtered = (expenses.data || []).filter((e) =>
    !q || e.name.toLowerCase().includes(q.toLowerCase()),
  );

  const members = [
    ...(user ? [user] : []),
    ...((friends.data || []).map((f) => f.user)),
  ];

  return (
    <>
      <PageHeader
        title="Expenses"
        description="Every shared payment, with full split history."
        actions={
          <>
            <Button variant="outline" size="sm"><Filter className="mr-1.5 h-3.5 w-3.5" />Filter</Button>
            <Button size="sm" onClick={() => setOpen(true)} disabled={!user}>
              <Plus className="mr-1.5 h-3.5 w-3.5" /> Add expense
            </Button>
          </>
        }
      />

      <PageContainer className="space-y-4">
        <div className="flex items-center gap-2">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search expenses…" className="max-w-sm" />
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {expenses.isLoading ? (
            <div className="divide-y divide-border">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="m-3 h-12" />)}
            </div>
          ) : expenses.isError ? (
            <EmptyState className="border-0" icon={Receipt} title="Couldn't load expenses" description={expenses.error.message} />
          ) : !filtered.length ? (
            <EmptyState
              className="border-0"
              icon={Receipt}
              title="No expenses yet"
              description="Track a shared payment and we'll handle the splits."
              action={<Button size="sm" onClick={() => setOpen(true)} disabled={!user}><Plus className="mr-1.5 h-3.5 w-3.5" /> Add expense</Button>}
            />
          ) : (
            <>
              <div className="hidden grid-cols-[1.5fr_1fr_0.8fr_1fr_120px_40px] gap-4 border-b border-border bg-muted/30 px-4 py-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground md:grid">
                <span>Expense</span><span>Paid by</span><span>Category</span><span>Date</span><span className="text-right">Amount</span><span />
              </div>
              <ul className="divide-y divide-border">
                {filtered.map((e) => (
                  <li key={e._id} className="grid grid-cols-1 gap-3 px-4 py-3 md:grid-cols-[1.5fr_1fr_0.8fr_1fr_120px_40px] md:items-center">
                    <div className="min-w-0">
                      <Link to="/expenses" className="truncate text-sm font-medium">{e.name}</Link>
                      {e.description && <div className="truncate text-xs text-muted-foreground">{e.description}</div>}
                    </div>
                    <div className="text-sm">{e.paidBy?.fullName || "—"}</div>
                    <div><StatusBadge>{e.category}</StatusBadge></div>
                    <div className="text-xs text-muted-foreground">{new Date(e.expenseDate).toLocaleDateString()}</div>
                    <div className="text-right text-sm font-medium tabular-nums">{formatCurrency(e.amount, e.currency)}</div>
                    <button
                      onClick={() => { if (confirm("Delete this expense?")) remove.mutate(e._id); }}
                      className="justify-self-end text-muted-foreground transition-colors hover:text-destructive"
                      aria-label="Delete expense"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </PageContainer>

      {user && (
        <ExpenseFormSheet
          open={open}
          onOpenChange={setOpen}
          currentUser={user}
          members={members}
          groups={groups.data}
        />
      )}
    </>
  );
}
