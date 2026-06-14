import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import Review from "../models/Review";

export const createReview = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id;
  const { text, rating, role } = req.body;

  const review = await Review.create({
    text,
    rating,
    role: role || "User",
    author: userId,
  });

  res.status(201).json({ success: true, data: review });
};

export const getRandomReview = async (req: AuthRequest | any, res: Response) => {
  // Use aggregation to pick a random review
  const randomReview = await Review.aggregate([
    { $sample: { size: 1 } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "authorDetails"
      }
    },
    { $unwind: "$authorDetails" }
  ]);

  if (!randomReview || randomReview.length === 0) {
    res.json({ success: true, data: null });
    return;
  }

  // Format to hide sensitive user details
  const review = randomReview[0];
  res.json({
    success: true,
    data: {
      text: review.text,
      rating: review.rating,
      role: review.role,
      authorName: review.authorDetails.fullName,
      authorAvatar: review.authorDetails.avatar
    }
  });
};
