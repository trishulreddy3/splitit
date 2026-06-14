import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { profileService } from "@/lib/api/services";
import { PageContainer, PageHeader, Skeleton } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_app/profile")({
  ssr: false,
  component: ProfilePage,
});

const schema = z.object({
  fullName: z.string().trim().min(2).max(80),
  username: z.string().trim().min(3).max(30),
  email: z.string().email(),
});
type V = z.infer<typeof schema>;

function ProfilePage() {
  const { user, refresh } = useAuth();
  const qc = useQueryClient();
  const me = useQuery({ queryKey: ["profile"], queryFn: profileService.get, initialData: user || undefined });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<V>({ resolver: zodResolver(schema), defaultValues: { fullName: "", username: "", email: "" } });

  useEffect(() => {
    if (me.data) reset({ fullName: me.data.fullName, username: me.data.username, email: me.data.email });
  }, [me.data, reset]);

  const save = useMutation({
    mutationFn: (v: V) => profileService.update(v),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["profile"] }); refresh(); toast.success("Profile updated"); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <>
      <PageHeader title="Profile" description="How you appear to friends and group members." />
      <PageContainer>
        <div className="max-w-2xl space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-muted text-base font-semibold">
                {me.data?.fullName?.[0]?.toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-medium">{me.data?.fullName}</h3>
                <p className="text-xs text-muted-foreground">@{me.data?.username}</p>
              </div>
              <Button variant="outline" size="sm" className="ml-auto" disabled>Change photo</Button>
            </div>
          </div>

          <form onSubmit={handleSubmit((v) => save.mutate(v))} className="space-y-5 rounded-lg border border-border bg-card p-6">
            {me.isLoading ? <Skeleton className="h-40" /> : (
              <>
                <div className="space-y-2">
                  <Label>Full name</Label>
                  <Input {...register("fullName")} />
                  {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Username</Label>
                  <Input {...register("username")} />
                  {errors.username && <p className="text-xs text-destructive">{errors.username.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" {...register("email")} />
                  {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting || save.isPending}>
                    {(isSubmitting || save.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save changes
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </PageContainer>
    </>
  );
}
