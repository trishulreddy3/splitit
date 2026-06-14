import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Receipt } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/settle";
import type { ExpenseCategory, Group, SplitMethod, User } from "@/types";
import { expenseService } from "@/lib/api/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CATEGORIES: { value: ExpenseCategory; label: string }[] = [
  { value: "food", label: "Food" }, { value: "travel", label: "Travel" },
  { value: "hotel", label: "Hotel" }, { value: "shopping", label: "Shopping" },
  { value: "fuel", label: "Fuel" }, { value: "activities", label: "Activities" },
  { value: "tickets", label: "Tickets" }, { value: "emergency", label: "Emergency" },
  { value: "miscellaneous", label: "Miscellaneous" },
];

const baseSchema = z.object({
  name: z.string().trim().min(1, "Required").max(120),
  description: z.string().max(500).optional(),
  amount: z.coerce.number().positive("Must be greater than 0"),
  currency: z.string().min(1).max(8),
  category: z.string(),
  expenseDate: z.string().min(1),
  splitMethod: z.enum(["equal", "unequal", "percentage", "shares"]),
  groupId: z.string().optional(),
  payerMode: z.enum(["single", "multiple"]),
  paidBy: z.string().optional(),
  contributors: z.array(z.object({
    userId: z.string(),
    selected: z.boolean(),
    amount: z.coerce.number().min(0).optional(),
  })),
  splits: z.array(z.object({
    userId: z.string(),
    selected: z.boolean(),
    amount: z.coerce.number().min(0).optional(),
    percentage: z.coerce.number().min(0).max(100).optional(),
    shares: z.coerce.number().min(0).optional(),
  })),
});
type FormValues = z.infer<typeof baseSchema>;

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  group?: Group;
  currentUser: User;
  members: User[];
  groups?: Group[];
  onCreated?: () => void;
}

