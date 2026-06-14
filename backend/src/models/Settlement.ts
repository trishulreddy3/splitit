import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISettlement extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  amount: number;
  currency: string;
  group?: Types.ObjectId;
  status: "pending" | "paid" | "confirmed";
  date?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SettlementSchema: Schema = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    status: {
      type: String,
      enum: ["pending", "paid", "confirmed"],
      default: "pending",
    },
    date: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ISettlement>("Settlement", SettlementSchema);
