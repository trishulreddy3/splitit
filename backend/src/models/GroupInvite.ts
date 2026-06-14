import mongoose, { Schema, Document, Types } from "mongoose";

export interface IGroupInvite extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  group: Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const GroupInviteSchema: Schema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    group: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model<IGroupInvite>("GroupInvite", GroupInviteSchema);
