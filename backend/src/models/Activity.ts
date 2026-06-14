import mongoose, { Schema, Document, Types } from "mongoose";

export interface IActivity extends Document {
  type: string;
  actor: Types.ObjectId;
  target?: string;
  group?: Types.ObjectId;
  expense?: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    actor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    target: { type: String },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    expense: { type: Schema.Types.ObjectId, ref: "Expense" },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IActivity>("Activity", ActivitySchema);
