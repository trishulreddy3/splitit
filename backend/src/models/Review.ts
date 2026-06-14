import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  text: string;
  rating: number;
  author: mongoose.Types.ObjectId;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, default: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>("Review", ReviewSchema);
