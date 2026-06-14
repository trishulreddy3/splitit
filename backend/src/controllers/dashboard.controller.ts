import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Group from "../models/Group";
import Expense from "../models/Expense";
import Settlement from "../models/Settlement";
import Activity from "../models/Activity";

export const getSummary = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;

  const groups = await Group.find({ members: userId });
  const totalGroups = groups.length;
  
  const expenses = await Expense.find({ participants: userId });
  const totalExpenses = expenses.length;

  let amountYouOwe = 0;
  let amountOwedToYou = 0;

  // We need to calculate settlements per group to be accurate
  const { calculateGroupSettlements } = require("../services/settlement.service");

  for (const group of groups) {
    const settlements = await calculateGroupSettlements(group._id.toString());
    for (const s of settlements) {
      if (s.from === userId.toString()) {
        amountYouOwe += s.amount;
      } else if (s.to === userId.toString()) {
        amountOwedToYou += s.amount;
      }
    }
  }

  // Also account for non-group (personal) expenses
  const personalExpenses = expenses.filter(e => !e.group);
  if (personalExpenses.length > 0) {
    const pBalances: Record<string, number> = {};
    for (const exp of personalExpenses) {
      if (exp.contributors && exp.contributors.length > 0) {
        for (const c of exp.contributors) {
          const cUser = c.user.toString();
          pBalances[cUser] = (pBalances[cUser] || 0) + c.amount;
        }
      }
      for (const split of exp.splits) {
        const sUser = split.user.toString();
        pBalances[sUser] = (pBalances[sUser] || 0) - split.amount;
      }
    }
    // Simple net balance for the user in personal expenses
    const myBalance = pBalances[userId.toString()] || 0;
    if (myBalance > 0) amountOwedToYou += myBalance;
    else if (myBalance < 0) amountYouOwe += Math.abs(myBalance);
  }

  res.json({
    success: true,
    data: {
      totalGroups,
      totalExpenses,
      amountYouOwe: Math.max(0, amountYouOwe),
      amountOwedToYou: Math.max(0, amountOwedToYou),
      monthlySpending: 0,
      currency: "INR"
    }
  });
};

export const getActivity = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  
  const groups = await Group.find({ members: userId }).select("_id");
  const groupIds = groups.map(g => g._id);

  const activities = await Activity.find({
    $or: [
      { actor: userId },
      { group: { $in: groupIds } }
    ]
  }).sort({ createdAt: -1 }).limit(20).populate("actor group expense");

  res.json({ success: true, data: activities });
};
