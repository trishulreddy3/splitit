import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Group from "../models/Group";
import Expense from "../models/Expense";
import Activity from "../models/Activity";

export const getGroups = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  const groups = await Group.find({ members: userId }).populate("owner members", "-password");
  res.json({ success: true, data: groups });
};

export const getGroupById = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const group = await Group.findById(id).populate("owner members", "-password");
  
  if (!group || !group.members.some(m => m._id.toString() === req.user!._id.toString())) {
    res.status(404).json({ success: false, message: "Group not found" });
    return;
  }
  
  res.json({ success: true, data: group });
};

export const createGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, description, avatar, location, startDate, endDate, members } = req.body;
  const userId = req.user!._id;

  const groupMembers = members ? [...new Set([...members, userId.toString()])] : [userId];

  const group = await Group.create({
    name,
    description,
    avatar,
    location,
    startDate,
    endDate,
    owner: userId,
    members: groupMembers,
  });

  await Activity.create({
    type: "group_created",
    actor: userId,
    group: group._id,
    message: `Created group "${name}"`
  });

  res.status(201).json({ success: true, data: group });
};

export const updateGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const group = await Group.findById(id);

  if (!group || !group.members.includes(req.user!._id)) {
    res.status(404).json({ success: false, message: "Group not found" });
    return;
  }

  Object.assign(group, req.body);
  await group.save();

  res.json({ success: true, data: group });
};

export const deleteGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const group = await Group.findById(id);

  if (!group || group.owner.toString() !== req.user!._id.toString()) {
    res.status(403).json({ success: false, message: "Not authorized or group not found" });
    return;
  }

  await Expense.deleteMany({ group: group._id });
  await group.deleteOne();

  res.json({ success: true, message: "Group deleted" });
};

export const inviteToGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { emails } = req.body;

  res.json({ success: true, message: "Invitations sent (dummy)" });
};

export const removeMember = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id, memberId } = req.params;
  const group = await Group.findById(id);

  if (!group || group.owner.toString() !== req.user!._id.toString()) {
    res.status(403).json({ success: false, message: "Not authorized" });
    return;
  }

  group.members = group.members.filter(m => m.toString() !== memberId);
  await group.save();

  res.json({ success: true, message: "Member removed" });
};

export const leaveGroup = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const group = await Group.findById(id);
  const userId = req.user!._id;

  if (!group) {
    res.status(404).json({ success: false, message: "Group not found" });
    return;
  }

  if (group.owner.toString() === userId.toString()) {
    res.status(400).json({ success: false, message: "Owner cannot leave without transferring ownership" });
    return;
  }

  group.members = group.members.filter(m => m.toString() !== userId.toString());
  await group.save();

  res.json({ success: true, message: "Left group" });
};

export const transferOwner = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { memberId } = req.body;
  const group = await Group.findById(id);

  if (!group || group.owner.toString() !== req.user!._id.toString()) {
    res.status(403).json({ success: false, message: "Not authorized" });
    return;
  }

  if (!group.members.includes(memberId)) {
    res.status(400).json({ success: false, message: "User is not a member of this group" });
    return;
  }

  group.owner = memberId;
  await group.save();

  res.json({ success: true, message: "Ownership transferred" });
};

export const getGroupSummary = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const expenses = await Expense.find({ group: id });
  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  res.json({ success: true, data: { totalExpenses: total } });
};