export function ExpenseFormSheet({ open, onOpenChange, group, currentUser, members, groups, onCreated }: Props) {
  const qc = useQueryClient();
  const today = new Date().toISOString().slice(0, 10);

  const { register, handleSubmit, setValue, watch, control, reset, formState: { errors, isSubmitting } } =
    useForm<FormValues>({
      resolver: zodResolver(baseSchema),
      defaultValues: {
        name: "", description: "", amount: 0, currency: "INR",
        category: "miscellaneous", expenseDate: today,
        splitMethod: "equal", groupId: group?._id,
        payerMode: "single", paidBy: currentUser._id,
        contributors: members.map((m) => ({ userId: m._id, selected: m._id === currentUser._id, amount: 0 })),
        splits: members.map((m) => ({ userId: m._id, selected: true, amount: 0, percentage: 0, shares: 1 })),
      },
    });

  const { fields } = useFieldArray({ control, name: "splits" });
  const { fields: contributorFields } = useFieldArray({ control, name: "contributors" });
  const amount = Number(watch("amount") || 0);
  const method = watch("splitMethod") as SplitMethod;
  const splits = watch("splits") || [];
  const selectedIds = splits.filter((s) => s.selected).map((s) => s.userId);

  const computed = useMemo(() => {
    const map = new Map<string, number>();
    if (!amount || selectedIds.length === 0) return map;
    if (method === "equal") {
      const each = amount / selectedIds.length;
      selectedIds.forEach((id) => map.set(id, each));
    } else if (method === "unequal") {
      splits.forEach((s) => { if (s.selected) map.set(s.userId, Number(s.amount || 0)); });
    } else if (method === "percentage") {
      splits.forEach((s) => { if (s.selected) map.set(s.userId, (Number(s.percentage || 0) / 100) * amount); });
    } else if (method === "shares") {
      const total = splits.filter((s) => s.selected).reduce((a, s) => a + Number(s.shares || 0), 0);
      splits.forEach((s) => { if (s.selected) map.set(s.userId, total ? (Number(s.shares || 0) / total) * amount : 0); });
    }
    return map;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, method, JSON.stringify(splits)]);

  const totalAllocated = Array.from(computed.values()).reduce((a, b) => a + b, 0);
  const remaining = amount - totalAllocated;

  const create = useMutation({
    mutationFn: async (v: FormValues) => {
      const data = {
        ...v,
        group: v.groupId,
        participants: v.splits.filter((s) => s.selected).map((s) => s.userId),
        contributors: v.payerMode === "single" 
          ? [{ user: v.paidBy!, amount: Number(v.amount) }]
          : v.contributors.filter(c => c.selected && Number(c.amount) > 0).map(c => ({ user: c.userId, amount: Number(c.amount) })),
        splits: v.splits
          .filter((s) => s.selected)
          .map((s) => ({
            user: s.userId,
            amount: method === "equal" ? Number(computed.get(s.userId)?.toFixed(2)) : Number(s.amount || 0),
            percentage: method === "percentage" ? Number(s.percentage || 0) : undefined,
            shares: method === "shares" ? Number(s.shares || 0) : undefined,
          })),
      };
  
      if (data.contributors.length === 0) {
        toast.error("Please specify who paid.");
        return;
      }
  
      if (v.payerMode === "multiple") {
        const totalContributed = data.contributors.reduce((acc, c) => acc + c.amount, 0);
        if (Math.abs(totalContributed - Number(v.amount)) > 0.01) {
          toast.error(`Contributors total (${formatCurrency(totalContributed, v.currency)}) does not match expense amount (${formatCurrency(Number(v.amount), v.currency)}).`);
          return;
        }
      }
      return expenseService.create(data as any);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["expenses"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
      qc.invalidateQueries({ queryKey: ["settlements"] });
      toast.success("Expense added");
      onCreated?.();
      reset();
      onOpenChange(false);
    },
    onError: (e: any) => toast.error(e.message || "Failed to add expense"),
  });

  useEffect(() => {
    if (!open) return;
    reset({
      name: "", description: "", amount: 0, currency: "INR",
      category: "miscellaneous", paidBy: currentUser._id, expenseDate: today,
      splitMethod: "equal", groupId: group?._id,
      splits: members.map((m) => ({ userId: m._id, selected: true, amount: 0, percentage: 0, shares: 1 })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onSubmit = (v: FormValues) => {
    if (selectedIds.length === 0) { toast.error("Pick at least one participant"); return; }
    if (method !== "equal" && Math.abs(remaining) > 0.5) {
      toast.error(method === "percentage" ? "Percentages must total 100%" : "Splits must equal the total");
      return;
    }
    create.mutate(v);
  };

  const memberLookup = new Map(members.map((m) => [m._id, m]));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Add expense</SheetTitle>
          <SheetDescription>Split a payment across the people who actually shared it.</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6 px-4 pb-4">
          <section className="space-y-4">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Details</div>
            <div className="space-y-2">
              <Label htmlFor="name">Description</Label>
              <Input id="name" placeholder="Dinner at Olive" {...register("name")} />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" type="number" step="0.01" inputMode="decimal" {...register("amount")} />
                {errors.amount && <p className="text-xs text-destructive">{errors.amount.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="INR" onValueChange={(v) => setValue("currency", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["INR", "USD", "EUR", "GBP", "AED", "SGD", "AUD", "CAD"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="miscellaneous" onValueChange={(v) => setValue("category", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenseDate">Date</Label>
                <Input id="expenseDate" type="date" {...register("expenseDate")} />
              </div>
            </div>
            {!group && groups && groups.length > 0 && (
              <div className="space-y-2">
                <Label>Group</Label>
                <Select onValueChange={(v) => setValue("groupId", v)}>
                  <SelectTrigger><SelectValue placeholder="None (personal)" /></SelectTrigger>
                  <SelectContent>
                    {groups.map((g) => <SelectItem key={g._id} value={g._id}>{g.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Paid by</Label>
                <Tabs value={watch("payerMode")} onValueChange={(v) => setValue("payerMode", v as "single" | "multiple")} className="h-8 w-[160px]">
                  <TabsList className="grid h-full w-full grid-cols-2">
                    <TabsTrigger value="single" className="text-[11px]">Single</TabsTrigger>
                    <TabsTrigger value="multiple" className="text-[11px]">Multiple</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {watch("payerMode") === "single" ? (
                <div>
                  <Select defaultValue={currentUser._id} onValueChange={(v) => setValue("paidBy", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {members.map((m) => <SelectItem key={m._id} value={m._id}>{m.fullName}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.paidBy && <p className="mt-1.5 text-xs text-destructive">{errors.paidBy.message}</p>}
                </div>
              ) : (
                <div className="divide-y divide-border rounded-lg border border-border bg-card max-h-48 overflow-y-auto">
                  {contributorFields.map((f, idx) => {
                    const m = memberLookup.get(watch(`contributors.${idx}.userId`));
                    if (!m) return null;
                    return (
                      <div key={f.id} className="flex items-center gap-3 p-2.5">
                        <Checkbox
                          checked={watch(`contributors.${idx}.selected`)}
                          onCheckedChange={(c) => setValue(`contributors.${idx}.selected`, Boolean(c))}
                        />
                        <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">
                          {m.fullName?.[0]}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm">{m.fullName}</div>
                        </div>
                        <Input className="h-8 w-24 text-sm" type="number" step="0.01" placeholder="0"
                          disabled={!watch(`contributors.${idx}.selected`)} {...register(`contributors.${idx}.amount`)} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Notes</Label>
              <Textarea id="description" rows={2} placeholder="Optional" {...register("description")} />
            </div>
          </section>

          <section className="space-y-3">
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Split</div>
            <Tabs defaultValue="equal" onValueChange={(v) => setValue("splitMethod", v as SplitMethod)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="equal">Equal</TabsTrigger>
                <TabsTrigger value="unequal">Amounts</TabsTrigger>
                <TabsTrigger value="percentage">%</TabsTrigger>
                <TabsTrigger value="shares">Shares</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="divide-y divide-border rounded-lg border border-border bg-card">
              {fields.map((f, idx) => {
                const m = memberLookup.get(splits[idx]?.userId);
                if (!m) return null;
                const computedAmt = computed.get(m._id) || 0;
                return (
                  <div key={f.id} className="flex items-center gap-3 p-3">
                    <Checkbox
                      checked={splits[idx]?.selected}
                      onCheckedChange={(c) => setValue(`splits.${idx}.selected`, Boolean(c))}
                    />
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-muted text-[10px] font-medium uppercase">
                      {m.fullName?.[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm">{m.fullName}</div>
                      <div className="text-[11px] text-muted-foreground">{m.email}</div>
                    </div>
                    {method === "equal" && (
                      <div className="text-sm tabular-nums text-muted-foreground">
                        {splits[idx]?.selected ? formatCurrency(computedAmt, watch("currency")) : "—"}
                      </div>
                    )}
                    {method === "unequal" && (
                      <Input className="w-24" type="number" step="0.01" placeholder="0"
                        disabled={!splits[idx]?.selected} {...register(`splits.${idx}.amount`)} />
                    )}
                    {method === "percentage" && (
                      <div className="flex items-center gap-1">
                        <Input className="w-20" type="number" step="0.1" placeholder="0"
                          disabled={!splits[idx]?.selected} {...register(`splits.${idx}.percentage`)} />
                        <span className="text-xs text-muted-foreground">%</span>
                      </div>
                    )}
                    {method === "shares" && (
                      <Input className="w-20" type="number" min={0} placeholder="1"
                        disabled={!splits[idx]?.selected} {...register(`splits.${idx}.shares`)} />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2 text-xs">
              <span className="text-muted-foreground">{selectedIds.length} {selectedIds.length === 1 ? "person" : "people"}</span>
              <span className="tabular-nums">
                {method === "percentage"
                  ? `${splits.filter((s) => s.selected).reduce((a, s) => a + Number(s.percentage || 0), 0).toFixed(1)}% allocated`
                  : `${formatCurrency(totalAllocated, watch("currency"))} of ${formatCurrency(amount || 0, watch("currency"))}`}
              </span>
            </div>
          </section>

          <SheetFooter className="px-0">
            <Button type="submit" className="w-full" disabled={isSubmitting || create.isPending}>
              {(isSubmitting || create.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Receipt className="mr-2 h-4 w-4" />
              Add expense
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
