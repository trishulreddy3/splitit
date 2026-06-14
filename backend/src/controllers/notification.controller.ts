import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Notification from "../models/Notification";

export const getNotifications = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
  
  res.json({ success: true, data: notifications });
};

export const markAsRead = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!._id;

  const notification = await Notification.findById(id);

  if (!notification || notification.user.toString() !== userId.toString()) {
    res.status(404).json({ success: false, message: "Notification not found" });
    return;
  }

  notification.read = true;
  await notification.save();

  res.json({ success: true, message: "Notification marked as read" });
};
