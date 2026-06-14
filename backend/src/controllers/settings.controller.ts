import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const updateSettings = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  // Update generic settings here, e.g. currency, notifications preferences
  await User.findByIdAndUpdate(userId, req.body);
  res.json({ success: true, message: "Settings updated" });
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!._id;
  const { current, next } = req.body;

  const user = await User.findById(userId);
  if (!user || !user.password) {
    res.status(404).json({ success: false, message: "User not found or no password set" });
    return;
  }

  const isMatch = await bcrypt.compare(current, user.password);
  if (!isMatch) {
    res.status(401).json({ success: false, message: "Incorrect current password" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(next, salt);
  await user.save();

  res.json({ success: true, message: "Password updated successfully" });
};

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  await User.findByIdAndDelete(userId);
  // Optional: clear auth cookies, delete associated expenses where paidBy is user
  res.json({ success: true, message: "Account deleted" });
};
