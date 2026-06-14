import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Group from "../models/Group";
import Expense from "../models/Expense";
import User from "../models/User";

export const searchGlobal = async (req: AuthRequest, res: Response) => {
  const { q } = req.query;
  const queryStr = q as string || "";
  const regex = new RegExp(queryStr, "i");

  const groups = await Group.find({ members: req.user!._id, name: regex });
  const expenses = await Expense.find({ participants: req.user!._id, name: regex });
  const friends = await User.find({ fullName: regex }).limit(5); // Simplistic friend search

  res.json({
    success: true,
    data: {
      groups,
      expenses,
      friends,
    }
  });
};
