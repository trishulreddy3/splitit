import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Friend from "../models/Friend";
import FriendRequest from "../models/FriendRequest";
import User from "../models/User";
import Notification from "../models/Notification";

export const getFriends = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  
  const friendships = await Friend.find({
    $or: [{ user1: userId }, { user2: userId }]
  }).populate("user1 user2", "-password");

  const friends = friendships.map(f => {
    const friendUser = f.user1._id.toString() === userId.toString() ? f.user2 : f.user1;
    return {
      _id: f._id,
      user: friendUser,
      createdAt: f.createdAt
    };
  });

  res.json({ success: true, data: friends });
};

export const getFriendRequests = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  const requests = await FriendRequest.find({ to: userId, status: "pending" })
    .populate("from", "-password");
  
  res.json({ success: true, data: requests });
};

export const sendFriendRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  const { email } = req.body;
  const fromUserId = req.user!._id;

  const targetUser = await User.findOne({ email });
  if (!targetUser) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  if (targetUser._id.toString() === fromUserId.toString()) {
    res.status(400).json({ success: false, message: "Cannot send request to yourself" });
    return;
  }

  const existingFriend = await Friend.findOne({
    $or: [
      { user1: fromUserId, user2: targetUser._id },
      { user1: targetUser._id, user2: fromUserId }
    ]
  });

  if (existingFriend) {
    res.status(400).json({ success: false, message: "Already friends" });
    return;
  }

  const existingRequest = await FriendRequest.findOne({
    from: fromUserId,
    to: targetUser._id,
    status: "pending"
  });

  if (existingRequest) {
    res.status(400).json({ success: false, message: "Request already sent" });
    return;
  }

  await FriendRequest.create({ from: fromUserId, to: targetUser._id });

  await Notification.create({
    type: "friend_request",
    user: targetUser._id,
    title: "New Friend Request",
    message: `${req.user!.fullName} sent you a friend request.`,
  });

  res.json({ success: true, message: "Friend request sent" });
};

export const acceptFriendRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const request = await FriendRequest.findById(id);

  if (!request || request.to.toString() !== req.user!._id.toString()) {
    res.status(404).json({ success: false, message: "Request not found" });
    return;
  }

  request.status = "accepted";
  await request.save();

  await Friend.create({
    user1: request.from,
    user2: request.to
  });

  res.json({ success: true, message: "Friend request accepted" });
};

export const rejectFriendRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const request = await FriendRequest.findById(id);

  if (!request || request.to.toString() !== req.user!._id.toString()) {
    res.status(404).json({ success: false, message: "Request not found" });
    return;
  }

  request.status = "rejected";
  await request.save();

  res.json({ success: true, message: "Friend request rejected" });
};

export const removeFriend = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!._id;

  const friendship = await Friend.findById(id);
  if (!friendship || (friendship.user1.toString() !== userId.toString() && friendship.user2.toString() !== userId.toString())) {
    res.status(404).json({ success: false, message: "Friendship not found" });
    return;
  }

  await friendship.deleteOne();
  res.json({ success: true, message: "Friend removed" });
};
