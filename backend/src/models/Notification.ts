import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
  type: "friend_request" | "group_invite" | "expense_added" | "settlement_reminder";
  user: Types.ObjectId;
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    type: {
      type: String,
      enum: ["friend_request", "group_invite", "expense_added", "settlement_reminder"],
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    link: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>("Notification", NotificationSchema);
