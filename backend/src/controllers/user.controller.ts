import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/User";

export const searchUsers = async (req: AuthRequest, res: Response) => {
  const { q } = req.query;
  const queryStr = (q as string) || "";
  
  if (!queryStr) {
    return res.json({ success: true, data: [] });
  }

  const regex = new RegExp(queryStr, "i");

  // Find users matching email or name, excluding the current user
  const users = await User.find({
    _id: { $ne: req.user!._id },
    $or: [{ fullName: regex }, { email: regex }],
  })
    .select("_id fullName email avatarUrl")
    .limit(10);

  res.json({
    success: true,
    data: users,
  });
};
