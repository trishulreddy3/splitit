import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Expense from "../models/Expense";
import Activity from "../models/Activity";

export const getExpenses = async (req: AuthRequest, res: Response) => {
  const { groupId } = req.query;
  const userId = req.user!._id;

  let query: any = { participants: userId };
  if (groupId) {
    query.group = groupId;
  }

  const expenses = await Expense.find(query).populate("contributors.user participants group");
  res.json({ success: true, data: expenses });
};

export const getExpenseById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const expense = await Expense.findById(id).populate("contributors.user participants splits.user");

  if (!expense || !expense.participants.some(p => p._id.toString() === req.user!._id.toString())) {
    res.status(404).json({ success: false, message: "Expense not found" });
    return;
  }

  res.json({ success: true, data: expense });
};

export const createExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!._id;
  const { name, amount, currency, category, contributors, group, participants, splits, splitMethod } = req.body;

  const expense = await Expense.create({
    name,
    amount,
    currency: currency || "INR",
    category: category || "miscellaneous",
    contributors: contributors || [{ user: userId, amount: amount }],
    group,
    participants,
    splits,
    splitMethod: splitMethod || "equal",
  });

  await Activity.create({
    type: "expense_added",
    actor: userId,
    group: group,
    expense: expense._id,
    message: `Added expense "${name}" for ${amount} ${currency || "INR"}`
  });

  res.status(201).json({ success: true, data: expense });
};

export const updateExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!._id;

  const expense = await Expense.findById(id);

  if (!expense || !expense.participants.includes(userId)) {
    res.status(404).json({ success: false, message: "Expense not found" });
    return;
  }

  Object.assign(expense, req.body);
  await expense.save();

  await Activity.create({
    type: "expense_edited",
    actor: userId,
    group: expense.group,
    expense: expense._id,
    message: `Updated expense "${expense.name}"`
  });

  res.json({ success: true, data: expense });
};

export const deleteExpense = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!._id;

  const expense = await Expense.findById(id);

  if (!expense || !expense.participants.includes(userId)) {
    res.status(404).json({ success: false, message: "Expense not found" });
    return;
  }

  await expense.deleteOne();

  res.json({ success: true, message: "Expense deleted" });
};

export const uploadReceipt = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  
  if (!req.file) {
    res.status(400).json({ success: false, message: "No file provided" });
    return;
  }

  const expense = await Expense.findById(id);
  if (!expense) {
    res.status(404).json({ success: false, message: "Expense not found" });
    return;
  }

  expense.receipt = req.file.path;
  await expense.save();

  res.json({ success: true, data: { url: req.file.path } });
};
