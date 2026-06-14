import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFriend extends Document {
  user1: Types.ObjectId;
  user2: Types.ObjectId;
  createdAt: Date;
}

const FriendSchema: Schema = new Schema(
  {
    user1: { type: Schema.Types.ObjectId, ref: "User", required: true },
    user2: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Ensure a friendship is unique
FriendSchema.index({ user1: 1, user2: 1 }, { unique: true });

export default mongoose.model<IFriend>("Friend", FriendSchema);
