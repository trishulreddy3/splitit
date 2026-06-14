import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password?: string;
  avatar?: string;
  currency?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // Optional for OAuth users
    avatar: { type: String },
    currency: { type: String, default: "INR" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
