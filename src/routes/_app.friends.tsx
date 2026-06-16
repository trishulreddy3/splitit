import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, Loader2, Plus, UserPlus, X } from "lucide-react";
import { UserSearchCombobox } from "@/components/user-search-combobox";
import { toast } from "sonner";
import { friendService } from "@/lib/api/services";
import { PageContainer, PageHeader, EmptyState, Skeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_app/friends")({
  ssr: false,
  component: FriendsPage,
});

function FriendsPage() {
  const qc = useQueryClient();
  const friends = useQuery({ queryKey: ["friends"], queryFn: friendService.list });
  const requests = useQuery({ queryKey: ["friend-requests"], queryFn: friendService.requests });
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [q, setQ] = useState("");

  const sendReq = useMutation({
    mutationFn: () => friendService.sendRequest(email),
    onSuccess: () => { toast.success("Request sent"); setEmail(""); setOpen(false); },
    onError: (e: any) => toast.error(e.message),
  });
  const accept = useMutation({
    mutationFn: (id: string) => friendService.accept(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["friends"] }); qc.invalidateQueries({ queryKey: ["friend-requests"] }); toast.success("Friend added"); },
    onError: (e: any) => toast.error(e.message),
  });
  const reject = useMutation({
    mutationFn: (id: string) => friendService.reject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["friend-requests"] }),
  });
  const remove = useMutation({
    mutationFn: (id: string) => friendService.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["friends"] }); toast.success("Friend removed"); },
    onError: (e: any) => toast.error(e.message),
  });

  const filtered = (friends.data || []).filter((f) =>
    !q || f.user.fullName.toLowerCase().includes(q.toLowerCase()) || f.user.email.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Friends"
        description="People you split with regularly."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Add friend</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Send friend request</DialogTitle><DialogDescription>We'll notify them by email.</DialogDescription></DialogHeader>
              <UserSearchCombobox 
                value={email}
                onChange={setEmail}
                placeholder="Search to add friend..."
              />
              <DialogFooter>
                <Button onClick={() => sendReq.mutate()} disabled={!email || sendReq.isPending}>
                  {sendReq.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Send request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <PageContainer>
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All friends</TabsTrigger>
            <TabsTrigger value="requests">Requests {requests.data?.length ? <span className="ml-1 rounded-full bg-muted px-1.5 text-[10px]">{requests.data.length}</span> : null}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-4">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search friends…" className="max-w-sm" />
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              {friends.isLoading ? <Skeleton className="m-4 h-24" /> :
                !filtered.length ? <EmptyState className="border-0" icon={UserPlus} title="No friends yet" description="Add friends to invite them to groups and split expenses faster." /> : (
                  <ul className="divide-y divide-border">
                    {filtered.map((f) => (
                      <li key={f._id} className="flex items-center gap-3 px-4 py-3">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">{f.user.fullName?.[0]}</div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{f.user.fullName}</div>
                          <div className="truncate text-xs text-muted-foreground">{f.user.email}</div>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => { if (confirm("Remove friend?")) remove.mutate(f._id); }} className="text-muted-foreground hover:text-destructive">
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="mt-4">
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              {requests.isLoading ? <Skeleton className="m-4 h-24" /> :
                !requests.data?.length ? <EmptyState className="border-0" icon={UserPlus} title="No pending requests" /> : (
                  <ul className="divide-y divide-border">
                    {requests.data.map((r) => (
                      <li key={r._id} className="flex items-center gap-3 px-4 py-3">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">{r.from?.fullName?.[0]}</div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{r.from?.fullName}</div>
                          <div className="truncate text-xs text-muted-foreground">{r.from?.email}</div>
                        </div>
                        <Button size="sm" onClick={() => accept.mutate(r._id)} disabled={accept.isPending}><Check className="mr-1 h-3.5 w-3.5" />Accept</Button>
                        <Button size="sm" variant="ghost" onClick={() => reject.mutate(r._id)} className="text-muted-foreground hover:text-destructive"><X className="h-3.5 w-3.5" /></Button>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          </TabsContent>
        </Tabs>
      </PageContainer>
    </>
  );
}
