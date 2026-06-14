import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken";
import { AuthRequest } from "../middlewares/auth.middleware";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: errors.array()[0].msg });
    return;
  }

  const { fullName, username, email, password } = req.body;

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    res.status(400).json({ success: false, message: "User already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullName,
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id.toString());
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      success: true,
      data: {
        token,
        user: { _id: user._id, fullName: user.fullName, username: user.username, email: user.email, avatar: user.avatar }
      }
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid user data" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: errors.array()[0].msg });
    return;
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.password && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id.toString());
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      data: {
        token,
        user: { _id: user._id, fullName: user.fullName, username: user.username, email: user.email, avatar: user.avatar }
      }
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid email or password" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.json({ success: true, message: "Logged out successfully" });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: req.user });
};
