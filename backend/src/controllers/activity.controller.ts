import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Activity from "../models/Activity";
import Group from "../models/Group";

export const getActivities = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;

  const groups = await Group.find({ members: userId }).select("_id");
  const groupIds = groups.map(g => g._id);

  const activities = await Activity.find({
    $or: [
      { actor: userId },
      { group: { $in: groupIds } }
    ]
  }).sort({ createdAt: -1 }).limit(50).populate("actor group expense");

  res.json({ success: true, data: activities });
};
