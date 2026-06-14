import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { settingsService, reportService } from "@/lib/api/services";
import { PageContainer, PageHeader } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_app/settings")({
  ssr: false,
  component: SettingsPage,
});

const pwSchema = z.object({
  current: z.string().min(6),
  next: z.string().min(8),
  confirm: z.string(),
}).refine((d) => d.next === d.confirm, { message: "Passwords don't match", path: ["confirm"] });
type PV = z.infer<typeof pwSchema>;

function SettingsPage() {
  const { logout } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<PV>({
    resolver: zodResolver(pwSchema), defaultValues: { current: "", next: "", confirm: "" },
  });

  const changePw = useMutation({
    mutationFn: (v: PV) => settingsService.changePassword({ current: v.current, next: v.next }),
    onSuccess: () => { toast.success("Password updated"); reset(); },
    onError: (e: any) => toast.error(e.message),
  });

  const updatePrefs = useMutation({
    mutationFn: (payload: Record<string, unknown>) => settingsService.update(payload),
    onSuccess: () => toast.success("Saved"),
    onError: (e: any) => toast.error(e.message),
  });

  const deleteAcct = useMutation({
    mutationFn: () => settingsService.deleteAccount(),
    onSuccess: () => { toast.success("Account deleted"); logout(); },
    onError: (e: any) => toast.error(e.message),
  });

  const downloadReport = async (format: "pdf" | "csv") => {
    try {
      const blob = format === "pdf" ? await reportService.pdf() : await reportService.csv();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `splittrip-report.${format}`; a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <>
      <PageHeader title="Settings" description="Preferences, security, and account." />
      <PageContainer>
        <div className="max-w-2xl space-y-6">

          <section className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium">Preferences</h3>
            <div className="mt-5 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Default currency</Label>
                  <p className="text-xs text-muted-foreground">Used for new groups and expenses.</p>
                </div>
                <Select defaultValue="INR" onValueChange={(v) => updatePrefs.mutate({ currency: v })}>
                  <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["INR", "USD", "EUR", "GBP", "AED", "SGD", "AUD", "CAD"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email notifications</Label>
                  <p className="text-xs text-muted-foreground">Friend requests, group invites, settlements.</p>
                </div>
                <Switch defaultChecked onCheckedChange={(v) => updatePrefs.mutate({ emailNotifications: v })} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Settlement reminders</Label>
                  <p className="text-xs text-muted-foreground">Weekly nudge for open balances.</p>
                </div>
                <Switch defaultChecked onCheckedChange={(v) => updatePrefs.mutate({ settlementReminders: v })} />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium">Export</h3>
            <p className="mt-1 text-xs text-muted-foreground">Download your expenses and settlements.</p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" onClick={() => downloadReport("pdf")}>Download PDF</Button>
              <Button size="sm" variant="outline" onClick={() => downloadReport("csv")}>Download CSV</Button>
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-sm font-medium">Change password</h3>
            <form onSubmit={handleSubmit((v) => changePw.mutate(v))} className="mt-5 space-y-4">
              <div className="space-y-2">
                <Label>Current password</Label>
                <Input type="password" {...register("current")} />
                {errors.current && <p className="text-xs text-destructive">{errors.current.message}</p>}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>New password</Label>
                  <Input type="password" {...register("next")} />
                  {errors.next && <p className="text-xs text-destructive">{errors.next.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Confirm</Label>
                  <Input type="password" {...register("confirm")} />
                  {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" size="sm" disabled={isSubmitting || changePw.isPending}>
                  {(isSubmitting || changePw.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update password
                </Button>
              </div>
            </form>
          </section>

          <section className="rounded-lg border border-destructive/40 bg-destructive/5 p-6">
            <h3 className="text-sm font-medium">Delete account</h3>
            <p className="mt-1 text-xs text-muted-foreground">Permanently delete your account, groups, expenses, and settlements. This action cannot be undone.</p>
            <Button variant="destructive" size="sm" className="mt-4"
              onClick={() => { if (confirm("Delete account permanently? This cannot be undone.")) deleteAcct.mutate(); }}>
              <Trash2 className="mr-1.5 h-3.5 w-3.5" />Delete account
            </Button>
          </section>
        </div>
      </PageContainer>
    </>
  );
}
