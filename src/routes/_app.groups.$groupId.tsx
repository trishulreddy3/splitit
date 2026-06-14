import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  ArrowLeft, Calendar, Loader2, MapPin, Plus, Receipt, Trash2, UserMinus, Users,
} from "lucide-react";
import { toast } from "sonner";
import { expenseService, groupService, settlementService } from "@/lib/api/services";
import { PageContainer, PageHeader, EmptyState, Skeleton, KpiCard, SectionTitle, StatusBadge } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExpenseFormSheet } from "@/components/expense-form-sheet";
import { useAuth } from "@/lib/auth-context";
import { formatCurrency } from "@/lib/settle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_app/groups/$groupId")({
  ssr: false,
  component: GroupDetailPage,
});

function GroupDetailPage() {
  const { groupId } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const group = useQuery({ queryKey: ["group", groupId], queryFn: () => groupService.get(groupId) });
  const expenses = useQuery({ queryKey: ["expenses", { groupId }], queryFn: () => expenseService.list({ groupId }) });
  const settlements = useQuery({ queryKey: ["settlements", { groupId }], queryFn: () => settlementService.forGroup(groupId) });

  const invite = useMutation({
    mutationFn: () => groupService.invite(groupId, [inviteEmail]),
    onSuccess: () => {
      toast.success("Invitation sent");
      setInviteEmail(""); setInviteOpen(false);
      qc.invalidateQueries({ queryKey: ["group", groupId] });
    },
    onError: (e: any) => toast.error(e.message),
  });
  const removeMember = useMutation({
    mutationFn: (mid: string) => groupService.removeMember(groupId, mid),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["group", groupId] }); toast.success("Member removed"); },
    onError: (e: any) => toast.error(e.message),
  });
  const deleteGroup = useMutation({
    mutationFn: () => groupService.remove(groupId),
    onSuccess: () => { toast.success("Group deleted"); window.location.href = "/groups"; },
    onError: (e: any) => toast.error(e.message),
  });
  const markPaid = useMutation({
    mutationFn: (id: string) => settlementService.markPaid(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["settlements"] }); toast.success("Marked as paid"); },
    onError: (e: any) => toast.error(e.message),
  });

  if (group.isLoading) return <PageContainer><Skeleton className="h-40" /></PageContainer>;
  if (group.isError || !group.data) return (
    <PageContainer><EmptyState icon={Users} title="Group not found" description={group.error?.message} action={<Button asChild><Link to="/groups">Back to groups</Link></Button>} /></PageContainer>
  );

  const g = group.data;
  const totalSpend = (expenses.data || []).reduce((a, e) => a + e.amount, 0);
  const currency = expenses.data?.[0]?.currency || "INR";

  return (
    <>
      <PageHeader
        title={g.name}
        description={g.description || "Group overview"}
        actions={
          <>
            <Button variant="outline" size="sm" asChild><Link to="/groups"><ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> All groups</Link></Button>
            <Button size="sm" onClick={() => setOpen(true)} disabled={!user}><Plus className="mr-1.5 h-3.5 w-3.5" /> Add expense</Button>
          </>
        }
      />

      <PageContainer className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {g.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{g.location}</span>}
          {g.startDate && <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(g.startDate).toLocaleDateString()} {g.endDate && `→ ${new Date(g.endDate).toLocaleDateString()}`}</span>}
          <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{g.members?.length || 0} members</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <KpiCard label="Total spend" value={formatCurrency(totalSpend, currency)} hint={`${expenses.data?.length || 0} expenses`} />
          <KpiCard label="Outstanding" value={String(settlements.data?.filter((s) => s.status !== "confirmed").length || 0)} hint="Open settlements" />
          <KpiCard label="Members" value={String(g.members?.length || 0)} hint="Including you" />
        </div>

        <Tabs defaultValue="expenses">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="settlements">Settlements</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="mt-4">
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              {expenses.isLoading ? <Skeleton className="m-4 h-24" /> :
                !expenses.data?.length ? (
                  <EmptyState className="border-0" icon={Receipt} title="No expenses in this group"
                    action={<Button size="sm" onClick={() => setOpen(true)}><Plus className="mr-1.5 h-3.5 w-3.5" />Add expense</Button>} />
                ) : (
                  <ul className="divide-y divide-border">
                    {expenses.data.map((e) => (
                      <li key={e._id} className="flex items-center gap-3 px-4 py-3">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-muted text-[10px] font-medium uppercase">{e.name[0]}</div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{e.name}</div>
                          <div className="truncate text-xs text-muted-foreground">{e.paidBy?.fullName} paid · {new Date(e.expenseDate).toLocaleDateString()}</div>
                        </div>
                        <StatusBadge>{e.category}</StatusBadge>
                        <div className="w-24 text-right text-sm font-medium tabular-nums">{formatCurrency(e.amount, e.currency)}</div>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </TabsContent>

          <TabsContent value="settlements" className="mt-4">
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              {settlements.isLoading ? <Skeleton className="m-4 h-24" /> :
                !settlements.data?.length ? (
                  <EmptyState className="border-0" icon={Receipt} title="Everyone is settled up" description="When new expenses create imbalances, we'll suggest the minimum number of payments here." />
                ) : (
                  <ul className="divide-y divide-border">
                    {settlements.data.map((s) => (
                      <li key={s._id} className="flex items-center gap-3 px-4 py-3">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">{s.from?.fullName?.[0]}</div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm"><span className="font-medium">{s.from?.fullName}</span> pays <span className="font-medium">{s.to?.fullName}</span></div>
                          <div className="text-[11px] text-muted-foreground">{s.status}</div>
                        </div>
                        <div className="w-28 text-right text-sm font-medium tabular-nums">{formatCurrency(s.amount, s.currency)}</div>
                        {s.status !== "confirmed" && (
                          <Button size="sm" variant="outline" onClick={() => markPaid.mutate(s._id)} disabled={markPaid.isPending}>Mark paid</Button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </TabsContent>

          <TabsContent value="members" className="mt-4 space-y-4">
            <div className="flex justify-end">
              <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                <DialogTrigger asChild><Button size="sm" variant="outline"><Plus className="mr-1.5 h-3.5 w-3.5" />Invite</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Invite by email</DialogTitle><DialogDescription>They'll receive a link to join this group.</DialogDescription></DialogHeader>
                  <Input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="friend@example.com" />
                  <DialogFooter>
                    <Button onClick={() => invite.mutate()} disabled={!inviteEmail || invite.isPending}>
                      {invite.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send invite
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <ul className="divide-y divide-border">
                {g.members?.map((m) => (
                  <li key={m._id} className="flex items-center gap-3 px-4 py-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">{m.fullName?.[0]}</div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{m.fullName} {m._id === g.owner?._id && <span className="ml-1 text-[10px] uppercase text-muted-foreground">owner</span>}</div>
                      <div className="truncate text-xs text-muted-foreground">{m.email}</div>
                    </div>
                    {m._id !== g.owner?._id && user?._id === g.owner?._id && (
                      <button onClick={() => removeMember.mutate(m._id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove member">
                        <UserMinus className="h-4 w-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-5">
              <h3 className="text-sm font-medium">Danger zone</h3>
              <p className="mt-1 text-xs text-muted-foreground">Deleting a group removes all expenses and settlement history. This can't be undone.</p>
              <Button variant="destructive" size="sm" className="mt-4" onClick={() => { if (confirm(`Delete "${g.name}"? This is permanent.`)) deleteGroup.mutate(); }}>
                <Trash2 className="mr-1.5 h-3.5 w-3.5" />Delete group
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </PageContainer>

      {user && (
        <ExpenseFormSheet
          open={open}
          onOpenChange={setOpen}
          group={g}
          currentUser={user}
          members={g.members || []}
        />
      )}
    </>
  );
}
