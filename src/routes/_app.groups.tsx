import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Calendar, Loader2, MapPin, Plus, Users } from "lucide-react";
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

export const Route = createFileRoute("/_app/groups")({
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
  const groups = useQuery({ queryKey: ["groups"], queryFn: groupService.list });
  const [open, setOpen] = useState(false);
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
      </PageContainer>
    </>
  );
}
