import mongoose from "mongoose";
import Expense from "../models/Expense";
import Settlement from "../models/Settlement";

// A simplistic graph node representation
interface BalanceNode {
  userId: string;
  balance: number;
}

export const calculateGroupSettlements = async (groupId: string) => {
  // 1. Fetch all expenses in this group
  const expenses = await Expense.find({ group: groupId });

  // 2. Fetch all paid settlements in this group to factor into balances
  const paidSettlements = await Settlement.find({ group: groupId, status: "paid" });

  const balances: Record<string, number> = {};

  // Initialize balances based on expenses
  for (const exp of expenses) {
    const paidBy = exp.paidBy.toString();
    balances[paidBy] = (balances[paidBy] || 0) + exp.amount;

    for (const split of exp.splits) {
      const splitUser = split.user.toString();
      balances[splitUser] = (balances[splitUser] || 0) - split.amount;
    }
  }

  // Adjust for settlements already paid
  for (const s of paidSettlements) {
    const from = s.from.toString();
    const to = s.to.toString();
    balances[from] = (balances[from] || 0) + s.amount;
    balances[to] = (balances[to] || 0) - s.amount;
  }

  // 3. Separate into debtors and creditors
  const debtors: BalanceNode[] = [];
  const creditors: BalanceNode[] = [];

  for (const [userId, balance] of Object.entries(balances)) {
    if (balance < -0.01) debtors.push({ userId, balance });
    else if (balance > 0.01) creditors.push({ userId, balance });
  }

  // Sort them to optimize greedy matching (largest debts to largest credits)
  debtors.sort((a, b) => a.balance - b.balance);
  creditors.sort((a, b) => b.balance - a.balance);

  const suggestedSettlements = [];

  let i = 0; // debtors index
  let j = 0; // creditors index

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amountToSettle = Math.min(Math.abs(debtor.balance), creditor.balance);

    // Round to 2 decimals
    const roundedAmount = Math.round(amountToSettle * 100) / 100;

    if (roundedAmount > 0) {
      suggestedSettlements.push({
        from: debtor.userId,
        to: creditor.userId,
        amount: roundedAmount,
      });
    }

    debtor.balance += amountToSettle;
    creditor.balance -= amountToSettle;

    if (Math.abs(debtor.balance) < 0.01) i++;
    if (Math.abs(creditor.balance) < 0.01) j++;
  }

  return suggestedSettlements;
};
