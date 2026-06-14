import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Calendar, Check, Loader2, MapPin, Plus, Users, X } from "lucide-react";
import { toast } from "sonner";
import { groupService } from "@/lib/api/services";
import { PageContainer, PageHeader, EmptyState, Skeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/groups/")({
  validateSearch: (search: Record<string, unknown>) => ({
    new: search.new === "true" || search.new === true,
  }),
  ssr: false,
  component: GroupsPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Required").max(80),
  description: z.string().max(300).optional(),
  location: z.string().max(120).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

function GroupsPage() {
  const search = Route.useSearch();
  
  const groups = useQuery({ queryKey: ["groups"], queryFn: groupService.list });
  const pendingInvites = useQuery({ queryKey: ["groups", "invites", "pending"], queryFn: groupService.pendingInvites });

  const [open, setOpen] = useState(search.new || false);
  const qc = useQueryClient();

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "", location: "" },
  });

  const create = useMutation({
    mutationFn: (v: FormValues) => groupService.create(v),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups"] });
      toast.success("Group created");
      reset();
      setOpen(false);
    },
    onError: (e: any) => toast.error(e.message || "Failed to create group"),
  });

  const accept = useMutation({
    mutationFn: (id: string) => groupService.acceptInvite(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups"] });
      qc.invalidateQueries({ queryKey: ["groups", "invites", "pending"] });
      toast.success("Invite accepted");
    },
    onError: (e: any) => toast.error(e.message || "Failed to accept invite"),
  });

  const reject = useMutation({
    mutationFn: (id: string) => groupService.rejectInvite(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups", "invites", "pending"] });
      toast.success("Invite rejected");
    },
    onError: (e: any) => toast.error(e.message || "Failed to reject invite"),
  });

  return (
    <>
      <PageHeader
        title="Groups"
        description="Trips, flats, events — every shared wallet lives here."
        actions={
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" /> New group</Button></SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Create a group</SheetTitle>
                <SheetDescription>Anyone you invite can add expenses and view balances.</SheetDescription>
              </SheetHeader>
              <form onSubmit={handleSubmit((v) => create.mutate(v))} className="mt-6 space-y-4 px-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Goa Trip 2026" {...register("name")} />
                  {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" rows={3} placeholder="What is this group for?" {...register("description")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Goa, India" {...register("location")} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start date</Label>
                    <Input id="startDate" type="date" {...register("startDate")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End date</Label>
                    <Input id="endDate" type="date" {...register("endDate")} />
                  </div>
                </div>
                <SheetFooter className="px-0">
                  <Button type="submit" disabled={isSubmitting || create.isPending} className="w-full">
                    {(isSubmitting || create.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create group
                  </Button>
                </SheetFooter>
              </form>
            </SheetContent>
          </Sheet>
        }
      />

      <PageContainer>
        <Tabs defaultValue="groups" className="space-y-6">
          <TabsList>
            <TabsTrigger value="groups">My Groups</TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending Invites
              {pendingInvites.data?.length ? (
                <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {pendingInvites.data.length}
                </span>
              ) : null}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4 outline-none">
            {groups.isLoading ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-44" />)}
              </div>
            ) : groups.isError ? (
              <EmptyState icon={Users} title="Couldn't load groups" description={groups.error.message} />
            ) : !groups.data?.length ? (
              <EmptyState
                icon={Users}
                title="No groups yet"
                description="Create your first group to start tracking shared expenses."
                action={<Button size="sm" onClick={() => setOpen(true)}><Plus className="mr-1.5 h-3.5 w-3.5" /> New group</Button>}
              />
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {groups.data.map((g) => (
                  <Link
                    key={g._id}
                    to="/groups/$groupId"
                    params={{ groupId: g._id }}
                    className="group flex flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-border/80"
                  >
                    <div className="flex items-start justify-between">
                      <div className="grid h-10 w-10 place-items-center rounded-md border border-border bg-muted text-sm font-medium">
                        {g.name?.[0]?.toUpperCase() || "G"}
                      </div>
                      <ArrowRight className="h-4 w-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                    <h3 className="mt-4 truncate text-sm font-medium">{g.name}</h3>
                    {g.description && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{g.description}</p>}
                    <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{g.members?.length || 0}</span>
                      {g.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{g.location}</span>}
                      {g.startDate && <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(g.startDate).toLocaleDateString()}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 outline-none">
            {pendingInvites.isLoading ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
              </div>
            ) : !pendingInvites.data?.length ? (
              <EmptyState icon={Users} title="No pending invites" description="You're all caught up." />
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {pendingInvites.data.map((invite) => (
                  <div key={invite._id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-medium">
                        {invite.group.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{invite.group.name}</p>
                        <p className="text-xs text-muted-foreground">Invited by {invite.from.name}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="outline" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => reject.mutate(invite._id)} disabled={reject.isPending || accept.isPending}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button size="icon" className="h-8 w-8" onClick={() => accept.mutate(invite._id)} disabled={accept.isPending || reject.isPending}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </PageContainer>
    </>
  );
}
