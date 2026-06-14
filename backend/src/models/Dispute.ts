import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDispute extends Document {
  expense: Types.ObjectId;
  raisedBy: Types.ObjectId;
  reason: string;
  status: "open" | "resolved" | "rejected";
  resolution?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const DisputeSchema: Schema = new Schema(
  {
    expense: { type: Schema.Types.ObjectId, ref: "Expense", required: true },
    raisedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["open", "resolved", "rejected"], default: "open" },
    resolution: { type: String },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<IDispute>("Dispute", DisputeSchema);
