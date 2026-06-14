import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/User";

export const getProfile = async (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: req.user });
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  const { fullName, currency } = req.body;

  const user = await User.findById(userId);
  if (user) {
    user.fullName = fullName || user.fullName;
    user.currency = currency || user.currency;
    await user.save();
    res.json({ success: true, data: user });
  }
};

export const uploadAvatar = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ success: false, message: "No file provided" });
    return;
  }

  const user = await User.findById(req.user!._id);
  if (user) {
    user.avatar = req.file.path;
    await user.save();
    res.json({ success: true, data: { url: req.file.path } });
  }
};
