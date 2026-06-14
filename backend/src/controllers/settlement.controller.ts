import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Settlement from "../models/Settlement";
import Activity from "../models/Activity";
import { calculateGroupSettlements } from "../services/settlement.service";

export const getSettlements = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  const settlements = await Settlement.find({
    $or: [{ from: userId }, { to: userId }]
  }).populate("from to group", "-password");

  res.json({ success: true, data: settlements });
};

export const getGroupSettlements = async (req: AuthRequest, res: Response) => {
  const { groupId } = req.params;
  
  // Calculate dynamic suggested settlements using our engine
  const suggested = await calculateGroupSettlements(groupId as string);
  
  res.json({ success: true, data: suggested });
};

export const markPaid = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.body;
  const userId = req.user!._id;

  const settlement = await Settlement.findById(id);
  if (!settlement) {
    // If it's a dynamic settlement that hasn't been saved yet, we'd normally create it here, but let's assume `id` might be a new structure.
    res.status(404).json({ success: false, message: "Settlement not found" });
    return;
  }

  if (settlement.from.toString() !== userId.toString() && settlement.to.toString() !== userId.toString()) {
    res.status(403).json({ success: false, message: "Not authorized" });
    return;
  }

  settlement.status = "paid";
  settlement.date = new Date();
  await settlement.save();

  await Activity.create({
    type: "settlement_completed",
    actor: userId,
    group: settlement.group,
    message: `Completed settlement for ${settlement.amount} ${settlement.currency}`
  });

  res.json({ success: true, data: settlement });
};
