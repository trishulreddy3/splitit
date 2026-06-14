// Debt simplification algorithm (greedy min-cash-flow).
// Given net balances per user, returns a minimal list of who pays whom.

export interface SimpleSettlement {
  from: string;
  to: string;
  amount: number;
}

export function simplifyDebts(balances: Record<string, number>): SimpleSettlement[] {
  const eps = 0.01;
  const creditors: { id: string; amount: number }[] = [];
  const debtors: { id: string; amount: number }[] = [];

  for (const [id, bal] of Object.entries(balances)) {
    if (bal > eps) creditors.push({ id, amount: bal });
    else if (bal < -eps) debtors.push({ id, amount: -bal });
  }

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const out: SimpleSettlement[] = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);
    out.push({ from: debtors[i].id, to: creditors[j].id, amount: Math.round(pay * 100) / 100 });
    debtors[i].amount -= pay;
    creditors[j].amount -= pay;
    if (debtors[i].amount < eps) i++;
    if (creditors[j].amount < eps) j++;
  }
  return out;
}

export function formatCurrency(amount: number, currency = "INR") {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
