import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Group from "../models/Group";
import Expense from "../models/Expense";
import Settlement from "../models/Settlement";
import Activity from "../models/Activity";

export const getSummary = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;

  const totalGroups = await Group.countDocuments({ members: userId });
  
  const expenses = await Expense.find({ participants: userId });
  const totalExpenses = expenses.length;

  let amountYouOwe = 0;
  let amountOwedToYou = 0;

  for (const exp of expenses) {
    if (exp.paidBy.toString() !== userId.toString()) {
      const mySplit = exp.splits.find(s => s.user.toString() === userId.toString());
      if (mySplit) amountYouOwe += mySplit.amount;
    } else {
      const othersSplits = exp.splits.filter(s => s.user.toString() !== userId.toString());
      othersSplits.forEach(s => amountOwedToYou += s.amount);
    }
  }

  // Adjust for settlements
  const paidSettlements = await Settlement.find({
    $or: [{ from: userId }, { to: userId }],
    status: "paid"
  });

  for (const s of paidSettlements) {
    if (s.from.toString() === userId.toString()) {
      amountYouOwe -= s.amount;
    } else {
      amountOwedToYou -= s.amount;
    }
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
